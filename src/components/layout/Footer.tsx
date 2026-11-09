import Link from "next/link";
import { CATEGORIES } from "@/data/tours";
import { SITE } from "@/data/site";
import Container from "@/components/ui/Container";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const link = "text-white/80 hover:text-brand";
const head = "mb-4 font-display text-lg font-semibold text-white";

export default function Footer() {
  return (
    <footer className="on-ink bg-ink pb-10 pt-16 text-white">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="font-display text-2xl font-semibold">{SITE.name}</div>
            <p className="mt-3 text-white/80">{SITE.tagline}</p>
            <p className="mt-3 text-white/80">{SITE.hours}</p>
          </div>
          <div>
            <h3 className={head}>Tours</h3>
            <ul className="space-y-2.5">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link href={`/tours?category=${c.id}`} className={link}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={head}>Company</h3>
            <ul className="space-y-2.5">
              <li><Link href="/about" className={link}>About</Link></li>
              <li><Link href="/contact" className={link}>Contact</Link></li>
              <li><Link href="/tours" className={link}>All tours</Link></li>
            </ul>
          </div>
          <div>
            <h3 className={head}>Get in touch</h3>
            <ul className="space-y-2.5">
              <li><a href={SITE.phoneHref} className={link}>{SITE.phone}</a></li>
              <li><a href={SITE.emailHref} className={link}>{SITE.email}</a></li>
              <li><a href={SITE.mapHref} className={link} {...ext}>{SITE.address}</a></li>
            </ul>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              <li><a href={SITE.socials.instagram} className={link} {...ext}>Instagram</a></li>
              <li><a href={SITE.socials.facebook} className={link} {...ext}>Facebook</a></li>
              <li><a href={SITE.socials.tripadvisor} className={link} {...ext}>TripAdvisor</a></li>
              <li><a href={SITE.socials.getyourguide} className={link} {...ext}>GetYourGuide</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/15 pt-6 text-sm text-white/70">
          &copy; {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
