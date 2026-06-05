import React from "react";
import { getSession } from "@/features/auth/actions";
import { getProjectsByUserId } from "@/features/projetos/queries";
import { redirect } from "next/navigation";
import { FolderKanban, Stars, TrendingUp } from "lucide-react";
import { StatsPainel } from "@/features/painel/components/StatsPainel";
import { EmptyState } from "@/features/painel/components/EmptyState";
import { ProjectMini } from "@/features/painel/components/ProjectMini";
import { BudGetButton } from "@/components/shared/BudGetButton";

export default async function PainelPage() {
  const session = await getSession();

  if (!session || !session.user) {
    redirect("/signin");
  }

  const projects = await getProjectsByUserId(session.user.id);

  const statsItems = [
    { label: "Total de projetos", value: projects.length, icon: FolderKanban },
    { label: "Em andamento", value: projects.filter((p) => p.status === "em_andamento").length, icon: Stars },
    { label: "Entregues", value: projects.filter((p) => p.status === "concluido").length, icon: TrendingUp },
  ];

  if (!projects || projects.length === 0) {
    redirect("/onboarding");
  }
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-3xl font-semibold">Olá, {session.user.name.split(" ")[0]} 👋</h1>
          <p className="text-muted-foreground mt-1">Acompanhe seus orçamentos e projetos.</p>
        </div>
        <BudGetButton />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statsItems.map((item) => (
          <StatsPainel key={item.label} label={item.label} value={item.value} icon={item.icon} />
        ))}
      </div>
      <div>
        <h2 className="font-display text-xl font-semibold mb-3">Projetos recentes</h2>
        {projects.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {projects.slice(0, 4).map((p) => (
              <ProjectMini key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
