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
    <Container className="py-14 sm:py-20">
      <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
        Talk to us
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink/80">
        Ask about a tour, a date or a price. WhatsApp is the fastest way to reach us.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <ul className="divide-y divide-line border-y border-line">
            {rows.map(({ icon: Icon, label, node }) => (
              <li key={label} className="flex gap-4 py-5">
                <Icon size={22} className="mt-0.5 shrink-0 text-brand-deep" aria-hidden />
                <div className="min-w-0">
                  <h2 className="font-body text-sm font-semibold uppercase tracking-wide text-ink/60">
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

        <div>
          <h2 className="text-2xl font-semibold">Send a message</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </Container>
  );
}
