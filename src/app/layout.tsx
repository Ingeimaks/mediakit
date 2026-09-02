import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { siteUrl } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "MediaKit • Giovanni Mannara (INGEIMAKS)";
const description =
  "MediaKit professionale di Giovanni Mannara, creatore di INGEIMAKS: bio, progetti, contatti e assets.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Giovanni Mannara",
  alternateName: "Ingeimaks",
  jobTitle: "Content Creator & Tech Enthusiast",
  email: "info@ingeimaks.it",
  sameAs: [
    "https://youtube.com/ingeimaks",
    "https://instagram.com/ingeimaks",
    "https://facebook.com/ingeimaks",
    "https://tiktok.com/@ingeimaks",
    "https://t.me/ingeimaks",
  ],
};

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title,
    description,
    url: siteUrl,
    type: "website",
    locale: "it_IT",
    siteName: "INGEIMAKS MediaKit",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
  icons: {
    icon: process.env.NODE_ENV === "production" ? "/mediakit/100x100.ico" : "/100x100.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
