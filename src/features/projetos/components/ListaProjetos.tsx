"use client";

import React from "react";
import { CardProjeto } from "./CardProjeto";
import { ProjetoProps } from "../types";



interface ListaProjetosProps {
  dados: ProjetoProps[];
}

export function ListaProjetos({ dados }: ListaProjetosProps) {
  if (dados.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed rounded-lg">
        <p className="text-muted-foreground">Você ainda não possui nenhum projeto iniciado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {dados.map((projeto) => (
        <CardProjeto key={projeto.id} projeto={projeto} />
      ))}
    </div>
  );
}
