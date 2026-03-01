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

export const stats: ChannelStats = {
  "subscribers": 23100,
  "totalViews": 8575672,
  "videoCount": 302,
  "monthlyViews": 122394,
  "growth12mPct": 13677,
  "watchTimeHours": 0,
  "avgViewsPerVideo": 38659,
  "recentAvgViews": 2204,
  "uploadsPerMonth": 13.3,
  "avgDurationMinutes": 4,
  "avgDurationReels": 44,
  "avgDurationVideos": 734,
  "engagementRatePct": 1.91,
  "topVideos": [
    {
      "title": "ADDIO LADRI Telecamera che NON si SCARICA MAI! 4G + WiFi + IA - Registrazione 7/24 ore",
      "url": "https://www.youtube.com/watch?v=CprOEynUTaQ",
      "views": 94555
    },
    {
      "title": "La Sedia Ergonomica DEFINITIVA? 😴 Recensione Hbada E3 Pro",
      "url": "https://www.youtube.com/watch?v=k7ymCx0iqQY",
      "views": 67044
    },
    {
      "title": "💣I 10 MIGLIORI PROGETTI ESP32 del 2025! 🚀",
      "url": "https://www.youtube.com/watch?v=A7Ou_TAT00s",
      "views": 18676
    },
    {
      "title": "❌ Raspberry Pi ADDIO? Arduino UNO Q con LINUX costa solo 44€! impossibile 😱",
      "url": "https://www.youtube.com/watch?v=VjV9N_F22MY",
      "views": 17585
    },
    {
      "title": "ADDIO Alexa! Ho costruito il mio Assistente AI con ESP32 🚀 - PARTE 1",
      "url": "https://www.youtube.com/watch?v=nHq7fxmyhAo",
      "views": 16557
    },
    {
      "title": "DA NAPOLI A ROMA IN BICI ELETTRICA : La Sfida su Due Ruote! [PARTE 1]",
      "url": "https://www.youtube.com/watch?v=q_G7ZzVIxtc",
      "views": 13254
    }
  ],
  "avatarUrl": "https://yt3.ggpht.com/ytc/AIdro_mLbavdK-jYX6Q-PKeU4nIcEOqMrFlHX7MA-XSkia9rEKQ=s800-c-k-c0x00ffffff-no-rj",
  "socials": {
    "instagram": {
      "label": "Instagram",
      "url": "https://instagram.com/ingeimaks",
      "followers": 16000
    },
    "facebook": {
      "label": "Facebook",
      "url": "https://facebook.com/ingeimaks",
      "followers": 15872
    },
    "telegram": {
      "label": "Telegram",
      "url": "https://t.me/ingeimaks",
      "subscribers": 1513
    },
    "tiktok": {
      "label": "TikTok",
      "url": "https://tiktok.com/@ingeimaks",
      "followers": 5153
    },
    "patreon": {
      "label": "Patreon",
      "url": "https://patreon.com/ingeimaks",
      "followers": 0
    }
  }
};
