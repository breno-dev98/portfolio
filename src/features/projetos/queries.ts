import { prisma } from "@/lib/prisma";

export async function getProjetosByUsuario(userId: string) {
  return await prisma.project.findMany({
    where: {
      customer: {
        userId: userId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
