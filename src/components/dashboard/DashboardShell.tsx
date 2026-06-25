import React from "react";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"],
});

export interface NavigationLink {
  label: string;
  href: string;
  icon: string;
}

interface DashboardShellProps {
  children: React.ReactNode;
  navigationLinks: NavigationLink[];
  session: any;
  panelTitle: string;
}

export function DashboardShell({ children, navigationLinks, session, panelTitle }: DashboardShellProps) {
    
  return (
    <SidebarProvider>
      <DashboardSidebar session={session} links={navigationLinks} />

      <div className={`${spaceGrotesk.variable} ${dmSans.variable} flex flex-col flex-1 w-full min-h-screen bg-background`}>
        {/* Header unificado e idêntico para ambas as visões */}
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border/50 px-4">
          <SidebarTrigger />
          <div className="h-5 w-px bg-border" />
          <span className="text-sm text-muted-foreground font-sans">{panelTitle}</span>
        </header>

        {/* Container principal de conteúdo */}
        <main className="flex-1 p-4 md:p-6 w-full max-w-7xl mx-auto font-sans">{children}</main>
      </div>
    </SidebarProvider>
  );
}
