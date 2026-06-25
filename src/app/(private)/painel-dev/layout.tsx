import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/features/auth/actions";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

const devLinks = [
  { label: "Dashboard", href: "/painel-dev", icon: "LayoutDashboard" },
  { label: "Projetos Recebidos", href: "/painel-dev/projetos", icon: "Briefcase" },
  { label: "Clientes", href: "/painel-dev/clientes", icon: "Users" },
];

interface PainelDevLayoutProps {
  children: React.ReactNode;
}

export default async function PainelDevLayout({ children }: PainelDevLayoutProps) {
  const session = await getSession();

  if (!session || !session.user) {
    redirect("/signin");
  }

  if (session.user.role !== "admin") {
    redirect("/painel");
  }

  return (
    <DashboardShell session={session} navigationLinks={devLinks} panelTitle="Painel do desenvolvedor">
      {children}
    </DashboardShell>
  );
}
