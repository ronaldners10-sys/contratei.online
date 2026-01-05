"use client";

import { useUser } from "@/context/user-context";
import { DUMMY_JOBS } from "@/lib/placeholder-data";
import { JobCard } from "@/components/jobs/job-card";
import { JobFilters } from "@/components/jobs/job-filters";
import { CompanyJobList } from "@/components/jobs/company-job-list";

export default function JobsPage() {
  const { user } = useUser();

  if (user?.role === 'company') {
    return <CompanyJobList />;
  }

  // Candidate View
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Encontre sua Próxima Oportunidade</h1>
        <p className="text-muted-foreground">
          Explore vagas que combinam com suas habilidades e experiência.
        </p>
      </div>
      <JobFilters />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {DUMMY_JOBS.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
