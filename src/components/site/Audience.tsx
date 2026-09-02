"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Users, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { stats } from "@/data/stats";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Audience() {
  const { t } = useLanguage();

  const bars = [
    { label: t.audience.male, val: stats.audience.malePct, color: "bg-blue-500" },
    { label: `${t.audience.age} 18-34`, val: stats.audience.age1834Pct, color: "bg-primary" },
    { label: t.audience.interests, val: 100, color: "bg-green-500" },
  ];

  const geoRows = [
    { c: t.common.italy, p: stats.audience.italyPct },
    { c: t.common.switzerland, p: stats.audience.switzerlandPct },
    { c: t.common.other, p: stats.audience.otherPct },
  ];

  return (
    <section id="audience" className="grid md:grid-cols-2 gap-8 px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Users className="h-6 w-6 text-primary" /> {t.audience.demographics}
            </CardTitle>
            <CardDescription>{t.audience.whoWatches}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {bars.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>{item.label}</span>
                  <span>{item.val}%</span>
                </div>
                <div
                  className="h-3 w-full bg-secondary rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuenow={item.val}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={item.label}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.val}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 * i }}
                    className={`h-full ${item.color}`}
                    aria-hidden
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Globe className="h-6 w-6 text-primary" /> {t.audience.geoDistribution}
            </CardTitle>
            <CardDescription>{t.audience.trafficSource}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.audience.country}</TableHead>
                  <TableHead className="text-right">%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {geoRows.map((row, i) => (
                  <TableRow key={i} className="hover:bg-muted/50">
                    <TableCell className="font-medium text-lg">
                      {row.c}
                    </TableCell>
                    <TableCell className="text-right font-bold text-lg">
                      {row.p}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
