import { prisma } from "@/lib/prisma";
import { Project } from "./types";

async function getProjectsByUserId(userId: string): Promise<Project[]> {
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

async function getProjectDetailsBySlug(projectSlug: string, userId: string): Promise<Project | null> {
  const project = await prisma.project.findFirst({
    where: {
      slug: projectSlug,
      customer: {
        userId: userId,
      },
    },
    include: {
      checklists: { orderBy: { createdAt: "asc" } },
      documents: { orderBy: { createdAt: "desc" } },
      customer: {
        include: { address: true },
      },
    },
  });

  return project as unknown as Project | null;
}

export { getProjectsByUserId, getProjectDetailsBySlug };