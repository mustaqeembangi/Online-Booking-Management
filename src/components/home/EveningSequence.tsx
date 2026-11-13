import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getTour } from "@/data/tours";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const SLUG = "red-dune-safari-quad-camel-bbq";

export default function EveningSequence() {
  const tour = getTour(SLUG);
  if (!tour || !tour.optionIncludes) return null;
  const inc = tour.includes;
  const camp = tour.optionIncludes.items;
  // Chapters pick lines from the tour's real GetYourGuide lists.
  const chapters = [
    { title: "The drive", items: [inc[0], inc[1], inc[2]], image: `/images/tours/${SLUG}.jpg` },
    { title: "The dunes", items: [inc[3], inc[4], inc[5], inc[10]], image: "/images/tours/desert-safari-quad-camel-sandboarding.jpg" },
    { title: "The evening", items: [camp[0], camp[1], camp[5], camp[6], camp[7]], image: "/images/tours/evening-tour-quad-camel-bbq-2.jpg" },
  ];
  return (
    <Container as="section" className="section-y">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="display-xl reveal max-w-4xl">
          One evening, <span className="accent-word text-brand-deep">three chapters</span>
        </h2>
        <div className="reveal">
          <p className="text-ink/60">{tour.duration}, with hotel pickup</p>
          <Button href={`/tours/${tour.slug}`} variant="outline" className="mt-3" icon={<ArrowUpRight size={18} />}>
            See the Red Dune Safari
          </Button>
        </div>
      </div>

      <div className="mt-[clamp(2rem,5vw,5rem)] grid gap-[clamp(0.75rem,1.2vw,1.5rem)]">
        {chapters.map((c, i) => (
          <article
            key={c.title}
            style={{ "--i": i } as React.CSSProperties}
            className="on-ink chapter grid overflow-hidden rounded-[var(--radius-card)] bg-ink text-white shadow-[0_-20px_40px_-24px_rgb(11_18_14/0.55)] ring-1 ring-white/15 ring-inset md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] md:order-2 md:aspect-auto md:min-h-[clamp(20rem,34vw,34rem)]">
              <Image src={c.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-between gap-8 p-[clamp(1.5rem,3.5vw,4rem)]">
              <div className="flex items-baseline gap-4">
                <span className="accent-word text-[clamp(1.5rem,2.5vw,2.75rem)] text-brand">{i + 1}</span>
                <h3 className="text-[clamp(2.25rem,5vw,5.5rem)] leading-none">{c.title}</h3>
              </div>
              <ul className="space-y-2.5 text-[clamp(1.05rem,1.4vw,1.4rem)] leading-snug text-white/85">
                {c.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}
