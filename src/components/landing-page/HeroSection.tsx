"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import devHomePage from "../../../assets/dev-image-home.svg";
import Link from "next/link";

export default function HeroSection() {


  return (
    <section id="hero" className="max-w-5xl mx-auto px-4 flex-1">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 text-primary">
          Olá, eu sou o Breno, Desenvolvedor <br /> Fullstack
        </h1>
        <h3 className="text-xl sm:text-2xl text-muted-foreground">Construindo experiências web rápidas e modernas.</h3>
        <div className="flex flex-col mt-6 space-y-3 max-w-[60%] mx-auto">
          <Button asChild className="text-md sm:text-lg md:text-xl cursor-pointer" variant="default">
            <Link href="#projetos">Ver Projetos</Link>
          </Button>
          <Button asChild className="text-md sm:text-lg md:text-xl cursor-pointer" variant="default">
            <Link href="/signup">Iniciar Meu Projeto</Link>
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        <Image src={devHomePage} alt="Dev Image" className="min-w-48 w-54 sm:w-lg md:w-xl" />
      </div>
    </section>
  );
}
