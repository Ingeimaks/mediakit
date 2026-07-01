export type TopVideo = {
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

export type AudienceStats = {
  malePct: number;
  age1834Pct: number;
  italyPct: number;
  switzerlandPct: number;
  otherPct: number;
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
  audience: AudienceStats;
};

export const stats: ChannelStats = {
  "subscribers": 30200,
  "totalViews": 16035211,
  "videoCount": 340,
  "monthlyViews": 13316,
  "growth12mPct": 6868.7,
  "watchTimeHours": 0,
  "avgViewsPerVideo": 65364,
  "recentAvgViews": 2381,
  "uploadsPerMonth": 12.3,
  "avgDurationMinutes": 4,
  "avgDurationReels": 47,
  "avgDurationVideos": 646,
  "engagementRatePct": 2.66,
  "topVideos": [
    {
      "title": "La Sedia Ergonomica DEFINITIVA? 😴 Recensione Hbada E3 Pro",
      "url": "https://www.youtube.com/watch?v=k7ymCx0iqQY",
      "views": 122969
    },
    {
      "title": "ADDIO LADRI Telecamera che NON si SCARICA MAI! 4G + WiFi + IA - Registrazione 7/24 ore",
      "url": "https://www.youtube.com/watch?v=CprOEynUTaQ",
      "views": 94872
    },
    {
      "title": "❌ Raspberry Pi ADDIO? Arduino UNO Q con LINUX costa solo 44€! impossibile 😱",
      "url": "https://www.youtube.com/watch?v=VjV9N_F22MY",
      "views": 30205
    },
    {
      "title": "💣I 10 MIGLIORI PROGETTI ESP32 del 2025! 🚀",
      "url": "https://www.youtube.com/watch?v=A7Ou_TAT00s",
      "views": 23058
    },
    {
      "title": "ADDIO Alexa! Ho costruito il mio Assistente AI con ESP32 🚀 - PARTE 1",
      "url": "https://www.youtube.com/watch?v=nHq7fxmyhAo",
      "views": 21471
    },
    {
      "title": "COME USARE UN SENSORE AD ULTRASUONI 🚀 #arduinouno #arduinolove #arduinotutorial #maker #arduino",
      "url": "https://www.youtube.com/watch?v=nX9OhEdjvP8",
      "views": 14050
    }
  ],
  "avatarUrl": "https://yt3.ggpht.com/ytc/AIdro_mLbavdK-jYX6Q-PKeU4nIcEOqMrFlHX7MA-XSkia9rEKQ=s800-c-k-c0x00ffffff-no-rj",
  "socials": {
    "instagram": {
      "label": "Instagram",
      "url": "https://instagram.com/ingeimaks",
      "followers": 7549
    },
    "facebook": {
      "label": "Facebook",
      "url": "https://facebook.com/ingeimaks",
      "followers": 25000
    },
    "telegram": {
      "label": "Telegram",
      "url": "https://t.me/ingeimaks",
      "subscribers": 3560
    },
    "tiktok": {
      "label": "TikTok",
      "url": "https://tiktok.com/@ingeimaks",
      "followers": 7155
    },
    "patreon": {
      "label": "Patreon",
      "url": "https://patreon.com/ingeimaks",
      "followers": 0
    }
  },
  "audience": {
    "malePct": 94,
    "age1834Pct": 65,
    "italyPct": 92,
    "switzerlandPct": 3,
    "otherPct": 5
  }
};
