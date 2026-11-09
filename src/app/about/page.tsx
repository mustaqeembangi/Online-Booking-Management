import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { SITE } from "@/data/site";
import { GYG_TOTAL_REVIEWS } from "@/data/tours";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata = pageMeta({
  title: "About Us",
  description: `${SITE.name} is a Dubai tour operator offering desert safaris, city tours, dhow cruises, visas and flexible tour packages around the UAE.`,
  path: "/about",
});

const SERVICES = [
  "Hotel accommodation",
  "Visas",
  "Inter-emirates city tours",
  "Desert safari",
  "Musandam trips",
  "Hatta mountain safari",
  "Water sports",
  "Fishing trips",
  "Golf",
  "Scuba diving",
  "Helicopter tours",
  "Dhow cruise dinner",
  "Airport meet and assist",
  "Multilingual guides",
];

const linkCls =
  "font-semibold text-brand-deep underline underline-offset-4 hover:text-ink";

export default function AboutPage() {
  const reviews = GYG_TOTAL_REVIEWS.toLocaleString("en-US");
  return (
    <>
      <section className="on-ink relative isolate flex min-h-[min(82svh,52rem)] items-end overflow-hidden bg-ink text-white">
        <Image
          src="/images/tours/evening-desert-safari.jpg"
          alt="Guests watching the sunset beside a safari vehicle in the Dubai desert"
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
            {SERVICES.map((s) => (
              <li key={s} className="border-t border-line py-3.5 text-lg">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <section className="on-ink bg-ink text-white">
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[min(80svh,48rem)]">
            <Image
              src="/images/tours/sand-boarding.jpg"
              alt="A guest sandboarding down a dune"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
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
