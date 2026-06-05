"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useWizard } from "../context/WizardContext";

export function Step2Funcionalidades() {
  const { data, update } = useWizard();
  const listaFuncionalidades = [
    { id: "auth", label: "Sistema de Login / Cadastro de Usuários" },
    { id: "payment", label: "Integração de Pagamentos (Pix, Cartão, Boleto)" },
    { id: "admin", label: "Painel Administrativo / Dashboard de Gestão" },
    { id: "whatsapp", label: "Botão ou Automação com WhatsApp" },
    { id: "darkmode", label: "Suporte a Modo Escuro (Dark Mode)" },
    { id: "seo", label: "Otimização Avançada para o Google (SEO)" },
  ];

  const handleCheckChange = (id: string, checked: boolean) => {
    const atualizado = checked ? [...data.project.features, id] : data.project.features.filter((item) => item !== id);
    update({ project: { features: atualizado } });
  };

  return (
    <div className="w-full max-w-xl mx-auto p-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pr-1">
        {listaFuncionalidades.map((func) => {
          const isChecked = data.project.features.includes(func.id);
          return (
            <Label
              key={func.id}
              htmlFor={func.id}
              className={`flex items-center space-x-3 p-3 sm:p-3.5 rounded-lg border transition-all cursor-pointer ${
                isChecked ? "border-primary bg-primary/5 dark:bg-primary/5" : "border-border"
              }`}
            >
              <Checkbox id={func.id} checked={isChecked} onCheckedChange={(checked) => handleCheckChange(func.id, !!checked)} />
              {func.label}
            </Label>
          );
        })}
      </div>
    </div>
  );
}
