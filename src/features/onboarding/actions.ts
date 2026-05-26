"use server";

import { prisma } from "@/lib/prisma";
import { OrcamentoData } from "./OnboardingWizard";
import { getSession } from "../auth/actions";

export async function criarOnboardingAction(formData: OrcamentoData) {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return { success: false, error: "Usuário não autenticado." };
    }

    const mapeamentoTipos: Record<string, string> = {
      landing: "Landing Page",
      institucional: "Site Institucional",
      ecommerce: "E-commerce",
      custom: "Sistema Web",
    };
    const nomeProjetoFinal = formData.tituloProjeto.trim() || mapeamentoTipos[formData.tipoProjeto] || "Novo Projeto";

    await prisma.customer.create({
      data: {
        userId: session.user.id,
        fullName: session.user.name,
        email: session.user.email,
        document: formData.documento,
        whatsapp: formData.whatsapp,
        address: formData.endereco,
        projects: {
          create: {
            title: nomeProjetoFinal,
            projectType: formData.tipoProjeto,
            features: formData.funcionalidades,
            description: formData.descricao || "Sem descrição adicional.",
            status: "briefing",
            progress: 0,
            totalValue: 0,
            budgetEstimate: formData.orcamentoEstimado,
            deliveryEstimate: formData.prazoEstimado,
          },
        },
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error("Erro na Server Action de Onboarding:", error);
    if (error?.code === "P2002") {
      return {
        success: false,
        error: "Este CPF ou CNPJ já está vinculado a outra conta de cliente.",
      };
    }
    return { success: false, error: "Falha ao salvar os dados no banco de dados." };
  }
}
