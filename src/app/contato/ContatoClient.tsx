"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Mail, Phone, MapPin, SendHorizonal, CheckCircle2, AlertCircle } from "lucide-react";

interface ContatoFormValues {
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
}

export default function ContatoClient() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => setStatus("idle"), 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const form = useForm<ContatoFormValues>({
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      mensagem: "",
    },
  });

  const { handleSubmit, control, reset } = form;

  const cardsContacts = [
    {
      label: "Email",
      text: "breno.oliveira2011@hotmail.com",
      icon: <Mail size={32} color="white" />,
    },
    {
      label: "Telefone",
      text: "(85) 98570-3660",
      icon: <Phone size={32} color="white" />,
    },
    {
      label: "Endereço",
      text: "Fortaleza, Ceará",
      icon: <MapPin size={32} color="white" />,
    },
  ];

  async function onSubmit(data: ContatoFormValues) {
    setStatus("loading");

    const res = await fetch("/api/contato", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <main className="mx-auto -mt-11">
      {status === "success" && (
        <div className="fixed top-6 right-6 z-50">
          <Alert variant="default" className="border-green-600 bg-green-100 dark:bg-green-950 dark:border-green-700">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800 dark:text-green-300">Sucesso!</AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-400">Mensagem enviada com sucesso!</AlertDescription>
          </Alert>
        </div>
      )}
      {status === "error" && (
        <div className="fixed top-6 right-6 z-50">
          <Alert variant="destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>Não foi possível enviar sua mensagem. Tente novamente.</AlertDescription>
          </Alert>
        </div>
      )}

      <section className="bg-primary dark:bg-primary-foreground flex flex-col items-center pt-20 text-white w-full h-[45vh] space-y-4">
        <h3 className="text-xl sm:text-2xl md:text-3xl">FALE CONOSCO</h3>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Marque uma conversa</h1>
        <h4 className="text-center text-lg sm:text-xl md:text-2xl">
          Preencha o formulário abaixo que
          <br />
          vamos retornar o contato
        </h4>
      </section>

      <section className="p-6 sm:p-8 md:p-12 mx-auto flex flex-col md:flex-row-reverse gap-10 -mt-16 sm:-mt-30 md:-mt-35 lg:-mt-40 bg-white dark:bg-card shadow-2xl z-10 rounded-xl w-[95%] md:w-[100vh] h-fit relative">
        <div className="rounded-xl border dark:border-border p-6 sm:p-8 w-full md:flex-1">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <FormField
                control={control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome:*</FormLabel>
                    <FormControl>
                      <Input type="text" className="focus-visible:ring-zinc-300 focus-visible:border-zinc-300" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail:*</FormLabel>
                    <FormControl>
                      <Input type="email" className="focus-visible:ring-zinc-300 focus-visible:border-zinc-300" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone:*</FormLabel>
                    <FormControl>
                      <Input type="tel" className="focus-visible:ring-zinc-300 focus-visible:border-zinc-300" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="mensagem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensagem:*</FormLabel>
                    <FormControl>
                      <Textarea rows={3} maxLength={800} className="focus-visible:ring-zinc-300 focus-visible:border-zinc-300" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="mt-2 w-fit flex items-center gap-2 bg-primary dark:bg-primary-foreground text-white rounded-full px-6 py-1 hover:bg-ring transition cursor-pointer"
              >
                {status === "loading" ? "Enviando..." : "ENVIAR"}
                <SendHorizonal size={18} color="white" />
              </Button>

            </form>
          </Form>
        </div>

        <div className="w-full md:w-[35%]">
          <div className="mb-8">
            <h2 className="text-primary dark:text-primary-foreground text-3xl md:text-4xl font-bold">Mande-nos uma mensagem</h2>
            <p className="text-card-foreground dark:text-card-foreground text-sm md:text-base">Ou fale conosco por alguma das formas abaixo</p>
          </div>
          <div className="grid grid-cols-1 gap-10 w-fit">
            {cardsContacts.map((item, index) => (
              <div key={index} className="flex items-center gap-x-4">
                <div className="border border-dashed border-black dark:border-white p-1.5 rounded-full">
                  <div className="flex justify-center items-center w-16 h-16 rounded-full bg-primary dark:bg-primary-foreground">{item.icon}</div>
                </div>
                <div className="flex flex-col">
                  <p className="text-lg font-semibold text-card-foreground dark:text-card-foreground">{item.label}</p>
                  <span className="text-card-foreground dark:text-card-foreground text-sm">{item.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
