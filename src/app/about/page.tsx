import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { SITE } from "@/data/site";
import { GYG_TOTAL_REVIEWS } from "@/data/tours";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata = pageMeta({
  title: "About Us",
  description: `${SITE.name} is a Dubai tour operator offering desert safaris from Dubai, Abu Dhabi city tours, visas and flexible tour packages.`,
  path: "/about",
});

const SERVICES = [
  "Hotel accommodation",
  "Visas",
  "Abu Dhabi city tours",
  "Desert safari",
  "Airport meet and assist",
  "Multilingual guides",
];

const SERVICE_LINKS: Record<string, string> = {
  "Abu Dhabi city tours": "/tours?category=city-tours",
  "Desert safari": "/tours?category=desert-safari",
};

const linkCls =
  "font-semibold text-brand-deep underline underline-offset-4 hover:text-ink";

export default function AboutPage() {
  const reviews = GYG_TOTAL_REVIEWS.toLocaleString("en-US");
  return (
    <>
      <section className="on-ink relative isolate flex min-h-[min(82svh,52rem)] items-end overflow-hidden bg-ink text-white">
        <Image
          src="/images/tours/red-dune-safari-quad-camel-bbq-20.jpg"
          alt="Red sand dunes of the desert near Dubai"
          fill
          priority
          sizes="100vw"
          className="hero-photo -z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/35 to-ink/10" />
        <Container className="pb-[clamp(2rem,5vw,5rem)] pt-32">
          <h1 className="hero-title">
            Your people <span className="accent-word text-brand">in Dubai.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[clamp(1.05rem,1.4vw,1.35rem)] text-white/90">
            {SITE.name} is a Dubai tour operator with flexible programmes and tour packages around the UAE.
          </p>
        </Container>
      </section>

      <Container as="section" className="section-y">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-[clamp(3rem,6vw,8rem)]">
          <div>
            <h2 className="display-xl reveal">What we do</h2>
            <p className="mt-5 max-w-xl text-[clamp(1.05rem,1.4vw,1.35rem)] text-ink/70">
              We arrange tours for visitors and residents, from a few hours in the
              desert to full days out of the city. You can join a shared tour or
              ask for a private one, and we can adjust a programme to fit your plans.
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 sm:gap-x-8">
            {SERVICES.map((s) => {
              const href = SERVICE_LINKS[s];
              return (
                <li key={s} className="reveal border-t border-line py-3.5 text-lg">
                  {href ? (
                    <Link href={href} className="group inline-flex items-center gap-1.5 font-medium text-brand-deep underline decoration-line decoration-2 underline-offset-4 hover:decoration-brand">
                      {s}
                      <ArrowUpRight size={17} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  ) : (
                    s
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Container>

      <section className="on-ink bg-ink text-white">
        <div className="grid lg:grid-cols-2">
          <Link href="/tours?category=desert-safari" aria-label="See the desert safaris" className="group relative block aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[min(80svh,48rem)]">
            <Image
              src="/images/tours/desert-safari-quad-camel-sandboarding-3.jpg"
              alt="An Ammar Tours 4x4 and guests riding quad bikes in the dunes"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </Link>
          <div className="flex flex-col justify-center px-[var(--gutter)] py-[clamp(3rem,6vw,6rem)]">
            <h2 className="display-xl reveal">
              On the <span className="accent-word text-brand">dunes</span>
            </h2>
            <p className="mt-5 max-w-xl text-[clamp(1.05rem,1.4vw,1.35rem)] text-white/80">
              Our drivers are trained, and they pick you up by 4x4. On the desert safari
              you get a 30 to 45 minute drive over the dunes, then a break for
              sandboarding and the sunset.
            </p>
            <p className="mt-4 max-w-xl text-white/70">
              Our tours on GetYourGuide have {reviews} reviews in total.{" "}
              <a href={SITE.socials.getyourguide} target="_blank" rel="noopener noreferrer" className="font-medium text-brand underline underline-offset-4 hover:text-white">
                Read them on GetYourGuide
              </a>
              {" "}or find us on{" "}
              <a href={SITE.socials.tripadvisor} target="_blank" rel="noopener noreferrer" className="font-medium text-brand underline underline-offset-4 hover:text-white">
                TripAdvisor
              </a>
              .
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              <Button href="/tours" size="lg">See the tours</Button>
              <Button href={whatsappLink()} variant="glass" size="lg">Ask on WhatsApp</Button>
            </div>
          </div>
        </div>
      </section>

      <Container className="py-[clamp(2.5rem,4vw,4rem)]">
        <p className="text-lg">
          Visit us at {SITE.address}, or see the{" "}
          <Link href="/contact" className={linkCls}>
            contact page
          </Link>
          .
        </p>
      </Container>
    </>
  );
}
