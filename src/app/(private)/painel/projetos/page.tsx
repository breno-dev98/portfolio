import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getProjectsByUserId } from "@/features/projects/queries";
import { ProjectList } from "@/features/projects/components/ProjectList";

export default async function ProjectsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const projects = await getProjectsByUserId(session.user.id);

  if (projects.length < 1) {
    redirect("/onboarding")
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Meus Projetos</h1>
        <p className="text-muted-foreground">Gerencie seus briefings e acompanhe o andamento.</p>
      </div>

      <ProjectList projects={projects} />
    </div>
  );
}
