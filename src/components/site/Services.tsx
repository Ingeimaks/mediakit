"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/anim";

export function Services() {
  const { t } = useLanguage();

  const services = [
    {
      title: t.services.review.title,
      desc: t.services.review.desc,
      subject: "Collaborazione+Recensione+Prodotto",
    },
    {
      title: t.services.sponsored.title,
      desc: t.services.sponsored.desc,
      subject: "Collaborazione+Video+Sponsorizzato",
      highlight: true,
    },
    {
      title: t.services.shorts.title,
      desc: t.services.shorts.desc,
      subject: "Collaborazione+Shorts+%26+Reels",
    },
  ];

  return (
    <motion.section
      id="servizi"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="relative bg-gradient-to-br from-muted/50 via-background to-muted/50 p-8 md:p-12 rounded-[2rem] border border-border/50 overflow-hidden mx-6 md:mx-12"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -z-10" />

      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t.services.title}
        </h2>
        <p className="text-muted-foreground text-lg">
          {t.services.subtitle}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <Card
            key={idx}
            className={cn(
              "bg-background/80 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col",
              service.highlight
                ? "border-primary shadow-lg shadow-primary/10 scale-105 z-10"
                : "border-border"
            )}
          >
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className={service.highlight ? "text-primary text-xl" : "text-xl"}>
                  {service.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground leading-relaxed">
                {service.desc}
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant={service.highlight ? "default" : "outline"} className="w-full gap-2">
                <Link href={`mailto:info@ingeimaks.it?subject=${service.subject}`}>
                  <Mail className="h-4 w-4" />
                  {t.services.cta}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </motion.section>
  );
}
