import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Clock } from "lucide-react";
import type { Job } from "@/lib/types";

type JobCardProps = {
  job: Job;
};

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start gap-4">
            <Image 
                src={job.companyLogoUrl} 
                alt={`${job.companyName} logo`} 
                width={48} 
                height={48} 
                className="rounded-md border"
                data-ai-hint="company logo"
            />
            <div>
                <CardTitle className="text-lg">{job.title}</CardTitle>
                <CardDescription>{job.companyName}</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Briefcase className="h-4 w-4" />
          <span>{job.type}</span>
        </div>
        {job.salary && (
             <p className="font-semibold text-foreground">{job.salary}</p>
        )}
        <div className="flex flex-wrap gap-2 pt-2">
            {job.requirements.slice(0,3).map(req => (
                <Badge key={req} variant="secondary">{req}</Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-2">
        <Button asChild>
          <Link href={`/jobs/${job.id}`}>Ver Detalhes</Link>
        </Button>
         <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
          <Clock className="h-3 w-3" />
          <span>Postado {job.datePosted}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
