"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut();

      toast.success("Desconectado", {
        description: "Você saiu do painel com segurança.",
      });

      router.push("/");

      router.refresh();
    } catch (error) {
      toast.error("Erro ao sair", {
        description: "Não foi possível encerrar sua sessão.",
      });
    }
  };
  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className="flex items-center gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
    >
      <LogOut size={18} />
      <span>Sair</span>
    </Button>
  );
}
