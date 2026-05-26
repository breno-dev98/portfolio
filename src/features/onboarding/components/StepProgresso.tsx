"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";

interface StepProgressoProps {
  currentStep: number;
  totalSteps: number;
}

export function StepProgresso({ currentStep, totalSteps }: StepProgressoProps) {
  const porcentagem = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const titulos = ["Tipo do Projeto", "Funcionalidades", "Dados de Contato", "Detalhes Finais", "Prazos e Valores", "Revisão do Briefing"];

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold text-primary uppercase tracking-wider">{titulos[currentStep - 1]}</span>
        <span className="text-muted-foreground font-medium">
          Passo {currentStep} de {totalSteps}
        </span>
      </div>
      <Progress value={porcentagem} className="h-2 transition-all duration-300" />
    </div>
  );
}
