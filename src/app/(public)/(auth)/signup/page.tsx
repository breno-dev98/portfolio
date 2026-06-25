import React from "react";
import { SignUpForm } from "@/features/auth/components/SignupForm";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <>
      <div className="mb-6 space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Criar sua conta</h1>
        <p className="text-muted-foreground text-sm">Em segundos você já solicita seu primeiro orçamento.</p>
      </div>
      <SignUpForm />
      <div className="text-center mt-6 text-sm text-muted-foreground">
        Já tem conta?{" "}
        <Link href="/signin" className="text-primary font-semibold hover:underline transition-colors">
          Fazer Login
        </Link>
      </div>
    </>
  );
}
