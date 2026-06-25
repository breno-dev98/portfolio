"use client";

import React, { useTransition } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { signDocumentAction } from "../actions";
import { toast } from "sonner";

interface TabContractProps {
  projectId: string;
  documents: any[];
  customerData: any;
}

export function TabContract({ projectId, documents }: TabContractProps) {
  const [isPending, startTransition] = useTransition();

  const handleSign = (docId: string) => {
    startTransition(async () => {
      await signDocumentAction(docId, projectId);
      toast.success("Documento assinado digitalmente!");
    });
  };

  if (documents.length === 0) {
    return (
      <Card className="p-8 text-center mt-4">
        <FileText className="h-8 w-8 mx-auto text-primary mb-2" />
        <h3 className="font-semibold text-base">Nenhum documento gerado</h3>
      </Card>
    );
  }

  return (
    <div className="space-y-3 mt-4">
      {documents.map((d) => (
        <Card key={d.id} className="p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-sm">{d.type === "proposta" ? "Proposta Comercial" : "Contrato de Serviço"}</p>
              <p className="text-xs text-muted-foreground">{d.signedAt ? "Documento Assinado" : "Aguardando assinatura"}</p>
            </div>
          </div>
          {d.signedAt ? (
            <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/10">Assinado</Badge>
          ) : (
            <Button size="sm" variant="outline" onClick={() => handleSign(d.id)} disabled={isPending}>
              Assinar
            </Button>
          )}
        </Card>
      ))}
    </div>
  );
}
