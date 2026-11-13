import { SITE } from "@/data/site";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { bookingMessage, whatsappLink } from "@/lib/whatsapp";
import Container from "@/components/ui/Container";

const STEPS = [
  { title: "Choose a tour", text: "Look through the tours and pick the one you like.", href: "/tours" },
  { title: "Send your details", text: "Tell us the date, how many of you are coming and where you are staying.", href: "/tours" },
  { title: "We confirm your pickup", text: "We reply on WhatsApp to confirm your booking and pickup. Nothing is charged on this website.", href: whatsappLink() },
];

export default function HowBooking() {
  const sample = bookingMessage({
    tourTitle: "Red Dune Safari, Quad Bike, Camel Riding and BBQ Dinner",
    date: "Saturday, 12 December 2026",
    adults: 2,
    children: 1,
    pickup: "Your hotel",
    name: "Your name",
  });
  return (
    <Container as="section" className="pb-[clamp(3rem,6vw,6.5rem)]">
      <div className="grid gap-[clamp(2.5rem,6vw,7rem)] lg:grid-cols-[1.15fr_1fr]">
        <div>
          <h2 className="display-xl reveal">
            Booking takes <span className="accent-word text-brand-deep">one message</span>
          </h2>
          <ol className="mt-[clamp(2rem,4vw,4rem)]">
            {STEPS.map((s, i) => (
              <li key={s.title} className="reveal border-t border-line">
                <Link
                  href={s.href}
                  {...(s.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                  className="group grid grid-cols-[clamp(2.5rem,5vw,5rem)_1fr_auto] items-start gap-3 py-[clamp(1.1rem,2vw,2rem)] transition-[padding] duration-300 hover:pl-2"
                >
                  <span className="accent-word text-[clamp(1.75rem,3vw,3rem)] leading-none text-brand-deep">{i + 1}</span>
                  <div>
                    <h3 className="text-[clamp(1.4rem,2.2vw,2.5rem)] leading-tight transition-colors group-hover:text-brand-deep">{s.title}</h3>
                    <p className="mt-1.5 max-w-xl text-ink/65">{s.text}</p>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-line transition-[background-color,border-color,transform] duration-300 group-hover:rotate-45 group-hover:border-brand group-hover:bg-brand">
                    <ArrowUpRight size={18} aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
        <a
          href={whatsappLink(sample)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open WhatsApp with this example message"
          className="reveal group flex items-center justify-center rounded-[var(--radius-card)] bg-ink p-[clamp(1.25rem,3vw,3.5rem)] transition-transform duration-300 active:scale-[0.99]"
        >
        <figure className="w-full">
          <div className="w-full max-w-md">
            <figcaption className="mb-4 flex items-center gap-3 text-white">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand font-display font-semibold text-ink">A</span>
              <span>
                <span className="block font-semibold leading-tight">{SITE.name}</span>
                <span className="block text-sm text-white/55">Example of the message you send</span>
              </span>
            </figcaption>
            <p className="whitespace-pre-line rounded-3xl rounded-tr-md bg-brand p-5 text-[15px] leading-relaxed text-ink transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-[-0.6deg]">
              {sample}
            </p>
          </div>
        </figure>
        </a>
      </div>
    </Container>
  );
}
