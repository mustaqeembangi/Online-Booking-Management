import Link from "next/link";
import { GYG_TOTAL_REVIEWS, TOURS } from "@/data/tours";
import { SITE } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { UI, lp, num, type Lang } from "@/i18n";

export default function Marquee({ lang }: { lang: Lang }) {
  const m = UI[lang].marquee;
  const tours = lp(lang, "/tours");
  const top = TOURS.filter((t) => t.gyg).sort((a, b) => b.gyg!.reviews - a.gyg!.reviews)[0];
  const gyg = SITE.socials.getyourguide;
  const facts = [
    { text: m.rated(top.gyg!.rating.toFixed(1)), href: gyg },
    { text: m.pickup, href: tours },
    { text: m.reviews(num(lang, GYG_TOTAL_REVIEWS)), href: gyg },
    { text: m.sharedPrivate, href: tours },
    { text: m.book, href: whatsappLink() },
    { text: m.noPay, href: tours },
    { text: m.tours(TOURS.length), href: tours },
  ];
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center">
      {facts.map((f) => (
        <li key={f.text} className="flex items-center whitespace-nowrap font-display text-[clamp(1.1rem,1.7vw,1.75rem)] font-semibold tracking-tight">
          <Link
            href={f.href}
            dir={UI[lang].dir}
            tabIndex={hidden ? -1 : undefined}
            {...(f.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
            className="underline decoration-transparent decoration-2 underline-offset-4 transition-[text-decoration-color] hover:decoration-ink"
          >
            {f.text}
          </Link>
          <span aria-hidden className="mx-[clamp(1.25rem,2.5vw,2.5rem)] h-2 w-2 rounded-full bg-ink" />
        </li>
      ))}
    </ul>
  );
  return (
    <div dir="ltr" className="overflow-hidden bg-brand py-[clamp(0.85rem,1.3vw,1.25rem)] text-ink">
      <div className="marquee-track flex w-max hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
