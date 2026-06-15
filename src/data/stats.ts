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
  "subscribers": 29900,
  "totalViews": 15570681,
  "videoCount": 336,
  "monthlyViews": 20384,
  "growth12mPct": 7338.8,
  "watchTimeHours": 0,
  "avgViewsPerVideo": 64359,
  "recentAvgViews": 6359,
  "uploadsPerMonth": 13.5,
  "avgDurationMinutes": 4,
  "avgDurationReels": 47,
  "avgDurationVideos": 643,
  "engagementRatePct": 2.54,
  "topVideos": [
    {
      "title": "La Sedia Ergonomica DEFINITIVA? 😴 Recensione Hbada E3 Pro",
      "url": "https://www.youtube.com/watch?v=k7ymCx0iqQY",
      "views": 122820
    },
    {
      "title": "ADDIO LADRI Telecamera che NON si SCARICA MAI! 4G + WiFi + IA - Registrazione 7/24 ore",
      "url": "https://www.youtube.com/watch?v=CprOEynUTaQ",
      "views": 94846
    },
    {
      "title": "❌ Raspberry Pi ADDIO? Arduino UNO Q con LINUX costa solo 44€! impossibile 😱",
      "url": "https://www.youtube.com/watch?v=VjV9N_F22MY",
      "views": 29737
    },
    {
      "title": "💣I 10 MIGLIORI PROGETTI ESP32 del 2025! 🚀",
      "url": "https://www.youtube.com/watch?v=A7Ou_TAT00s",
      "views": 22585
    },
    {
      "title": "ADDIO Alexa! Ho costruito il mio Assistente AI con ESP32 🚀 - PARTE 1",
      "url": "https://www.youtube.com/watch?v=nHq7fxmyhAo",
      "views": 21015
    },
    {
      "title": "COME USARE UN SENSORE AD ULTRASUONI 🚀 #arduinouno #arduinolove #arduinotutorial #maker #arduino",
      "url": "https://www.youtube.com/watch?v=nX9OhEdjvP8",
      "views": 14034
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
      "subscribers": 3541
    },
    "tiktok": {
      "label": "TikTok",
      "url": "https://tiktok.com/@ingeimaks",
      "followers": 7116
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
