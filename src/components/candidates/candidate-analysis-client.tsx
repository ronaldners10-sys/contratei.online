"use client";

import { useState } from "react";
import type { Job, Candidate, CandidateAnalysisResult } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { filterCandidatesByAIScore } from "@/ai/flows/filter-candidates-by-ai-score";
import { Progress } from "@/components/ui/progress";
import { BrainCircuit, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

type Props = {
  job: Job;
  candidates: Candidate[];
};

// Mock function to simulate reading a file and converting to data URI
async function fileToDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Mock PDF file for demonstration. It's a simple text file, but we give it a PDF extension.
// The AI model is smart enough to process the text content.
const createMockPdf = (candidate: Omit<Candidate, 'role' | 'experience' | 'salaryExpectation' | 'resumeUrl'>) => {
  const resumeContent = `
    Name: ${candidate.name}
    Title: ${candidate.title}
    Skills: ${candidate.skills.join(', ')}
  `;
  return new File([resumeContent], "mock_resume.pdf", { type: "application/pdf" });
};


export function CandidateAnalysisClient({ job, candidates }: Props) {
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [analysisResults, setAnalysisResults] = useState<CandidateAnalysisResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSelectCandidate = (candidateId: string) => {
    setSelectedCandidates(prev =>
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedCandidates(checked ? candidates.map(c => c.id) : []);
  }

  const handleRunAnalysis = async () => {
    if (selectedCandidates.length === 0) {
      toast({
        title: "Nenhum candidato selecionado",
        description: "Por favor, selecione pelo menos um candidato para analisar.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setAnalysisResults([]);

    try {
      const selectedCandidateObjects = candidates.filter(c => selectedCandidates.includes(c.id));

      const candidateResumes = await Promise.all(
        selectedCandidateObjects.map(async (candidate) => {
           const mockFile = createMockPdf(candidate);
           const dataUri = await fileToDataUri(mockFile);
           return dataUri;
        })
      );
      
      const results = await filterCandidatesByAIScore({
        jobDescription: job.description,
        candidateResumes: candidateResumes,
        keywords: job.requirements.join(", "),
      });

      // Map results back to candidates
      const mappedResults = results.map((result, index) => {
        // The results should come back in the same order.
        const candidateId = selectedCandidates[index];
        const candidate = candidates.find(c => c.id === candidateId);
        return { ...result, candidate };
      });

      setAnalysisResults(mappedResults);

    } catch (error) {
      console.error("AI analysis failed:", error);
      toast({
        title: "Erro na Análise",
        description: "Ocorreu um erro ao processar a análise de IA. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const getScoreColor = (score: number) => {
    if (score > 0.75) return "bg-green-500";
    if (score > 0.5) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Análise de Candidatos</h1>
        <p className="text-muted-foreground">Para a vaga de: <span className="font-semibold text-primary">{job.title}</span></p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Lista de Candidatos</CardTitle>
                <CardDescription>Selecione os candidatos que deseja analisar com IA.</CardDescription>
              </div>
              <Button onClick={handleRunAnalysis} disabled={isLoading || selectedCandidates.length === 0}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <BrainCircuit className="mr-2 h-4 w-4" />
                )}
                Analisar com IA
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                       <Checkbox
                        checked={selectedCandidates.length === candidates.length && candidates.length > 0}
                        onCheckedChange={handleSelectAll}
                        aria-label="Selecionar todos"
                      />
                    </TableHead>
                    <TableHead>Candidato</TableHead>
                    <TableHead className="hidden md:table-cell">Habilidades Principais</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {candidates.map(candidate => (
                    <TableRow key={candidate.id} data-state={selectedCandidates.includes(candidate.id) && "selected"}>
                      <TableCell>
                        <Checkbox
                          checked={selectedCandidates.includes(candidate.id)}
                          onCheckedChange={() => handleSelectCandidate(candidate.id)}
                          aria-label={`Selecionar ${candidate.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={candidate.avatarUrl} alt={candidate.name} />
                            <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{candidate.name}</div>
                            <div className="text-sm text-muted-foreground">{candidate.title}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 3).map(skill => (
                            <Badge key={skill} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Resultados da Análise de IA</CardTitle>
              <CardDescription>Compatibilidade dos candidatos selecionados.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && (
                 <div className="flex flex-col items-center justify-center space-y-4 py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-muted-foreground">Analisando currículos...</p>
                 </div>
              )}
              {!isLoading && analysisResults.length === 0 && (
                <Alert>
                  <BrainCircuit className="h-4 w-4" />
                  <AlertTitle>Pronto para analisar</AlertTitle>
                  <AlertDescription>
                    Selecione os candidatos e clique em "Analisar com IA" para ver os resultados.
                  </AlertDescription>
                </Alert>
              )}
              {!isLoading && analysisResults.length > 0 && (
                <div className="space-y-4">
                  {analysisResults.sort((a, b) => b.compatibilityScore - a.compatibilityScore).map(result => (
                    <div key={result.candidate?.id}>
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-sm">{result.candidate?.name}</span>
                            <span className="font-semibold text-sm">{Math.round(result.compatibilityScore * 100)}%</span>
                        </div>
                         <Progress value={result.compatibilityScore * 100} className="h-2" />
                         <p className="text-xs text-muted-foreground mt-2">{result.analysis}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
