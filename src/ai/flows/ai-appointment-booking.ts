'use server';

/**
 * @fileOverview A flow that books appointments based on user input, using calendar tools.
 *
 * - aiAppointmentBooking - A function that handles the appointment booking process.
 * - AiAppointmentBookingInput - The input type for the aiAppointmentBooking function.
 * - AiAppointmentBookingOutput - The return type for the aiAppointmentBooking function.
 */

import { getAI } from '@/ai/genkit';
import {z} from 'genkit';
import { checkCalendarAvailabilityTool, bookAppointmentTool } from '@/ai/tools/calendarTools';

const ai = await getAI();

const AiAppointmentBookingInputSchema = z.object({
  userInput: z
    .string()
    .describe('The user input requesting an appointment. This may include preferred service, date, and time.'),
  // Optional: Pass current date to help LLM with relative dates like "tomorrow"
  currentDate: z.string().datetime().describe("The current date and time in ISO 8601 format, to help resolve relative date/time expressions from the user (e.g., 'tomorrow', 'next Monday').")
});
export type AiAppointmentBookingInput = z.infer<typeof AiAppointmentBookingInputSchema>;

const AiAppointmentBookingOutputSchema = z.object({
  confirmation: z.string().describe('A confirmation message for the appointment, or a message asking for more details or indicating unavailability.'),
  isBooked: z.boolean().describe('Whether an appointment was successfully booked in this turn.'),
  requiresMoreInfo: z.boolean().describe('Whether the AI needs more information from the user to proceed (e.g. preferred time if not specified).')
});
export type AiAppointmentBookingOutput = z.infer<typeof AiAppointmentBookingOutputSchema>;

export async function aiAppointmentBooking(input: AiAppointmentBookingInput): Promise<AiAppointmentBookingOutput> {
  // Add current date if not already present, for the prompt
  const fullInput = {
    ...input,
    currentDate: input.currentDate || new Date().toISOString(),
  };
  return aiAppointmentBookingFlow(fullInput);
}

const prompt = ai.definePrompt({
  name: 'aiAppointmentBookingPrompt',
  input: {schema: AiAppointmentBookingInputSchema}, // Uses the richer input schema
  output: {schema: AiAppointmentBookingOutputSchema},
  tools: [checkCalendarAvailabilityTool, bookAppointmentTool],
  prompt: `You are an AI assistant responsible for booking 1-hour appointments.
The current date and time is: {{{currentDate}}}. Use this to interpret relative dates/times like "tomorrow at 2pm".

User's request: "{{{userInput}}}"

Follow these steps:
1.  Analyze the user's request to identify the desired service, date, and time.
    - If the user provides a vague time (e.g., "afternoon"), suggest a specific time like 2:00 PM.
    - If date or time is missing, ask the user to provide it. Set 'requiresMoreInfo' to true and 'isBooked' to false. Your response should be a question to the user.
2.  If a specific date and time are identified or can be reasonably inferred:
    a.  Use the 'checkCalendarAvailabilityTool' to check if the 1-hour slot is free. Business hours are Monday-Friday, 9 AM to 5 PM.
    b.  If the slot is NOT available, inform the user and suggest they pick another time. Set 'isBooked' to false and 'requiresMoreInfo' to true (as they need to provide a new time).
    c.  If the slot IS available:
        i.  Use the 'bookAppointmentTool' to book the 1-hour appointment. For 'serviceDetails', use the service mentioned by the user or a general term like "Consultation" if not specified.
        ii. If booking is successful, provide the confirmation message from the tool. Set 'isBooked' to true and 'requiresMoreInfo' to false.
        iii. If booking fails for some unexpected reason (after availability was confirmed), apologize and state that an error occurred. Set 'isBooked' to false and 'requiresMoreInfo' to false.
3.  If the user is just inquiring about availability without a clear intent to book immediately, provide the availability information and ask if they'd like to book. Set 'isBooked' to false and 'requiresMoreInfo' to true.

Respond directly to the user. Be polite and clear.
If asking for more information, ensure your 'confirmation' field contains the clarifying question.
If an appointment is booked, the 'confirmation' field should contain the success message.
If a slot is unavailable, 'confirmation' should state that and potentially ask for a new time.
`,
});

const aiAppointmentBookingFlow = ai.defineFlow(
  {
    name: 'aiAppointmentBookingFlow',
    inputSchema: AiAppointmentBookingInputSchema,
    outputSchema: AiAppointmentBookingOutputSchema,
  },
  async (inputWithCurrentDate: AiAppointmentBookingInput) => { // input here already includes currentDate
    const {output} = await prompt(inputWithCurrentDate);
    
    if (output) {
      return output;
    }
    // Fallback if LLM somehow doesn't produce valid output (should be rare with Zod)
    return {
      confirmation: "I'm sorry, I had trouble processing that request. Could you please try rephrasing?",
      isBooked: false,
      requiresMoreInfo: true,
    };
  }
);
