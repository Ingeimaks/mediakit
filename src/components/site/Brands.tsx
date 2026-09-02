"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getAssetPath } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { fadeInUp } from "@/lib/anim";
import Image from "next/image";

type Brand = {
  name: string;
  domain: string;
  logo: string;
};

// Ordine: prima i brand più importanti/riconoscibili, poi il resto.
const brands: Brand[] = [
  { name: "Samsung", domain: "samsung.com", logo: "samsung.png" },
  { name: "Qualcomm", domain: "qualcomm.com", logo: "qualcomm.png" },
  { name: "Arduino", domain: "arduino.cc", logo: "arduino.png" },
  { name: "Raspberry Pi", domain: "raspberrypi.com", logo: "raspberry.svg" },
  { name: "FNIRSI", domain: "fnirsi.com", logo: "fnirsi.png" },
  { name: "Flashforge", domain: "flashforge.com", logo: "flashforge.png" },
  { name: "Anycubic", domain: "anycubic.com", logo: "anycubic.png" },
  { name: "Elegoo", domain: "elegoo.com", logo: "elegoo.png" },
  { name: "Snapmaker", domain: "snapmaker.com", logo: "snapmaker.svg" },
  { name: "LaserPecker", domain: "laserpecker.com", logo: "laserpecker.png" },
  { name: "Imou", domain: "imoulife.com", logo: "imou.png" },
  { name: "Engwe", domain: "engwe-bikes.com", logo: "engwe.png" },
  { name: "BIGTREETECH", domain: "bigtree-tech.com", logo: "bigtreetech.png" },
  { name: "Monport", domain: "monportlaser.com", logo: "monport.png" },
  { name: "PCBWay", domain: "pcbway.com", logo: "pcbway.png" },
  { name: "Banggood", domain: "banggood.com", logo: "banggood.png" },
  { name: "Geekbuying", domain: "geekbuying.com", logo: "geekbuying.png" },
  { name: "Geekmall", domain: "geekmall.eu", logo: "geekmall.png" },
  { name: "Orange Pi", domain: "orangepi.com", logo: "orange.png" },
  { name: "Zima", domain: "zimaspace.com", logo: "zima.webp" },
  { name: "Antigravity", domain: "antigravity.tech", logo: "antigravity.png" },
  { name: "Flexispot", domain: "flexispot.com", logo: "flexispot.png" },
  { name: "DUOTTS", domain: "duotts.com", logo: "duotts.jpg" },
  { name: "Linogy", domain: "linogy.com", logo: "linogy.png" },
  { name: "Toocaa", domain: "toocaa.com", logo: "toocaa.png" },
  { name: "Acmer", domain: "acmerlaser.com", logo: "acmer.png" },
  { name: "Tripo AI", domain: "tripo3d.ai", logo: "tripo-ai.png" },
  { name: "Hitem 3D", domain: "hi3d.ai", logo: "hitem-3d.svg" },
];

export function Brands() {
  const { t } = useLanguage();

  return (
    <motion.section
      id="collaborazioni"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="space-y-8 px-6 md:px-12"
    >
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t.brands.title}
        </h2>
        <p className="text-muted-foreground text-lg">
          {t.brands.subtitle}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8 md:gap-12">
        {brands.map((brand) => (
          <Link
            key={brand.name}
            href={`https://${brand.domain}`}
            target="_blank"
            className="group flex flex-col items-center justify-center gap-3 h-28 w-32 md:h-32 md:w-40 bg-white dark:bg-muted/30 rounded-lg border border-border/50 p-4 transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:scale-105"
            title={brand.name}
          >
            <div className="relative h-12 w-full md:h-14">
              <Image
                src={getAssetPath(`brands/${brand.logo}`)}
                alt={brand.name}
                fill
                unoptimized
                className="object-contain transition-all duration-500"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            </div>
            <span className="text-xs md:text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors text-center">
              {brand.name}
            </span>
          </Link>
        ))}
      </div>
    </motion.section>
  );
}
