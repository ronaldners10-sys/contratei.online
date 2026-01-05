// src/app/(app)/applications/page.tsx
import { DUMMY_APPLICATIONS, DUMMY_JOBS } from "@/lib/placeholder-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Eye } from "lucide-react";

export default function ApplicationsPage() {
  const badgeVariants = {
    Pending: "secondary",
    Reviewed: "default",
    Interviewing: "default",
    Offered: "default",
    Rejected: "destructive",
  } as const;

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Minhas Candidaturas</CardTitle>
          <CardDescription>
            Acompanhe o status de todas as suas candidaturas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vaga</TableHead>
                <TableHead className="hidden md:table-cell">Empresa</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Data da Candidatura
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Ações</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DUMMY_APPLICATIONS.map((app) => {
                const job = DUMMY_JOBS.find((j) => j.id === app.jobId);
                if (!job) return null;
                return (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {job.companyName}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {app.dateApplied}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={badgeVariants[app.status] || "secondary"}
                        className={
                          app.status === 'Reviewed' ? 'bg-blue-100 text-blue-800' :
                          app.status === 'Interviewing' ? 'bg-yellow-100 text-yellow-800' :
                          app.status === 'Offered' ? 'bg-green-100 text-green-800' : undefined
                        }
                      >
                        {app.status === 'Pending' ? 'Pendente' :
                         app.status === 'Reviewed' ? 'Analisado' :
                         app.status === 'Interviewing' ? 'Entrevista' :
                         app.status === 'Offered' ? 'Oferta' :
                         'Rejeitado'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/jobs/${job.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Vaga
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
