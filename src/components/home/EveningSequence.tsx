import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getTour } from "@/data/tours";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

// Groups the tour's real "includes" list into chapters. Numbers are positions in that list.
const CHAPTERS = [
  { title: "The drive", items: [0, 1], image: "private-desert-safari" },
  { title: "The dunes", items: [2, 3, 4], image: "sand-boarding" },
  { title: "The camp", items: [5, 6, 7, 8, 9], image: "camel-riding" },
  { title: "The night", items: [10, 11], image: "evening-desert-safari" },
];

export default function EveningSequence() {
  const tour = getTour("evening-desert-safari");
  if (!tour) return null;
  return (
    <Container as="section" className="section-y">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="display-xl reveal max-w-4xl">
          One evening, <span className="accent-word text-brand-deep">four chapters</span>
        </h2>
        <div className="reveal">
          <p className="text-ink/60">Pickup {tour.departs}, back {tour.returns}</p>
          <Button href={`/tours/${tour.slug}`} variant="outline" className="mt-3" icon={<ArrowUpRight size={18} />}>
            See the Evening Safari
          </Button>
        </div>
      </div>

      <div className="mt-[clamp(2rem,5vw,5rem)] grid gap-[clamp(0.75rem,1.2vw,1.5rem)]">
        {CHAPTERS.map((c, i) => (
          <article
            key={c.title}
            style={{ "--i": i } as React.CSSProperties}
            className="on-ink chapter grid overflow-hidden rounded-[var(--radius-card)] bg-ink text-white shadow-[0_-20px_40px_-24px_rgb(11_18_14/0.55)] ring-1 ring-white/15 ring-inset md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] md:order-2 md:aspect-auto md:min-h-[clamp(20rem,34vw,34rem)]">
              <Image src={`/images/tours/${c.image}.jpg`} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-between gap-8 p-[clamp(1.5rem,3.5vw,4rem)]">
              <div className="flex items-baseline gap-4">
                <span className="accent-word text-[clamp(1.5rem,2.5vw,2.75rem)] text-brand">{i + 1}</span>
                <h3 className="text-[clamp(2.25rem,5vw,5.5rem)] leading-none">{c.title}</h3>
              </div>
              <ul className="space-y-2.5 text-[clamp(1.05rem,1.4vw,1.4rem)] leading-snug text-white/85">
                {c.items.map((n) => (
                  <li key={n}>{tour.includes[n]}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}
