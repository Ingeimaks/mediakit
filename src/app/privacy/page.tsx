
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4 pl-0 hover:pl-2 transition-all">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna al Media Kit
          </Link>
        </Button>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground">Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}</p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-8 space-y-6 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">1. Nessuna Raccolta Dati</h2>
            <p>
              Giovanni Mannara (Ingeimaks) si impegna a proteggere la tua privacy. 
              <strong>Non raccogliamo, non memorizziamo e non trattiamo alcun dato personale</strong> attraverso questo sito web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">2. Cookie e Tracciamento</h2>
            <p>
              Questo sito è puramente informativo e statico. Non utilizziamo cookie di profilazione, cookie analitici 
              o altri strumenti di tracciamento per monitorare il comportamento degli utenti.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">3. Contatti</h2>
            <p>
              Se decidi di contattarci tramite email (cliccando sui link &quot;mailto&quot; presenti nel sito), 
              il tuo client di posta si aprirà permettendoti di inviare un messaggio. 
              In tal caso, tratteremo il tuo indirizzo email e il contenuto del messaggio esclusivamente per risponderti, 
              senza salvarli in database automatizzati o cederli a terzi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">4. Servizi Terzi</h2>
            <p>
              Il sito potrebbe contenere link a piattaforme esterne (es. YouTube, Instagram, Facebook). 
              Cliccando su tali link, lascerai questo sito e sarai soggetto alle privacy policy delle rispettive piattaforme.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
