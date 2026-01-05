"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";

export function JobFilters() {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Cargo, palavra-chave ou empresa" className="pl-10" />
        </div>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Localização" className="pl-10" />
        </div>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Tipo de contrato" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full-time">Full-time</SelectItem>
            <SelectItem value="part-time">Part-time</SelectItem>
            <SelectItem value="contract">Contrato</SelectItem>
            <SelectItem value="internship">Estágio</SelectItem>
          </SelectContent>
        </Select>
        <Button className="w-full">Buscar Vagas</Button>
      </div>
    </div>
  );
}
