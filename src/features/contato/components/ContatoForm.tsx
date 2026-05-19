'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizonal } from "lucide-react";
import { toast } from "sonner";
import { contatoSchema, ContatoSchemaType } from "../schemas/contatoSchema";

export function ContatoForm() {
  const form = useForm<ContatoSchemaType>({
    resolver: zodResolver(contatoSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      mensagem: "",
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(data: ContatoSchemaType) {
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast.success("Sucesso!", {
          description: "Sua mensagem foi enviada. Responderemos em breve!",
        });
        reset();
      } else {
        toast.error("Erro!", {
          description: "Não foi possível enviar sua mensagem. Tente novamente.",
        });
      }
    } catch (error) {
      toast.error("Erro de conexão", {
        description: "Falha ao comunicar com o servidor. Verifique sua internet.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome:*</FormLabel>
              <FormControl>
                <Input type="text" className="focus-visible:ring-zinc-300 focus-visible:border-zinc-300" {...field} />
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
                <Input type="email" className="focus-visible:ring-zinc-300 focus-visible:border-zinc-300" {...field} />
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
                <Input type="tel" className="focus-visible:ring-zinc-300 focus-visible:border-zinc-300" {...field} />
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
                <Textarea rows={3} maxLength={800} className="focus-visible:ring-zinc-300 focus-visible:border-zinc-300" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="mt-2 w-fit flex items-center gap-2 bg-primary dark:bg-primary-foreground text-white rounded-full px-6 py-1 hover:bg-ring transition cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "ENVIAR"}
          <SendHorizonal size={18} color="white" />
        </Button>
      </form>
    </Form>
  );
}
