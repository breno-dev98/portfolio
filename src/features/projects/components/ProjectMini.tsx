import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PROJECT_TYPES, Project } from "@/features/projects/types";
import { formatDate } from "@/utils/masks";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function ProjectMini({ project }: { project: Project }) {
  const type = PROJECT_TYPES.find((t) => t.value === project.projectType);
  return (
    <Link href={`/painel/projetos/${project.slug}`}>
      <Card className="p-5 bg-[image:var(--gradient-card)] border-border hover:border-primary/60 transition-colors group">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge variant="secondary" className="mb-2">
              {type?.label}
            </Badge>
            <h3 className="font-display font-semibold">{project.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">Criado em {formatDate(project.createdAt.toDateString())}</p>
          </div>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </Card>
    </Link>
  );
}
