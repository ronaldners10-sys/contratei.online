// src/ai/flows/generate-job-description-suggestions.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating job description suggestions.
 *
 * It takes a job description as input and returns suggestions for improvement using the Google Gemini API.
 *
 * @interface GenerateJobDescriptionSuggestionsInput - The input schema for the generateJobDescriptionSuggestions function.
 * @interface GenerateJobDescriptionSuggestionsOutput - The output schema for the generateJobDescriptionSuggestions function.
 * @function generateJobDescriptionSuggestions - The main function to generate job description suggestions.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateJobDescriptionSuggestionsInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The job description to generate suggestions for.'),
});
export type GenerateJobDescriptionSuggestionsInput = z.infer<
  typeof GenerateJobDescriptionSuggestionsInputSchema
>;

const GenerateJobDescriptionSuggestionsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe(
      'Suggestions for improving the job description to attract more qualified candidates.'
    ),
});
export type GenerateJobDescriptionSuggestionsOutput = z.infer<
  typeof GenerateJobDescriptionSuggestionsOutputSchema
>;

export async function generateJobDescriptionSuggestions(
  input: GenerateJobDescriptionSuggestionsInput
): Promise<GenerateJobDescriptionSuggestionsOutput> {
  return generateJobDescriptionSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateJobDescriptionSuggestionsPrompt',
  input: {schema: GenerateJobDescriptionSuggestionsInputSchema},
  output: {schema: GenerateJobDescriptionSuggestionsOutputSchema},
  prompt: `You are an expert in recruitment and job market analysis.

You will be provided with a job description, and your task is to provide suggestions for improving it to attract more qualified candidates.

Consider the following aspects:
- Clarity and conciseness of the description
- Inclusion of relevant keywords
- Attractiveness of the description to potential candidates
- Alignment with current job market trends

Job Description: {{{jobDescription}}}

Suggestions:
`,
});

const generateJobDescriptionSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateJobDescriptionSuggestionsFlow',
    inputSchema: GenerateJobDescriptionSuggestionsInputSchema,
    outputSchema: GenerateJobDescriptionSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
