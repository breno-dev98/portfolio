import React from "react";
import { SignInForm } from "@/features/auth/components/SigninForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-card p-8 rounded-xl shadow-xl border border-border">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">Área do Cliente</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Faça login para acessar seu painel e acompanhar seus orçamentos.
          </p>
        </div>

        <SignInForm />

        <div className="text-center mt-6 text-sm text-muted-foreground">
          Já tem um projeto em andamento?{" "}
          <Link href="/signup" className="text-primary font-semibold hover:underline">
            Criar Conta
          </Link>
        </div>
      </div>
    </main>
  );
}
