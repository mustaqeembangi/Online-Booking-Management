import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SITE } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { UI, lp, type Lang } from "@/i18n";
import { FacebookIcon, InstagramIcon, TripadvisorIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const link = "text-[14px] text-white/75 transition-colors hover:text-white";
const head = "mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white/50";
const social = "grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white";

export default function Footer({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const v = t.v2;
  return (
    <footer className="on-ink bg-forest pt-[clamp(3rem,5vw,4.5rem)] text-white">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-[var(--gutter)] md:grid-cols-[1.6fr_1fr_1fr_1.3fr] xl:px-6">
        <div>
          <Image src="/images/logo.png" alt={SITE.name} width={72} height={56} className="h-12 w-auto rounded-lg bg-white p-1" />
          <p className="mt-6 font-semibold">{v.footerTitle}</p>
          <p className="mt-2 max-w-sm text-[14px] text-white/65">{v.footerText}</p>
          <a
            href={whatsappLink()}
            {...ext}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-deep px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-white hover:text-forest"
          >
            <MessageCircle size={17} aria-hidden />
            {v.footerCta}
          </a>
        </div>
        <div>
          <h3 className={head}>{v.explore}</h3>
          <ul className="space-y-2.5">
            <li><Link href={lp(lang, "/tours")} className={link}>{v.nav.experiences}</Link></li>
            <li><Link href={lp(lang, "/gallery")} className={link}>{v.nav.gallery}</Link></li>
            <li><Link href={lp(lang, "/reviews")} className={link}>{v.nav.reviews}</Link></li>
            <li><a href={SITE.socials.getyourguide} className={link} {...ext}>GetYourGuide</a></li>
          </ul>
        </div>
        <div>
          <h3 className={head}>{v.support}</h3>
          <ul className="space-y-2.5">
            <li><Link href={lp(lang, "/about")} className={link}>{v.nav.about}</Link></li>
            <li><Link href={lp(lang, "/contact")} className={link}>{t.nav.contact}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className={head}>{t.classic.contactUs}</h3>
          <ul className="space-y-2.5 text-[14px]">
            <li><a href={SITE.phoneHref} className={`${link} inline-flex items-center gap-2`}><Phone size={15} aria-hidden /><span dir="ltr">{SITE.phone}</span></a></li>
            <li><a href={SITE.emailHref} className={`${link} inline-flex items-center gap-2`}><Mail size={15} aria-hidden />{SITE.email}</a></li>
            <li><a href={SITE.mapHref} className={`${link} inline-flex items-start gap-2`} {...ext}><MapPin size={15} className="mt-0.5 shrink-0" aria-hidden />{SITE.address}</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1240px] flex-wrap items-center justify-between gap-4 border-t border-white/12 px-[var(--gutter)] py-6 text-[13px] text-white/55 xl:px-6">
        <span>&copy; {new Date().getFullYear()} {SITE.legalName}. {t.rights}</span>
        <span className="flex gap-2">
          <a href={SITE.socials.instagram} aria-label="Instagram" className={social} {...ext}><InstagramIcon size={16} /></a>
          <a href={SITE.socials.facebook} aria-label="Facebook" className={social} {...ext}><FacebookIcon size={16} /></a>
          <a href={SITE.socials.tripadvisor} aria-label="TripAdvisor" className={social} {...ext}><TripadvisorIcon size={16} /></a>
          <a href={whatsappLink()} aria-label="WhatsApp" className={social} {...ext}><WhatsAppIcon size={16} /></a>
        </span>
      </div>
    </footer>
  );
}
