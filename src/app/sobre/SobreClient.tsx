"use client";

import React from "react";
import { Code, Server, MonitorSmartphone, Users, MapPin, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function SobreClient() {
  return (
    <main className="container max-w-5xl mx-auto px-6 md:px-8 space-y-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Sobre Mim</h1>

      <section className="grid grid-cols 1 md:grid-cols-3 gap-6">
        {/* Card Profile */}
        <Card className="mx-auto w-full text-center bg-background">
          <Image
            src="https://avatars.githubusercontent.com/u/196721561?v=4"
            alt="image"
            width={200}
            height={200}
            className="w-48 h-48 rounded-full mx-auto mt-2"
          />
          <CardHeader>
            <CardTitle className="text-2xl">Breno Oliveira</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-md">Desenvolvedor Full Stack</CardDescription>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="flex gap-2 items-center">
              <MapPin className="min-w-3 w-4 max-w-6" />
              <p className="text-sm">Fortaleza, Ceará, Brasil</p>
            </div>
            <div className="flex gap-2 items-center">
              <Calendar className="min-w-3 w-4 max-w-6" />
              <p className="text-sm">2+ anos de experiência</p>
            </div>
          </CardFooter>
        </Card>

        {/* Card About */}
        <Card className="md:col-span-2 bg-background">
          <CardHeader>
            <CardTitle className="text-2xl">Minha História</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
                Olá! Eu sou <span className="font-semibold">Breno Oliveira</span>, um desenvolvedor web fullstack apaixonado por tecnologia, design e
                inovação. Com experiência prática em projetos reais e foco em soluções eficientes, ajudo empresas e pessoas a transformarem ideias em
                sistemas modernos, responsivos e escaláveis.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg mt-4">
                Domino tecnologias como <span className="font-semibold">React, Next.js, Node.js, Express</span> e bancos de dados como{" "}
                <span className="font-semibold">PostgreSQL, MongoDB e MySQL</span>. Tenho olhar crítico para a experiência do usuário e zelo por um
                código limpo, reutilizável e alinhado com boas práticas de arquitetura.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg mt-4">
                Estou sempre em busca de desafios, aprendizados e oportunidades para crescer junto com empresas que valorizam a tecnologia como
                diferencial competitivo.
              </p>
            </CardDescription>
          </CardContent>
        </Card>
      </section>

      {/* Stacks */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Minhas Tecnologias</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Frontend", icon: <MonitorSmartphone size={28} />, techs: ["React", "Next.js", "Tailwind", "React Native"] },
            { title: "Backend", icon: <Server size={28} />, techs: ["Node.js", "Express", "Fastify", "JWT"] },
            { title: "Banco de Dados", icon: <Code size={28} />, techs: ["PostgreSQL", "MongoDB", "MySQL", "Prisma"] },
            { title: "Outros", icon: <Users size={28} />, techs: ["Git", "REST API", "Arquitetura MVC", "Clean Code"] },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-background dark:bg-background border border-border dark:border-zinc-700 rounded-xl p-4 shadow hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-2 text-primary">
                {item.icon}
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                {item.techs.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Linha do tempo */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Minha Trajetória</h2>
        <ol className="relative border-s border-gray-300 dark:border-gray-600 space-y-10">
          {[
            {
              date: "Março 2024 - Início",
              title: "Início nos estudos de Desenvolvimento Web",
              description: "Me dediquei a aprender HTML, CSS, JavaScript e lógica de programação. Desde então, nunca mais parei de estudar.",
            },
            {
              date: "2024",
              title: "Criação dos primeiros projetos fullstack",
              description: "Construí sistemas com React no frontend e Node.js no backend, com foco em API REST e arquitetura organizada.",
            },
            {
              date: "Atualmente",
              title: "Projetos reais e construção de portfólio",
              description:
                "Trabalho em sistemas com foco em performance, escalabilidade e experiência do usuário. Busco constantemente evoluir como desenvolvedor e profissional.",
            },
          ].map((item, index) => (
            <li key={index} className="ms-4">
              <div className="absolute w-3 h-3 bg-primary rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900" />
              <time className="text-sm text-gray-500 dark:text-gray-400">{item.date}</time>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-base text-gray-600 dark:text-gray-300">{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA Final */}
      <section className="text-center mt-10 mb-10">
        <h2 className="text-xl md:text-2xl font-semibold mb-2 text-primary">Vamos trabalhar juntos?</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4 text-base md:text-lg">
          Estou sempre aberto a novas conexões, freelas e projetos incríveis. Se você busca alguém comprometido e técnico no seu time, me chame!
        </p>
        <a
          href="/contato"
          className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-md shadow hover:shadow-lg transition text-sm md:text-base"
        >
          Entrar em contato
        </a>
      </section>
    </main>
  );
}
