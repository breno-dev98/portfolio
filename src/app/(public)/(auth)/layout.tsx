"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isSignUp = pathname?.includes("/signup");

  const meta = {
    title: isSignUp ? "Criar sua conta" : "Entrar na sua conta",
    description: isSignUp ? "Em segundos você já solicita seu primeiro orçamento." : "Acesse seus orçamentos e projetos.",
    redirectText: isSignUp ? "Já tem conta? " : "Não tem conta? ",
    linkLabel: isSignUp ? "Fazer Login" : "Criar Conta",
    linkHref: isSignUp ? "/signin" : "/signup",
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-background px-4 py-12 relative overflow-hidden"
      style={{
        backgroundImage: "var(--gradient-hero)",
      }}
    >
      <div
        className="w-full max-w-[440px] bg-card p-8 sm:p-10 rounded-2xl border border-border/50 relative z-10"
        style={{
          boxShadow: "var(--shadow-elegant)",
        }}
      >
        <div className="mb-6 space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{meta.title}</h1>
          <p className="text-muted-foreground text-sm font-sans">{meta.description}</p>
        </div>
        {children}
        <div className="text-center mt-6 text-sm text-muted-foreground font-sans">
          {meta.redirectText}
          <Link href={meta.linkHref} className="text-primary font-semibold hover:text-primary-glow hover:underline transition-colors">
            {meta.linkLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
