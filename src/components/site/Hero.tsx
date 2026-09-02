"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { stats } from "@/data/stats";
import { getAssetPath } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { fadeInUp, staggerContainer } from "@/lib/anim";

export function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const { t } = useLanguage();

  return (
    <motion.section
      style={{ opacity, scale }}
      className="relative flex flex-col items-center text-center space-y-8 py-20 md:py-32 overflow-hidden px-6 md:px-12"
    >
      {/* Blob decorativi statici (nessuna animazione infinita, meno carico GPU) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -z-10" />

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 1.5,
        }}
        className="relative"
      >
        <div className="absolute -inset-1 rounded-full bg-black blur-md opacity-50"></div>
        <Avatar className="h-32 w-32 md:h-48 md:w-48 border-4 border-background relative shadow-2xl">
          <AvatarImage
            src={
              stats.avatarUrl.startsWith("http")
                ? stats.avatarUrl
                : getAssetPath(stats.avatarUrl)
            }
            alt="Giovanni Mannara"
            className="object-cover"
          />
          <AvatarFallback className="text-4xl md:text-6xl font-bold bg-muted">
            GM
          </AvatarFallback>
        </Avatar>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="space-y-4 max-w-3xl"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-[300%] animate-gradient pb-2"
        >
          Giovanni Mannara
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="text-xl md:text-3xl text-muted-foreground font-light"
        >
          {t.hero.role} •{" "}
          <span className="text-primary font-semibold">Ingeimaks</span>
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-3"
      >
        {[t.tags.electronics, t.tags.programming, t.tags.diy, t.tags.techReviews].map(
          (tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="px-4 py-1.5 text-sm md:text-base hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
            >
              {tag}
            </Badge>
          )
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 pt-6 w-full sm:w-auto"
      >
        <Button
          asChild
          size="lg"
          className="rounded-full text-lg h-12 px-8 shadow-lg shadow-primary/25 hover:shadow-primary/50 transition-all hover:-translate-y-1"
        >
          <Link href="mailto:info@ingeimaks.it">{t.common.contactMe}</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="rounded-full text-lg h-12 px-8 border-2 hover:bg-accent/50 transition-all hover:-translate-y-1"
        >
          <Link href="https://youtube.com/ingeimaks" target="_blank">
            <Youtube className="mr-2 h-5 w-5 text-red-600" />
            {t.common.youtubeChannel}
          </Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="rounded-full text-lg h-12 px-8 border-2 hover:bg-accent/50 transition-all hover:-translate-y-1"
          onClick={() => window.print()}
        >
          <Download className="mr-2 h-5 w-5" />
          {t.common.downloadPdf}
        </Button>
      </motion.div>
    </motion.section>
  );
}
