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
  audience: AudienceStats;
};

export const stats: ChannelStats = {
  "subscribers": 32600,
  "totalViews": 18817131,
  "videoCount": 356,
  "monthlyViews": 15332,
  "growth12mPct": 6681.8,
  "watchTimeHours": 0,
  "avgViewsPerVideo": 72538,
  "recentAvgViews": 1888,
  "uploadsPerMonth": 8.8,
  "avgDurationMinutes": 4,
  "avgDurationReels": 48,
  "avgDurationVideos": 667,
  "engagementRatePct": 2.32,
  "topVideos": [
    {
      "title": "La Sedia Ergonomica DEFINITIVA? 😴 Recensione Hbada E3 Pro",
      "url": "https://www.youtube.com/watch?v=k7ymCx0iqQY",
      "views": 123353
    },
    {
      "title": "ADDIO LADRI Telecamera che NON si SCARICA MAI! 4G + WiFi + IA - Registrazione 7/24 ore",
      "url": "https://www.youtube.com/watch?v=CprOEynUTaQ",
      "views": 94955
    },
    {
      "title": "❌ Raspberry Pi ADDIO? Arduino UNO Q con LINUX costa solo 44€! impossibile 😱",
      "url": "https://www.youtube.com/watch?v=VjV9N_F22MY",
      "views": 32318
    },
    {
      "title": "💣I 10 MIGLIORI PROGETTI ESP32 del 2025! 🚀",
      "url": "https://www.youtube.com/watch?v=A7Ou_TAT00s",
      "views": 24917
    },
    {
      "title": "ADDIO Alexa! Ho costruito il mio Assistente AI con ESP32 🚀 - PARTE 1",
      "url": "https://www.youtube.com/watch?v=nHq7fxmyhAo",
      "views": 23710
    },
    {
      "title": "COME USARE UN SENSORE AD ULTRASUONI 🚀 #arduinouno #arduinolove #arduinotutorial #maker #arduino",
      "url": "https://www.youtube.com/watch?v=nX9OhEdjvP8",
      "views": 14117
    }
  ],
  "avatarUrl": "https://yt3.ggpht.com/ytc/AIdro_mLbavdK-jYX6Q-PKeU4nIcEOqMrFlHX7MA-XSkia9rEKQ=s800-c-k-c0x00ffffff-no-rj",
  "audience": {
    "malePct": 94,
    "age1834Pct": 65,
    "italyPct": 92,
    "switzerlandPct": 3,
    "otherPct": 5
  }
};
