"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function deletarProjeto(projectId: string) {
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

    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar projeto e cliente:", error);
    return { success: false, error: "Falha ao deletar os registros do sistema." };
  }
}

export { deletarProjeto };
