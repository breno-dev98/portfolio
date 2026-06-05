"use client";
import { createContext, useContext, useMemo, useState } from "react";
import type { Project, Customer, Address, ProjectType } from "../../projetos/types";

export type WizardProjectData = Omit<
  Pick<Project, "projectType" | "title" | "features" | "budgetEstimate" | "deliveryEstimate" | "description" | "details" | "references">,
  "projectType"
> & {
  projectType?: ProjectType;
};

export type WizardCustomerData = Pick<Customer, "fullName" | "email" | "document" | "whatsapp">;
export type WizardAddressData = Omit<Address, "id" | "customerId">;

export interface WizardData {
  project: WizardProjectData;
  customer: WizardCustomerData;
  address: WizardAddressData;
}

export interface WizardDataUpdatePatch {
  project?: Partial<WizardProjectData>;
  customer?: Partial<WizardCustomerData>;
  address?: Partial<WizardAddressData>;
}


const initial: WizardData = {
  project: {
    title: "",
    projectType: undefined,
    features: [],
    budgetEstimate: "",
    deliveryEstimate: "",
    description: "",
    details: "",
    references: "",
  },
  customer: {
    fullName: "",
    email: "",
    document: "",
    whatsapp: "",
  },
  address: {
    cep: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    fullAddress: "",
  },
};

interface WizardContextValue {
  step: number;
  setStep: (n: number) => void;
  data: WizardData;
  update: (patch: Partial<WizardDataUpdatePatch> | ((prev: WizardData) => WizardData)) => void;
  reset: () => void;
}

const WizardContext = createContext<WizardContextValue | null>(null);

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(initial);

  const value = useMemo<WizardContextValue>(
    () => ({
      step,
      setStep,
      data,
      update: (patch) => {
        setData((prev) => {
          if (typeof patch === "function") {
            return patch(prev);
          }
          return {
            ...prev,
            project: patch.project ? { ...prev.project, ...patch.project } : prev.project,
            customer: patch.customer ? { ...prev.customer, ...patch.customer } : prev.customer,
            address: patch.address ? { ...prev.address, ...patch.address } : prev.address,
          };
        });
      },
      reset: () => {
        setStep(1);
        setData(initial);
      },
    }),
    [step, data],
  );

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used inside WizardProvider");
  return ctx;
}

export const WIZARD_STEPS = [
  { id: 1, label: "Tipo" },
  { id: 2, label: "Funcionalidades" },
  { id: 3, label: "Contato" },
  { id: 4, label: "Prazo e Valor" },
  { id: 5, label: "Detalhes" },
  { id: 6, label: "Resumo" },
];
