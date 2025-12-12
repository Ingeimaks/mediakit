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
  "subscribers": 17700,
  "totalViews": 4476952,
  "videoCount": 253,
  "monthlyViews": 53239,
  "growth12mPct": 7290.4,
  "watchTimeHours": 0,
  "avgViewsPerVideo": 23217,
  "recentAvgViews": 2149,
  "uploadsPerMonth": 8,
  "avgDurationMinutes": 4,
  "avgDurationReels": 40,
  "avgDurationVideos": 874,
  "engagementRatePct": 3.04,
  "topVideos": [
    {
      "title": "ADDIO LADRI Telecamera che NON si SCARICA MAI! 4G + WiFi + IA - Registrazione 7/24 ore",
      "url": "https://www.youtube.com/watch?v=CprOEynUTaQ",
      "views": 94151
    },
    {
      "title": "💣I 10 MIGLIORI PROGETTI ESP32 del 2025! 🚀",
      "url": "https://www.youtube.com/watch?v=A7Ou_TAT00s",
      "views": 14365
    },
    {
      "title": "DA NAPOLI A ROMA IN BICI ELETTRICA : La Sfida su Due Ruote! [PARTE 1]",
      "url": "https://www.youtube.com/watch?v=q_G7ZzVIxtc",
      "views": 13041
    },
    {
      "title": "❌ Raspberry Pi ADDIO? Arduino UNO Q con LINUX costa solo 44€! impossibile 😱",
      "url": "https://www.youtube.com/watch?v=VjV9N_F22MY",
      "views": 11825
    },
    {
      "title": "UNBOXING del LASER più ESTREMO: Monport 30W! (È Sicuro?) - PARTE1 @monportlaser",
      "url": "https://www.youtube.com/watch?v=NhTRX_eROCc",
      "views": 7174
    },
    {
      "title": "Bambu Lab A1 è il FUTURO della stampa 3D o SOLO HYPE !? 😮",
      "url": "https://www.youtube.com/watch?v=0vaiyO-sU0w",
      "views": 6707
    }
  ],
  "avatarUrl": "/images/avatar.jpg",
  "socials": {
    "instagram": {
      "label": "Instagram",
      "url": "https://instagram.com/ingeimaks",
      "followers": 7549
    },
    "facebook": {
      "label": "Facebook",
      "url": "https://facebook.com/ingeimaks",
      "followers": 5579
    },
    "telegram": {
      "label": "Telegram",
      "url": "https://t.me/ingeimaks",
      "subscribers": 340
    },
    "tiktok": {
      "label": "TikTok",
      "url": "https://tiktok.com/@ingeimaks",
      "followers": 3337
    },
    "patreon": {
      "label": "Patreon",
      "url": "https://patreon.com/ingeimaks",
      "followers": 0
    }
  }
};
