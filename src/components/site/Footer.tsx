"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-12 border-t bg-muted/30 text-center text-sm text-muted-foreground">
      <div className="w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>
          © {new Date().getFullYear()} Giovanni Mannara (Ingeimaks). {t.footer.rights}.
        </p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-primary transition-colors">
            {t.footer.privacy}
          </Link>
          <Link href="/termini" className="hover:text-primary transition-colors">
            {t.footer.terms}
          </Link>
        </div>
      </div>
    </footer>
  );
}
