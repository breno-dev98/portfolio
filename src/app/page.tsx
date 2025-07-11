import { Metadata } from "next";
import HomePage from "./HomePage";

export const metadata: Metadata = {
  title: "Início - Breno Dev",
  description: "Portfólio de Breno Oliveira, desenvolvedor Full Stack especializado em aplicações web modernas.",
};

export default function Home() {
  return <HomePage />;
}
