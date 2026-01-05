// src/app/(app)/settings/page.tsx
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas preferências de conta e notificações.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notificações por Email</CardTitle>
          <CardDescription>
            Escolha quais emails você deseja receber.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="new-opportunities" className="text-base">
                Novas Oportunidades
              </Label>
              <p className="text-sm text-muted-foreground">
                Receba emails sobre novas vagas que combinam com seu perfil.
              </p>
            </div>
            <Switch id="new-opportunities" defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="application-status" className="text-base">
                Atualizações de Candidatura
              </Label>
              <p className="text-sm text-muted-foreground">
                Seja notificado quando houver uma atualização no status de suas
                candidaturas.
              </p>
            </div>
            <Switch id="application-status" defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="newsletter" className="text-base">
                Newsletter
              </Label>
              <p className="text-sm text-muted-foreground">
                Receba dicas de carreira e notícias da plataforma.
              </p>
            </div>
            <Switch id="newsletter" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Conta</CardTitle>
            <CardDescription>Gerencie as configurações da sua conta.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                <h3 className="font-medium">Desativar conta</h3>
                <p className="text-sm text-muted-foreground mt-1">
                    Isso desativará temporariamente seu perfil. Você poderá reativá-lo a qualquer momento.
                </p>
                <Button variant="outline" className="mt-3">Desativar</Button>
            </div>
             <div>
                <h3 className="font-medium text-destructive">Excluir conta</h3>
                <p className="text-sm text-muted-foreground mt-1">
                    Isso excluirá permanentemente sua conta e todos os seus dados. Esta ação não pode ser desfeita.
                </p>
                <Button variant="destructive" className="mt-3">Excluir minha conta</Button>
            </div>
        </CardContent>
      </Card>

       <div className="flex justify-end">
        <Button>Salvar Alterações</Button>
      </div>
    </div>
  );
}
