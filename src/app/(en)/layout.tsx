import type { Metadata } from "next";
import { SITE } from "@/data/site";
import { UI } from "@/i18n";
import SiteShell from "@/views/SiteShell";

export { viewport } from "@/views/SiteShell";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: UI.en.meta.homeTitle(SITE.name), template: `%s | ${SITE.name}` },
  description: UI.en.meta.homeDescription,
  applicationName: SITE.name,
  formatDetection: { telephone: false },
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="en">{children}</SiteShell>;
}
