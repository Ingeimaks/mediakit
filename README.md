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

Apri `http://localhost:3000/mediakit` per vedere l’app in sviluppo.

## Struttura

- `src/app/page.tsx`: pagina unica con sezioni About, Progetti, Contatti
- `src/components/ui/*`: componenti UI (Button, Card) stile shadcn
- `src/components/site/*`: Header e Footer
- `src/app/globals.css`: tema personalizzato e Tailwind

## Build statico e deploy (GitHub Pages)

1. Imposta il nome del repository in `next.config.ts` (`repoName`)
2. Esegui il build ed export:

```bash
npm run build
npx next export
```

I file statici saranno in `out/`.

3. Push su `main`: la Action `deploy.yml` pubblica su `gh-pages`.

## Note

- Le immagini sono non ottimizzate per compatibilità con export statico.
- Aggiorna i link social e contatti se necessario.
