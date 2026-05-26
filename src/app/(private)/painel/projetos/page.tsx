import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getProjetosByUsuario } from "@/features/projetos/queries";
import { ListaProjetos } from "@/features/projetos/components/ListaProjetos";

export default async function ProjetosPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const projetos = await getProjetosByUsuario(session.user.id);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Meus Projetos</h1>
        <p className="text-muted-foreground">Gerencie seus briefings e acompanhe o andamento.</p>
      </div>

      <ListaProjetos dados={projetos} />
    </div>
  );
}
