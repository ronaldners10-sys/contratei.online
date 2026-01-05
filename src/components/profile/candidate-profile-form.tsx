"use client";

import type { Candidate } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";

type Props = {
  candidate: Candidate;
};

export function CandidateProfileForm({ candidate }: Props) {
  return (
    <form className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
          <CardDescription>Seus dados básicos de identificação.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={candidate.avatarUrl} alt={candidate.name} />
              <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button variant="outline" type="button">Alterar Foto</Button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input id="name" defaultValue={candidate.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={candidate.email} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Título Profissional</Label>
            <Input id="title" placeholder="Ex: Desenvolvedor(a) Frontend Sênior" defaultValue={candidate.title} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Habilidades e Pretensões</CardTitle>
          <CardDescription>Destaque suas competências e informe sua expectativa salarial.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="skills">Habilidades (separadas por vírgula)</Label>
            <Textarea id="skills" defaultValue={candidate.skills.join(', ')} placeholder="Ex: React, Node.js, Liderança de Equipe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="salary">Pretensão Salarial (R$)</Label>
            <Input id="salary" type="number" placeholder="Ex: 8000" defaultValue={candidate.salaryExpectation} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Currículo</CardTitle>
          <CardDescription>Faça o upload do seu currículo em formato PDF ou DOCX.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center w-full">
            <Label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-muted">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Clique para fazer upload</span> ou arraste e solte</p>
                <p className="text-xs text-muted-foreground">PDF ou DOCX (MAX. 5MB)</p>
              </div>
              <Input id="dropzone-file" type="file" className="hidden" />
            </Label>
          </div> 
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit">Salvar Alterações</Button>
      </div>
    </form>
  );
}
