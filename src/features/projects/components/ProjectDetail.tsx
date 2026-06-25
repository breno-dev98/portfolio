"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabBriefing } from "./TabBriefing";
import { TabContract } from "./TabContract";
import { TabChecklist } from "./TabChecklist";
import { Project } from "../types";
import { removeProject } from "../actions";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { TabAttachments } from "./TabAttachments";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const [isPending, startTransition] = useTransition();
  return (
    <div className="space-y-6 mx-auto">
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/painel/projetos" className="flex items-center gap-1.5 text-xs font-medium">
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar para a lista
          </Link>
        </Button>

        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Badge variant="secondary" className="uppercase tracking-wider text-[10px]">
                {project.projectType}
              </Badge>
              <Badge className="uppercase tracking-wider text-[10px]">{project.status}</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{project.title}</h1>
            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">{project.description}</p>
          </div>
          <ConfirmDialog
            title="Excluir Projeto"
            description="Tem certeza de que deseja excluir este projeto? Esta ação não pode ser desfeita."
            triggerText={<Trash2 className="h-4 w-4" />}
            onConfirm={() => {
              startTransition(async () => {
                await removeProject(project.id);
              });
            }}
          />
        </div>
      </div>

      {/* Barra de Progresso */}
      <Card className="p-4 bg-muted/20 border-border/60">
        <div className="flex items-center justify-between text-xs font-medium mb-1.5">
          <span className="text-muted-foreground">Evolução do Projeto</span>
          <span className="text-foreground">{project.progress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${project.progress}%` }} />
        </div>
      </Card>

      {/* Sistema de Abas */}
      <Tabs defaultValue="briefing" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-4 bg-muted/60">
          <TabsTrigger value="briefing" className="text-xs">
            Briefing
          </TabsTrigger>

          <TabsTrigger value="attachments" className="text-xs">
            Anexos
          </TabsTrigger>

          <TabsTrigger value="checklist" className="text-xs">
            Checklist
          </TabsTrigger>

          <TabsTrigger value="contract" className="text-xs">
            Contrato
          </TabsTrigger>
        </TabsList>

        <TabsContent value="briefing">
          <TabBriefing project={project} />
        </TabsContent>

        <TabsContent value="attachments">
          <TabAttachments projectId={project.id} />
        </TabsContent>

        <TabsContent value="checklist">
          <TabChecklist projectId={project.id} checklist={project.checklists || []} />
        </TabsContent>

        <TabsContent value="contract">
          <TabContract projectId={project.id} documents={project.documents || []} customerData={project.customer} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
