import { stats } from "@/data/stats";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function formatNumber(n: number) {
  if (!n || n <= 0) return "N/D";
  return Intl.NumberFormat("it-IT").format(n);
}

function formatPct(n: number) {
  if (!n || n <= 0) return "N/D";
  return `${n.toFixed(1)}%`;
}

export function Stats() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Iscritti YouTube</h3>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{formatNumber(stats.subscribers)}</p>
          <p className="muted mt-2">Dati aggiornabili via YouTube Data API</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Visualizzazioni mensili</h3>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{formatNumber(stats.monthlyViews)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Crescita 12 mesi</h3>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{formatPct(stats.growth12mPct)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Tempo di visualizzazione</h3>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{formatNumber(stats.watchTimeHours)} h</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Media views per video</h3>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{formatNumber(stats.avgViewsPerVideo)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Engagement stimato</h3>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{formatPct(stats.engagementRatePct)}</p>
        </CardContent>
      </Card>

      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Video più performanti</h3>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {stats.topVideos.map((v) => (
                <li key={v.url} className="flex items-center justify-between">
                  <a href={v.url} target="_blank" className="underline">
                    {v.title}
                  </a>
                  <span className="text-sm muted">{formatNumber(v.views)} views</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-medium">Grafico (esempio)</h4>
              <div className="mt-2 flex items-end gap-2 h-28">
                {[stats.subscribers, stats.monthlyViews, stats.avgViewsPerVideo].map((value, i) => {
                  const max = Math.max(1, stats.monthlyViews || 1);
                  const h = Math.max(6, Math.round(((value || 0) / max) * 100));
                  return (
                    <div key={i} className="flex-1">
                      <div
                        className="bg-[var(--primary)]/80 rounded-sm"
                        style={{ height: `${h}%` }}
                      />
                      <p className="text-xs mt-2 text-center muted">
                        {i === 0 ? "Iscritti" : i === 1 ? "Mensili" : "Media/video"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

