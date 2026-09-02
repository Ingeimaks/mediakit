"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { fadeInUp } from "@/lib/anim";

export function About() {
  const { t } = useLanguage();

  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className="grid md:grid-cols-2 gap-12 items-center relative px-6 md:px-12"
    >
      <div className="space-y-8 z-10">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight border-l-4 border-primary pl-4">
            {t.header.about}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t.hero.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t.common.location}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <span className="font-bold text-lg">{t.common.italy}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t.common.language}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-lg">{t.common.italian}</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-gradient-to-br from-muted/50 to-muted rounded-2xl p-8 border border-border/50 shadow-inner flex flex-col justify-center space-y-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full group-hover:scale-110 transition-transform duration-500" />

        <h3 className="text-2xl font-bold">{t.services.title}</h3>
        <ul className="space-y-4">
          {[
            t.services.review.title,
            t.services.tutorial.title,
            t.services.sponsored.title,
            t.services.social.title,
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
              <span className="font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
