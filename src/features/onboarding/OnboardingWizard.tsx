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
import { useWizard, WizardProvider } from "./context/WizardContext";

function OnboardingWizardContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { step, setStep, data, update } = useWizard();
  const totalSteps = 6;

  const isStepInvalid = () => {
    switch (step) {
      case 1:
        return !data.project.projectType || !data.project.title?.trim();
      case 2:
        return data.project.features.length === 0;
      case 3:
        return (
          !data.customer.whatsapp?.trim() ||
          !data.customer.document?.trim() ||
          !data.address.cep?.trim() ||
          !data.address.street?.trim() ||
          !data.address.neighborhood?.trim() ||
          !data.address.number?.trim() ||
          !data.address.city?.trim() ||
          !data.address.state?.trim()
        );
      case 4:
        return !data.project.description?.trim() || !data.project.details?.trim();
      case 5:
        return !data.project.deliveryEstimate || !data.project.budgetEstimate;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepInvalid()) return;

    if (step === 3) {
      const enderecoCompleto = `${data.address.street}, ${data.address.number} - ${data.address.neighborhood}, ${data.address.city}/${data.address.state}`;
      update({ address: { ...data.address, fullAddress: enderecoCompleto } });
    }

    setStep(Math.min(step + 1, totalSteps));
  };

  const handleBack = () => {
    setStep(Math.max(step - 1, 1));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await criarOnboardingAction(data);

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
    <div className="w-full max-w-3xl mx-auto bg-background p-6 sm:p-8 rounded-xl shadow-lg border border-border flex flex-col justify-between h-auto max-h-[calc(100vh-5rem)] sm:max-h-[90dvh] ">
      {/* Topo com Barra de Progresso */}
      <div className="flex flex-col flex-1 min-h-0">
        <StepProgresso currentStep={step} totalSteps={totalSteps} />

        <div className="text-center mt-5 mb-3 space-y-1 shrink-0">
          <h2 className="text-base sm:text-lg font-bold tracking-tight text-foreground">{textosPassos[step as keyof typeof textosPassos].titulo}</h2>
          <p className="text-xs sm:text-sm text-muted-foreground px-4">{textosPassos[step as keyof typeof textosPassos].sub}</p>
        </div>
        {/* Renderização Condicional dos Passos */}
        <div className="flex-1 sm:min-h-[52dvh] sm:max-h-[52dvh] [scrollbar-gutter:stable] overflow-y-auto pr-1 flex flex-col justify-start py-2 subtle-scrollbar">
          {step === 1 && <Step1Objetivo />}
          {step === 2 && <Step2Funcionalidades />}
          {step === 3 && <Step3DadosContato />}
          {step === 4 && <Step4Detalhes />}
          {step === 5 && <Step5Prazos />}
          {step === 6 && <Step6Resumo />}
        </div>
      </div>

      {/* Rodapé com os Botões de Navegação */}
      <div className="flex justify-between items-center pt-4 border-t border-border">
        <Button variant="ghost" onClick={handleBack} disabled={step === 1 || loading} className="flex items-center gap-2 cursor-pointer">
          <ArrowLeft size={16} /> Voltar
        </Button>

        {step < totalSteps ? (
          <Button onClick={handleNext} disabled={isStepInvalid() || loading} className="flex items-center gap-2 cursor-pointer bg-primary text-white">
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

export function OnboardingWizard() {
  return (
    <WizardProvider>
      <OnboardingWizardContent />
    </WizardProvider>
  );
}
