"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { socials } from "@/data/socials";
import { getAssetPath, formatNumber, cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { fadeInUp } from "@/lib/anim";
import Image from "next/image";

export function Socials() {
  const { t } = useLanguage();

  return (
    <motion.section
      id="ecosistema"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="space-y-8 px-6 md:px-12"
    >
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t.social.title}
        </h2>
        <p className="text-muted-foreground text-lg">
          {t.social.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Object.entries(socials).map(([key, social]) => {
          const logoPath = getAssetPath(`socials/${key}.svg`);

          const count = social.followers || social.subscribers || 0;
          const label = social.followers
            ? t.common.followers
            : social.subscribers
            ? t.common.subscribers
            : t.common.community;

          // Colori per le ombre (rimossi bordi colorati)
          const shadowClass =
            key === "facebook" ? "hover:shadow-blue-500/40" :
            key === "telegram" ? "hover:shadow-sky-500/40" :
            key === "instagram" ? "hover:shadow-pink-500/40" :
            key === "tiktok" ? "hover:shadow-zinc-500/40" :
            key === "patreon" ? "hover:shadow-orange-500/40" :
            "hover:shadow-primary/40";

          return (
            <Link
              key={key}
              href={social.url}
              target="_blank"
              className={`group relative flex flex-col items-center justify-center p-6 gap-4 bg-card/50 backdrop-blur-sm border-2 border-border/50 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${shadowClass}`}
            >
              <div className="relative h-12 w-12 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={logoPath}
                  alt={social.label}
                  fill
                  unoptimized
                  className={cn(
                    "object-contain",
                    key === "tiktok" && "dark:invert"
                  )}
                />
              </div>

              <div className="text-center space-y-1">
                <div className="font-bold text-lg">{social.label}</div>
                {count > 0 ? (
                  <div className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                    {formatNumber(count)} {label}
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground opacity-70 group-hover:text-primary group-hover:opacity-100 transition-all">{t.common.joinNow}</div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </motion.section>
  );
}
