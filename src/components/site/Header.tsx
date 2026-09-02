"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, Globe, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn, getAssetPath } from "@/lib/utils";
import Image from "next/image";

const SECTION_IDS = ["about", "numeri", "portfolio", "contatti"];

export function Header() {
  const [activeSection, setActiveSection] = React.useState("");
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { t, language, setLanguage } = useLanguage();

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Rilevamento semplice della sezione attiva
      const sections = ["about", "numeri", "portfolio", "servizi", "contatti"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [t.header.about, t.header.numbers, t.header.projects, t.header.contact];

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0 }}
        onClick={scrollToTop}
        aria-label={t.common.backToTop}
        className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all"
      >
        <ArrowUp className="h-6 w-6" />
      </motion.button>

      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="w-full flex h-16 items-center justify-between px-6 md:px-12">
          <Link href="/" className="flex items-center gap-2 group" onClick={scrollToTop}>
            <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-full border border-border shadow-sm">
              <Image
                src={getAssetPath("logoFinito2.png")}
                alt="Logo Ingeimaks"
                fill
                className="object-cover"
                unoptimized
                priority
              />
            </div>
            <span className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
              INGEIMAKS
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navItems.map((item, idx) => {
              const sectionId = SECTION_IDS[idx];
              return (
                <Link
                  key={sectionId}
                  href={`#${sectionId}`}
                  className={cn(
                    "relative transition-colors hover:text-primary",
                    activeSection === sectionId ? "text-primary font-bold" : "text-muted-foreground"
                  )}
                >
                  {item}
                  {activeSection === sectionId && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">{t.common.language}</span>
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
            <ModeToggle />

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader className="text-center sm:text-center">
                  <SheetTitle>{t.common.menu}</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-8 mt-10 items-center text-center">
                  {navItems.map((item, idx) => {
                    const sectionId = SECTION_IDS[idx];
                    return (
                      <Link
                        key={sectionId}
                        href={`#${sectionId}`}
                        className="text-xl font-medium hover:text-primary transition-colors py-2 w-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
