import { Metadata } from "next";
import HeroSection from "../components/landing-page/HeroSection";
import SobreSection from "../components/landing-page/SobreSection";
import ProjetosSection from "@/components/landing-page/ProjetosSection";
import ContatoSection from "../features/contato/ContatoSection";
import Header from "@/components/landing-page/Header";

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
