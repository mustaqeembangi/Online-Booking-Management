import type { Metadata } from "next";
import { SITE } from "@/data/site";
import { UI } from "@/i18n";
import SiteShell from "@/views/SiteShell";

export { viewport } from "@/views/SiteShell";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: UI.ar.meta.homeTitle(SITE.name), template: `%s | ${SITE.name}` },
  description: UI.ar.meta.homeDescription,
  applicationName: SITE.name,
  formatDetection: { telephone: false },
};

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="ar">{children}</SiteShell>;
}
