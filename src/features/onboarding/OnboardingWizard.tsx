"use client";

import React, { useState } from "react";
import { StepProgresso } from "./components/StepProgresso";
import { Step1Objetivo } from "./components/Step1Objetivo";
import { Step2Funcionalidades } from "./components/Step2Funcionalidades";
import { Step3DadosContato } from "./components/Step3DadosContato";
import { Step4Detalhes } from "./components/Step4Detalhes";
import { Step5Prazos } from "./components/Step5Prazos";
import { Step6Resumo } from "./components/Step6Resumo";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { criarOnboardingAction } from "./actions";

export interface OrcamentoData {
  tipoProjeto: string;
  tituloProjeto: string;
  funcionalidades: string[];
  documento: string;
  whatsapp: string;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  endereco: string;
  prazoEstimado: string;
  orcamentoEstimado: string;
  descricao: string;
}

export function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<OrcamentoData>({
    tipoProjeto: "",
    tituloProjeto: "",
    funcionalidades: [],
    prazoEstimado: "",
    orcamentoEstimado: "",
    descricao: "",
    endereco: "",
    documento: "",
    whatsapp: "",
    cep: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: "",
  });

  const totalSteps = 6;

  const updateFormData = (fields: Partial<OrcamentoData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.tipoProjeto) {
        toast.warning("Por favor, selecione o tipo do seu projeto.");
        return;
      }
      if (!formData.tituloProjeto.trim()) {
        toast.warning("Por favor, insira um título para o seu projeto.");
        return;
      }
    }

    if (step === 3) {
      if (!formData.whatsapp || !formData.documento || !formData.cep || !formData.numero) {
        toast.warning("Por favor, preencha todos os campos obrigatórios de contato e endereço.");
        return;
      }
      const enderecoCompleto = `${formData.logradouro}, ${formData.numero} - ${formData.bairro}, ${formData.cidade}/${formData.uf}`;
      updateFormData({ endereco: enderecoCompleto });
    }

    if (step === 5 && (!formData.prazoEstimado || !formData.orcamentoEstimado)) {
      toast.warning("Por favor, preencha o prazo e a estimativa de orçamento.");
      return;
    }
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await criarOnboardingAction(formData);

      if (!result.success) {
        throw new Error(result.error);
      }

      toast.success("Briefing enviado com sucesso!", {
        description: "Analisaremos sua proposta e entraremos em contato no painel.",
      });

      router.replace("/painel");
      router.refresh();
    } catch (error: any) {
      toast.error("Erro ao enviar", {
        description: error.message || "Não foi possível registrar seu orçamento. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  const textosPassos = {
    1: { titulo: "Identificação do Projeto", sub: "Escolha a categoria e dê um nome de identificação para o seu produto.." },
    2: { titulo: "Recursos necessários", sub: "Quais funcionalidades essenciais seu projeto precisa ter?" },
    3: { titulo: "Dados de Contato e Faturamento", sub: "Preencha seus dados para a emissão da proposta comercial." },
    4: { titulo: "Detalhes e Referências", sub: "Adicione observações ou links de referências que você gosta." },
    5: { titulo: "Prazos e Valores", sub: "Informe sua previsão de investimento e tempo estimado." },
    6: { titulo: "Revise suas informações", sub: "Confira os dados do seu briefing antes de enviar." },
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-card p-6 sm:p-8 rounded-xl shadow-lg border border-border flex flex-col justify-between h-auto max-h-[calc(100vh-5rem)] sm:max-h-none sm:min-h-[580px]">
      {/* Topo com Barra de Progresso */}
      <div className="flex flex-col flex-1 min-h-0">
        <StepProgresso currentStep={step} totalSteps={totalSteps} />

        <div className="text-center mt-5 mb-3 space-y-1 shrink-0">
          <h2 className="text-base sm:text-lg font-bold tracking-tight text-foreground">{textosPassos[step as keyof typeof textosPassos].titulo}</h2>
          <p className="text-xs sm:text-sm text-muted-foreground px-4">{textosPassos[step as keyof typeof textosPassos].sub}</p>
        </div>
        {/* Renderização Condicional dos Passos */}
        <div className="flex-1 min-h-0 overflow-y-auto pr-1 flex flex-col justify-start py-3 subtle-scrollbar">
          {step === 1 && <Step1Objetivo data={formData} updateData={updateFormData} />}
          {step === 2 && <Step2Funcionalidades data={formData} updateData={updateFormData} />}
          {step === 3 && <Step3DadosContato data={formData} updateData={updateFormData} />}
          {step === 4 && <Step4Detalhes data={formData} updateData={updateFormData} />}
          {step === 5 && <Step5Prazos data={formData} updateData={updateFormData} />}
          {step === 6 && <Step6Resumo data={formData} />}
        </div>
      </div>

      {/* Rodapé com os Botões de Navegação */}
      <div className="flex justify-between items-center pt-4 border-t border-border">
        <Button variant="ghost" onClick={handleBack} disabled={step === 1 || loading} className="flex items-center gap-2 cursor-pointer">
          <ArrowLeft size={16} /> Voltar
        </Button>

        {step < totalSteps ? (
          <Button onClick={handleNext} className="flex items-center gap-2 cursor-pointer bg-primary text-white">
            Avançar <ArrowRight size={16} />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={loading} className="flex items-center gap-2 cursor-pointer bg-primary text-white">
            {loading ? "Enviando..." : "Finalizar Briefing"} <Check size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}
