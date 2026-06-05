'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NavUser } from "./nav-user";
import { FolderKanban, LayoutDashboard, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export function PainelSidebar({ session }: { session: any }) {
  const items = [
    { title: "Visão geral", url: "/painel", icon: LayoutDashboard },
    { title: "Projetos", url: "/painel/projetos", icon: FolderKanban },
  ];

  const pathname = usePathname()
  return (
    <Sidebar>
      <SidebarHeader className="flex">
        <p className="text-lg font-bold">Painel de Controle</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link className="font-sans" href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SidebarGroup>
              <SidebarGroupLabel>Ações</SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-2 group-data-[collapsible=icon]:hidden">
                  <Button asChild className="w-full justify-start gap-2" variant="default">
                    <Link href="/onboarding">
                      <Plus className="h-4 w-4" /> Novo orçamento
                    </Link>
                  </Button>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name: session.user.name, email: session.user.email, avatar: session.user.avatar }} />
      </SidebarFooter>
    </Sidebar>
  );
}
