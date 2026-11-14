import { Car, Headphones, Star, Users } from "lucide-react";
import { GYG_TOTAL_REVIEWS } from "@/data/tours";
import { UI, num, type Lang } from "@/i18n";

const ICONS = [Star, Headphones, Car, Users];

// Only claims we can back: GetYourGuide rating, 24-hour service, hotel pickup, review count.
export default function TrustStrip({ lang, tone = "green" }: { lang: Lang; tone?: "green" | "white" }) {
  const c = UI[lang].classic;
  const items = c.trust.map((it) => ({ ...it, sub: it.sub || c.trustedSub(num(lang, Math.floor(GYG_TOTAL_REVIEWS / 1000) * 1000)) }));
  const dark = tone === "green";
  return (
    <section className={dark ? "on-ink bg-green text-white" : "bg-white text-ink"}>
      <ul className="mx-auto grid max-w-[1240px] grid-cols-2 gap-y-6 px-[var(--gutter)] py-7 lg:grid-cols-4 xl:px-6">
        {items.map((it, i) => {
          const Icon = ICONS[i];
          return (
            <li
              key={it.title}
              className={`reveal flex items-center gap-3 px-2 lg:justify-center ${i > 0 ? (dark ? "lg:border-s lg:border-white/25" : "lg:border-s lg:border-line") : ""}`}
            >
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${dark ? "bg-white text-green" : "bg-green text-white"}`}>
                <Icon size={22} aria-hidden className={i === 0 ? "fill-current" : ""} />
              </span>
              <span>
                <span className="block font-display font-semibold leading-tight">{it.title}</span>
                <span className={`block text-sm ${dark ? "text-white/80" : "text-ink/60"}`}>{it.sub}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
