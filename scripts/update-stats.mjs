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

// --- Helpers ---

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

// --- Scrapers ---

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "max-age=0",
      "Sec-Ch-Ua": '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": '"Windows"',
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-User": "?1",
      "Upgrade-Insecure-Requests": "1"
    }
  });
  if (!res.ok) throw new Error(`Status ${res.status}`);
  return res.text();
}

function parseCount(raw) {
  if (!raw) return null;
  raw = raw.trim().toLowerCase();
  let multiplier = 1;
  if (raw.endsWith('k')) {
    multiplier = 1000;
    raw = raw.slice(0, -1);
  } else if (raw.endsWith('m')) {
    multiplier = 1000000;
    raw = raw.slice(0, -1);
  }
  // Assume en-US format (comma = thousands, dot = decimal) because of request headers
  // Remove commas completely
  raw = raw.replace(/,/g, '');
  // Clean up any non-numeric/non-dot chars (just in case)
  raw = raw.replace(/[^\d\.]/g, '');
  
  const val = parseFloat(raw);
  return Math.round(val * multiplier);
}

async function scrapeTelegram(url) {
  try {
    console.log(`[scraper] Fetching Telegram: ${url}`);
    const text = await fetchText(url);
    const match = text.match(/<div class="tgme_page_extra">\s*([\d\s\.,km]+)\s*(subscribers|members)\s*<\/div>/i);
    if (match) return parseCount(match[1]);
  } catch (e) {
    console.warn(`[scraper] Telegram scrape failed: ${e.message}`);
  }
  return null;
}

async function scrapeInstagram(url) {
  try {
    console.log(`[scraper] Fetching Instagram: ${url}`);
    const text = await fetchText(url);
    // Try meta description first
    let match = text.match(/<meta content="([^\"]+)" name="description"/i);
    if (match) {
      const content = match[1];
      const statsMatch = content.match(/([\d\s\.,km]+)\s*Followers/i);
      if (statsMatch) return parseCount(statsMatch[1]);
    }
    // Fallback: look for sharedData json
    match = text.match(/<script type="text\/javascript">window\._sharedData\s*=\s*({.+?});<\/script>/);
    if (match) {
      const data = JSON.parse(match[1]);
      const user = data?.entry_data?.ProfilePage?.[0]?.graphql?.user;
      if (user?.edge_followed_by?.count) {
        return user.edge_followed_by.count;
      }
    }
  } catch (e) {
    console.warn(`[scraper] Instagram scrape failed: ${e.message}`);
  }
  return null;
}

async function scrapeTikTok(url) {
  try {
    console.log(`[scraper] Fetching TikTok: ${url}`);
    
    // Extract username
    const usernameMatch = url.match(/@([\w\.]+)/);
    if (!usernameMatch) return null;
    const username = usernameMatch[1];
    
    // Strategy 1: Embed Page (Most reliable for public stats without login)
    // https://www.tiktok.com/embed/@ingeimaks
    const embedUrl = `https://www.tiktok.com/embed/@${username}`;
    try {
      const text = await fetchText(embedUrl);
      // Matches spans like: <span ... data-e2e="creator-profile-userInfo-TUXText">4513</span>
      // Order is typically: Following, Followers, Likes
      const regex = /<span[^>]*data-e2e="creator-profile-userInfo-TUXText"[^>]*>([\d\.,kKmM]+)<\/span>/g;
      const matches = [...text.matchAll(regex)];
      
      if (matches.length >= 2) {
        // Index 1 is Followers
        const followerRaw = matches[1][1];
        console.log(`[scraper] TikTok Embed found candidate: ${followerRaw}`);
        const count = parseCount(followerRaw);
        if (count > 0) return count;
      }
    } catch (e) {
      console.warn(`[scraper] TikTok Embed failed: ${e.message}`);
    }
    
    // Strategy 2: SIGI_STATE in main page (Fallback)
    // ... (Old logic or new fallback if needed)
    
  } catch (e) {
    console.warn(`[scraper] TikTok scrape failed: ${e.message}`);
  }
  return null;
}

async function scrapeFacebook(url) {
  try {
    console.log(`[scraper] Fetching Facebook: ${url}`);
    
    // Normalize URL to ensure www (Plugin often likes canonical URLs)
    let canonicalUrl = url;
    if (url.includes('facebook.com') && !url.includes('www.facebook.com')) {
      canonicalUrl = url.replace('facebook.com', 'www.facebook.com');
    }

    // Strategy 1: Plugin Page (Public API loophole)
    // We force the "page" plugin which usually reveals follower count
    const pluginUrl = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(canonicalUrl)}&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`;
    
    try {
      const pluginText = await fetchText(pluginUrl);
      // Find all numbers followed by "followers"
      const matches = [...pluginText.matchAll(/([\d\s\.,km]+)\s*(followers|follower|mi piace|likes)/gi)];
      
      let maxCount = 0;
      for (const m of matches) {
        const val = parseCount(m[1]);
        if (val > maxCount) maxCount = val;
      }
      
      if (maxCount > 0) {
        return maxCount;
      }
    } catch (e) {
      console.warn(`[scraper] FB Plugin failed: ${e.message}`);
    }

    // Strategy 2: Direct Fetch (often blocked)
    const text = await fetchText(url);
    const match = text.match(/<meta name="description" content="[^"]*?([\d\s\.,km]+)\s*followers/i);
    if (match) return parseCount(match[1]);
    
    const match2 = text.match(/([\d\s\.,km]+)\s*followers/i);
    if (match2) return parseCount(match2[1]);
  } catch (e) {
    console.warn(`[scraper] Facebook scrape failed: ${e.message}`);
  }
  return null;
}

async function scrapePatreon(url) {
  try {
    console.log(`[scraper] Fetching Patreon: ${url}`);
    const text = await fetchText(url);
    const match = text.match(/([\d\s\.,km]+)\s*patrons/i);
    if (match) return parseCount(match[1]);
    
    // Check for "members"
    const match2 = text.match(/([\d\s\.,km]+)\s*members/i);
    if (match2) return parseCount(match2[1]);
  } catch (e) {
    console.warn(`[scraper] Patreon scrape failed: ${e.message}`);
  }
  return null;
}

// --- Main Logic ---

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

async function getExistingSocials() {
  try {
    const content = await fs.readFile("src/data/stats.ts", "utf8");
    // Simple regex to extract the socials object
    // Looking for: "socials": { ... }
    const match = content.match(/"socials":\s*({[\s\S]*?})\n\s*};/);
    if (match) {
      // Need to be careful with JSON.parse on TS object string
      // The current file uses standard JSON-like structure inside the TS variable
      // But keys might not be quoted if it was written by hand. 
      // The previous script wrote it with JSON.stringify, so it should be valid JSON.
      return JSON.parse(match[1]);
    }
  } catch (e) {
    console.warn("[update-stats] Could not read existing socials:", e.message);
  }
  // Default fallback
  return {
    instagram: { label: "Instagram", url: "https://instagram.com/ingeimaks", followers: 7549 },
    facebook: { label: "Facebook", url: "https://facebook.com/ingeimaks", followers: 5579 },
    telegram: { label: "Telegram", url: "https://t.me/ingeimaks", subscribers: 340 },
    tiktok: { label: "TikTok", url: "https://tiktok.com/@ingeimaks", followers: 3337 },
    patreon: { label: "Patreon", url: "https://patreon.com/ingeimaks", followers: 0 },
  };
}

async function updateSocials(currentSocials) {
  const newSocials = { ...currentSocials };
  
  // Update Telegram
  if (newSocials.telegram?.url) {
    const tgSubs = await scrapeTelegram(newSocials.telegram.url);
    if (tgSubs) {
      console.log(`[update-stats] Updated Telegram subs: ${tgSubs}`);
      newSocials.telegram.subscribers = tgSubs;
    }
  }

  // Update Instagram
  if (newSocials.instagram?.url) {
    const igFollowers = await scrapeInstagram(newSocials.instagram.url);
    if (igFollowers) {
      console.log(`[update-stats] Updated Instagram followers: ${igFollowers}`);
      newSocials.instagram.followers = igFollowers;
    }
  }

  // Update Facebook
  if (newSocials.facebook?.url) {
    const fbFollowers = await scrapeFacebook(newSocials.facebook.url);
    if (fbFollowers) {
      console.log(`[update-stats] Updated Facebook followers: ${fbFollowers}`);
      newSocials.facebook.followers = fbFollowers;
    }
  }

  // Update TikTok
  if (newSocials.tiktok?.url) {
    const ttFollowers = await scrapeTikTok(newSocials.tiktok.url);
    if (ttFollowers) {
      console.log(`[update-stats] Updated TikTok followers: ${ttFollowers}`);
      newSocials.tiktok.followers = ttFollowers;
    }
  }

  // Update Patreon
  if (newSocials.patreon?.url) {
    const patreonFollowers = await scrapePatreon(newSocials.patreon.url);
    if (patreonFollowers) {
      console.log(`[update-stats] Updated Patreon followers: ${patreonFollowers}`);
      newSocials.patreon.followers = patreonFollowers;
    }
  }
  
  return newSocials;
}

function computeStats(channel, videos, socials) {
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
    socials,
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

  console.log("[update-stats] Aggiornamento social stats...");
  const currentSocials = await getExistingSocials();
  const updatedSocials = await updateSocials(currentSocials);

  const computed = computeStats(ch, vids, updatedSocials);
  const out = toTsModule(computed);
  
  await fs.writeFile("src/data/stats.ts", out, "utf8");
  console.log("[update-stats] stats.ts aggiornato");
}

main().catch((err) => {
  console.error("[update-stats] Errore:", err.message);
  process.exit(1);
});
