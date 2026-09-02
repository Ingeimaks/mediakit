"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { stats, type TopVideo } from "@/data/stats";
import { formatNumber } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { fadeInUp, staggerContainer } from "@/lib/anim";
import Image from "next/image";

function VideoCard({ video }: { video: TopVideo }) {
  const { t } = useLanguage();
  const id = video.url.split("v=")[1];
  // maxresdefault (1280x720) se esiste, altrimenti fallback a hqdefault (480p)
  const [src, setSrc] = React.useState(
    `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
  );

  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group border-muted hover:border-primary/30">
      <div className="relative aspect-video w-full bg-muted overflow-hidden">
        <Image
          src={src}
          alt={video.title}
          fill
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() =>
            setSrc(`https://img.youtube.com/vi/${id}/hqdefault.jpg`)
          }
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="h-16 w-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <Play className="fill-black text-black h-8 w-8 ml-1" />
          </div>
        </div>
        <Badge className="absolute bottom-2 right-2 bg-black/80 text-white hover:bg-black/80">
          {formatNumber(video.views)} {t.common.views}
        </Badge>
      </div>
      <CardHeader className="p-5 pb-2">
        <CardTitle className="text-lg line-clamp-2 leading-tight group-hover:text-primary transition-colors">
          {video.title}
        </CardTitle>
      </CardHeader>
      <CardFooter className="p-5 pt-auto mt-auto">
        <Button variant="outline" className="w-full group/btn" asChild>
          <Link href={video.url} target="_blank">
            {t.portfolio.watchOnYoutube}
            <ExternalLink className="ml-2 h-3 w-3 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function Portfolio() {
  const { t } = useLanguage();

  return (
    <section id="portfolio" className="space-y-12 px-6 md:px-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t.portfolio.title}
        </h2>
        <Button variant="outline" className="group" asChild>
          <Link href="https://youtube.com/ingeimaks" target="_blank">
            {t.portfolio.viewAll}{" "}
            <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {stats.topVideos.map((video, idx) => (
          <motion.div key={idx} variants={fadeInUp}>
            <VideoCard video={video} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
