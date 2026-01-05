"use client";

import { useUser } from "@/context/user-context";
import { CandidateDashboard } from "@/components/dashboard/candidate-dashboard";
import { CompanyDashboard } from "@/components/dashboard/company-dashboard";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/4" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Skeleton className="h-80" />
            <Skeleton className="h-80" />
        </div>
      </div>
    )
  }

  if (!user) {
    return null; // Or a message encouraging them to log in
  }

  return user.role === 'candidate' ? <CandidateDashboard /> : <CompanyDashboard />;
}
