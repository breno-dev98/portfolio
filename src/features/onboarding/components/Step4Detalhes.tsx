"use client";

import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useWizard } from "../context/WizardContext";

export function Step4Detalhes() {
  const { data, update } = useWizard();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold">Conte mais sobre o projeto</h2>
        <p className="text-sm text-muted-foreground mt-1">Quanto mais contexto, melhor a proposta.</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descrição resumida</Label>
        <Textarea
          id="description"
          rows={3}
          value={data.project.description || ""}
          onChange={(e) => update({ project: { description: e.target.value } })}
          placeholder="Em poucas linhas, o que o projeto resolve?"
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Detalhes, escopo e objetivos</Label>
        <Textarea
          rows={5}
          value={data.project.details || ""}
          onChange={(e) => update({ project: { details: e.target.value } })}
          placeholder="Páginas, integrações, público-alvo, métricas de sucesso..."
        />
      </div>
      <div className="space-y-2">
        <Label>Referências (sites, links)</Label>
        <Textarea
          rows={3}
          value={data.project.references || ""}
          onChange={(e) => update({ project: { references: e.target.value } })}
          placeholder="Cole URLs de referência, uma por linha"
        />
      </div>
    </div>
  );
}
