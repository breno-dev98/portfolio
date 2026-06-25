import { Card } from "@/components/ui/card";
import { Project } from "../types";
import { ProjectStatusType } from "@/types/project";
import Link from "next/link";
import { formatDate } from "@/utils/masks";
import { Badge } from "@/components/ui/badge";
interface ProjectCardProps {
  project: Project;
}

const statusLabel: Record<ProjectStatusType, string> = {
  briefing: "Briefing",
  proposal_sent: "Proposta enviada",
  proposal_rejected: "Proposta rejeitada",
  contract_signed: "Aprovado",
  in_development: "Em desenvolvimento",
  completed: "Entregue",
};

const statusColor: Record<ProjectStatusType, string> = {
  briefing: "bg-yellow-100 text-yellow-800",
  proposal_sent: "bg-blue-100 text-blue-800",
  proposal_rejected: "bg-red-100 text-red-800",
  contract_signed: "bg-green-100 text-green-800",
  in_development: "bg-purple-100 text-purple-800",
  completed: "bg-gray-100 text-gray-800",
};

const projectTypeLabel: Record<string, string> = {
  landing: "Landing Page",
  institucional: "Site Institucional",
  ecommerce: "E-commerce",
  sistema: "Sistema Web",
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link key={project.id} href={`/painel/projetos/${project.slug}`}>
      <Card className="p-5 h-full bg-[image:var(--gradient-card)] border-border hover:border-primary/60 transition-all hover:shadow-[var(--shadow-glow)]">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary">{projectTypeLabel[project.projectType]}</Badge>
          <Badge className={statusColor[project.status]}>{statusLabel[project.status]}</Badge>
        </div>
        <h3 className="font-display text-lg font-semibold line-clamp-2">{project.title}</h3>
        {project.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.description}</p>}
        <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span>{project.features.length} funcionalidades</span>
          <span>{formatDate(project.createdAt)}</span>
        </div>
        <div>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-[image:var(--gradient-primary)]" style={{ width: `${project.progress}%` }} />
          </div>
        </div>
      </Card>
    </Link>
  );
}
