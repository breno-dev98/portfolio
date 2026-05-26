import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { getSession } from "@/features/auth/actions";
import { getProjetosByUsuario } from "@/features/projetos/queries";

export default async function PainelPage() {
  const session = await getSession()

  if (!session || !session.user) {
    redirect("/signin");
  }

  const projetoExistente = await getProjetosByUsuario(session.user.id);

  if (!projetoExistente) {
    redirect("/onboarding");
  }
  return null;
}
