'use server';

/**
 * @fileOverview An AI agent for engaging in natural language conversation.
 *
 * - converse - A function that handles the natural language conversation process.
 * - ConverseInput - The input type for the converse function.
 * - ConverseOutput - The return type for the converse function.
 */

import { getAI } from '@/ai/genkit';
import {z} from 'genkit';

const ai = await getAI();

const ConverseInputSchema = z.object({
  message: z.string().describe('The user message to respond to.'),
});
export type ConverseInput = z.infer<typeof ConverseInputSchema>;

const ConverseOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user message.'),
});
export type ConverseOutput = z.infer<typeof ConverseOutputSchema>;

export async function converse(input: ConverseInput): Promise<ConverseOutput> {
  return converseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'conversePrompt',
  input: {schema: ConverseInputSchema},
  output: {schema: ConverseOutputSchema},
  prompt: `You are a friendly and helpful chatbot. Respond to the following user message in a natural and conversational way.\n\nUser message: {{{message}}}`,
});

const converseFlow = ai.defineFlow(
  {
    name: 'converseFlow',
    inputSchema: ConverseInputSchema,
    outputSchema: ConverseOutputSchema,
  },
  async (input: ConverseInput) => {
    const {output} = await prompt(input);
    return output!;
  }
);
