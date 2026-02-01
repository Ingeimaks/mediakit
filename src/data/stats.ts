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
  "subscribers": 21000,
  "totalViews": 6557024,
  "videoCount": 285,
  "monthlyViews": 143059,
  "growth12mPct": 10455.1,
  "watchTimeHours": 0,
  "avgViewsPerVideo": 30951,
  "recentAvgViews": 2394,
  "uploadsPerMonth": 10.8,
  "avgDurationMinutes": 4,
  "avgDurationReels": 43,
  "avgDurationVideos": 783,
  "engagementRatePct": 1.77,
  "topVideos": [
    {
      "title": "ADDIO LADRI Telecamera che NON si SCARICA MAI! 4G + WiFi + IA - Registrazione 7/24 ore",
      "url": "https://www.youtube.com/watch?v=CprOEynUTaQ",
      "views": 94461
    },
    {
      "title": "💣I 10 MIGLIORI PROGETTI ESP32 del 2025! 🚀",
      "url": "https://www.youtube.com/watch?v=A7Ou_TAT00s",
      "views": 17354
    },
    {
      "title": "❌ Raspberry Pi ADDIO? Arduino UNO Q con LINUX costa solo 44€! impossibile 😱",
      "url": "https://www.youtube.com/watch?v=VjV9N_F22MY",
      "views": 15318
    },
    {
      "title": "ADDIO Alexa! Ho costruito il mio Assistente AI con ESP32 🚀 - PARTE 1",
      "url": "https://www.youtube.com/watch?v=nHq7fxmyhAo",
      "views": 14677
    },
    {
      "title": "DA NAPOLI A ROMA IN BICI ELETTRICA : La Sfida su Due Ruote! [PARTE 1]",
      "url": "https://www.youtube.com/watch?v=q_G7ZzVIxtc",
      "views": 13190
    },
    {
      "title": "COME USARE UN SENSORE AD ULTRASUONI 🚀 #arduinouno #arduinolove #arduinotutorial #maker #arduino",
      "url": "https://www.youtube.com/watch?v=nX9OhEdjvP8",
      "views": 11517
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
      "followers": 10761
    },
    "telegram": {
      "label": "Telegram",
      "url": "https://t.me/ingeimaks",
      "subscribers": 1010
    },
    "tiktok": {
      "label": "TikTok",
      "url": "https://tiktok.com/@ingeimaks",
      "followers": 4954
    },
    "patreon": {
      "label": "Patreon",
      "url": "https://patreon.com/ingeimaks",
      "followers": 0
    }
  }
};
