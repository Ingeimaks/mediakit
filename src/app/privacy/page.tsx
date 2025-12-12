
"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function PrivacyPolicy() {
  const { t, language } = useLanguage();
  const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = new Date().toLocaleDateString(language === 'it' ? 'it-IT' : 'en-US', dateOptions);

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4 pl-0 hover:pl-2 transition-all">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.privacyPage.back}
          </Link>
        </Button>
        <h1 className="text-4xl font-bold tracking-tight mb-2">{t.privacyPage.title}</h1>
        <p className="text-muted-foreground">{t.privacyPage.lastUpdated}: {formattedDate}</p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-8 space-y-6 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">{t.privacyPage.noDataTitle}</h2>
            <p dangerouslySetInnerHTML={{ 
              __html: t.privacyPage.noDataText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
            }} />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">{t.privacyPage.cookiesTitle}</h2>
            <p>
              {t.privacyPage.cookiesText}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">{t.privacyPage.contactTitle}</h2>
            <p>
              {t.privacyPage.contactText}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">{t.privacyPage.servicesTitle}</h2>
            <p>
              {t.privacyPage.servicesText}
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
