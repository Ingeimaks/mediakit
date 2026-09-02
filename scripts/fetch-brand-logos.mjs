// Scarica i loghi reali dei brand (og:image, twitter:image, logo o favicon) in public/brands/.
// Uso: node scripts/fetch-brand-logos.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../public/brands");
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.0";

// name (file base) -> dominio
const brands = {
  "samsung": "samsung.com",
  "antigravity": "antigravity.tech",
  "laserpecker": "laserpecker.com",
  "flexispot": "flexispot.com",
  "duotts": "duotts.com",
  "snapmaker": "snapmaker.com",
  "tripo-ai": "tripo3d.ai",
  "hitem-3d": "hi3d.ai",
  "flashforge": "flashforge.com",
  "arduino": "arduino.cc",
  "qualcomm": "qualcomm.com",
  "fnirsi": "fnirsi.com",
  "zima": "zimaspace.com",
  "orange-pi": "orangepi.com",
  "raspberry-pi": "raspberrypi.com",
};

function extFromContentType(ct) {
  ct = (ct || "").toLowerCase();
  if (ct.includes("png")) return "png";
  if (ct.includes("jpeg") || ct.includes("jpg")) return "jpg";
  if (ct.includes("svg")) return "svg";
  if (ct.includes("webp")) return "webp";
  if (ct.includes("gif")) return "gif";
  if (ct.includes("x-icon") || ct.includes("vnd.microsoft.icon")) return "ico";
  return "png";
}

async function fetchWithTimeout(url, opts = {}, ms = 20000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { ...opts, signal: ctrl.signal, redirect: "follow" });
  } finally {
    clearTimeout(t);
  }
}

function extractMeta(html, base) {
  const out = [];
  const metaPatterns = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i,
  ];
  for (const re of metaPatterns) {
    const m = html.match(re);
    if (m && m[1]) out.push(m[1]);
  }
  const logoImgs = [...html.matchAll(/<img[^>]+(?:src|data-src)=["']([^"']+)["']/gi)]
    .map((m) => m[1])
    .filter((u) => /logo|brand/i.test(u));
  out.push(...logoImgs);
  const icons = [...html.matchAll(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]+href=["']([^"']+)["']/gi)]
    .map((m) => m[1]);
  out.push(...icons);

  return out
    .filter((u) => u && !u.startsWith("data:"))
    .map((u) => {
      try {
        return new URL(u, base).toString();
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

async function tryDownload(url, dest) {
  const res = await fetchWithTimeout(url, {
    headers: { "User-Agent": UA, "Accept": "image/*,*/*" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const ct = res.headers.get("content-type") || "";
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 200) throw new Error("file troppo piccolo");
  const ext = extFromContentType(ct);
  const finalDest = path.join(OUT_DIR, path.basename(dest, path.extname(dest)) + "." + ext);
  fs.writeFileSync(finalDest, buf);
  return { file: path.basename(finalDest), size: buf.length };
}

async function fetchBrand(name, domain) {
  const candidates = [];
  for (const host of [`https://www.${domain}`, `https://${domain}`]) {
    try {
      const res = await fetchWithTimeout(host, {
        headers: { "User-Agent": UA, "Accept": "text/html" },
      });
      if (!res.ok) continue;
      const html = await res.text();
      candidates.push(...extractMeta(html, res.url));
      break;
    } catch {
      // prova il prossimo host
    }
  }
  // Fallback: favicon via Google (affidabile)
  candidates.push(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);

  for (const url of candidates) {
    try {
      const r = await tryDownload(url, path.join(OUT_DIR, `${name}.png`));
      return { ok: true, file: r.file, size: r.size, source: url };
    } catch {
      // prova il prossimo candidato
    }
  }
  return { ok: false, file: null, source: null };
}

const results = [];
for (const [name, domain] of Object.entries(brands)) {
  const r = await fetchBrand(name, domain);
  results.push(r);
  console.log(
    r.ok
      ? `[OK]   ${name} -> ${r.file} (${r.size} bytes) da ${r.source}`
      : `[FAIL] ${name} (${domain})`
  );
}

const ok = results.filter((r) => r.ok).length;
console.log(`\nCompletati: ${ok}/${results.length}`);
