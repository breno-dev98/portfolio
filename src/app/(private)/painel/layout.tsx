import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/features/auth/actions";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

const clientLinks = [
    { label: "Visão geral", href: "/painel", icon: "LayoutDashboard" },
    { label: "Projetos", href: "/painel/projetos", icon: "FolderKanban" },
  ]

interface PainelLayoutProps {
  children: React.ReactNode;
}

export default async function PainelLayout({ children }: PainelLayoutProps) {
  const session = await getSession();

  if (!session || !session.user) {
    redirect("/signin");
  }

  return (
    <DashboardShell session={session} navigationLinks={clientLinks} panelTitle="Painel do cliente">
      {children}
    </DashboardShell>
  );
}
