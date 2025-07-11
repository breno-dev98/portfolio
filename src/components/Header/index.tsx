"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Box, Info, Phone, Moon, Sun } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";

export default function Header() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={24} /> },
    { name: "Sobre", href: "/sobre", icon: <Info size={24} /> },
    { name: "Projetos", href: "/projetos", icon: <Box size={24} /> },
    { name: "Contato", href: "/contato", icon: <Phone size={24} /> },
  ];

  const linkClass = (href: string) =>
    pathname === href
      ? "text-primary font-bold dark:text-sidebar-ring"
      : "text-gray-700 font-semibold dark:text-muted-forenground hover:text-primary transition";

  return (
    <>
      {/* Header desktop */}
      <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50 hidden md:flex px-4 py-4 dark:bg-background">
        <div className="relative w-full max-w-7xl mx-auto flex items-center justify-center">
          {/* Logo fixada à esquerda */}
          <div className="absolute left-0 flex items-center gap-3">
            <Avatar className="w-14 h-14">
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

          {/* Navegação centralizada */}
          <nav className="flex space-x-6">
            {navLinks.map((link) => (
              <Link href={link.href} className={`bg-background py-1.5 px-2 rounded-md hover:bg-muted ${linkClass(link.href)}`} key={link.href}>
                <div>
                  {link.name}
                </div>
              </Link>
            ))}
          </nav>

          {/* Botão de tema fixado à direita */}
          <div className="absolute right-0">
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label="Alternar tema"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {resolvedTheme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Spacer para o header desktop */}
      <div className="hidden md:block h-16" />

      {/* Header mobile */}
      <header className="bg-white shadow-md fixed top-0 left-0 w-full flex z-50 md:hidden max-w-7xl mx-auto items-center justify-between px-4 py-4 dark:bg-black">
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

        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          aria-label="Alternar tema"
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      {/* Menu inferior mobile */}
      <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-black border-t border-border shadow-inner flex justify-around items-center py-2 md:hidden z-50">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center text-xs ${
              pathname === link.href ? "text-primary font-semibold dark:text-primary-forenground" : "text-muted-foreground dark:text-muted-foreground"
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
