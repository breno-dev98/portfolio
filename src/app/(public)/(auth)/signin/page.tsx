import React from "react";
import { SignInForm } from "@/features/auth/components/SigninForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <div className="mb-6 space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Entrar na sua conta</h1>
        <p className="text-muted-foreground text-sm">Acesse seus orçamentos e projetos.</p>
      </div>
      <SignInForm />
      <div className="text-center mt-6 text-sm text-muted-foreground">
        Não tem conta?{" "}
        <Link href="/signup" className="text-primary font-semibold hover:underline transition-colors">
          Criar Conta
        </Link>
      </div>
    </>
  );
}
