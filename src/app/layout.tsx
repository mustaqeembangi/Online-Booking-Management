import type { Metadata, Viewport } from "next";
import { Funnel_Display, Geist, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE } from "@/data/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFab from "@/components/layout/WhatsAppFab";
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
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: `${SITE.name}: desert safaris, dhow cruises, city tours and attractions in Dubai. Book by WhatsApp.`,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    images: ["/images/tours/dune-bashing.jpg"],
  },
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
        <SiteJsonLd />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
        <Analytics />
      </body>
    </html>
  );
}
