import React from "react";
import { Layout, ShoppingBag, Laptop, Code } from "lucide-react";
import { ProjectType } from "./types";

export const PROJECT_TYPE_MAP: Record<ProjectType, { label: string; icon: React.ComponentType<{ size?: number }> }> = {
  landing: { label: "Landing Page", icon: Layout },
  institucional: { label: "Site Inst.", icon: Laptop },
  ecommerce: { label: "E-commerce", icon: ShoppingBag },
  sistema: { label: "Sistema Web", icon: Code },
};

export const FEATURE_MAP: Record<string, string> = {
  auth: "Login / Cadastro",
  payment: "Pagamentos (Pix/Cartão)",
  admin: "Painel / Dashboard",
  whatsapp: "Botão WhatsApp",
  darkmode: "Modo Escuro",
  seo: "Otimização (SEO)",
};

export const DELIVERY_ESTIMATE_MAP: Record<string, string> = {
  urgente: "Urgente",
  "1mes": "Até 1 mês",
  "2meses": "1 a 2 meses",
  flexivel: "Flexível",
};

export const BUDGET_ESTIMATE_MAP: Record<string, string> = {
  ate3k: "Até R$ 3k",
  "3k-7k": "R$ 3k a R$ 7k",
  "7k-15k": "R$ 7k a R$ 15k",
  acima15k: "Acima R$ 15k",
};