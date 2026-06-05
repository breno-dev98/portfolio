import React from "react";
import { OnboardingWizard } from "@/features/onboarding/OnboardingWizard";
import { getSession } from "@/features/auth/actions";
import { redirect } from "next/navigation";
import { getProjectsByUserId } from "@/features/projetos/queries";

export default async function OnboardingPage() {
  const session = await getSession();

  if (!session || !session.user) {
    redirect("/signin");
  }

  const projetoExistente = await getProjectsByUserId(session.user.id);

  if (projetoExistente && projetoExistente.length > 0) {
    redirect("/painel/projetos");
  }
  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center gap-4 flex-1 px-1.5 md:p-0">
      <div className="w-full max-w-3xl shrink-0">
        <h1 className="text-xl font-semibold tracking-tight text-muted-foreground">Painel do Cliente</h1>
      </div>

      <OnboardingWizard />
    </main>
  );
}
