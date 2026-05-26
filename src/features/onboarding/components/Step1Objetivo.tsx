"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout, ShoppingBag, Laptop, Code } from "lucide-react";
import { OrcamentoData } from "../OnboardingWizard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface StepProps {
  data: OrcamentoData;
  updateData: (fields: Partial<OrcamentoData>) => void;
}

export function Step1Objetivo({ data, updateData }: StepProps) {
  const opcoes = [
    { id: "landing", title: "Landing Page", desc: "Página única de alta conversão para produtos ou serviços.", icon: <Layout size={20} /> },
    { id: "institucional", title: "Site Institucional", desc: "Presença digital completa para apresentar sua empresa.", icon: <Laptop size={20} /> },
    { id: "ecommerce", title: "E-commerce", desc: "Loja virtual completa com carrinho e checkout integrado.", icon: <ShoppingBag size={20} /> },
    { id: "custom", title: "Sistema Web", desc: "Plataforma personalizada, SaaS ou dashboards sob medida.", icon: <Code size={20} /> },
  ];

  return (
    <div className="space-y-5 max-w-xl mx-auto w-full text-left py-1">
      {/* Input de Nome do Projeto */}
      <div className="space-y-1.5 px-1">
        <Label htmlFor="tituloProjeto" className="text-xs sm:text-sm font-semibold text-foreground">
          Nome do seu Site ou Sistema:*
        </Label>
        <Input
          id="tituloProjeto"
          placeholder="Ex: Minha Loja de Joias, App Delicatta, Meu Portfólio..."
          value={data.tituloProjeto}
          onChange={(e) => updateData({ tituloProjeto: e.target.value })}
          className="focus-visible:ring-zinc-300 h-10 text-sm"
        />
      </div>

      {/* Grid de Escolha de Categoria */}
      <div className="space-y-2">
        <Label className="text-xs sm:text-sm font-semibold text-foreground px-1">Selecione o modelo do projeto:*</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {opcoes.map((opcao) => {
            const isSelected = data.tipoProjeto === opcao.id;
            return (
              <Card
                key={opcao.id}
                onClick={() => updateData({ tipoProjeto: opcao.id })}
                className={`cursor-pointer border-2 transition-all hover:border-primary/50 flex flex-col justify-between ${
                  isSelected ? "border-primary bg-primary/5 dark:bg-primary/10" : "border-muted"
                }`}
              >
                <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                  <div className={`p-1.5 rounded-lg shrink-0 ${isSelected ? "text-primary bg-primary/10" : "text-muted-foreground bg-muted"}`}>
                    {opcao.icon}
                  </div>
                  <CardTitle className="text-xs sm:text-sm font-bold text-foreground">{opcao.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[11px] sm:text-xs text-left leading-normal">{opcao.desc}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
