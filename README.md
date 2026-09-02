# MediaKit • Giovanni Mannara (INGEIMAKS)

Sito mediakit professionale realizzato con Next.js (App Router), React, TypeScript, Tailwind, shadcn/ui e icone Lucide.

## Requisiti

- Node 18+ / 20+
- npm

## Setup

```bash
npm install
npm run dev
```

Apri `http://localhost:3000/` per vedere l'app in sviluppo (in dev non c'è basePath).

## Struttura

- `src/app/page.tsx`: server component che compone le sezioni
- `src/components/site/*`: sezioni del sito (header, hero, about, stats, socials, audience, portfolio, brands, services, contact, footer)
- `src/components/ui/*`: componenti UI stile shadcn
- `src/data/stats.ts`: statistiche canale (generate da `scripts/update-stats.mjs`)
- `src/data/socials.ts`: dati social (generati dallo script)
- `src/locales/{it,en}.ts`: traduzioni
- `src/lib/config.ts`: fonte di verità per basePath e URL del sito
- `src/app/globals.css`: tema personalizzato e Tailwind

## Aggiornare le statistiche

Lo script `scripts/update-stats.mjs` aggiorna `src/data/stats.ts` e `src/data/socials.ts` usando la YouTube Data API e degli scraper best-effort per i social.

```bash
# Richiede YOUTUBE_API_KEY in .env.local (senza chiave lo script salta e termina con successo)
npm run update:stats
```

## Build statico e deploy (GitHub Pages)

Con `output: "export"` impostato in `next.config.ts`, il build genera direttamente i file statici in `out/`:

```bash
npm run build
```

I file statici saranno in `out/`.

Push su `master`: la Action `deploy.yml` pubblica su `gh-pages`.

## Note

- Le immagini sono non ottimizzate per compatibilità con l'export statico.
- Aggiorna i link social e contatti se necessario.
