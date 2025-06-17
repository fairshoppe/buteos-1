'use server';
/**
 * @fileOverview A flow that routes user inquiries to the appropriate specialized flow
 * and optionally sends an email summary of the interaction.
 *
 * - routeInquiry - A function that classifies user input and routes to the correct flow.
 * - RouteInquiryInput - The input type for the routeInquiry function.
 * - RouteInquiryOutput - The return type for the routeInquiry function.
 */

import { getAI } from '@/ai/genkit';
import {z} from 'genkit';
import type { CompanyInfoChatInput, CompanyInfoChatOutput } from './company-info-chat';
import { companyInfoChat } from './company-info-chat';
import type { ConverseInput, ConverseOutput } from './natural-language-conversation';
import { converse } from './natural-language-conversation';
import type { AiAppointmentBookingInput, AiAppointmentBookingOutput } from './ai-appointment-booking';
import { aiAppointmentBooking } from './ai-appointment-booking';
import type { ChatMode } from '@/types';
import { sendConversationSummaryTool } from '@/ai/tools/emailTool'; // Import the email tool

const ai = await getAI();

const RouteInquiryInputSchema = z.object({
  userInput: z.string().describe('The user input to be classified and routed.'),
  userEmail: z.string().optional().describe("The user's email address, if available and they've consented to receive summaries."),
  userName: z.string().optional().describe("The user's name, if known."),
});
export type RouteInquiryInput = z.infer<typeof RouteInquiryInputSchema>;

const RouteInquiryOutputSchema = z.object({
  responseText: z.string().describe('The final response to the user.'),
  determinedMode: z.enum(['info', 'chat', 'booking']).describe('The mode determined by the AI.'),
});
export type RouteInquiryOutput = z.infer<typeof RouteInquiryOutputSchema>;

// Internal schema for the classification step
const InquiryClassificationSchema = z.object({
  determinedMode: z.enum(['info', 'chat', 'booking', 'unknown']) // Added 'unknown'
    .describe('The classified type of user inquiry: "info" for company information, "chat" for general conversation, "booking" for appointment requests, or "unknown" if unclear.'),
});

export async function routeInquiry(input: RouteInquiryInput): Promise<RouteInquiryOutput> {
  return inquiryRouterFlow(input);
}

const classificationPrompt = ai.definePrompt({
  name: 'inquiryClassificationPrompt',
  input: { schema: z.object({ userInput: RouteInquiryInputSchema.shape.userInput }) }, // Only pass userInput for classification
  output: { schema: InquiryClassificationSchema },
  prompt: `You are an expert at classifying user intentions for a chatbot. Classify the following user input into one of four categories:
- "info": If the user is asking for company information, its services, products, history, contact details, office hours etc.
- "booking": If the user is trying to book, schedule, modify, or inquire about an appointment or availability. This includes asking "Are you free tomorrow?".
- "chat": For all other general conversation, greetings, small talk, or inquiries not clearly covered by "info" or "booking".
- "unknown": If the intent is very unclear or ambiguous.

User Input: {{{userInput}}}

Return ONLY the determinedMode.`,
});

const inquiryRouterFlow = ai.defineFlow(
  {
    name: 'inquiryRouterFlow',
    inputSchema: RouteInquiryInputSchema,
    outputSchema: RouteInquiryOutputSchema,
    // Make the email tool available to this flow if we wanted the LLM to decide to use it.
    // However, for "email at the end of every conversation", we'll call it programmatically.
    // tools: [sendConversationSummaryTool], 
  },
  async (flowInput: RouteInquiryInput) => {
    const {output: classificationOutput} = await classificationPrompt({userInput: flowInput.userInput});
    
    let determinedMode: ChatMode | 'unknown' = 'chat'; // Default to chat
    if (classificationOutput) {
      determinedMode = classificationOutput.determinedMode;
    }
     if (determinedMode === 'unknown') {
        determinedMode = 'chat'; // Treat unknown as chat for now
    }


    let responseText = "Sorry, I couldn't process that.";
    let finalDeterminedMode: ChatMode = determinedMode as ChatMode; // Cast here after handling unknown

    switch (determinedMode) {
      case 'info':
        const infoInput: CompanyInfoChatInput = { query: flowInput.userInput };
        const infoOutput: CompanyInfoChatOutput = await companyInfoChat(infoInput);
        responseText = infoOutput.answer;
        finalDeterminedMode = 'info';
        break;
      case 'chat':
        const converseInput: ConverseInput = { message: flowInput.userInput };
        const converseOutput: ConverseOutput = await converse(converseInput);
        responseText = converseOutput.response;
        finalDeterminedMode = 'chat';
        break;
      case 'booking':
        const bookingInput: AiAppointmentBookingInput = { 
          userInput: flowInput.userInput,
          currentDate: new Date().toISOString() // Pass current date for booking flow
        };
        const bookingOutput: AiAppointmentBookingOutput = await aiAppointmentBooking(bookingInput);
        responseText = bookingOutput.confirmation;
        finalDeterminedMode = 'booking';
        break;
      // No default needed due to 'unknown' being handled and type casting
    }

    // After getting the response, send an email summary (fire-and-forget)
    // In a real app, you might want to only send email if userEmail is provided/consented
    // For now, it will use a default if userEmail is not in flowInput
    try {
      console.log(`Preparing to send email summary for mode: ${finalDeterminedMode}`);
      await sendConversationSummaryTool({
        userInput: flowInput.userInput,
        botResponse: responseText,
        userEmail: flowInput.userEmail,
        userName: flowInput.userName,
        conversationTopic: finalDeterminedMode,
      });
      console.log('Email summary tool call initiated.');
    } catch (emailError) {
      console.error("Failed to send email summary:", emailError);
      // Do not let email failure block the chat response
    }

    return { responseText, determinedMode: finalDeterminedMode };
  }
);
