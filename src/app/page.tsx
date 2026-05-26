import { Metadata } from "next";
import HeroSection from "../components/sections/HeroSection";
import SobreSection from "../components/sections/SobreSection";
import ProjetosSection from "@/components/sections/ProjetosSection";
import ContatoSection from "../features/contato/ContatoSection";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Início - Breno Dev",
  description: "Portfólio de Breno Oliveira, desenvolvedor Full Stack especializado em aplicações web modernas.",
};

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen pb-16 pt-8">
        <HeroSection />
        <SobreSection />
        <ProjetosSection />
        <ContatoSection />
      </main>
    </>
  );
}
