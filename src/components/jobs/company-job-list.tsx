// src/components/jobs/company-job-list.tsx
"use client";

import { DUMMY_JOBS } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useUser } from "@/context/user-context";

export function CompanyJobList() {
  const { user } = useUser();
  const companyJobs = DUMMY_JOBS.filter(job => job.companyId === user?.id);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Vagas Publicadas</CardTitle>
          <CardDescription>Gerencie suas vagas e veja os candidatos.</CardDescription>
        </div>
        <Button size="sm" className="gap-1" asChild>
          <Link href="/jobs/new">
            <PlusCircle className="h-4 w-4" />
            Nova Vaga
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cargo</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Candidatos</TableHead>
              <TableHead className="hidden sm:table-cell">Data de Publicação</TableHead>
              <TableHead>
                <span className="sr-only">Ações</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companyJobs.map(job => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">
                    <div className="font-medium">{job.title}</div>
                    <div className="text-sm text-muted-foreground md:hidden">{job.location}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge>Ativa</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    <Link href={`/candidates/${job.id}`} className="font-semibold text-primary hover:underline">
                        23 Candidatos
                    </Link>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{job.datePosted}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/jobs/${job.id}`}>Ver Vaga</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Desativar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
