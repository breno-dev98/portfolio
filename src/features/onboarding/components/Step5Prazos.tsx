"use client";

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useWizard } from "../context/WizardContext";

export function Step5Prazos() {
  const { data, update } = useWizard();
  return (
    <div className="space-y-6 max-w-md mx-auto w-full p-0">
      <div className="space-y-1.5">
        <Label className="text-xs sm:text-base" htmlFor="prazo">
          Para quando você precisa do projeto?*
        </Label>
        <Select value={data.project.deliveryEstimate} onValueChange={(value) => update({ project: { deliveryEstimate: value } })}>
          <SelectTrigger id="prazo" className="focus:ring-zinc-300 h-10 text-sm">
            <SelectValue placeholder="Selecione o prazo ideal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="urgente">Urgente (O mais rápido possível)</SelectItem>
            <SelectItem value="1mes">Dentro de 1 mês</SelectItem>
            <SelectItem value="2meses">De 1 a 2 meses</SelectItem>
            <SelectItem value="flexivel">Prazo flexível / Sem pressa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs md:text-base" htmlFor="orcamento">
          Qual a sua estimativa de orçamento disponível?*
        </Label>
        <Select value={data.project.budgetEstimate} onValueChange={(value) => update({ project: { budgetEstimate: value } })}>
          <SelectTrigger id="orcamento" className="focus:ring-zinc-300">
            <SelectValue placeholder="Selecione a faixa de investimento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ate3k">Até R$ 3.000</SelectItem>
            <SelectItem value="3k-7k">R$ 3.000 a R$ 7.000</SelectItem>
            <SelectItem value="7k-15k">R$ 7.000 a R$ 15.000</SelectItem>
            <SelectItem value="acima15k">Acima de R$ 15.000</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
