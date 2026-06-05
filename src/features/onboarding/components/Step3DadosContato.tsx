"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { formatarDocumento, formatarWhatsapp } from "@/utils/masks";
import { useWizard } from "../context/WizardContext";
import { Checkbox } from "@/components/ui/checkbox";
import { authClient } from "@/lib/auth-client";

export function Step3DadosContato() {
  const [buscandoCep, setBuscandoCep] = useState(false);
  const { data, update } = useWizard();
  const { data: session } = authClient.useSession();
  const [useProfileEmail, setUseProfileEmail] = useState(false);

  const handleCheckboxChange = (checked: boolean) => {
    setUseProfileEmail(checked);

    if (checked && session?.user.email) {
      update({ customer: {  email: session.user.email } });
    } else if (!checked) {
      update({ customer: {  email: "" } });
    }
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const limpo = e.target.value.replace(/\D/g, "");
    const formatado = limpo.length > 5 ? `${limpo.slice(0, 5)}-${limpo.slice(5, 8)}` : limpo;

    update({ address: { cep: formatado } });

    if (limpo.length === 8) {
      setBuscandoCep(true);
      try {
        const res = await fetch(`https://brasilapi.com.br/api/cep/v2/${limpo}`);
        const dados = await res.json();

        if (dados.erro) {
          toast.error("CEP não encontrado. Digite o endereço manualmente.");
          setBuscandoCep(false);
          return;
        }

        update({
          address: {
            cep: dados.cep || formatado,
            street: dados.street || "",
            number: dados.number || "",
            neighborhood: dados.neighborhood || "",
            city: dados.city || "",
            state: dados.state || "",
            fullAddress: `${dados.street || ""} ${dados.number || ""}, ${dados.neighborhood || ""}, ${dados.city || ""} - ${dados.state || ""}`.trim(),
          },
        });

        toast.success("Endereço localizado com sucesso!");

        setTimeout(() => {
          document.getElementById("number")?.focus();
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
      <div className="relative flex items-center py-1">
        <div className="flex-grow border-t border-border"></div>
        <span className="flex-shrink mx-3 text-[10px] text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-1">
          <MapPin size={12} /> Endereço de Faturamento
        </span>
        <div className="flex-grow border-t border-border"></div>
      </div>

      {/* Bloco de Endereço Automatizado por CEP */}
      <div className="space-y-4">
        {/* Dados Pessoais / Contato */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="md:col-span-2 space-y-1">
            <Label htmlFor="fullName">Nome completo / Razão social</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Seu nome completo"
              maxLength={100}
              value={data.customer.fullName}
              onChange={(e) => update({ customer: {  fullName: e.target.value } })}
              className="focus-visible:ring-zinc-300 h-9 text-sm"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu.email@exemplo.com"
              maxLength={100}
              value={data.customer.email}
              disabled={useProfileEmail}
              onChange={(e) => update({ customer: {  email: e.target.value } })}
              className="focus-visible:ring-zinc-300 h-9 text-sm"
            />
            <div className="flex items-center gap-2 mt-1">
              <Checkbox id="userEmail" checked={useProfileEmail} onCheckedChange={handleCheckboxChange} />
              <Label htmlFor="userEmail" className="text-xs text-muted-foreground cursor-pointer1">
                Usar e-mail do cadastro
              </Label>
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="documento">CPF ou CNPJ:*</Label>
            <Input
              id="documento"
              type="text"
              placeholder="000.000.000-00"
              maxLength={18}
              value={data.customer.document}
              onChange={(e) => update({ customer: {  document: formatarDocumento(e.target.value) } })}
              className="focus-visible:ring-zinc-300 h-9 text-sm"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="whatsapp">WhatsApp / Celular:*</Label>
            <Input
              id="whatsapp"
              type="tel"
              placeholder="(85) 99999-9999"
              maxLength={15}
              value={data.customer.whatsapp}
              onChange={(e) => update({ customer: {  whatsapp: formatarWhatsapp(e.target.value) } })}
              className="focus-visible:ring-zinc-300 h-9 text-sm"
            />
          </div>

          {/* O campo CEP fica ao lado do WhatsApp no Desktop */}
          <div className="space-y-1">
            <Label htmlFor="cep">CEP:*</Label>
            <div className="relative">
              <Input
                id="cep"
                type="text"
                placeholder="00000-000"
                maxLength={9}
                value={data.address.cep}
                onChange={handleCepChange}
                className="focus-visible:ring-zinc-300 h-9 text-sm pr-7"
              />
              {buscandoCep && <Loader2 className="absolute right-2 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />}
            </div>
          </div>
        </div>

        {/* Bloco de Endereço Automatizado */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Endereço ocupa 3 colunas e o Número ocupa 1 no desktop */}
          <div className="md:col-span-3 space-y-1">
            <Label htmlFor="street">Endereço / Rua:*</Label>
            <Input
              id="street"
              type="text"
              placeholder="Rua, Avenida..."
              value={data.address.street}
              onChange={(e) => update({ address: { street: e.target.value } })}
              className="focus-visible:ring-zinc-300 h-9 text-sm"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="number">Número:*</Label>
            <Input
              id="number"
              type="text"
              placeholder="123, S/N"
              value={data.address.number}
              onChange={(e) => update({ address: { number: e.target.value } })}
              className="focus-visible:ring-zinc-300 h-9 text-sm"
            />
          </div>
        </div>

        {/* Bairro,Cidade e UF */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="md:col-span-2 space-y-1">
            <Label htmlFor="neighborhood">Bairro:*</Label>
            <Input
              id="neighborhood"
              type="text"
              placeholder="Seu bairro"
              value={data.address.neighborhood}
              onChange={(e) => update({ address: { neighborhood: e.target.value } })}
              className="focus-visible:ring-zinc-300 h-9 text-sm"
            />
          </div>

          <div className="md:col-span-2 space-y-1">
            <Label htmlFor="city">Cidade:*</Label>
            <Input
              id="city"
              type="text"
              placeholder="Sua cidade"
              value={data.address.city}
              onChange={(e) => update({ address: { city: e.target.value } })}
              className="focus-visible:ring-zinc-300 h-9 text-sm"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="state">UF:*</Label>
            <Input
              id="state"
              type="text"
              placeholder="CE"
              maxLength={2}
              value={data.address.state}
              onChange={(e) => update({ address: { state: e.target.value.toUpperCase() } })}
              className="focus-visible:ring-zinc-300 h-9 text-sm uppercase text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
