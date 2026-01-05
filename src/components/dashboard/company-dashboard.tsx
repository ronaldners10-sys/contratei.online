"use client";

import { StatsCard } from "./stats-card";
import { Briefcase, Users, BarChart, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis } from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DUMMY_CANDIDATES_FOR_JOB } from "@/lib/placeholder-data";

const chartData = [
  { date: "Seg", applications: 5 },
  { date: "Ter", applications: 8 },
  { date: "Qua", applications: 12 },
  { date: "Qui", applications: 7 },
  { date: "Sex", applications: 15 },
  { date: "Sab", applications: 3 },
  { date: "Dom", applications: 2 },
];
const chartConfig = {
  applications: {
    label: "Candidaturas",
    color: "hsl(var(--primary))",
  },
};

export function CompanyDashboard() {
  const recentApplicants = DUMMY_CANDIDATES_FOR_JOB.slice(0, 5);

  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold">Dashboard da Empresa</h1>
        <p className="text-muted-foreground">Gerencie suas vagas e candidatos.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Vagas Ativas" value="4" description="2 novas esta semana" Icon={Briefcase} />
        <StatsCard title="Novos Candidatos" value="72" description="+15 na última 24h" Icon={Users} />
        <StatsCard title="Taxa de Match (Média)" value="78%" description="Média de compatibilidade por IA" Icon={BarChart} />
        <StatsCard title="Contratações" value="3" description="Neste trimestre" Icon={CheckCircle} />
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Candidaturas na Última Semana</CardTitle>
            <CardDescription>Volume de novas candidaturas recebidas.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <RechartsBarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="applications" fill="var(--color-applications)" radius={4} />
              </RechartsBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Candidatos Recentes</CardTitle>
            <CardDescription>Os últimos profissionais que se candidataram às suas vagas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentApplicants.map((candidate) => (
              <div key={candidate.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={candidate.avatarUrl} alt={candidate.name} />
                    <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{candidate.name}</p>
                    <p className="text-sm text-muted-foreground">{candidate.title}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/candidates/profile/${candidate.id}`}>Ver Perfil</Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
