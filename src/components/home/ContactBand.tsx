import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import { SITE } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import Button from "@/components/ui/Button";
import { UI, type Lang } from "@/i18n";

export default function ContactBand({ lang }: { lang: Lang }) {
  const t = UI[lang].contactBand;
  return (
    <section className="on-ink relative isolate flex min-h-[min(64svh,40rem)] items-end overflow-hidden bg-ink text-white">
      <Image src="/images/tours/safari-quad-camel-bbq-buffet-2.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
      <div className="w-full px-[var(--gutter)] py-[clamp(3rem,6vw,6rem)]">
        <h2 className="hero-title reveal">
          {t.title[0]} <span className="accent-word text-brand">{t.title[1]}</span>
        </h2>
        <div className="reveal mt-[clamp(1.5rem,3vw,3rem)] flex flex-wrap gap-2.5">
          <Button href={whatsappLink()} size="lg" icon={<MessageCircle size={20} />}>{t.message}</Button>
          <Button href={SITE.phoneHref} size="lg" variant="glass" icon={<Phone size={18} />}><span dir="ltr">{SITE.phone}</span></Button>
        </div>
      </div>
    </section>
  );
}
