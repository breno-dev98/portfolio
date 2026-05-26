import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenuButton, SidebarMenuItem,  } from "@/components/ui/sidebar";
import Link from "next/link";
import { NavUser } from "./nav-user";

export function PainelSidebar({ session }: { session: any }) {
  return (
    <Sidebar>
      <SidebarHeader className="flex">
        <p className="text-lg font-bold">Painel de Controle</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup title="Navegação">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link className="font-bold text-sm md:text-lg py-5" href="/painel/projetos">
                Meus Projetos
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name: session.user.name, email: session.user.email, avatar: session.user.avatar }} />
      </SidebarFooter>
    </Sidebar>
  );
}
