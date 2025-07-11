"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Funnel } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CardAnimado from "@/components/animations/CardAnimado";

export default function ProjetosClient() {
  const [filterSelected, setFilterSelected] = useState("Todos");

  const filtros = ["Todos", "Full Stack", "Frontend", "Web App", "Mobile"];

  const projetos = [
    {
      image: "https://images.unsplash.com/photo-1542744094-3a31f272c490",
      title: "E-Commerce Platform",
      type: "Full Stack",
      description: "Plataforma completa de e-commerce com painel admin, pagamentos e gestão de estoque.",
      techs: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    },
    {
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
      title: "Dashboard Financeiro",
      type: "Frontend",
      description: "Painel de controle para análise de dados financeiros com gráficos interativos.",
      techs: ["React", "Chart.js", "Tailwind CSS"],
    },
    {
      image: "https://images.unsplash.com/photo-1542744094-3a31f272c490",
      title: "App de Delivery",
      type: "Mobile",
      description: "Aplicativo para pedidos e entregas, com rastreio em tempo real.",
      techs: ["React Native", "Expo", "Firebase"],
    },
    {
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
      title: "Gestão de Tarefas",
      type: "Web App",
      description: "Sistema de gerenciamento de tarefas com usuários, categorias e calendário.",
      techs: ["Vue", "Node.js", "MongoDB"],
    },
  ];

  const projetosFiltrados = filterSelected === "Todos" ? projetos : projetos.filter((p) => p.type === filterSelected);

  return (
    <main className="container mx-auto space-y-10 px-4 pt-5">
      {/* Hero Section */}
      <header className="text-center space-y-4 max-w-xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-primary-foreground">Meus Projetos</h1>
        <p className="text-lg md:text-xl text-muted-foreground dark:text-gray-300">
          Uma seleção dos meus trabalhos mais recentes e projetos que demonstram minhas habilidades
        </p>
      </header>

      {/* Filter Section */}
      <section aria-label="Filtros de projeto">
        <div className="flex flex-wrap justify-center gap-2">
          {filtros.map((tipo) => (
            <Button
              key={tipo}
              onClick={() => setFilterSelected(tipo)}
              className={`rounded-full flex items-center gap-2 cursor-pointer ${
                filterSelected === tipo
                  ? "bg-primary text-forenground dark:text-secondary"
                  : "bg-background border border-foreground text-foreground hover:bg-secondary"
              }`}
            >
              <Funnel size={16} /> {tipo}
            </Button>
          ))}
        </div>
      </section>

      {/* Cards Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projetosFiltrados.map((projeto, index) => (
          <CardAnimado key={index} delay={index * 0.1}>
            <Card className="w-full overflow-hidden pt-0 rounded-md bg-background animate-in fade-in zoom-in duration-700">
              <Image src={projeto.image} alt={`Imagem do projeto ${projeto.title}`} width={400} height={250} className="w-full h-48 object-cover" />
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-base md:text-lg">{projeto.title}</CardTitle>
                <Badge variant="secondary">{projeto.type}</Badge>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm md:text-base text-muted-foreground dark:text-gray-400">{projeto.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2">
                {projeto.techs.map((tech, i) => (
                  <Badge key={i} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </CardFooter>
            </Card>
          </CardAnimado>
        ))}
      </section>

      {/* Chamada final */}
      <section className="w-full flex">
        <Card className="mx-auto w-full max-w-2xl py-10 text-center border dark:border-primary-foreground">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">Gostou do que viu?</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sm md:text-base text-muted-foreground dark:text-gray-400">
              Estes são apenas alguns dos meus projetos. Tenho muito mais para mostrar!
            </CardDescription>
          </CardContent>
          <CardFooter>
            <CardAction className="mx-auto">
              <Link href="/contato" className="bg-primary py-2 px-4 rounded-md text-white text-sm md:text-md hover:bg-primary/90 transition">
                Vamos Conversar
              </Link>
            </CardAction>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
