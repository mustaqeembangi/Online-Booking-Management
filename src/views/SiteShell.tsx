import type { Viewport } from "next";
import { Cairo, Geist, IBM_Plex_Sans_Arabic, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFab from "@/components/layout/WhatsAppFab";
import BottomNav from "@/components/layout/BottomNav";
import RevealOnScroll from "@/components/layout/RevealOnScroll";
import SiteJsonLd from "@/components/info/SiteJsonLd";
import { UI, dir, type Lang } from "@/i18n";
import "@/app/globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-poppins", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
// Arabic: Cairo for headings, IBM Plex Sans Arabic for text. Only loaded on /ar pages.
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap", preload: false });
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b120e",
};

export default function SiteShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const fonts = [poppins.variable, geist.variable];
  if (lang === "ar") fonts.push(cairo.variable, plexArabic.variable);
  return (
    <html lang={lang} dir={dir(lang)} className={fonts.join(" ")}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-3 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white"
        >
          {UI[lang].skip}
        </a>
        <SiteJsonLd />
        <Header lang={lang} />
        <main id="main">{children}</main>
        <Footer lang={lang} />
        <WhatsAppFab lang={lang} />
        <BottomNav lang={lang} />
        <RevealOnScroll />
        <Analytics />
      </body>
    </html>
  );
}
