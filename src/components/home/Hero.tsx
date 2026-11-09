import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { SITE } from "@/data/site";
import { GYG_TOTAL_REVIEWS } from "@/data/tours";
import { whatsappLink } from "@/lib/whatsapp";

export default function Hero() {
  const rounded = Math.floor(GYG_TOTAL_REVIEWS / 10000) * 10000;
  return (
    <section className="relative isolate flex min-h-[640px] items-end overflow-hidden bg-ink text-white sm:min-h-[720px] lg:h-[86vh] lg:max-h-[860px]">
      <Image
        src="/images/tours/dune-bashing.jpg"
        alt="A 4x4 driving over a red sand dune in the Dubai desert"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/20" />
      <Container className="pb-12 pt-32 sm:pb-16 lg:pb-20">
        <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
          Dubai, seen from the dunes to the water
        </h1>
        <p className="mt-5 max-w-xl text-lg text-white/85 sm:text-xl">
          Desert safaris, dhow cruises and city tours with hotel pickup. Choose a tour and book by WhatsApp.
        </p>
        <div className="on-ink mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/tours" size="lg">
            View tours
          </Button>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center rounded-full border-2 border-white px-7 text-base font-semibold text-white transition-colors hover:bg-white hover:text-ink"
          >
            Book on WhatsApp
          </a>
        </div>
        <a
          href={SITE.socials.getyourguide}
          target="_blank"
          rel="noopener noreferrer"
          className="on-ink mt-6 inline-block text-[15px] text-white/80 underline decoration-white/40 underline-offset-4 hover:text-white"
        >
          Rated by more than {rounded.toLocaleString("en-US")} guests on GetYourGuide
        </a>
      </Container>
    </section>
  );
}
