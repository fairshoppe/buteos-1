'use server';

/**
 * @fileOverview Provides company information to the user, using a tool to fetch data.
 *
 * - companyInfoChat - A function that allows users to ask questions about the company.
 * - CompanyInfoChatInput - The input type for the companyInfoChat function.
 * - CompanyInfoChatOutput - The return type for the companyInfoChat function.
 */

import { getAI } from '@/ai/genkit';
import {z} from 'genkit';
import { getCompanyInfoTool } from '@/ai/tools/companyDataTool';

const ai = await getAI();

const CompanyInfoChatInputSchema = z.object({
  query: z.string().describe('The user query about the company.'),
});
export type CompanyInfoChatInput = z.infer<typeof CompanyInfoChatInputSchema>;

const CompanyInfoChatOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query, based on retrieved company data or general knowledge if the tool is not applicable.'),
});
export type CompanyInfoChatOutput = z.infer<typeof CompanyInfoChatOutputSchema>;

export async function companyInfoChat(input: CompanyInfoChatInput): Promise<CompanyInfoChatOutput> {
  return companyInfoChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'companyInfoChatPrompt',
  input: {schema: CompanyInfoChatInputSchema},
  output: {schema: CompanyInfoChatOutputSchema},
  tools: [getCompanyInfoTool],
  prompt: `You are a helpful AI assistant for ButeoBot Inc. Your goal is to answer user questions about the company.
User's query: "{{{query}}}"

1.  First, determine if the user's query can be answered by specific company data (like services, history, contact info, products, office hours).
2.  If yes, use the 'getCompanyInfoTool' to retrieve the relevant information. Formulate your 'topic' for the tool carefully based on the user's query. For example, if the user asks "What services do you offer?", the topic could be "services". If they ask "What are your office hours?", the topic could be "officeHours".
3.  Based on the tool's output (or if the tool is not applicable or doesn't find specific data), formulate a helpful and natural-sounding answer to the user.
4.  If the tool returns an error or no specific data, try to answer based on general knowledge about a company like ButeoBot or state that you couldn't find specific details for that query but can provide general information.
5.  Do not just repeat the tool's raw output; integrate it into a conversational response.
Your final response should be in the 'answer' field.
`,
});

const companyInfoChatFlow = ai.defineFlow(
  {
    name: 'companyInfoChatFlow',
    inputSchema: CompanyInfoChatInputSchema,
    outputSchema: CompanyInfoChatOutputSchema,
  },
  async (input: CompanyInfoChatInput) => {
    const {output} = await prompt(input);
    
    if (output) {
      return output;
    }
    // Fallback
    return {
      answer: "I'm sorry, I couldn't retrieve that information at the moment. ButeoBot Inc. specializes in AI solutions. How else can I help?",
    };
  }
);
