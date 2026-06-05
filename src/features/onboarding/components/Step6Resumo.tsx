"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout, ShoppingBag, Laptop, Code, CheckSquare, Calendar, FileText, User } from "lucide-react";
import { useWizard } from "../context/WizardContext";

export function Step6Resumo() {
  const { data } = useWizard();
  const mapeamentoTipos: Record<string, { label: string; icon: React.ReactNode }> = {
    landing: { label: "Landing Page", icon: <Layout size={16} /> },
    institucional: { label: "Site Inst.", icon: <Laptop size={16} /> }, 
    ecommerce: { label: "E-commerce", icon: <ShoppingBag size={16} /> },
    custom: { label: "Sistema Web", icon: <Code size={16} /> },
  };

  const mapeamentoFuncionalidades: Record<string, string> = {
    auth: "Login / Cadastro",
    payment: "Pagamentos (Pix/Cartão)",
    admin: "Painel / Dashboard",
    whatsapp: "Botão WhatsApp",
    darkmode: "Modo Escuro",
    seo: "Otimização (SEO)",
  };

  const mapeamentoPrazos: Record<string, string> = {
    urgente: "Urgente",
    "1mes": "Até 1 mês",
    "2meses": "1 a 2 meses",
    flexivel: "Flexível",
  };

  const mapeamentoValores: Record<string, string> = {
    ate3k: "Até R$ 3k",
    "3k-7k": "R$ 3k a R$ 7k",
    "7k-15k": "R$ 7k a R$ 15k",
    acima15k: "Acima R$ 15k",
  };

  const projetoSelecionado = mapeamentoTipos[data.project.projectType!] || { label: "Não definido", icon: <Code size={16} /> };

  return (
    <div className="space-y-4 w-full text-left">
      <div className="grid grid-cols-2 gap-3">
        {/* Card: Título e Tipo de Projeto */}
        <Card className="border-muted bg-muted/10 p-3 sm:p-4 flex flex-col justify-between space-y-1">
          <CardHeader className="flex flex-row items-center gap-1.5 p-0 space-y-0">
            <div className="text-primary shrink-0">{projetoSelecionado.icon}</div>
            <CardTitle className="text-[11px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Identificação do Projeto
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-xs sm:text-sm font-bold text-foreground truncate">{data.project.title || "Sem nome"}</p>
            <span className="text-[10px] sm:text-xs text-muted-foreground block mt-0.5 font-medium">{projetoSelecionado.label}</span>
          </CardContent>
        </Card>

        {/* Card: Prazos e Valores */}
        <Card className="border-muted bg-muted/10 p-3 sm:p-4 flex flex-col justify-between space-y-0">
          <CardHeader className="flex flex-row items-center gap-1.5 p-0 space-y-0">
            <div className="text-primary shrink-0">
              <Calendar size={14} />
            </div>
            <CardTitle className="text-[11px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider">Prazo & Invest.</CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-0.5 text-[11px] sm:text-xs">
            <div className="flex justify-between items-center gap-1">
              <span className="text-muted-foreground">Prazo:</span>
              <span className="font-medium text-foreground truncate">{mapeamentoPrazos[data.project.deliveryEstimate] || "—"}</span>
            </div>
            <div className="flex justify-between items-center gap-1">
              <span className="text-muted-foreground">Verba:</span>
              <span className="font-semibold text-green-600 dark:text-green-400 truncate">{mapeamentoValores[data.project.budgetEstimate] || "—"}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Box: Dados de Contato e Faturamento */}
        <Card className="border-muted bg-muted/10 p-3 sm:p-4">
          <CardHeader className="flex flex-row items-center gap-1.5 p-0 space-y-0">
            <div className="text-primary">
              <User size={14} />
            </div>
            <CardTitle className="text-[11px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Identificação & Endereço
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-4 border-b border-border/40 pb-1">
              <div>
                <span className="text-muted-foreground block text-[10px] uppercase font-medium">WhatsApp</span>
                <span className="font-medium text-foreground">{data.customer.whatsapp || "—"}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px] uppercase font-medium">Doc. (CPF/CNPJ)</span>
                <span className="font-medium text-foreground">{data.customer.document || "—"}</span>
              </div>
            </div>
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase font-medium">Endereço de Faturamento</span>
              <p className="text-foreground leading-normal mt-0.5 font-medium">
                {data.address.street ? `${data.address.street}, ${data.address.number} — ${data.address.neighborhood}, ${data.address.city}/${data.address.state} (CEP: ${data.address.cep})` : "—"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Box: Funcionalidades */}
        <Card className="border-muted bg-muted/10 p-3 sm:p-4">
          <CardHeader className="flex flex-row items-center gap-1.5 p-0 space-y-0">
            <div className="text-primary">
              <CheckSquare size={14} />
            </div>
            <CardTitle className="text-[11px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recursos Escolhidos</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {data.project.features.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {data.project.features.map((funcId) => (
                  <Badge key={funcId} variant="secondary" className="px-2 py-0.5 font-normal text-[10px] sm:text-xs rounded-md">
                    {mapeamentoFuncionalidades[funcId] || funcId}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-[11px] sm:text-xs text-muted-foreground italic">Nenhum recurso extra selecionado.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Box: Descrição Livre */}
      <Card className="border-muted bg-muted/10 p-3 sm:p-4">
        <CardHeader className="flex flex-row items-center gap-1.5 p-0 space-y-0">
          <div className="text-primary">
            <FileText size={14} />
          </div>
          <CardTitle className="text-[11px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Detalhes e Referências
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-1.5">
          <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap text-foreground bg-background p-2.5 rounded-md border border-border/50 max-h-[100px] overflow-y-auto subtle-scrollbar">
            {data.project.description?.trim() || "Nenhuma descrição adicional informada."}
          </p>
          <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap text-foreground bg-background p-2.5 rounded-md border border-border/50 max-h-[100px] overflow-y-auto subtle-scrollbar">
            {data.project.details?.trim() || "Nenhuma observação extra informada."}
          </p>
          <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap text-foreground bg-background p-2.5 rounded-md border border-border/50 max-h-[100px] overflow-y-auto subtle-scrollbar">
            {data.project.references?.trim() || "Nenhuma referência informada."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
