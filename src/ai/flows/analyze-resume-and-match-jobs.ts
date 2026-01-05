'use server';
/**
 * @fileOverview This file defines a Genkit flow for analyzing a candidate's resume and recommending matching jobs.
 *
 * analyzeResumeAndMatchJobs - The main function to trigger the resume analysis and job matching process.
 * AnalyzeResumeAndMatchJobsInput - The input type for the analyzeResumeAndMatchJobs function.
 * AnalyzeResumeAndMatchJobsOutput - The output type, containing job recommendations.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeResumeAndMatchJobsInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      "The candidate's resume as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  jobPostings: z.array(
    z.object({
      jobId: z.string().describe('The unique identifier for the job posting.'),
      jobDescription: z.string().describe('The detailed description of the job.'),
    })
  ).describe('A list of available job postings with their descriptions.'),
});
export type AnalyzeResumeAndMatchJobsInput = z.infer<typeof AnalyzeResumeAndMatchJobsInputSchema>;

const AnalyzeResumeAndMatchJobsOutputSchema = z.object({
  jobRecommendations: z.array(
    z.object({
      jobId: z.string().describe('The ID of the recommended job.'),
      matchScore: z.number().describe('A score indicating how well the resume matches the job (0-1).'),
      reasoning: z.string().describe('Explanation of why the job was recommended.'),
    })
  ).describe('A list of recommended jobs based on the resume analysis.'),
});
export type AnalyzeResumeAndMatchJobsOutput = z.infer<typeof AnalyzeResumeAndMatchJobsOutputSchema>;

export async function analyzeResumeAndMatchJobs(
  input: AnalyzeResumeAndMatchJobsInput
): Promise<AnalyzeResumeAndMatchJobsOutput> {
  return analyzeResumeAndMatchJobsFlow(input);
}

const analyzeResumeAndMatchJobsPrompt = ai.definePrompt({
  name: 'analyzeResumeAndMatchJobsPrompt',
  input: {schema: AnalyzeResumeAndMatchJobsInputSchema},
  output: {schema: AnalyzeResumeAndMatchJobsOutputSchema},
  prompt: `You are an AI-powered resume analyzer and job matching expert. Analyze the candidate's resume and provide job recommendations from the provided job postings.

Resume:
{{media url=resumeDataUri}}

Job Postings:
{{#each jobPostings}}
Job ID: {{{jobId}}}
Description: {{{jobDescription}}}
{{/each}}

Provide a match score (0-1) and reasoning for each recommended job.

Output in the following JSON format:
{{json jobRecommendations}}`,
});

const analyzeResumeAndMatchJobsFlow = ai.defineFlow(
  {
    name: 'analyzeResumeAndMatchJobsFlow',
    inputSchema: AnalyzeResumeAndMatchJobsInputSchema,
    outputSchema: AnalyzeResumeAndMatchJobsOutputSchema,
  },
  async input => {
    const {output} = await analyzeResumeAndMatchJobsPrompt(input);
    return output!;
  }
);
