import Link from "next/link";
import { Github, Youtube, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] print:hidden">
      <div className="container flex flex-col md:flex-row items-center justify-between py-8 gap-4">
        <p className="muted">© {new Date().getFullYear()} INGEIMAKS • Giovanni Mannara</p>
        <div className="flex items-center gap-4">
          <Link href="https://github.com/" target="_blank" aria-label="GitHub" className="hover:text-[var(--primary)]">
            <Github />
          </Link>
          <Link href="https://www.youtube.com/@ingeimaks" target="_blank" aria-label="YouTube" className="hover:text-[var(--primary)]">
            <Youtube />
          </Link>
          <Link href="https://www.instagram.com/ingeimaks" target="_blank" aria-label="Instagram" className="hover:text-[var(--primary)]">
            <Instagram />
          </Link>
        </div>
      </div>
    </footer>
  );
}
