import { Metadata } from "next";
import SobreClient from "./SobreClient";

export const metadata: Metadata = {
  title: "Sobre Mim - Meu Portfólio",
  description: "Conheça mais sobre minha história, tecnologias e trajetória como desenvolvedor.",
};

export default function SobrePage() {
  return <SobreClient />;
}
