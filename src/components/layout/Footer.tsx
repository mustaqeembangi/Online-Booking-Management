import Link from "next/link";
import { getCategories } from "@/data/tours";
import { UI, lp, type Lang } from "@/i18n";
import { SITE } from "@/data/site";
import Container from "@/components/ui/Container";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const link = "text-white/75 transition-colors hover:text-brand";
const head = "mb-4 text-sm font-medium text-white/50";

export default function Footer({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const CATEGORIES = getCategories(lang);
  return (
    <footer className="on-ink overflow-hidden bg-ink pt-[clamp(3.5rem,7vw,7rem)] text-white">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div className="col-span-2 lg:col-span-1">
            <p className="max-w-xs font-display text-[clamp(1.5rem,2.2vw,2.25rem)] font-semibold leading-tight tracking-tight">
              {t.tagline}
            </p>
            <p className="mt-3 text-white/60">{t.hours}</p>
          </div>
          <div>
            <h3 className={head}>{t.footer.tours}</h3>
            <ul className="space-y-2.5">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link href={lp(lang, `/tours?category=${c.id}`)} className={link}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={head}>{t.footer.company}</h3>
            <ul className="space-y-2.5">
              <li><Link href={lp(lang, "/about")} className={link}>{t.nav.about}</Link></li>
              <li><Link href={lp(lang, "/contact")} className={link}>{t.nav.contact}</Link></li>
              <li><Link href={lp(lang, "/tours")} className={link}>{t.nav.allTours}</Link></li>
              <li><a href={SITE.socials.instagram} className={link} {...ext}>Instagram</a></li>
              <li><a href={SITE.socials.facebook} className={link} {...ext}>Facebook</a></li>
              <li><a href={SITE.socials.tripadvisor} className={link} {...ext}>TripAdvisor</a></li>
              <li><a href={SITE.socials.getyourguide} className={link} {...ext}>GetYourGuide</a></li>
            </ul>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <h3 className={head}>{t.footer.contact}</h3>
            <ul className="space-y-2.5">
              <li><a href={SITE.phoneHref} className={link} dir="ltr">{SITE.phone}</a></li>
              <li><a href={SITE.emailHref} className={link}>{SITE.email}</a></li>
              <li><a href={SITE.mapHref} className={link} {...ext}>{SITE.address}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/15 pt-5 pb-[env(safe-area-inset-bottom)] text-sm text-white/55">
          &copy; {new Date().getFullYear()} {SITE.legalName}. {t.rights}
        </div>
      </Container>
      <div
        aria-hidden
        className="footer-wordmark mt-6 select-none whitespace-nowrap text-center font-display text-[13.9vw] font-semibold leading-[0.74] tracking-[-0.05em] text-white/[0.09]"
      />
    </footer>
  );
}
