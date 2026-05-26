"use client";

import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { OrcamentoData } from "../OnboardingWizard";

interface StepProps {
  data: OrcamentoData;
  updateData: (fields: Partial<OrcamentoData>) => void;
}

export function Step4Detalhes({ data, updateData }: StepProps) {
  return (
    <div className="space-y-4 max-w-xl mx-auto w-full">

      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição do Projeto (Opcional):</Label>
        <Textarea
          id="descricao"
          rows={6}
          maxLength={1500}
          placeholder="Ex: Gostaria de criar um MVP para validar um sistema de agendamento de barbearias na minha região. Minha principal referência visual é o site X..."
          value={data.descricao}
          onChange={(e) => updateData({ descricao: e.target.value })}
          className="h-40 focus-visible:ring-zinc-300 resize-none"
        />
        <div className="text-right text-xs text-muted-foreground">{data.descricao.length} / 1500 caracteres</div>
      </div>
    </div>
  );
}
