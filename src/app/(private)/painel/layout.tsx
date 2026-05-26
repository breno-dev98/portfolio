import React from "react";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PainelSidebar } from "@/components/painel-sidebar";
import { getSession } from "@/features/auth/actions";

interface PainelLayoutProps {
  children: React.ReactNode;
}

export default async function PainelLayout({ children }: PainelLayoutProps) {
  const session = await getSession();

  if (!session || !session.user) {
    redirect("/signin");
  }

  return (
    <SidebarProvider>
      <PainelSidebar session={session}/>
      <SidebarTrigger />
      <main>{children}</main>
    </SidebarProvider>
  );
}
