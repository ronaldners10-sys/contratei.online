// src/app/(app)/jobs/new/page.tsx
'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { DUMMY_JOBS } from "@/lib/placeholder-data";
import { useUser } from "@/context/user-context";

const formSchema = z.object({
  title: z.string().min(5, "O título deve ter pelo menos 5 caracteres."),
  location: z.string().min(2, "A localização é obrigatória."),
  type: z.enum(["Full-time", "Part-time", "Contract", "Internship"]),
  salary: z.string().optional(),
  description: z.string().min(20, "A descrição deve ter pelo menos 20 caracteres."),
  requirements: z.string().min(3, "Informe ao menos um requisito."),
})

export default function NewJobPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      type: "Full-time",
      salary: "",
      description: "",
      requirements: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would be an API call.
    // Here, we just add to our in-memory DUMMY_JOBS array.
    const newJob = {
        id: `job${Date.now()}`,
        title: values.title,
        companyId: user?.id || 'comp1',
        companyName: user?.role === 'company' ? user.companyName : "Minha Empresa",
        companyLogoUrl: user?.avatarUrl || 'https://picsum.photos/seed/logo-new/200/200',
        location: values.location,
        type: values.type,
        salary: values.salary,
        description: values.description,
        requirements: values.requirements.split(',').map(r => r.trim()),
        datePosted: 'agora mesmo',
    }

    DUMMY_JOBS.unshift(newJob);

    toast({
        title: "Vaga criada com sucesso!",
        description: `A vaga "${values.title}" foi publicada.`,
    })
    router.push('/jobs');
  }


  return (
    <div className="mx-auto max-w-2xl">
        <Card>
            <CardHeader>
                <CardTitle>Criar Nova Vaga</CardTitle>
                <CardDescription>Preencha os detalhes abaixo para publicar uma nova oportunidade.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Título do Cargo</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: Engenheiro de Software Sênior" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Localização</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex: São Paulo, SP (Remoto)" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Tipo de Contrato</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o tipo de contrato" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="Full-time">Full-time</SelectItem>
                                    <SelectItem value="Part-time">Part-time</SelectItem>
                                    <SelectItem value="Contract">Contrato</SelectItem>
                                    <SelectItem value="Internship">Estágio</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                         <FormField
                            control={form.control}
                            name="salary"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Faixa Salarial (Opcional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex: R$ 8.000 - R$ 12.000" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Deixe em branco se preferir não divulgar.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Descrição da Vaga</FormLabel>
                                <FormControl>
                                    <Textarea rows={6} placeholder="Descreva as responsabilidades, a cultura da equipe, etc." {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="requirements"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Requisitos</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Liste os requisitos separados por vírgula. Ex: React, Node.js, Inglês Avançado" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Separe cada requisito com uma vírgula.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-2">
                             <Button type="button" variant="ghost" onClick={() => router.back()}>Cancelar</Button>
                             <Button type="submit">Publicar Vaga</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  )
}
