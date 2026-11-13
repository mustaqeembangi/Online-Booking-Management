import Link from "next/link";
import { GYG_TOTAL_REVIEWS, TOURS } from "@/data/tours";
import { SITE } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

export default function Marquee() {
  const top = TOURS.filter((t) => t.gyg).sort((a, b) => b.gyg!.reviews - a.gyg!.reviews)[0];
  const gyg = SITE.socials.getyourguide;
  const facts = [
    { text: `Rated ${top.gyg!.rating.toFixed(1)} on GetYourGuide`, href: gyg },
    { text: "Hotel pickup", href: "/tours" },
    { text: `${GYG_TOTAL_REVIEWS.toLocaleString("en-US")} guest reviews`, href: gyg },
    { text: "Shared or private tours", href: "/tours" },
    { text: "Book by WhatsApp", href: whatsappLink() },
    { text: "Nothing to pay online", href: "/tours" },
    { text: `${TOURS.length} tours`, href: "/tours" },
  ];
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center">
      {facts.map((f) => (
        <li key={f.text} className="flex items-center whitespace-nowrap font-display text-[clamp(1.1rem,1.7vw,1.75rem)] font-semibold tracking-tight">
          <Link
            href={f.href}
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
    <div className="overflow-hidden bg-brand py-[clamp(0.85rem,1.3vw,1.25rem)] text-ink">
      <div className="marquee-track flex w-max hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
