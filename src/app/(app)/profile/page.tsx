"use client";

import { useUser } from "@/context/user-context";
import { CandidateProfileForm } from "@/components/profile/candidate-profile-form";
import { CompanyProfileForm } from "@/components/profile/company-profile-form";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
  const { user, loading } = useUser();

  if (loading) {
    return <Skeleton className="h-[500px] w-full" />;
  }

  if (!user) {
    return <p>Por favor, faça login para ver seu perfil.</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          {user.role === 'candidate' ? 'Meu Perfil' : 'Perfil da Empresa'}
        </h1>
        <p className="text-muted-foreground">
          Mantenha suas informações atualizadas.
        </p>
      </div>
      {user.role === 'candidate' ? (
        <CandidateProfileForm candidate={user} />
      ) : (
        <CompanyProfileForm company={user} />
      )}
    </div>
  );
}
