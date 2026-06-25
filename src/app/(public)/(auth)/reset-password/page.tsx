import React from "react";
import Link from "next/link";
import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm"; // O formulário de digitar a nova senha

export default function ResetPasswordPage() {
  return (
    <>
      <div className="mb-6 space-y-1.5">
        <h1 className="text-2xl font-bold text-foreground">Nova senha</h1>
        <p className="text-muted-foreground text-sm">Crie uma nova senha de acesso para a sua conta.</p>
      </div>

      <ResetPasswordForm />

      <div className="text-center mt-6 text-sm text-muted-foreground">
        <Link href="/signin" className="text-primary font-semibold hover:underline transition-colors">
          Cancelar e voltar
        </Link>
      </div>
    </>
  );
}
