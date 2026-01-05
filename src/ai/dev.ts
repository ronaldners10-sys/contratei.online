import { config } from 'dotenv';
config();

import '@/ai/flows/generate-job-description-suggestions.ts';
import '@/ai/flows/filter-candidates-by-ai-score.ts';
import '@/ai/flows/analyze-resume-and-match-jobs.ts';