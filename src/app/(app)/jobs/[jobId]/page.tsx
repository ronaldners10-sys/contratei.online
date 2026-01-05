// src/app/(app)/jobs/[jobId]/page.tsx
import { DUMMY_JOBS, DUMMY_COMPANY } from "@/lib/placeholder-data";
import { notFound } from "next/navigation";
import { JobDetails } from "@/components/jobs/job-details";

export async function generateStaticParams() {
  return DUMMY_JOBS.map((job) => ({
    jobId: job.id,
  }));
}

type PageProps = {
  params: { jobId: string };
};

export default function JobDetailsPage({ params }: PageProps) {
  const job = DUMMY_JOBS.find((j) => j.id === params.jobId);
  const company = DUMMY_COMPANY; // Using dummy company for now

  if (!job) {
    notFound();
  }

  return <JobDetails job={job} company={company} />;
}
