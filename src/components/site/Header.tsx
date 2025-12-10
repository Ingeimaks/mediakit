"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Moon, SunMedium, Menu } from "lucide-react";
import { useTheme } from "next-themes";

export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    const next = (resolvedTheme ?? theme) === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-[var(--border)] print:hidden">
      <div className="container flex h-16 items-center justify-between">
        <Link href="#" className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-md bg-[var(--primary)]" aria-hidden />
          <span className="text-base font-semibold">INGEIMAKS • MediaKit</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#about" className="hover:underline">
            About
          </Link>
          <Link href="#projects" className="hover:underline">
            Progetti
          </Link>
          <Link href="#contact" className="hover:underline">
            Contatti
          </Link>
          <Button variant="ghost" aria-label="Toggle theme" onClick={toggleTheme}>
            <SunMedium size={18} className="hidden dark:block" />
            <Moon size={18} className="block dark:hidden" />
          </Button>
        </nav>
        <div className="md:hidden flex items-center gap-2">
          <Button variant="ghost" aria-label="Toggle theme" onClick={toggleTheme}>
            <SunMedium size={18} className="hidden dark:block" />
            <Moon size={18} className="block dark:hidden" />
          </Button>
          <Button variant="outline" aria-label="Apri menu">
            <Menu size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
}
