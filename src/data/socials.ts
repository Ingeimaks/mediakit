// Dati social generati da scripts/update-stats.mjs.
// Le URL e i label sono la fonte di verità; i conteggi vengono aggiornati dallo script.
import type { SocialStats } from "@/data/stats";

export const socials: Record<string, SocialStats> = {
  "instagram": {
    "label": "Instagram",
    "url": "https://instagram.com/ingeimaks",
    "followers": 27700
  },
  "facebook": {
    "label": "Facebook",
    "url": "https://facebook.com/ingeimaks",
    "followers": 25860
  },
  "telegram": {
    "label": "Telegram",
    "url": "https://t.me/ingeimaks",
    "subscribers": 3494
  },
  "tiktok": {
    "label": "TikTok",
    "url": "https://tiktok.com/@ingeimaks",
    "followers": 7586
  },
  "patreon": {
    "label": "Patreon",
    "url": "https://patreon.com/ingeimaks",
    "followers": 0
  }
};
