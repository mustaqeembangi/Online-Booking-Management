"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, House, Phone } from "lucide-react";
import { SITE } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { UI, lp, type Lang } from "@/i18n";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

// Phones and tablets: fixed bar with the four things visitors need most.
export default function BottomNav({ lang }: { lang: Lang }) {
  const b = UI[lang].classic.bottom;
  const path = usePathname() || "/";
  const home = lp(lang, "/");
  const tours = lp(lang, "/tours");
  const cls = (on: boolean) =>
    `flex flex-1 flex-col items-center gap-0.5 py-2 text-[11.5px] font-semibold transition-colors ${on ? "text-green" : "text-ink/70"}`;
  return (
    <nav
      aria-label={b.tours}
      className="bottom-nav fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-16px_rgb(11_18_14/0.4)] backdrop-blur-xl lg:hidden"
    >
      <Link href={home} className={cls(path === home)}><House size={22} aria-hidden />{b.home}</Link>
      <Link href={tours} className={cls(path.startsWith(tours))}><Compass size={22} aria-hidden />{b.tours}</Link>
      <a href={SITE.phoneHref} className={cls(false)}><Phone size={22} aria-hidden />{b.call}</a>
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={cls(false)}>
        <WhatsAppIcon size={22} className="text-green" />{b.whatsapp}
      </a>
    </nav>
  );
}
