import React from "react";
import { OnboardingWizard } from "@/features/onboarding/OnboardingWizard";
import { ToggleTheme } from "@/components/shared/ToggleTheme";
import { getSession } from "@/features/auth/actions";
import { redirect } from "next/navigation";
import { getProjetosByUsuario } from "@/features/projetos/queries";

export default async function OnboardingPage() {
  const session = await getSession();

  if (!session || !session.user) {
    redirect("/signin");
  }

  const projetoExistente = await getProjetosByUsuario(session.user.id);

  if (projetoExistente) {
    redirect("/painel/projetos");
  }
  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center gap-4 flex-1">
      <div className="w-full max-w-3xl flex justify-between sm:text-left shrink-0">
        <h1 className="text-xl font-semibold tracking-tight text-muted-foreground">Painel do Cliente</h1>
        <ToggleTheme />
      </div>

      <OnboardingWizard />
    </main>
  );
}
