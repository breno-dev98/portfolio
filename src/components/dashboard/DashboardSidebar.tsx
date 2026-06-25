"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, FileText, FolderKanban, HelpCircle, LayoutDashboard, Plus, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { NavUser } from "./NavUser";
import { NavigationLink } from "./DashboardShell";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FolderKanban,
  FileText,
  LayoutDashboard,
  Briefcase,
  Users,
};

interface DashboardSidebarProps {
  session: any;
  links: NavigationLink[];
}

export function DashboardSidebar({ session, links }: DashboardSidebarProps) {
  const pathname = usePathname();

  const isClient = session?.user?.role !== "admin";

  return (
    <Sidebar collapsible="icon">
      {/* Header da barra lateral */}
      <SidebarHeader className="h-14 flex items-center justify-start border-b border-border/50 px-4 group-data-[collapsible=icon]:justify-center">
        <p className="text-lg font-bold font-display tracking-tight group-data-[collapsible=icon]:hidden">Painel de Controle</p>
        <p className="text-lg font-bold font-display text-primary hidden group-data-[collapsible=icon]:block">PC</p>
      </SidebarHeader>

      <SidebarContent>
        {/* Grupo de Navegação Dinâmica */}
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link) => {
                const Icon = iconMap[link.icon] || HelpCircle;
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

                return (
                  <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={link.label}>
                      <Link className="font-sans flex items-center gap-3 w-full" href={link.href}>
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="group-data-[collapsible=icon]:hidden">{link.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isClient && (
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Ações</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="px-2">
                <Button asChild className="w-full justify-start gap-2" variant="default">
                  <Link href="/onboarding">
                    <Plus className="h-4 w-4" /> Novo orçamento
                  </Link>
                </Button>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      {/* Rodapé com o componente de usuário */}
      <SidebarFooter className="border-t border-border/50 p-2">
        <NavUser
          user={{
            name: session?.user?.name,
            email: session?.user?.email,
            avatar: session?.user?.avatar,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
