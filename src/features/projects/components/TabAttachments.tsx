"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const categories = ["Logo", "Fotos", "Referências", "Documentos"] as const;

const attachmentsSchema = z.object({
  category: z.string().min(1, { message: "Selecione uma categoria." }),
  file: z.any().refine((files) => files?.length > 0, "Selecione pelo menos um arquivo."),
});

type AttachmentsFormData = z.infer<typeof attachmentsSchema>;

export function TabAttachments({ projectId }: { projectId: string }) {
  const form = useForm<AttachmentsFormData>({
    resolver: zodResolver(attachmentsSchema),
    defaultValues: {
      category: "Logo",
      file: undefined,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
    setValue,
  } = form;

  async function onSubmit(data: AttachmentsFormData) {
    try {
      console.log("Categoria selecionada:", data.category);
      console.log("Lista de arquivos (FileList):", data.file);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Arquivo enviado com sucesso!");
      reset({ category: "Logo", file: undefined });
    } catch (err) {
      toast.error("Erro ao realizar o upload do arquivo.");
    }
  }

  return (
    <Card className="border-border/60 bg-card">
      <CardHeader>
        <CardTitle className="font-semibold text-base text-foreground">Anexar arquivos do projeto</CardTitle>
        <CardDescription className="text-xs text-muted-foreground max-w-md mt-1">
          Envie logo, fotos, referências e documentos. Tudo fica centralizado aqui para o desenvolvedor.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4 w-full items-stretch sm:items-end">
            <FormField
              control={control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                    <FormControl>
                      <SelectTrigger className="flex-1 w-full sm:flex-initial sm:w-48 relative not-last:focus:ring-primary">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup >
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <div className="absolute left-0 right-0 top-full mt-1">
                    <FormMessage className="text-[11px] leading-none" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="file"
              render={({ field: { ref, name, onBlur } }) => (
                <FormItem className="flex-1 relative">
                  <FormLabel>Arquivos</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      id="file"
                      name={name}
                      ref={ref}
                      onBlur={onBlur}
                      disabled={isSubmitting}
                      className="focus-visible:ring-primary file:text-foreground file:font-medium cursor-pointer"
                      onChange={(e) => setValue("file", e.target.files)}
                    />
                  </FormControl>
                  <div className="absolute left-0 right-0 top-full mt-1">
                    <FormMessage className="text-[11px] leading-none" />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto h-fit px-5 cursor-pointer flex shrink-0 items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  Enviando arquivo...
                  <Loader2Icon className="animate-spin h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Enviar
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
