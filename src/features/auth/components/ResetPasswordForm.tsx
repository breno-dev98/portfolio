"use client";

import React, { Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams, useRouter } from "next/navigation"; 
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, { message: "A nova senha deve ter no mínimo 6 caracteres." }),
    confirmPassword: z.string().min(1, { message: "A confirmação de senha é obrigatória." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(data: ResetPasswordValues) {
    if (!token) {
      toast.error("Token ausente", {
        description: "Não foi possível encontrar o token de validação. Solicite um novo e-mail.",
      });
      return;
    }

    try {
      const { error } = await authClient.resetPassword({
        newPassword: data.password,
        token: token,
      });

      if (error) {
        toast.error("Erro ao redefinir senha", {
          description: error.message || "O token pode ter expirado ou já foi utilizado.",
        });
        return;
      }

      toast.success("Senha alterada!", {
        description: "Sua nova senha foi salva. Redirecionando para o login...",
      });

      setTimeout(() => {
        router.push("/signin");
      }, 2000);
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nova Senha:*</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Mínimo de 6 caracteres"
                  className="focus-visible:ring-primary"
                  disabled={isSubmitting || !token} 
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirme a Nova Senha:*</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Digite a senha novamente"
                  className="focus-visible:ring-primary"
                  disabled={isSubmitting || !token}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting || !token}
          className="mt-2 w-full bg-primary text-white rounded-md py-2 hover:bg-ring transition cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? "Alterando senha..." : "Redefinir Senha"}
        </Button>
      </form>
    </Form>
  );
}

export function ResetPasswordForm() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground text-center">Carregando formulário...</p>}>
      <ResetPasswordFormContent />
    </Suspense>
  );
}
