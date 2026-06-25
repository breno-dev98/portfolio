import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FEATURES_CATALOG, Project } from "../types";
import { BUDGET_ESTIMATE_MAP, DELIVERY_ESTIMATE_MAP } from "../constants";
import { formatarDocumento, maskPhone } from "@/utils/masks";

interface TabBriefingProps {
  project: Project;
}

export function TabBriefing({ project }: TabBriefingProps) {
  const customer = project.customer!;

  return (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="font-semibold">Investimento e Prazo</h3>
          <div className="space-y-2 text-sm">
            <Row label="Faixa de investimento" value={BUDGET_ESTIMATE_MAP[project.budgetEstimate] ?? "—"} />
            <Row label="Prazo estimado" value={DELIVERY_ESTIMATE_MAP[project.deliveryEstimate] ?? "—"} />
            <Row label="Criado em" value={project.createdAt.toLocaleDateString() ?? "—"} />
            <Row label="Atualizado em" value={project.updatedAt.toLocaleDateString() ?? "—"} />
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold">Cliente</h3>
          <div className="space-y-2 text-sm">
            <Row label="Nome" value={customer?.fullName ?? "—"} />
            <Row label="Email" value={customer?.email ?? "—"} />
            <Row label="Documento" value={formatarDocumento(customer?.document) ?? "—"} />
            <Row label="WhatsApp" value={maskPhone(customer?.whatsapp) ?? "—"} />
            <Row
              label="Endereço"
              value={
                customer?.address?.street
                  ? `${customer?.address?.street}, ${customer?.address?.number}, ${customer?.address?.neighborhood} - ${customer?.address?.city}, ${customer?.address?.state}`
                  : "—"
              }
            />
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="font-semibold">Funcionalidades Escolhidas</h3>
        <div className="flex flex-wrap gap-1.5">
          {project.features.map((id: string) => {
            const f = FEATURES_CATALOG.find((x) => x.id === id);
            return f ? (
              <Badge key={id} variant="outline">
                {f.label}
              </Badge>
            ) : null;
          })}
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="font-semibold">Detalhes</h3>
        <div className="space-y-2 text-sm">
          <div>{project.details ?? "—"}</div>
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="font-semibold">Descrição</h3>
        <div className="space-y-2 text-sm">
          <div>{project.description ?? "—"}</div>
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="font-semibold">Referências</h3>
        <div className="space-y-2 text-sm">
          <div>{project.references ?? "—"}</div>
        </div>
      </Card>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-foreground">{value}</span>
    </div>
  );
}
