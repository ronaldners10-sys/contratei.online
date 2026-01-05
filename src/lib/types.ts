export type User = {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  role: 'candidate' | 'company';
};

export type Candidate = User & {
  role: 'candidate';
  title: string;
  skills: string[];
  experience: Experience[];
  salaryExpectation?: number;
  resumeUrl?: string;
};

export type Company = User & {
  role: 'company';
  companyName: string;
  website: string;
  about: string;
};

export type Experience = {
  title: string;
  company: string;
  period: string;
  description: string;
};

export type Job = {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyLogoUrl: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  salary?: string;
  description: string;
  requirements: string[];
  datePosted: string;
};

export type Application = {
  id: string;
  jobId: string;
  candidateId: string;
  dateApplied: string;
  status: 'Pending' | 'Reviewed' | 'Interviewing' | 'Offered' | 'Rejected';
};

export type CandidateAnalysisResult = {
  candidateResume: string;
  compatibilityScore: number;
  analysis: string;
  candidate?: Candidate;
};
