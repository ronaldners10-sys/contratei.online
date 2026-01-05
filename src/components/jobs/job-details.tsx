// src/components/jobs/job-details.tsx
"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Clock, Building, ExternalLink, CheckSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/user-context";
import type { Job, Company } from "@/lib/types";

type JobDetailsProps = {
  job: Job;
  company: Company;
};

export function JobDetails({ job, company }: JobDetailsProps) {
  const { toast } = useToast();
  const { user } = useUser();

  if (!job) {
    notFound();
  }

  const handleApply = () => {
    toast({
        title: "Sucesso!",
        description: `Você se candidatou para a vaga de ${job.title}.`,
    })
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Job Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col items-start gap-6 sm:flex-row">
            <Image
              src={job.companyLogoUrl}
              alt={`${job.companyName} logo`}
              width={80}
              height={80}
              className="rounded-lg border bg-card"
              data-ai-hint="company logo"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{job.title}</h1>
              <p className="text-lg text-muted-foreground">
                na <Link href="#" className="font-semibold text-primary hover:underline">{job.companyName}</Link>
              </p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-muted-foreground">
                 <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>{job.type}</span>
                </div>
                {job.salary && (
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{job.salary}</span>
                    </div>
                )}
              </div>
            </div>
            <div className="w-full shrink-0 sm:w-auto">
                {user?.role === 'candidate' && (
                    <Button size="lg" className="w-full" onClick={handleApply}>Candidatar-se Agora</Button>
                )}
                <p className="mt-2 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Postado {job.datePosted}
                </p>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-8 lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Descrição da Vaga</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                   <p>{job.description}</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><CheckSquare/> Requisitos</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {job.requirements.map(req => (
                            <Badge key={req} variant="secondary" className="text-sm">{req}</Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
        {/* Sidebar */}
        <div className="space-y-8 lg:col-span-1">
             <Card>
                <CardHeader className="flex-row items-center gap-4 space-y-0">
                   <Building className="h-8 w-8 text-muted-foreground"/>
                   <div>
                        <CardTitle>Sobre a {company.companyName}</CardTitle>
                        <CardDescription>{company.website}</CardDescription>
                   </div>
                </CardHeader>
                <CardContent className="space-y-4">
                     <p className="text-sm text-muted-foreground">{company.about}</p>
                     <Button variant="outline" className="w-full" asChild>
                         <Link href={company.website} target="_blank">
                             Visitar Website <ExternalLink className="ml-2"/>
                         </Link>
                     </Button>
                </CardContent>
             </Card>
        </div>
      </div>
    </div>
  );
}
