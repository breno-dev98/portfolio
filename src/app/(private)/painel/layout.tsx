import React from "react";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PainelSidebar } from "@/components/painel-sidebar";
import { getSession } from "@/features/auth/actions";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display", // Vincula com o mesmo nome que você definiu no CSS
  weight: ["300", "400", "500", "600", "700"],
});

// Configura a fonte para o texto corrido (Sans)
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans", // Vincula com o mesmo nome que você definiu no CSS
  weight: ["400", "500", "700"],
});

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
      <PainelSidebar session={session} />
      <div className={`${spaceGrotesk.variable} ${dmSans.variable} flex flex-col flex-1 w-full min-h-screen bg-background`}>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border/50 px-4">
          <SidebarTrigger />
          <div className="h-5 w-px bg-border" />
          <span className="text-sm text-muted-foreground">Painel do cliente</span>
        </header>
        <main className="flex-1 p-4 md:p-6 w-full max-w-7xl mx-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
