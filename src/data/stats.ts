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
  "subscribers": 28800,
  "totalViews": 14640327,
  "videoCount": 329,
  "monthlyViews": 54404,
  "growth12mPct": 8887.8,
  "watchTimeHours": 0,
  "avgViewsPerVideo": 62494,
  "recentAvgViews": 10554,
  "uploadsPerMonth": 15.5,
  "avgDurationMinutes": 4,
  "avgDurationReels": 47,
  "avgDurationVideos": 666,
  "engagementRatePct": 2.82,
  "topVideos": [
    {
      "title": "La Sedia Ergonomica DEFINITIVA? 😴 Recensione Hbada E3 Pro",
      "url": "https://www.youtube.com/watch?v=k7ymCx0iqQY",
      "views": 122535
    },
    {
      "title": "ADDIO LADRI Telecamera che NON si SCARICA MAI! 4G + WiFi + IA - Registrazione 7/24 ore",
      "url": "https://www.youtube.com/watch?v=CprOEynUTaQ",
      "views": 94783
    },
    {
      "title": "❌ Raspberry Pi ADDIO? Arduino UNO Q con LINUX costa solo 44€! impossibile 😱",
      "url": "https://www.youtube.com/watch?v=VjV9N_F22MY",
      "views": 28428
    },
    {
      "title": "💣I 10 MIGLIORI PROGETTI ESP32 del 2025! 🚀",
      "url": "https://www.youtube.com/watch?v=A7Ou_TAT00s",
      "views": 21646
    },
    {
      "title": "ADDIO Alexa! Ho costruito il mio Assistente AI con ESP32 🚀 - PARTE 1",
      "url": "https://www.youtube.com/watch?v=nHq7fxmyhAo",
      "views": 20117
    },
    {
      "title": "COME USARE UN SENSORE AD ULTRASUONI 🚀 #arduinouno #arduinolove #arduinotutorial #maker #arduino",
      "url": "https://www.youtube.com/watch?v=nX9OhEdjvP8",
      "views": 13992
    }
  ],
  "avatarUrl": "https://yt3.ggpht.com/ytc/AIdro_mLbavdK-jYX6Q-PKeU4nIcEOqMrFlHX7MA-XSkia9rEKQ=s800-c-k-c0x00ffffff-no-rj",
  "socials": {
    "instagram": {
      "label": "Instagram",
      "url": "https://instagram.com/ingeimaks",
      "followers": 27000
    },
    "facebook": {
      "label": "Facebook",
      "url": "https://facebook.com/ingeimaks",
      "followers": 24308
    },
    "telegram": {
      "label": "Telegram",
      "url": "https://t.me/ingeimaks",
      "subscribers": 3322
    },
    "tiktok": {
      "label": "TikTok",
      "url": "https://tiktok.com/@ingeimaks",
      "followers": 6707
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
