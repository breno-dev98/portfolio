// app/contato/page.tsx
import { Metadata } from "next";
import ContatoClient from "./ContatoClient";

export const metadata: Metadata = {
  title: "Contato - Meu Portfólio",
  description: "Página de contato para falar comigo",
};

export default function ContatoPage() {
  return <ContatoClient />;
}
