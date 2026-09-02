"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { fadeInUp } from "@/lib/anim";

export function Contact() {
  const { t } = useLanguage();

  return (
    <motion.section
      id="contatti"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="py-20 text-center space-y-8 px-6 md:px-12"
    >
      <div className="space-y-4">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-[300%] animate-gradient pb-2">
          {t.contact.title}
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-lg">
          {t.contact.subtitle}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-6">
        <Button
          size="lg"
          className="gap-3 text-lg px-8 h-16 rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-105"
          asChild
        >
          <Link href="mailto:info@ingeimaks.it">
            <Mail className="h-6 w-6" />
            {t.contact.emailButton}
          </Link>
        </Button>
        <p className="text-xl font-medium text-foreground tracking-wide selection:bg-primary selection:text-primary-foreground">
          info@ingeimaks.it
        </p>
      </div>
    </motion.section>
  );
}
