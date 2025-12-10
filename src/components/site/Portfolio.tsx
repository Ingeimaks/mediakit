import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

const items = [
  {
    title: "ESP8266 Web Server (AP)",
    desc: "Server web in modalità Access Point con ESP8266 e Arduino IDE.",
    href: "https://www.ingeimaks.it/esp8266-web-server-ap/",
  },
  {
    title: "ESP8266 Web Server (STA)",
    desc: "Server web in modalità Station per reti Wi‑Fi esistenti.",
    href: "https://www.ingeimaks.it/esp8266-web-server-sta/",
  },
  {
    title: "ESP8266 Deep Sleep",
    desc: "Gestione del sonno profondo con sveglia su ESP8266.",
    href: "https://www.ingeimaks.it/esp8266-deep-sleep/",
  },
  {
    title: "Costruzione stampante 3D",
    desc: "Serie di articoli sulla costruzione di una stampante 3D.",
    href: "https://www.ingeimaks.it/stampa3d/",
  },
  {
    title: "Hack T‑Rex di Chrome",
    desc: "Modifica del gioco T‑Rex offline di Google Chrome.",
    href: "https://www.ingeimaks.it/hack-t-rex-chrome/",
  },
  {
    title: "Fortnite in VR",
    desc: "Esperienza di gioco di Fortnite in realtà virtuale.",
    href: "https://www.ingeimaks.it/fortnite-vr/",
  },
];

export function Portfolio() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card key={item.href}>
          <CardHeader>
            <h3 className="font-semibold">{item.title}</h3>
          </CardHeader>
          <CardContent>
            <p className="muted">{item.desc}</p>
            <Link href={item.href} target="_blank" className="mt-3 inline-flex underline">
              Vedi contenuto
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

