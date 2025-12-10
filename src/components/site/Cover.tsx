"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Cover() {
  return (
    <section className="section">
      <div className="flex flex-col items-center text-center md:items-start md:text-left">
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 rounded-md bg-[var(--primary)]" aria-hidden />
          <h1 className="heading-1">Media Kit 2025 – Ingeimaks</h1>
        </div>
        <p className="muted mt-2">
          Elettronica, ESP32, Arduino, Tech Reviews & Electric Mobility
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="#contact">
            <Button>Contatta</Button>
          </Link>
          <Button variant="outline" onClick={() => window.print()}>Scarica PDF</Button>
        </div>
        <div className="mt-8 w-full">
          <div className="w-full h-48 md:h-72 rounded-xl overflow-hidden border border-[var(--border)] bg-gradient-to-r from-sky-500/30 via-cyan-400/30 to-sky-600/30" />
          <p className="text-xs muted mt-2">Puoi sostituire il banner con un’immagine dal canale YouTube.</p>
        </div>
      </div>
    </section>
  );
}
