import React from "react";
import { SignUpForm } from "@/features/auth/components/SignupForm";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-card p-8 rounded-xl shadow-xl border border-border">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">Área do Cliente</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Crie sua conta rapidamente para preencher o briefing do seu projeto e acompanhar seus orçamentos.
          </p>
        </div>

        <SignUpForm />

        <div className="text-center mt-6 text-sm text-muted-foreground">
          Já tem um projeto em andamento?{" "}
          <Link href="/signin" className="text-primary font-semibold hover:underline">
            Fazer Login
          </Link>
        </div>
      </div>
    </main>
  );
}
