"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/context/user-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Linkedin, Mail } from 'lucide-react';

export function AuthForms() {
  const { loginAs } = useUser();
  const [role, setRole] = useState<'candidate' | 'company'>('candidate');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(role);
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-background px-4 py-12">
      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Entrar</TabsTrigger>
          <TabsTrigger value="signup">Criar Conta</TabsTrigger>
        </TabsList>

        {/* Login Tab */}
        <TabsContent value="login">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Bem-vindo de volta!</CardTitle>
              <CardDescription>Faça login para continuar.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-login">Email</Label>
                  <Input id="email-login" type="email" placeholder="seu@email.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-login">Senha</Label>
                  <Input id="password-login" type="password" required />
                </div>
                <div className="space-y-2">
                    <Label>Você é um:</Label>
                    <Tabs defaultValue={role} onValueChange={(value) => setRole(value as 'candidate' | 'company')} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="candidate">Candidato</TabsTrigger>
                            <TabsTrigger value="company">Empresa</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                <Button type="submit" className="w-full">Entrar</Button>
              </form>
              <div className="my-4 flex items-center">
                <div className="flex-grow border-t border-muted" />
                <span className="mx-4 flex-shrink text-xs uppercase text-muted-foreground">ou continue com</span>
                <div className="flex-grow border-t border-muted" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline"><Mail className="mr-2 h-4 w-4" /> Google</Button>
                <Button variant="outline"><Linkedin className="mr-2 h-4 w-4" /> LinkedIn</Button>
              </div>
            </CardContent>
            <CardFooter className="justify-center text-sm">
              <p>Não tem uma conta? <TabsTrigger value="signup" asChild><Link href="#" className="font-semibold text-primary underline-offset-4 hover:underline">Crie uma</Link></TabsTrigger></p>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Signup Tab */}
        <TabsContent value="signup">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Crie sua conta</CardTitle>
              <CardDescription>É rápido e fácil. Comece agora!</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                 <div className="space-y-2">
                  <Label htmlFor="name-signup">Nome Completo</Label>
                  <Input id="name-signup" type="text" placeholder="Seu nome" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input id="email-signup" type="email" placeholder="seu@email.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Senha</Label>
                  <Input id="password-signup" type="password" required />
                </div>
                <div className="space-y-2">
                    <Label>Quero me cadastrar como:</Label>
                    <Tabs defaultValue={role} onValueChange={(value) => setRole(value as 'candidate' | 'company')} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="candidate">Candidato</TabsTrigger>
                            <TabsTrigger value="company">Empresa</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                <Button type="submit" className="w-full">Criar Conta</Button>
              </form>
               <div className="my-4 flex items-center">
                <div className="flex-grow border-t border-muted" />
                <span className="mx-4 flex-shrink text-xs uppercase text-muted-foreground">ou cadastre-se com</span>
                <div className="flex-grow border-t border-muted" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline"><Mail className="mr-2 h-4 w-4" /> Google</Button>
                <Button variant="outline"><Linkedin className="mr-2 h-4 w-4" /> LinkedIn</Button>
              </div>
            </CardContent>
             <CardFooter className="justify-center text-sm">
              <p>Já tem uma conta? <TabsTrigger value="login" asChild><Link href="#" className="font-semibold text-primary underline-offset-4 hover:underline">Faça login</Link></TabsTrigger></p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
