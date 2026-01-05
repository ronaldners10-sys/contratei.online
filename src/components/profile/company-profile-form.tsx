"use client";

import type { Company } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  company: Company;
};

export function CompanyProfileForm({ company }: Props) {
  return (
    <form className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações da Empresa</CardTitle>
          <CardDescription>Estes detalhes serão visíveis para os candidatos.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={company.avatarUrl} alt={company.companyName} />
              <AvatarFallback>{company.companyName.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button variant="outline" type="button">Alterar Logo</Button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company-name">Nome da Empresa</Label>
              <Input id="company-name" defaultValue={company.companyName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" type="url" defaultValue={company.website} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="about">Sobre a Empresa</Label>
            <Textarea id="about" rows={5} defaultValue={company.about} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Recrutador</CardTitle>
          <CardDescription>Seus dados de contato.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="recruiter-name">Seu Nome</Label>
              <Input id="recruiter-name" defaultValue={company.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recruiter-email">Seu Email</Label>
              <Input id="recruiter-email" type="email" defaultValue={company.email} />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button type="submit">Salvar Alterações</Button>
      </div>
    </form>
  );
}
