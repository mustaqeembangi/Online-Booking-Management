import type { Metadata, Viewport } from "next";
import { Funnel_Display, Geist, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE } from "@/data/site";
import { HOME_DESCRIPTION } from "@/lib/seo";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFab from "@/components/layout/WhatsAppFab";
import RevealOnScroll from "@/components/layout/RevealOnScroll";
import SiteJsonLd from "@/components/info/SiteJsonLd";
import "./globals.css";

const funnel = Funnel_Display({
  subsets: ["latin"],
  variable: "--font-funnel",
  display: "swap",
});
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});
const serifAccent = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif-accent",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `Dubai Desert Safari & Abu Dhabi City Tours | ${SITE.name}`,
    template: `%s | ${SITE.name}`,
  },
  description: HOME_DESCRIPTION,
  applicationName: SITE.name,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b120e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${funnel.variable} ${geist.variable} ${serifAccent.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <SiteJsonLd />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFab />
        <RevealOnScroll />
        <Analytics />
      </body>
    </html>
  );
}
