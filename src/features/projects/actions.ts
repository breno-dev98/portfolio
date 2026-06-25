"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function removeProject(projectId: string) {
  let isSuccess = false;
  try {
    const projeto = await prisma.project.findUnique({
      where: { id: projectId },
      select: { customerId: true },
    });

    if (!projeto) {
      return { success: false, error: "Projeto não encontrado." };
    }

    await prisma.$transaction(async (tx) => {
      await tx.project.delete({
        where: { id: projectId },
      });

      await tx.customer.delete({
        where: { id: projeto.customerId },
      });

    });

    revalidatePath("/painel/projetos");
    isSuccess = true;
  } catch (error) {
    console.error("Erro ao deletar projeto e cliente:", error);
    return { isSuccess: false, error: "Falha ao deletar os registros do sistema." };
  }

  if (isSuccess) {
    redirect("/painel/projetos");
  }

}

async function generateProjectDocumentsAction(projectId: string, customerData: any) {
  try {
    await prisma.$transaction([
      prisma.document.create({
        data: {
          projectId,
          type: "proposta",
          contentJson: {
            cliente: customerData.fullName,
            investimento: customerData.budgetEstimate,
            prazo: customerData.deliveryEstimate,
          },
        },
      }),
      prisma.document.create({
        data: {
          projectId,
          type: "contrato",
          contentJson: { objeto: "Prestação de Serviços Web" },
        },
      }),
      prisma.project.update({
        where: { id: projectId },
        data: { status: "proposta", progress: 30 },
      }),
    ]);

    revalidatePath(`/painel/projetos/${projectId}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

async function signDocumentAction(documentId: string, projectId: string) {
  await prisma.document.update({
    where: { id: documentId },
    data: { signedAt: new Date(), signatureIp: "127.0.0.1" },
  });
  revalidatePath(`/painel/projetos/${projectId}`);
}

async function createChecklistItemAction(projectId: string, description: string) {
  await prisma.checklist.create({
    data: { projectId, description, isCompleted: false },
  });
  revalidatePath(`/painel/projetos/${projectId}`);
}

async function toggleChecklistItemAction(id: string, isCompleted: boolean, projectId: string) {
  await prisma.checklist.update({
    where: { id },
    data: { isCompleted },
  });
  revalidatePath(`/painel/projetos/${projectId}`);
}

async function deleteChecklistItemAction(id: string, projectId: string) {
  await prisma.checklist.delete({ where: { id } });
  revalidatePath(`/painel/projetos/${projectId}`);
}

export { removeProject, generateProjectDocumentsAction, signDocumentAction, createChecklistItemAction, toggleChecklistItemAction, deleteChecklistItemAction };
