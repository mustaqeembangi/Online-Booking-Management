import { GYG_TOTAL_REVIEWS, TOURS } from "@/data/tours";

export default function Marquee() {
  const top = TOURS.filter((t) => t.gyg).sort((a, b) => b.gyg!.reviews - a.gyg!.reviews)[0];
  const facts = [
    `Rated ${top.gyg!.rating.toFixed(1)} on GetYourGuide`,
    "Hotel pickup",
    `${GYG_TOTAL_REVIEWS.toLocaleString("en-US")} guest reviews`,
    "Shared or private tours",
    "Book by WhatsApp",
    "Nothing to pay online",
    `${TOURS.length} tours`,
  ];
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center">
      {facts.map((f) => (
        <li key={f} className="flex items-center whitespace-nowrap font-display text-[clamp(1.1rem,1.7vw,1.75rem)] font-semibold tracking-tight">
          {f}
          <span aria-hidden className="mx-[clamp(1.25rem,2.5vw,2.5rem)] h-2 w-2 rounded-full bg-ink" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden bg-brand py-[clamp(0.85rem,1.3vw,1.25rem)] text-ink">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
