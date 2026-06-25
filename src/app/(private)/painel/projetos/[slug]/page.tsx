import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getProjectDetailsBySlug } from "@/features/projects/queries";
import { ProjectDetail } from "@/features/projects/components/ProjectDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const project = await getProjectDetailsBySlug(slug, session.user.id);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
