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
  "subscribers": 34000,
  "totalViews": 20357607,
  "videoCount": 360,
  "monthlyViews": 0,
  "growth12mPct": 7427.3,
  "watchTimeHours": 0,
  "avgViewsPerVideo": 77835,
  "recentAvgViews": 1834,
  "uploadsPerMonth": 5.7,
  "avgDurationMinutes": 4,
  "avgDurationReels": 48,
  "avgDurationVideos": 672,
  "engagementRatePct": 2.04,
  "topVideos": [
    {
      "title": "La Sedia Ergonomica DEFINITIVA? 😴 Recensione Hbada E3 Pro",
      "url": "https://www.youtube.com/watch?v=k7ymCx0iqQY",
      "views": 123872
    },
    {
      "title": "ADDIO LADRI Telecamera che NON si SCARICA MAI! 4G + WiFi + IA - Registrazione 7/24 ore",
      "url": "https://www.youtube.com/watch?v=CprOEynUTaQ",
      "views": 95002
    },
    {
      "title": "❌ Raspberry Pi ADDIO? Arduino UNO Q con LINUX costa solo 44€! impossibile 😱",
      "url": "https://www.youtube.com/watch?v=VjV9N_F22MY",
      "views": 34336
    },
    {
      "title": "💣I 10 MIGLIORI PROGETTI ESP32 del 2025! 🚀",
      "url": "https://www.youtube.com/watch?v=A7Ou_TAT00s",
      "views": 27546
    },
    {
      "title": "ADDIO Alexa! Ho costruito il mio Assistente AI con ESP32 🚀 - PARTE 1",
      "url": "https://www.youtube.com/watch?v=nHq7fxmyhAo",
      "views": 26375
    },
    {
      "title": "DA NAPOLI A ROMA IN BICI ELETTRICA : La Sfida su Due Ruote! [PARTE 1]",
      "url": "https://www.youtube.com/watch?v=q_G7ZzVIxtc",
      "views": 14499
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
