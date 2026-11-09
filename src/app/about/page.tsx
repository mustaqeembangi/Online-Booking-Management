import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { SITE } from "@/data/site";
import { GYG_TOTAL_REVIEWS } from "@/data/tours";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "About",
  description: `${SITE.name} is a tour operator in Dubai. Desert safaris, city tours, cruises, hotel stays, visas and more, with flexible programmes.`,
  alternates: { canonical: "/about" },
};

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
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Image
          src="/images/tours/evening-desert-safari.jpg"
          alt="Safari vehicles on the dunes at sunset near Dubai"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover opacity-60"
        />
        <Container className="py-24 sm:py-32 lg:py-40">
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
            A Dubai tour operator
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/90 sm:text-xl">
            {SITE.name} offers flexible programmes and tour packages in Dubai and around the UAE.
          </p>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-semibold">What we do</h2>
            <p className="mt-4 text-lg text-ink/80">
              We arrange tours for visitors and residents, from a few hours in the
              desert to full days out of the city. You can join a shared tour or
              ask for a private one, and we can adjust a programme to fit your plans.
            </p>
            <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <li key={s} className="border-b border-line py-3 text-lg">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-semibold">On the dunes</h2>
            <p className="mt-4 text-lg text-ink/80">
              Our drivers are trained, and we drive 4x4 pickups. On the desert safari
              you get a 30 to 45 minute drive over the dunes, then a break for
              sandboarding and the sunset.
            </p>
            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/tours/dune-bashing.jpg"
                alt="A 4x4 pickup driving over a sand dune"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>

      <section className="bg-ink text-white">
        <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/tours/sand-boarding.jpg"
              alt="A guest sandboarding down a dune"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold">What guests say</h2>
            <p className="mt-4 text-lg text-white/90">
              Our tours on GetYourGuide have {reviews} reviews in total.{" "}
              <a
                href={SITE.socials.getyourguide}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand underline underline-offset-4 hover:text-white"
              >
                Read them on GetYourGuide
              </a>
              {" "}or find us on{" "}
              <a
                href={SITE.socials.tripadvisor}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand underline underline-offset-4 hover:text-white"
              >
                TripAdvisor
              </a>
              .
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/tours" size="lg">
                See the tours
              </Button>
              <Button
                href={whatsappLink()}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-ink"
              >
                Ask on WhatsApp
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-14">
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
