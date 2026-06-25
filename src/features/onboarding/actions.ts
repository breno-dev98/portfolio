"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "../auth/actions";
import { WizardData } from "./context/WizardContext";

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-"); 
}

export async function criarOnboardingAction(formData: WizardData) {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return { success: false, error: "Usuário não autenticado." };
    }

    const userId = session.user.id;
    
    const mapeamentoTipos: Record<string, string> = {
      landing: "Landing Page",
      institucional: "Site Institucional",
      ecommerce: "E-commerce",
      sistema: "Sistema Web",
    };

    const nomeProjetoFinal = formData.project.title.trim() || mapeamentoTipos[formData.project.projectType || ""] || "Novo Projeto";

    const slugProjeto = generateSlug(nomeProjetoFinal);

    const projetoExistente = await prisma.project.findFirst({
      where: {
        slug: slugProjeto,
        customer: {
          userId: userId,
        },
      },
    });

    if (projetoExistente) {
      return {
        success: false,
        error: "Você já possui um projeto com um nome idêntico ou muito semelhante. Escolha outro título.",
      };
    }

    await prisma.customer.create({
      data: {
        userId: session.user.id,
        fullName: formData.customer.fullName.trim(),
        email: formData.customer.email.trim(),
        document: formData.customer.document.replace(/\D/g, ""),
        whatsapp: formData.customer.whatsapp.replace(/\D/g, ""),
        address: {
          create: {
            cep: formData.address.cep,
            street: formData.address.street,
            number: formData.address.number,
            neighborhood: formData.address.neighborhood,
            city: formData.address.city,
            state: formData.address.state,
            fullAddress: `${formData.address.street}, ${formData.address.number}, ${formData.address.neighborhood} - ${formData.address.city}, ${formData.address.state}`,
          },
        },
        projects: {
          create: {
            title: nomeProjetoFinal,
            slug: slugProjeto,
            projectType: formData.project.projectType!,
            features: formData.project.features,
            description: formData.project.description!.trim(),
            details: formData.project.details!.trim(),
            references: formData.project.references?.trim() || null,
            status: "briefing",
            progress: 10,
            totalValue: 0,
            budgetEstimate: formData.project.budgetEstimate,
            deliveryEstimate: formData.project.deliveryEstimate,
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
