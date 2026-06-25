"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { ArrowLeft, Loader2Icon } from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, { message: "O e-mail é obrigatório." }).email({ message: "Insira um endereço de e-mail válido." }),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [isSent, setIsSent] = useState(false);
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = form;

  async function onSubmit(data: ForgotPasswordValues) {
    try {
      const { error } = await authClient.requestPasswordReset({
        email: data.email.trim(),
        redirectTo: "/reset-password",
      });

      if (error) {
        toast.error("Erro ao solicitar recuperação", {
          description: error.message || "Tente novamente em instantes.",
        });
        return;
      }

      toast.success("Instruções enviadas!", {
        description: "Se o e-mail informado existir em nossa base, você receberá um link de redefinição em instantes.",
      });
  
      setIsSent(true);
    } catch (err) {
      toast.error("Erro crítico", {
        description: "Falha ao conectar com o serviço de autenticação.",
      });
    }
  }

  const handleTryAgain = () => {
    setIsSent(false);
    reset({ email: "" });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
        {!isSent ? (
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail Cadastrado:*</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="seuemail@provedor.com" className="focus-visible:ring-primary" disabled={isSubmitting} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 text-center space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Enviamos um link de recuperação para o e-mail informado. Verifique sua caixa de entrada e a pasta de spam.
            </p>
          </div>
        )}

        {!isSent ? (
          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full bg-primary text-white rounded-md py-2 hover:bg-ring transition cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                Enviando e-mail
                <Loader2Icon className="animate-spin h-4 w-4" />
              </div>
            ) : (
              "Recuperar Senha"
            )}
          </Button>
        ) : (
          <Button
            type="button" 
            onClick={handleTryAgain}
            className="mt-2 w-full transition cursor-pointer"
          >
            Enviar novamente
          </Button>
        )}
      </form>
    </Form>
  );
}
