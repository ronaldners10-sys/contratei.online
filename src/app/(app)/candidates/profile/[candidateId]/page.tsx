// src/app/(app)/candidates/profile/[candidateId]/page.tsx
import { DUMMY_CANDIDATES_FOR_JOB } from "@/lib/placeholder-data";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Linkedin, ExternalLink, Briefcase, DollarSign, BrainCircuit, FileDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export async function generateStaticParams() {
  return DUMMY_CANDIDATES_FOR_JOB.map((candidate) => ({
    candidateId: candidate.id,
  }));
}


type PageProps = {
  params: { candidateId: string };
};

export default function CandidateProfilePage({ params }: PageProps) {
  const candidate = DUMMY_CANDIDATES_FOR_JOB.find(
    (c) => c.id === params.candidateId
  );

  if (!candidate) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <Card>
        <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
            <Avatar className="h-28 w-28 border-4 border-primary">
                <AvatarImage src={candidate.avatarUrl} alt={candidate.name} />
                <AvatarFallback className="text-4xl">
                {candidate.name.charAt(0)}
                </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
                <h1 className="text-3xl font-bold">{candidate.name}</h1>
                <p className="text-xl text-muted-foreground">{candidate.title}</p>
                <div className="flex flex-wrap justify-center gap-2 pt-2 md:justify-start">
                    <Button size="sm" variant="outline"><Mail className="mr-2"/> Email</Button>
                    <Button size="sm" variant="outline"><Linkedin className="mr-2"/> LinkedIn</Button>
                    <Button size="sm" variant="default" asChild>
                        <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer">
                            <FileDown className="mr-2"/> Baixar Currículo
                        </a>
                    </Button>
                </div>
            </div>
            </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-8 lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BrainCircuit/> Habilidades</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {candidate.skills.map(skill => (
                            <Badge key={skill} variant="secondary" className="text-sm">{skill}</Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Briefcase/> Experiência Profissional</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {candidate.experience.map((exp, index) => (
                        <div key={index} className="relative pl-6 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-border">
                             <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary"></div>
                             <p className="font-semibold text-lg">{exp.title}</p>
                             <p className="text-muted-foreground">{exp.company}</p>
                             <p className="text-sm text-muted-foreground">{exp.period}</p>
                             <p className="mt-2">{exp.description}</p>
                        </div>
                    ))}
                    {candidate.experience.length === 0 && (
                        <p className="text-muted-foreground">Nenhuma experiência profissional informada.</p>
                    )}
                </CardContent>
            </Card>
        </div>
        {/* Sidebar */}
        <div className="space-y-8 lg:col-span-1">
             <Card>
                <CardHeader>
                    <CardTitle>Informações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm">{candidate.email}</span>
                     </div>
                     <Separator />
                     <div className="flex items-center gap-3">
                        <DollarSign className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm">{candidate.salaryExpectation ? `Pretensão Salarial: R$ ${candidate.salaryExpectation}` : 'Pretensão não informada'}</span>
                     </div>
                </CardContent>
             </Card>
        </div>
      </div>
    </div>
  );
}
