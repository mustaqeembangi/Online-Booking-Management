import Image from "next/image";
import { MessageCircle, Star } from "lucide-react";
import Button from "@/components/ui/Button";
import { SITE } from "@/data/site";
import { GYG_TOTAL_REVIEWS } from "@/data/tours";
import { whatsappLink } from "@/lib/whatsapp";

export default function Hero() {
  const rounded = Math.floor(GYG_TOTAL_REVIEWS / 10000) * 10000;
  return (
    <section className="on-ink relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink text-white">
      <Image
        src="/images/tours/evening-tour-quad-camel-bbq.jpg"
        alt="An Ammar Tours 4x4 driving through red dunes while guests sandboard at sunset"
        fill
        priority
        sizes="100vw"
        quality={70}
        className="hero-photo -z-20 object-cover object-[35%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/35 to-ink/10" />

      <div className="grid w-full items-end gap-[clamp(1.25rem,3vw,3rem)] px-[var(--gutter)] pb-[clamp(1.5rem,4svh,3.5rem)] pt-24 md:grid-cols-[1fr_minmax(280px,380px)]">
        <h1 className="hero-title hero-in">
          <span className="block">Dunes.</span>
          <span className="block">Desert.</span>
          <span className="accent-word block text-brand">City.</span>
        </h1>
        <div className="hero-in [animation-delay:150ms]">
          <p className="text-[clamp(1.05rem,1.35vw,1.35rem)] leading-snug text-white/90">
            Desert safaris and Abu Dhabi city tours with hotel pickup. Pick a tour and book it in one WhatsApp message.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button href="/tours" size="lg">View tours</Button>
            <Button href={whatsappLink()} size="lg" variant="glass" icon={<MessageCircle size={20} />}>
              WhatsApp
            </Button>
          </div>
          <a
            href={SITE.socials.getyourguide}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex max-w-[calc(100%-4.5rem)] items-center gap-1.5 text-sm text-white/80 hover:text-white md:max-w-none"
          >
            <Star size={15} className="fill-brand text-brand" aria-hidden />
            More than {rounded.toLocaleString("en-US")} reviews on GetYourGuide
          </a>
        </div>
      </div>
    </section>
  );
}
