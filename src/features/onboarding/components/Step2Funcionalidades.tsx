"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { OrcamentoData } from "../OnboardingWizard";
import { Input } from "@/components/ui/input";

interface StepProps {
  data: OrcamentoData;
  updateData: (fields: Partial<OrcamentoData>) => void;
}

export function Step2Funcionalidades({ data, updateData }: StepProps) {
  const listaFuncionalidades = [
    { id: "auth", label: "Sistema de Login / Cadastro de Usuários" },
    { id: "payment", label: "Integração de Pagamentos (Pix, Cartão, Boleto)" },
    { id: "admin", label: "Painel Administrativo / Dashboard de Gestão" },
    { id: "whatsapp", label: "Botão ou Automação com WhatsApp" },
    { id: "darkmode", label: "Suporte a Modo Escuro (Dark Mode)" },
    { id: "seo", label: "Otimização Avançada para o Google (SEO)" },
  ];

  const handleCheckChange = (id: string, checked: boolean) => {
    const atualizado = checked ? [...data.funcionalidades, id] : data.funcionalidades.filter((item) => item !== id);
    updateData({ funcionalidades: atualizado });
  };

  return (
    <div className="w-full max-w-xl mx-auto py-1">
      <div className="grid grid-cols-1 gap-2.5 max-h-[300px] overflow-y-auto pr-1 subtle-scrollbar">
        {listaFuncionalidades.map((func) => {
          const isChecked = data.funcionalidades.includes(func.id);
          return (
            <div
              key={func.id}
              className={`flex items-center space-x-3 p-3 sm:p-3.5 rounded-lg border transition-all ${
                isChecked ? "border-primary bg-primary/5 dark:bg-primary/5" : "border-border"
              }`}
            >
              <Checkbox id={func.id} checked={isChecked} onCheckedChange={(checked) => handleCheckChange(func.id, !!checked)} />
              <Label htmlFor={func.id} className="text-xs sm:text-sm font-medium leading-tight cursor-pointer w-full py-0.5 text-left">
                {func.label}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
