import { DUMMY_JOBS, DUMMY_CANDIDATES_FOR_JOB } from "@/lib/placeholder-data";
import { CandidateAnalysisClient } from "@/components/candidates/candidate-analysis-client";
import { Job } from "@/lib/types";

export async function generateStaticParams() {
  return DUMMY_JOBS.map((job) => ({
    jobId: job.id,
  }));
}

type PageProps = {
  params: { jobId: string };
};

export default function CandidateAnalysisPage({ params }: PageProps) {
  const job = DUMMY_JOBS.find(j => j.id === params.jobId) as Job;
  
  if (!job) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Vaga não encontrada</h1>
        <p className="text-muted-foreground">A vaga que você está procurando não existe ou foi removida.</p>
      </div>
    );
  }

  // Passing server-fetched data to the client component
  return (
    <CandidateAnalysisClient job={job} candidates={DUMMY_CANDIDATES_FOR_JOB} />
  );
}
