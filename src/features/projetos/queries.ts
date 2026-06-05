import { prisma } from "@/lib/prisma";
import { Project } from "./types";

export async function getProjectsByUserId(userId: string): Promise<Project[]> {
  const projects = await prisma.project.findMany({
    where: {
      customer: {
        userId: userId,
      },
    },
    include: {
      checklists: true,
      documents: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return projects as unknown as Project[];
}
