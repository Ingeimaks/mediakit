import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ages = [
  { label: "18–24", value: 35 },
  { label: "25–34", value: 40 },
  { label: "35–44", value: 15 },
  { label: "45+", value: 10 },
];

const gender = [
  { label: "Uomini", value: 85 },
  { label: "Donne", value: 15 },
];

const countries = [
  { label: "Italia", value: 70 },
  { label: "USA", value: 10 },
  { label: "Altri", value: 20 },
];

export function Audience() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Fasce d’età</h3>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {ages.map((a) => (
              <li key={a.label} className="flex items-center gap-3">
                <span className="w-20 text-sm muted">{a.label}</span>
                <div className="flex-1 h-2 bg-[var(--muted)] rounded">
                  <div
                    className="h-2 bg-[var(--primary)] rounded"
                    style={{ width: `${a.value}%` }}
                  />
                </div>
                <span className="w-10 text-sm text-right">{a.value}%</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs muted">Dati stimati per canali tech/maker in assenza di statistiche pubbliche.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold">Genere</h3>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {gender.map((g) => (
              <li key={g.label} className="flex items-center gap-3">
                <span className="w-20 text-sm muted">{g.label}</span>
                <div className="flex-1 h-2 bg-[var(--muted)] rounded">
                  <div
                    className="h-2 bg-[var(--accent)] rounded"
                    style={{ width: `${g.value}%` }}
                  />
                </div>
                <span className="w-10 text-sm text-right">{g.value}%</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold">Paesi principali</h3>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {countries.map((c) => (
              <li key={c.label} className="flex items-center gap-3">
                <span className="w-20 text-sm muted">{c.label}</span>
                <div className="flex-1 h-2 bg-[var(--muted)] rounded">
                  <div
                    className="h-2 bg-[var(--secondary)] rounded"
                    style={{ width: `${c.value}%` }}
                  />
                </div>
                <span className="w-10 text-sm text-right">{c.value}%</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

