import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { getTours } from "@/data/tours";
import { SITE } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { UI, lp, type Lang } from "@/i18n";
import { FacebookIcon, InstagramIcon, TripadvisorIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const link = "text-white/75 transition-colors hover:text-brand";
const head = "mb-4 font-display text-base font-semibold text-white";
const social = "grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand hover:text-ink";

export default function Footer({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const c = t.classic;
  return (
    <footer className="on-ink bg-forest pb-[calc(5rem+env(safe-area-inset-bottom))] pt-[clamp(3rem,5vw,4.5rem)] text-white lg:pb-0">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-[var(--gutter)] sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.3fr_1.3fr] xl:px-6">
        <div>
          <Image src="/images/logo.png" alt={SITE.name} width={80} height={62} className="h-14 w-auto rounded-xl bg-white p-1.5" />
          <p className="mt-4 font-semibold text-brand">{c.footerTagline}</p>
          <p className="mt-2 text-sm text-white/65">{t.hours}</p>
          <div className="mt-5 flex gap-2">
            <a href={SITE.socials.facebook} aria-label="Facebook" className={social} {...ext}><FacebookIcon size={18} /></a>
            <a href={SITE.socials.instagram} aria-label="Instagram" className={social} {...ext}><InstagramIcon size={18} /></a>
            <a href={SITE.socials.tripadvisor} aria-label="TripAdvisor" className={social} {...ext}><TripadvisorIcon size={18} /></a>
            <a href={whatsappLink()} aria-label="WhatsApp" className={social} {...ext}><WhatsAppIcon size={18} /></a>
          </div>
        </div>
        <div>
          <h3 className={head}>{c.quickLinks}</h3>
          <ul className="space-y-2.5">
            {[
              ["/", c.nav.home],
              ["/tours", c.nav.tours],
              ["/gallery", c.nav.gallery],
              ["/reviews", c.nav.reviews],
              ["/about", c.nav.about],
              ["/contact", c.nav.contact],
            ].map(([href, label]) => (
              <li key={href}><Link href={lp(lang, href)} className={link}>{label}</Link></li>
            ))}
            <li><a href={SITE.socials.getyourguide} className={link} {...ext}>GetYourGuide</a></li>
          </ul>
        </div>
        <div>
          <h3 className={head}>{c.ourTours}</h3>
          <ul className="space-y-2.5">
            {getTours(lang).map((x) => (
              <li key={x.slug}><Link href={lp(lang, `/tours/${x.slug}`)} className={link}>{x.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className={head}>{c.contactUs}</h3>
          <ul className="space-y-3">
            <li>
              <a href={SITE.phoneHref} className={`${link} inline-flex items-center gap-2`}>
                <Phone size={17} className="shrink-0 text-brand" aria-hidden />
                <span dir="ltr">{SITE.phone}</span>
              </a>
            </li>
            <li>
              <a href={SITE.emailHref} className={`${link} inline-flex items-center gap-2`}>
                <Mail size={17} className="shrink-0 text-brand" aria-hidden />
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={SITE.mapHref} className={`${link} inline-flex items-start gap-2`} {...ext}>
                <MapPin size={17} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                {SITE.address}
              </a>
            </li>
          </ul>
          <Link
            href={lp(lang, "/tours")}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-green px-6 py-3 font-semibold text-white transition-[background-color,scale] duration-300 hover:bg-brand hover:text-ink active:scale-95"
          >
            {c.bookNow}
            <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </div>
      <div className="mt-12 border-t border-white/15 py-5 text-center text-sm text-white/60">
        &copy; {new Date().getFullYear()} {SITE.legalName}. {t.rights}
      </div>
    </footer>
  );
}
