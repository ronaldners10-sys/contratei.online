'use server';
/**
 * @fileOverview AI-powered candidate filtering flow based on compatibility score.
 *
 * - filterCandidatesByAIScore - A function that filters candidates based on their AI compatibility score with a job posting.
 * - FilterCandidatesByAIScoreInput - The input type for the filterCandidatesByAIScore function.
 * - FilterCandidatesByAIScoreOutput - The return type for the filterCandidatesByAIScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FilterCandidatesByAIScoreInputSchema = z.object({
  jobDescription: z.string().describe('The detailed description of the job posting.'),
  candidateResumes: z.array(z.string()).describe('An array of candidate resumes, each as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'),
  keywords: z.string().describe('Keywords to look for in the resumes.'),
});
export type FilterCandidatesByAIScoreInput = z.infer<
  typeof FilterCandidatesByAIScoreInputSchema
>;

const FilterCandidatesByAIScoreOutputSchema = z.array(z.object({
  candidateResume: z.string().describe('The candidate resume (data URI).'),
  compatibilityScore: z.number().describe('The AI-generated compatibility score (0-1).'),
  analysis: z.string().describe('The AI analysis of the resume in relation to the job description.'),
}));
export type FilterCandidatesByAIScoreOutput = z.infer<
  typeof FilterCandidatesByAIScoreOutputSchema
>;

export async function filterCandidatesByAIScore(
  input: FilterCandidatesByAIScoreInput
): Promise<FilterCandidatesByAIScoreOutput> {
  return filterCandidatesByAIScoreFlow(input);
}

const analyzeResumeTool = ai.defineTool({
  name: 'analyzeResume',
  description: 'Analyzes a resume to determine its compatibility with a job description and identifies keywords.',
  inputSchema: z.object({
    jobDescription: z.string().describe('The detailed description of the job posting.'),
    candidateResume: z.string().describe('The candidate resume as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'),
    keywords: z.string().describe('Keywords to look for in the resume.'),
  }),
  outputSchema: z.object({
    compatibilityScore: z.number().describe('The AI-generated compatibility score (0-1).'),
    analysis: z.string().describe('The AI analysis of the resume in relation to the job description.'),
  }),
},
async (input) => {
  const {jobDescription, candidateResume, keywords} = input;
  const promptResult = await analyzeResumePrompt({
    jobDescription,
    candidateResume,
    keywords,
  });
  return {
    compatibilityScore: promptResult.compatibilityScore,
    analysis: promptResult.analysis
  };
});

const analyzeResumePrompt = ai.definePrompt({
  name: 'analyzeResumePrompt',
  input: {
    schema: z.object({
      jobDescription: z.string().describe('The detailed description of the job posting.'),
      candidateResume: z.string().describe('The candidate resume as a data URI.'),
      keywords: z.string().describe('Keywords to look for in the resume.'),
    }),
  },
  output: {
    schema: z.object({
      compatibilityScore: z.number().describe('The AI-generated compatibility score (0-1).'),
      analysis: z.string().describe('The AI analysis of the resume in relation to the job description.'),
    }),
  },
  prompt: `You are an AI resume analyzer. Analyze the candidate's resume to determine its compatibility with the job description. Also look for the following keywords in the resume: {{{keywords}}}.

Job Description: {{{jobDescription}}}

Resume: {{media url=candidateResume}}

Provide a compatibility score between 0 and 1 (where 1 is a perfect match) and an analysis of the resume in relation to the job description.

Output in JSON format:
{
  "compatibilityScore": 0.75,
  "analysis": "The candidate has relevant experience in software development and possesses strong communication skills. They are a good fit for the job."
}`,
});

const filterCandidatesByAIScoreFlow = ai.defineFlow(
  {
    name: 'filterCandidatesByAIScoreFlow',
    inputSchema: FilterCandidatesByAIScoreInputSchema,
    outputSchema: FilterCandidatesByAIScoreOutputSchema,
  },
  async input => {
    const {candidateResumes, jobDescription, keywords} = input;

    const analysisResults = await Promise.all(
      candidateResumes.map(async candidateResume => {
        const {compatibilityScore, analysis} = await analyzeResumeTool({
          jobDescription: jobDescription,
          candidateResume: candidateResume,
          keywords: keywords,
        });

        return {
          candidateResume: candidateResume,
          compatibilityScore: compatibilityScore,
          analysis: analysis,
        };
      })
    );

    return analysisResults;
  }
);

