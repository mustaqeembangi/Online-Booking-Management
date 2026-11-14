import { pageMeta } from "@/lib/seo";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/info/ContactForm";
import PageBanner from "@/components/classic/PageBanner";
import { SITE } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { UI, type Lang } from "@/i18n";

export const contactMeta = (lang: Lang) =>
  pageMeta({
    title: UI[lang].contactPage.metaTitle,
    description: UI[lang].contactPage.metaDescription(SITE.name, UI[lang].hours),
    path: "/contact",
    lang,
  });

const linkCls =
  "font-semibold text-brand-deep underline underline-offset-4 hover:text-ink break-words";

export default function ContactView({ lang }: { lang: Lang }) {
  const t = UI[lang].contactPage;
  const rows = [
    {
      icon: Phone,
      label: t.phone,
      node: <a href={SITE.phoneHref} className={linkCls} dir="ltr">{SITE.phone}</a>,
    },
    {
      icon: MessageCircle,
      label: t.whatsapp,
      node: (
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={linkCls}>
          {t.messageNumber("")}<span dir="ltr">{SITE.phone}</span>
        </a>
      ),
    },
    {
      icon: Mail,
      label: t.email,
      node: <a href={SITE.emailHref} className={linkCls}>{SITE.email}</a>,
    },
    {
      icon: MapPin,
      label: t.address,
      node: (
        <>
          <p>{SITE.address}</p>
          <a href={SITE.mapHref} target="_blank" rel="noopener noreferrer" className={linkCls}>
            {t.maps}
          </a>
        </>
      ),
    },
    { icon: Clock, label: t.hours, node: <p>{UI[lang].hours}</p> },
  ];

  return (
    <>
    <PageBanner
      lang={lang}
      title={`${t.title[0]} ${t.title[1]}`}
      sub={t.intro}
      image="/images/tours/safari-quad-camel-bbq-buffet-2.jpg"
      crumb={UI[lang].classic.nav.contact}
    />
    <Container className="pb-[clamp(4rem,8vw,8rem)]">

      <div className="mt-[clamp(2rem,4vw,3.5rem)] grid gap-10 lg:grid-cols-2 lg:gap-[clamp(3rem,6vw,8rem)]">
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
            {t.follow}
            <a href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer" className={linkCls}>
              Instagram
            </a>
            {t.and}
            <a href={SITE.socials.facebook} target="_blank" rel="noopener noreferrer" className={linkCls}>
              Facebook
            </a>
            .
          </p>
        </div>

        <div className="rounded-[var(--radius-card)] border border-line p-[clamp(1.25rem,2.5vw,2.5rem)]">
          <h2 className="text-[clamp(1.75rem,3vw,3rem)] leading-none">{t.send}</h2>
          <div className="mt-6">
            <ContactForm lang={lang} />
          </div>
        </div>
      </div>
    </Container>
    </>
  );
}
