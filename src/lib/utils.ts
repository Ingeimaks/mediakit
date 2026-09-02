import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { basePath } from "@/lib/config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAssetPath(path: string) {
  const prefix = process.env.NODE_ENV === "production" ? basePath : "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${prefix}${cleanPath}`;
}

// Formatta i numeri in formato compatto (es. 1.2M, 34k).
export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num.toString();
}
