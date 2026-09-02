"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Play,
  MonitorPlay,
  TrendingUp,
  Clock,
  Zap,
  Calendar,
  BarChart3,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { stats } from "@/data/stats";
import { formatNumber } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { fadeInUp, staggerContainer } from "@/lib/anim";

function formatDuration(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}m ${s}s`;
}

export function StatsSection() {
  const { t } = useLanguage();

  const statCards = [
    {
      label: t.common.subscribers,
      value: stats.subscribers,
      icon: Users,
      desc: t.audience.subtitle,
      color: "text-blue-500",
    },
    {
      label: t.hero.stat2,
      value: stats.totalViews,
      icon: Play,
      desc: t.stats.lifetimeViews,
      color: "text-red-500",
    },
    {
      label: t.stats.avgViews,
      value: stats.avgViewsPerVideo,
      icon: MonitorPlay,
      desc: t.stats.onVideoCount.replace("{count}", stats.videoCount.toString()),
      color: "text-green-500",
    },
    {
      label: t.common.engagement,
      value: stats.engagementRatePct,
      suffix: "%",
      icon: TrendingUp,
      desc: t.stats.highInteraction,
      color: "text-purple-500",
    },
    {
      label: t.common.avgDuration,
      value: stats.avgDurationMinutes,
      suffix: ` ${t.common.minutes}`,
      icon: Clock,
      desc: t.stats.deepDiveFormat,
      color: "text-orange-500",
    },
    {
      label: t.stats.recentAvgViews,
      value: stats.recentAvgViews,
      icon: Zap,
      desc: t.stats.last10Videos,
      color: "text-yellow-500",
    },
    {
      label: t.stats.uploadsPerMonth,
      value: stats.uploadsPerMonth,
      suffix: " /" + t.common.month,
      icon: Calendar,
      desc: t.stats.consistentUploads,
      color: "text-cyan-500",
    },
  ];

  // Grafico a barre orizzontali in CSS (sostituisce recharts, ~100KB di JS in meno)
  const maxDuration = Math.max(stats.avgDurationReels, stats.avgDurationVideos, 1);
  const durationBars = [
    { label: t.stats.reels, value: stats.avgDurationReels, color: "bg-primary" },
    { label: t.stats.video, value: stats.avgDurationVideos, color: "bg-muted-foreground" },
  ];

  return (
    <motion.section
      id="numeri"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="space-y-12 px-6 md:px-12"
    >
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          {t.stats.title}
        </h2>
        <p className="text-muted-foreground text-lg">
          {t.stats.verifiedData}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, idx) => (
          <motion.div
            key={idx}
            variants={fadeInUp}
            whileHover={{ y: -5 }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2 group-hover:text-foreground transition-colors">
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold tracking-tight">
                  {formatNumber(stat.value)}
                  {stat.suffix}
                </div>
                <p className="text-xs text-muted-foreground mt-2 group-hover:text-primary transition-colors">
                  {stat.desc}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeInUp} className="w-full">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              {t.stats.durationContent}
            </CardTitle>
            <CardDescription>
              {t.stats.durationDesc}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {durationBars.map((bar) => (
                <div key={bar.label} className="space-y-1.5">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{bar.label}</span>
                    <span className="font-bold">{formatDuration(bar.value)}</span>
                  </div>
                  <div className="h-6 w-full bg-secondary rounded overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(bar.value / maxDuration) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full ${bar.color} rounded`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  );
}
