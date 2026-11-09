import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/info/ContactForm";
import { SITE } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call, WhatsApp or email ${SITE.name} in Dubai. Ask about a tour, a date or a price. ${SITE.hours}.`,
  alternates: { canonical: "/contact" },
};

const linkCls =
  "font-semibold text-brand-deep underline underline-offset-4 hover:text-ink break-words";

export default function ContactPage() {
  const rows = [
    {
      icon: Phone,
      label: "Phone",
      node: <a href={SITE.phoneHref} className={linkCls}>{SITE.phone}</a>,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      node: (
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={linkCls}>
          Message {SITE.phone}
        </a>
      ),
    },
    {
      icon: Mail,
      label: "Email",
      node: <a href={SITE.emailHref} className={linkCls}>{SITE.email}</a>,
    },
    {
      icon: MapPin,
      label: "Address",
      node: (
        <>
          <p>{SITE.address}</p>
          <a href={SITE.mapHref} target="_blank" rel="noopener noreferrer" className={linkCls}>
            Open in Google Maps
          </a>
        </>
      ),
    },
    { icon: Clock, label: "Hours", node: <p>{SITE.hours}</p> },
  ];

  return (
    <Container className="pb-[clamp(4rem,8vw,8rem)] pt-[clamp(8rem,14vw,14rem)]">
      <h1 className="hero-title max-w-5xl">
        Talk <span className="accent-word text-brand-deep">to us.</span>
      </h1>
      <p className="mt-5 max-w-2xl text-[clamp(1.05rem,1.4vw,1.35rem)] text-ink/70">
        Ask about a tour, a date or a price. WhatsApp is the fastest way to reach us.
      </p>

      <div className="mt-[clamp(2.5rem,5vw,5rem)] grid gap-10 lg:grid-cols-2 lg:gap-[clamp(3rem,6vw,8rem)]">
        <div>
          <ul className="divide-y divide-line border-y border-line">
            {rows.map(({ icon: Icon, label, node }) => (
              <li key={label} className="flex gap-4 py-5">
                <Icon size={22} className="mt-0.5 shrink-0 text-brand-deep" aria-hidden />
                <div className="min-w-0">
                  <h2 className="font-body text-sm font-normal tracking-normal text-ink/55">
                    {label}
                  </h2>
                  <div className="mt-1 text-lg">{node}</div>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-lg">
            Follow us on{" "}
            <a href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer" className={linkCls}>
              Instagram
            </a>{" "}
            and{" "}
            <a href={SITE.socials.facebook} target="_blank" rel="noopener noreferrer" className={linkCls}>
              Facebook
            </a>
            .
          </p>
        </div>

        <div className="rounded-[var(--radius-card)] border border-line p-[clamp(1.25rem,2.5vw,2.5rem)]">
          <h2 className="text-[clamp(1.75rem,3vw,3rem)] leading-none">Send a message</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </Container>
  );
}
