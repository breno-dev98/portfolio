"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrcamentoData } from "../OnboardingWizard";
import { Loader2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { formatarDocumento, formatarWhatsapp } from "@/utils/masks";

interface StepProps {
  data: OrcamentoData;
  updateData: (fields: Partial<OrcamentoData>) => void;
}

export function Step3DadosContato({ data, updateData }: StepProps) {
  const [buscandoCep, setBuscandoCep] = useState(false);

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const limpo = e.target.value.replace(/\D/g, "");
    const formatado = limpo.length > 5 ? `${limpo.slice(0, 5)}-${limpo.slice(5, 8)}` : limpo;

    updateData({ cep: formatado });

    if (limpo.length === 8) {
      setBuscandoCep(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${limpo}/json/`);
        const dados = await res.json();

        if (dados.erro) {
          toast.error("CEP não encontrado. Digite o endereço manualmente.");
          setBuscandoCep(false);
          return;
        }

        updateData({
          logradouro: dados.logradouro || "",
          bairro: dados.bairro || "",
          cidade: dados.localidade || "",
          uf: dados.uf || "",
        });

        toast.success("Endereço localizado com sucesso!");

        setTimeout(() => {
          document.getElementById("numero")?.focus();
        }, 100);
      } catch (error) {
        toast.error("Erro ao buscar o CEP. Tente preencher manualmente.");
      } finally {
        setBuscandoCep(false);
      }
    }
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto w-full text-left p-2">
      {/* Grid de Contatos Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="whatsapp">WhatsApp / Celular:*</Label>
          <Input
            id="whatsapp"
            type="tel"
            placeholder="(85) 99999-9999"
            maxLength={15}
            value={data.whatsapp}
            onChange={(e) => updateData({ whatsapp: formatarWhatsapp(e.target.value) })}
            className="focus-visible:ring-zinc-300 h-9 text-sm"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="documento">CPF ou CNPJ:*</Label>
          <Input
            id="documento"
            type="text"
            placeholder="000.000.000-00"
            maxLength={18}
            value={data.documento}
            onChange={(e) => updateData({ documento: formatarDocumento(e.target.value) })}
            className="focus-visible:ring-zinc-300 h-9 text-sm"
          />
        </div>
      </div>

      <div className="relative flex items-center py-1">
        <div className="flex-grow border-t border-border"></div>
        <span className="flex-shrink mx-3 text-[10px] text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-1">
          <MapPin size={12} /> Endereço de Faturamento
        </span>
        <div className="flex-grow border-t border-border"></div>
      </div>

      {/* Bloco de Endereço Automatizado por CEP */}
      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-3">
          <div className="col-span-2 space-y-1">
            <Label htmlFor="cep">CEP:*</Label>
            <div className="relative">
              <Input
                id="cep"
                type="text"
                placeholder="00000-000"
                maxLength={9}
                value={data.cep}
                onChange={handleCepChange}
                className="focus-visible:ring-zinc-300 h-9 text-sm pr-7"
              />
              {buscandoCep && <Loader2 className="absolute right-2 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />}
            </div>
          </div>
          <div className="col-span-2 space-y-1">
            <Label htmlFor="numero">Número:*</Label>
            <Input
              id="numero"
              type="text"
              placeholder="123, S/N"
              value={data.numero}
              onChange={(e) => updateData({ numero: e.target.value })}
              className="focus-visible:ring-zinc-300 h-9 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <div className="col-span-4 space-y-1">
            <Label htmlFor="logradouro">Logradouro / Rua:*</Label>
            <Input
              id="logradouro"
              type="text"
              placeholder="Rua, Avenida..."
              value={data.logradouro}
              onChange={(e) => updateData({ logradouro: e.target.value })}
              className="focus-visible:ring-zinc-300 h-9 text-sm"
            />
          </div>

          <div className="col-span-4 md:col-span-2 space-y-1">
            <Label htmlFor="bairro">Bairro:*</Label>
            <Input
              id="bairro"
              type="text"
              placeholder="Ex: Centro"
              value={data.bairro}
              onChange={(e) => updateData({ bairro: e.target.value })}
              className="focus-visible:ring-zinc-300 h-9 text-sm"
            />
          </div>

          <div className="col-span-3 md:col-span-1 space-y-1">
            <Label htmlFor="cidade">Cidade:*</Label>
            <Input
              id="cidade"
              type="text"
              placeholder="Sua cidade"
              value={data.cidade}
              onChange={(e) => updateData({ cidade: e.target.value })}
              className="focus-visible:ring-zinc-300 h-9 text-sm"
            />
          </div>

          <div className="col-span-1 space-y-1">
            <Label htmlFor="uf">UF:*</Label>
            <Input
              id="uf"
              type="text"
              placeholder="CE"
              maxLength={2}
              value={data.uf}
              onChange={(e) => updateData({ uf: e.target.value.toUpperCase() })}
              className="focus-visible:ring-zinc-300 h-9 text-sm uppercase text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
