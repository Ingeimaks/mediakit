
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsAndConditions() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4 pl-0 hover:pl-2 transition-all">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna al Media Kit
          </Link>
        </Button>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Termini e Condizioni</h1>
        <p className="text-muted-foreground">Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}</p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-8 space-y-6 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">1. Accettazione dei Termini</h2>
            <p>
              Accedendo a questo sito web, accetti di essere vincolato dai presenti Termini e Condizioni, 
              da tutte le leggi e i regolamenti applicabili, e accetti di essere responsabile del rispetto 
              di qualsiasi legge locale applicabile.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">2. Proprietà Intellettuale</h2>
            <p>
              Tutti i contenuti presenti su questo sito (testi, grafica, loghi, immagini, video) sono di proprietà esclusiva 
              di Giovanni Mannara (Ingeimaks) o dei rispettivi proprietari che ne hanno concesso l&apos;uso. 
              È vietata la riproduzione, distribuzione o utilizzo non autorizzato di tali materiali.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">3. Collaborazioni e Servizi</h2>
            <p className="mb-4">
              Le informazioni fornite in questo Media Kit relative a statistiche, audience e servizi sono indicative 
              e basate sui dati disponibili al momento dell&apos;ultimo aggiornamento. Le condizioni specifiche di ogni collaborazione 
              saranno regolate da appositi contratti o accordi scritti tra le parti.
            </p>
            <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
              <h3 className="text-lg font-bold mb-2">Trasparenza e Onestà Intellettuale</h3>
              <p className="italic">
                &quot;In ogni collaborazione, mantengo la piena indipendenza editoriale e intellettuale. 
                Le opinioni espresse nei contenuti sono personali, oneste e trasparenti, basate sulla mia reale esperienza con il prodotto o servizio. 
                Sebbene rispetti gli accordi commerciali stipulati con i brand, non accetto vincoli che compromettano la veridicità delle mie recensioni 
                o la fiducia della mia community.&quot;
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">4. Limitazione di Responsabilità</h2>
            <p>
              In nessun caso Giovanni Mannara o i suoi fornitori saranno responsabili per danni (inclusi, senza limitazione, 
              danni per perdita di dati o profitti) derivanti dall&apos;uso o dall&apos;impossibilità di utilizzare i materiali 
              presenti su questo sito.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">5. Modifiche</h2>
            <p>
              Ci riserviamo il diritto di rivedere questi termini di servizio in qualsiasi momento senza preavviso. 
              Utilizzando questo sito web, accetti di essere vincolato dalla versione corrente di questi Termini e Condizioni.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">6. Legge Applicabile</h2>
            <p>
              Qualsiasi reclamo relativo a questo sito web sarà regolato dalle leggi dello Stato Italiano 
              senza riguardo alle disposizioni sui conflitti di legge.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
