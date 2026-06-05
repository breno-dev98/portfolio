"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface SignInFormValues {
  email: string;
  senha: string;
}

export function SignInForm() {
  const router = useRouter();

  const form = useForm<SignInFormValues>({
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(data: SignInFormValues) {
    try {
      const { data: signInData, error } = await authClient.signIn.email({
        email: data.email,
        password: data.senha,
        callbackURL: "/onboarding",
      });

      if (error) {
        const isCredentialError = error.code === "INVALID_EMAIL_OR_PASSWORD" || error.code === "INVALID_CREDENTIALS" || error.status === 401;

        if (isCredentialError) { 
          toast.error("Acesso negado", {
            description: "E-mail ou senha incorretos. Por favor, verifique seus dados.",
          });
        } else {
          toast.error("Erro ao fazer login", {
            description: error.message || "Verifique os dados e tente novamente.",
          });
        }
        return;
      }

      toast.success("Login realizado com sucesso!", {
        description: "Redirecionando você para o painel de orçamentos...",
      });

      router.push("/onboarding");
    } catch (err) {
      toast.error("Erro crítico", {
        description: "Falha ao conectar com o serviço de autenticação.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail Corporativo/Pessoal:*</FormLabel>
              <FormControl>
                <Input type="email" placeholder="seuemail@provedor.com" className="focus-visible:ring-primary" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="senha"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Crie uma Senha:*</FormLabel>
              <FormControl>
                <Input type="password" placeholder="No mínimo 6 caracteres" className="focus-visible:ring-primary" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full bg-primary text-white rounded-md py-2 hover:bg-ring transition cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </Form>
  );
}
