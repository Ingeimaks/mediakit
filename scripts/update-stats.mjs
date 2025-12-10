// Script di aggiornamento dati YouTube per generare contenuti STATICI
// Sicurezza: NON scrivere la chiave nel codice. Usa la variabile d'ambiente YOUTUBE_API_KEY.

import fs from "node:fs/promises";
import dotenv from "dotenv";

// Carica variabili d'ambiente se i file esistono, altrimenti usa process.env esistente
dotenv.config({ path: ".env.local" });
dotenv.config();

const API_KEY = process.env.YOUTUBE_API_KEY;
const QUERY = "ingeimaks"; // handle/canale da cercare

if (!API_KEY) {
  console.error("[update-stats] Variabile YOUTUBE_API_KEY mancante.");
  process.exit(1);
}

async function yt(endpoint, params) {
  const url = new URL(`https://www.googleapis.com/youtube/v3/${endpoint}`);
  Object.entries({ key: API_KEY, ...params }).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      url.searchParams.set(k, String(v));
    }
  });
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`YouTube API error ${res.status}: ${text}`);
  }
  return res.json();
}

async function resolveChannelId() {
  const data = await yt("search", {
    part: "snippet",
    type: "channel",
    maxResults: 1,
    q: QUERY,
  });
  const item = data.items?.[0];
  if (!item) throw new Error("Nessun canale trovato per la query");
  return item.id.channelId;
}

async function getChannelInfo(channelId) {
  const data = await yt("channels", {
    part: "snippet,statistics,contentDetails",
    id: channelId,
  });
  const ch = data.items?.[0];
  if (!ch) throw new Error("Channel non trovato");
  return ch;
}

async function getUploadsVideoIds(uploadsPlaylistId, cutoffMonths = 36) {
  const ids = [];
  let pageToken = undefined;
  const cutoffDate = new Date();
  cutoffDate.setMonth(cutoffDate.getMonth() - cutoffMonths);
  while (true) {
    const data = await yt("playlistItems", {
      part: "contentDetails",
      playlistId: uploadsPlaylistId,
      maxResults: 50,
      pageToken,
    });
    for (const it of data.items || []) {
      const publishedAt = new Date(it.contentDetails.videoPublishedAt || it.snippet.publishedAt);
      if (publishedAt < cutoffDate) {
        pageToken = undefined;
        break;
      }
      ids.push({ id: it.contentDetails.videoId, publishedAt });
    }
    pageToken = data.nextPageToken;
    if (!pageToken) break;
  }
  return ids;
}

async function getVideosStats(ids) {
  const result = [];
  const chunk = 50;
  for (let i = 0; i < ids.length; i += chunk) {
    const batch = ids.slice(i, i + chunk).map((x) => x.id);
    const data = await yt("videos", {
      part: "snippet,statistics,contentDetails",
      id: batch.join(","),
      maxResults: 50,
    });
    for (const it of data.items || []) {
      const base = ids.find((x) => x.id === it.id);
      const s = it.statistics || {};
      const d = it.contentDetails || {};
      result.push({
        id: it.id,
        title: it.snippet?.title || "",
        publishedAt: base?.publishedAt || new Date(it.snippet?.publishedAt || Date.now()),
        viewCount: Number(s.viewCount || 0),
        likeCount: Number(s.likeCount || 0),
        commentCount: Number(s.commentCount || 0),
        duration: d.duration || "PT0S",
      });
    }
  }
  return result;
}

function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

function parseDuration(duration) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;
  return hours * 60 + minutes + seconds / 60;
}

function computeStats(channel, videos) {
  const channelStats = channel.statistics || {};
  const snippet = channel.snippet || {};
  const now = new Date();
  const m30 = new Date(now);
  m30.setDate(m30.getDate() - 30);
  const m180 = new Date(now); // 6 months
  m180.setDate(m180.getDate() - 180);
  const y12 = new Date(now);
  y12.setFullYear(y12.getFullYear() - 1);
  const y24 = new Date(now);
  y24.setFullYear(y24.getFullYear() - 2);

  const monthlyViews = sum(videos.filter((v) => v.publishedAt >= m30).map((v) => v.viewCount));
  const last12Views = sum(videos.filter((v) => v.publishedAt >= y12).map((v) => v.viewCount));
  const prev12Views = sum(videos.filter((v) => v.publishedAt < y12 && v.publishedAt >= y24).map((v) => v.viewCount));
  const growth12mPct = prev12Views > 0 ? ((last12Views - prev12Views) / prev12Views) * 100 : 0;
  const avgViewsPerVideo = videos.length ? Math.round(sum(videos.map((v) => v.viewCount)) / videos.length) : 0;
  
  // New Metrics
  const recentVideos = videos.slice(0, 10);
  const recentAvgViews = recentVideos.length ? Math.round(sum(recentVideos.map((v) => v.viewCount)) / recentVideos.length) : 0;
  
  const videosLast6Months = videos.filter(v => v.publishedAt >= m180).length;
  const uploadsPerMonth = Number((videosLast6Months / 6).toFixed(1));

  const totalDurationMinutes = sum(videos.map(v => parseDuration(v.duration)));
  const avgDurationMinutes = videos.length ? Math.round(totalDurationMinutes / videos.length) : 0;

  // Split Reels vs Videos (90s threshold)
  const durationSeconds = videos.map(v => {
    const min = parseDuration(v.duration);
    return { ...v, durationSec: min * 60 };
  });

  const reels = durationSeconds.filter(v => v.durationSec <= 90);
  const longForm = durationSeconds.filter(v => v.durationSec > 90);

  const avgDurationReels = reels.length 
    ? Math.round(sum(reels.map(v => v.durationSec)) / reels.length) 
    : 0;
  
  const avgDurationVideos = longForm.length 
    ? Math.round(sum(longForm.map(v => v.durationSec)) / longForm.length) 
    : 0;

  const sample = videos.slice(0, 20);
  const engagementRatePct = sample.length
    ? (sum(sample.map((v) => v.likeCount + v.commentCount)) / Math.max(1, sum(sample.map((v) => v.viewCount)))) * 100
    : 0;

  const topVideos = [...longForm]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 6)
    .map((v) => ({ title: v.title, url: `https://www.youtube.com/watch?v=${v.id}`, views: v.viewCount }));

  const avatarUrl = snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url || "";

  return {
    subscribers: Number(channelStats.subscriberCount || 0),
    totalViews: Number(channelStats.viewCount || 0),
    videoCount: Number(channelStats.videoCount || 0),
    monthlyViews: Math.round(monthlyViews),
    growth12mPct: Number.isFinite(growth12mPct) ? Number(growth12mPct.toFixed(1)) : 0,
    watchTimeHours: 0, // Requires OAuth
    avgViewsPerVideo,
    recentAvgViews,
    uploadsPerMonth,
    avgDurationMinutes,
    avgDurationReels,
    avgDurationVideos,
    engagementRatePct: Number(engagementRatePct.toFixed(2)),
    topVideos,
    avatarUrl,
    socials: {
      instagram: { label: "Instagram", url: "https://instagram.com/ingeimaks", followers: 7549 },
      facebook: { label: "Facebook", url: "https://facebook.com/ingeimaks", followers: 5579 },
      telegram: { label: "Telegram", url: "https://t.me/ingeimaks", subscribers: 340 },
      tiktok: { label: "TikTok", url: "https://tiktok.com/@ingeimaks", followers: 3337 },
      patreon: { label: "Patreon", url: "https://patreon.com/ingeimaks", followers: 0 },
    },
  };
}

function toTsModule(data) {
  return `export type TopVideo = {
  title: string;
  url: string;
  views: number;
};

export type SocialStats = {
  label: string;
  url: string;
  followers?: number;
  subscribers?: number;
};

export type ChannelStats = {
  subscribers: number;
  totalViews: number;
  videoCount: number;
  monthlyViews: number;
  growth12mPct: number;
  watchTimeHours: number;
  avgViewsPerVideo: number;
  recentAvgViews: number;
  uploadsPerMonth: number;
  avgDurationMinutes: number;
  avgDurationReels: number;
  avgDurationVideos: number;
  engagementRatePct: number;
  topVideos: TopVideo[];
  avatarUrl: string;
  socials: Record<string, SocialStats>;
};

export const stats: ChannelStats = ${JSON.stringify(data, null, 2)};
`;
}

async function main() {
  console.log("[update-stats] Risoluzione canale...");
  const channelId = await resolveChannelId();
  const ch = await getChannelInfo(channelId);
  const uploads = ch.contentDetails?.relatedPlaylists?.uploads;
  if (!uploads) throw new Error("Uploads playlist non trovata");
  console.log("[update-stats] Scarico elenco video...");
  const ids = await getUploadsVideoIds(uploads);
  console.log(`[update-stats] Video raccolti: ${ids.length}`);
  if (ids.length > 0) {
    console.log("Most recent video date:", ids[0].publishedAt);
  }
  const vids = await getVideosStats(ids);
  const computed = computeStats(ch, vids);
  const out = toTsModule(computed);
  await fs.writeFile("src/data/stats.ts", out, "utf8");
  console.log("[update-stats] stats.ts aggiornato");
}

main().catch((err) => {
  console.error("[update-stats] Errore:", err.message);
  process.exit(1);
});

