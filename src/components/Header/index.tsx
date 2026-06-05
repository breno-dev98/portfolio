"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Box, Info, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const [activeHash, setActiveHash] = useState("#hero");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["hero", "sobre", "projetos", "contato"];

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveHash(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  if (!mounted) return null;

  const navLinks = [
    { name: "Home", href: "#hero", icon: <Home size={24} /> },
    { name: "Sobre", href: "#sobre", icon: <Info size={24} /> },
    { name: "Projetos", href: "#projetos", icon: <Box size={24} /> },
    { name: "Contato", href: "#contato", icon: <Phone size={24} /> },
  ];

  const isLinkActive = (href: string) => {
    if (href.startsWith("#")) {
      return activeHash === href;
    }
    return pathname === href;
  };

  const linkClass = (href: string) =>
    isLinkActive(href)
      ? "text-primary font-bold dark:text-primary"
      : "text-gray-700 font-semibold dark:text-muted-foreground hover:text-primary transition";

  return (
    <>
      {/* Header desktop */}
      <header className="bg-background shadow-md fixed top-0 left-0 w-full z-50 hidden md:flex px-4 py-4 dark:bg-background">
        <div className="relative w-full max-w-7xl mx-auto flex items-center justify-center">
          {/* Logo fixada à esquerda */}
          <div className="absolute left-0 flex items-center gap-3">
            <Avatar className="w-14 h-14">
              <AvatarImage src="https://avatars.githubusercontent.com/u/196721561?v=4" />
              <AvatarFallback>BO</AvatarFallback>
            </Avatar>
            <div>
              <Link href="/" className="text-xl font-bold text-primary dark:text-white">
                Breno Oliveira
              </Link>
              <p className="text-xs text-normal text-muted-foreground">Desenvolvedor FullStack</p>
            </div>
          </div>

          {/* Navegação centralizada */}
          <nav className="flex space-x-6">
            {navLinks.map((link) => (
              <Link href={link.href} className={`bg-background py-1.5 px-2 rounded-md hover:bg-muted ${linkClass(link.href)}`} key={link.href}>
                <div>{link.name}</div>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Spacer para o header desktop */}
      <div className="hidden md:block h-16" />

      {/* Header mobile */}
      <header className="bg-background shadow-md fixed top-0 left-0 w-full flex z-50 md:hidden max-w-7xl mx-auto items-center justify-between px-4 py-4 dark:bg-background">
        <div className="flex items-center gap-3 text-black dark:text-white">
          <Avatar className="min-w-11 min-h-11 w-auto">
            <AvatarImage src="https://avatars.githubusercontent.com/u/196721561?v=4" />
            <AvatarFallback>BO</AvatarFallback>
          </Avatar>
          <div>
            <Link href="/" className="text-xl font-bold text-black dark:text-white">
              Breno Oliveira
            </Link>
            <p className="text-xs text-normal text-muted-foreground">Desenvolvedor FullStack</p>
          </div>
        </div>
      </header>

      {/* Menu inferior mobile */}
      <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-black border-t border-border shadow-inner flex justify-around items-center py-2 md:hidden z-50">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center text-xs ${
              isLinkActive(link.href) ? "text-green-500 font-semibold dark:text-green-400" : "text-muted-foreground dark:text-muted-foreground"
            }`}
          >
            {link.icon}
            <span className="mt-1">{link.name}</span>
          </Link>
        ))}
      </nav>

      {/* Spacer para o menu inferior mobile */}
      <div className="md:hidden h-16" />
    </>
  );
}
