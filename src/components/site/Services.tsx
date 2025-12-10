import { Card, CardContent, CardHeader } from "@/components/ui/card";

const services = [
  "Video recensione completo",
  "Integrazione sponsor nel video",
  "Shorts/TikTok",
  "Test tecnico prodotto",
  "Contenuti UGC",
  "Tutorial sponsorizzati",
  "Video dedicati a lanci di prodotto",
];

export function Services() {
  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold">Servizi per aziende</h3>
      </CardHeader>
      <CardContent>
        <ul className="grid md:grid-cols-2 gap-3">
          {services.map((s) => (
            <li key={s} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

