import React from "react";
import Link from "next/link";
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="mb-6 space-y-1.5">
        <h1 className="text-2xl font-bold text-foreground">Recuperar senha</h1>
        <p className="text-muted-foreground text-sm">Digite seu e-mail para receber as instruções de redefinição.</p>
      </div>

      <ForgotPasswordForm />

      <div className="text-center mt-6 text-sm text-muted-foreground">
        Lembrou a senha?{" "}
        <Link href="/signin" className="text-primary font-semibold hover:underline transition-colors">
          Voltar para o Login
        </Link>
      </div>
    </>
  );
}
