import {
  User as PrismaUser,
  Customer as PrismaCustomer,
  Project as PrismaProject,
  Document as PrismaDocument,
  Checklist as PrismaChecklist,
  Address as PrismaAddress,
} from "@/generated/prisma/client";

export type ProjectType = "landing" | "institucional" | "ecommerce" | "sistema";
export type ProjectStatus = "briefing" | "proposal_sent" | "proposal_rejected" | "contract_signed" | "in_development" | "completed";

export interface AppUser extends PrismaUser {}

export interface Address extends PrismaAddress { }

export interface Customer extends PrismaCustomer {
  address?: Address | null;
}

export interface Project extends Omit<PrismaProject, "projectType" | "status"> {
  projectType: ProjectType;
  status: ProjectStatus;
  customer?: Customer | null;
  checklists?: ChecklistItem[];
  documents?: DocumentItem[];
}

export interface DocumentItem extends PrismaDocument {}
export interface ChecklistItem extends PrismaChecklist {}



export const PROJECT_TYPES: { value: ProjectType; label: string; description: string }[] = [
  { value: "landing", label: "Landing Page", description: "Página de conversão focada em um objetivo" },
  { value: "institucional", label: "Site Institucional", description: "Apresentação completa da empresa" },
  { value: "ecommerce", label: "E-commerce", description: "Loja virtual com carrinho e pagamentos" },
  { value: "sistema", label: "Sistema Web", description: "Aplicação personalizada e dashboards" },
];

export const FEATURES_CATALOG: { id: string; label: string; types: ProjectType[] }[] = [
  { id: "responsive", label: "Design responsivo", types: ["landing", "institucional", "ecommerce", "sistema"] },
  { id: "seo", label: "SEO técnico", types: ["landing", "institucional", "ecommerce"] },
  { id: "blog", label: "Blog / CMS", types: ["institucional", "ecommerce"] },
  { id: "auth", label: "Login de usuários", types: ["sistema", "ecommerce"] },
  { id: "payments", label: "Pagamentos (Stripe/Pix)", types: ["ecommerce", "sistema"] },
  { id: "dashboard", label: "Dashboard administrativo", types: ["sistema", "ecommerce"] },
  { id: "integrations", label: "Integrações via API", types: ["sistema", "ecommerce"] },
  { id: "whatsapp", label: "Integração WhatsApp", types: ["landing", "institucional", "ecommerce", "sistema"] },
  { id: "forms", label: "Formulários avançados", types: ["landing", "institucional", "sistema"] },
  { id: "analytics", label: "Analytics e tracking", types: ["landing", "institucional", "ecommerce", "sistema"] },
  { id: "multilang", label: "Multi-idioma", types: ["institucional", "ecommerce"] },
  { id: "chat", label: "Chat / suporte ao vivo", types: ["ecommerce", "sistema"] },
];
