import React from "react";
import { getSession } from "@/features/auth/actions";
import { redirect } from "next/navigation";
import { FolderKanban, Users, Shield } from "lucide-react";
import { StatsPainel } from "@/features/projects/components/StatsPainel";

export default async function PainelDevPage() {
  const session = await getSession();

  if (!session || !session.user) {
    redirect("/signin");
  }

  const totalProjetosGlobais = 0; 

  const statsItems = [
    { label: "Clientes Ativos", value: 0, icon: Users },
    { label: "Total de Projetos", value: totalProjetosGlobais, icon: FolderKanban },
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="font-display text-3xl font-semibold">Painel do Desenvolvedor 🚀</h1>
        <p className="text-muted-foreground mt-1">Gerenciamento geral de briefings, clientes e contratos.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statsItems.map((item) => (
          <StatsPainel key={item.label} label={item.label} value={item.value} icon={item.icon} />
        ))}
      </div>

      {/* Lista de gerenciamento global aqui */}
    </div>
  );
}
