"use client";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Moon, SunMedium, Menu, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const toggleTheme = () => {
    const next = (resolvedTheme ?? theme) === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-[var(--border)] print:hidden">
      <div className="container flex h-16 items-center justify-between">
        <Link href="#" className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-md bg-[var(--primary)]" aria-hidden />
          <span className="text-base font-semibold">{t.header.title}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#about" className="hover:underline">
            {t.header.about}
          </Link>
          <Link href="#projects" className="hover:underline">
            {t.header.projects}
          </Link>
          <Link href="#contact" className="hover:underline">
            {t.header.contact}
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Cambia lingua">
                <Globe size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("it")} className={language === "it" ? "bg-accent" : ""}>
                🇮🇹 Italiano
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-accent" : ""}>
                🇬🇧 English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" aria-label={t.header.toggleTheme} onClick={toggleTheme}>
            <SunMedium size={18} className="hidden dark:block" />
            <Moon size={18} className="block dark:hidden" />
          </Button>
        </nav>
        <div className="md:hidden flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Cambia lingua">
                <Globe size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("it")} className={language === "it" ? "bg-accent" : ""}>
                🇮🇹 Italiano
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-accent" : ""}>
                🇬🇧 English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" aria-label={t.header.toggleTheme} onClick={toggleTheme}>
            <SunMedium size={18} className="hidden dark:block" />
            <Moon size={18} className="block dark:hidden" />
          </Button>
          <Button variant="outline" aria-label={t.header.openMenu}>
            <Menu size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
}
