import { Metadata } from "next";
import ProjetosClient from "./ProjetosClient";

export const metadata: Metadata = {
  title: "Projetos - Meu Portfólio",
  description: "Conheça meus principais projetos e trabalhos recentes.",
};

export default function ProjetosPage() {
  return <ProjetosClient />;
}
