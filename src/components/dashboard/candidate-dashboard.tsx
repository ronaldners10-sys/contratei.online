"use client";

import { StatsCard } from "@/components/dashboard/stats-card";
import { Briefcase, Eye, FileText, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DUMMY_APPLICATIONS, DUMMY_JOBS } from "@/lib/placeholder-data";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { JobCard } from "../jobs/job-card";

export function CandidateDashboard() {
  const recommendedJobs = DUMMY_JOBS.slice(0, 3);
  const recentApplications = DUMMY_APPLICATIONS;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Seu Dashboard, Ana</h1>
        <p className="text-muted-foreground">Aqui está um resumo da sua atividade recente.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Vagas Recomendadas"
          value="12"
          description="+3 novas esta semana"
          Icon={Briefcase}
        />
        <StatsCard
          title="Candidaturas Ativas"
          value={recentApplications.length.toString()}
          description="Acompanhe o status"
          Icon={FileText}
        />
        <StatsCard
          title="Visualizações no Perfil"
          value="48"
          description="+15% que no mês passado"
          Icon={Eye}
        />
        <StatsCard
          title="Mensagens Não Lidas"
          value="3"
          description="De recrutadores"
          Icon={MessageSquare}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Vagas Recomendadas para Você</CardTitle>
            <CardDescription>Com base no seu perfil e habilidades, encontramos estas oportunidades.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
            <Button variant="outline" className="w-full" asChild>
                <Link href="/jobs">Ver todas as recomendações</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Candidaturas Recentes</CardTitle>
            <CardDescription>Acompanhe o status de suas últimas candidaturas.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentApplications.map((app) => {
                 const job = DUMMY_JOBS.find(j => j.id === app.jobId);
                 if(!job) return null;
                 return (
                    <li key={app.id} className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold">{job.title}</p>
                            <p className="text-sm text-muted-foreground">{job.companyName}</p>
                        </div>
                        <Badge variant={app.status === 'Reviewed' ? 'default' : 'secondary'} className="bg-blue-100 text-blue-800">{app.status}</Badge>
                    </li>
                 )
              })}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
