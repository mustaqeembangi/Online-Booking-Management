"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ArrowRight, ChevronDown, Mail, MapPin, MessageCircle, Phone, X, Menu as MenuIcon } from "lucide-react";
import { getCategories, getTours } from "@/data/tours";
import { SITE } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { UI, lp, type Lang } from "@/i18n";

// Same page in the other language: /tours/x <-> /ar/tours/x.
function useOtherLangPath(lang: Lang) {
  const path = usePathname() || "/";
  if (lang === "ar") return path.replace(/^\/ar(?=\/|$)/, "") || "/";
  return path === "/" ? "/ar" : `/ar${path}`;
}

function useActive(lang: Lang) {
  const path = usePathname() || "/";
  const home = lp(lang, "/");
  return (href: string) => (href === home ? path === home : path.startsWith(href));
}

const item = "block rounded-xl px-4 py-2.5 text-[15px] text-ink data-[focus]:bg-forest data-[focus]:text-white";

function Dropdown({ label, active, children }: { label: string; active: boolean; children: React.ReactNode }) {
  return (
    <Menu as="div" className="relative">
      <MenuButton
        className={`inline-flex items-center gap-1 border-b-2 py-6 text-[15px] font-semibold transition-colors hover:text-green ${
          active ? "border-green text-green" : "border-transparent text-ink"
        }`}
      >
        {label} <ChevronDown size={16} aria-hidden />
      </MenuButton>
      <MenuItems
        anchor={{ to: "bottom start", gap: 0 }}
        className="z-50 w-80 rounded-2xl border border-line bg-white p-2 shadow-2xl focus:outline-none"
      >
        {children}
      </MenuItems>
    </Menu>
  );
}

export default function Header({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const c = t.classic;
  const CATEGORIES = getCategories(lang);
  const TOURS = getTours(lang);
  const other = useOtherLangPath(lang);
  const isActive = useActive(lang);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const navLink = (href: string, label: string) => {
    const h = lp(lang, href);
    return (
      <Link
        href={h}
        className={`border-b-2 py-6 text-[15px] font-semibold transition-colors hover:text-green ${
          isActive(h) ? "border-green text-green" : "border-transparent text-ink"
        }`}
      >
        {label}
      </Link>
    );
  };

  const langLink = (cls: string) => (
    <a href={other} hrefLang={t.langSwitch.hreflang} lang={t.langSwitch.hreflang} title={t.langSwitch.title} className={cls}>
      {t.langSwitch.label}
    </a>
  );

  return (
    <header className="sticky top-0 z-40">
      {/* Top bar */}
      <div className="hidden bg-forest text-[13px] text-white md:block">
        <div className="mx-auto flex h-10 max-w-[1240px] items-center justify-between gap-6 px-[var(--gutter)] xl:px-6">
          <ul className="flex items-center gap-5">
            <li className="inline-flex items-center gap-1.5">
              <MapPin size={14} className="text-brand" aria-hidden />
              {c.location}
            </li>
            <li>
              <a href={SITE.phoneHref} dir="ltr" className="inline-flex items-center gap-1.5 hover:text-brand">
                <Phone size={14} className="text-brand" aria-hidden />
                {SITE.phone}
              </a>
            </li>
            <li className="hidden lg:block">
              <a href={SITE.emailHref} className="inline-flex items-center gap-1.5 hover:text-brand">
                <Mail size={14} className="text-brand" aria-hidden />
                {SITE.email}
              </a>
            </li>
          </ul>
          <ul className="flex items-center gap-4">
            <li><Link href={lp(lang, "/about")} className="hover:text-brand">{c.nav.about}</Link></li>
            <li><Link href={lp(lang, "/contact")} className="hover:text-brand">{c.nav.contact}</Link></li>
            <li className="border-s border-white/25 ps-4">{langLink("font-semibold hover:text-brand")}</li>
          </ul>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-line bg-white/95 shadow-[0_8px_24px_-18px_rgb(11_18_14/0.4)] backdrop-blur-xl">
        <div className="mx-auto flex h-[4.5rem] max-w-[1240px] items-center justify-between gap-6 px-[var(--gutter)] lg:h-auto xl:px-6">
          <Link href={lp(lang, "/")} className="flex shrink-0 items-center" onClick={close}>
            <Image src="/images/logo.png" alt={SITE.name} width={64} height={50} priority className="h-12 w-auto" />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label={t.nav.main}>
            {navLink("/", c.nav.home)}
            <Dropdown label={c.nav.tours} active={isActive(lp(lang, "/tours"))}>
              <MenuItem>
                <Link href={lp(lang, "/tours")} className={`${item} font-semibold`}>{c.allTours}</Link>
              </MenuItem>
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat.id}>
                  <Link href={lp(lang, `/tours?category=${cat.id}`)} className={item}>{cat.name}</Link>
                </MenuItem>
              ))}
            </Dropdown>
            <Dropdown label={c.nav.experiences} active={false}>
              {TOURS.map((x) => (
                <MenuItem key={x.slug}>
                  <Link href={lp(lang, `/tours/${x.slug}`)} className={item}>{x.title}</Link>
                </MenuItem>
              ))}
            </Dropdown>
            {navLink("/about", c.nav.about)}
            {navLink("/gallery", c.nav.gallery)}
            {navLink("/reviews", c.nav.reviews)}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={lp(lang, "/tours")}
              className="hidden items-center gap-2 rounded-full bg-green px-6 py-3 font-semibold text-white shadow-[0_10px_24px_-12px_rgb(31_138_60/0.9)] transition-[background-color,scale] duration-300 hover:bg-forest active:scale-95 lg:inline-flex"
            >
              {c.bookNow}
              <ArrowRight size={18} aria-hidden />
            </Link>
            {langLink("inline-flex h-11 items-center rounded-full px-3 text-[15px] font-semibold text-ink hover:bg-forest hover:text-white md:hidden")}
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full bg-forest text-white lg:hidden"
              aria-label={t.nav.openMenu}
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <MenuIcon size={22} />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="on-ink fixed inset-0 z-50 flex animate-[fade-in_.2s_ease-out] flex-col overflow-y-auto overscroll-contain bg-forest px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] text-white lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menu}
        >
          <div className="flex items-center justify-between">
            <Image src="/images/logo.png" alt={SITE.name} width={64} height={50} className="h-12 w-auto rounded-lg bg-white p-1" />
            <button type="button" aria-label={t.nav.closeMenu} onClick={close} className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink">
              <X size={22} />
            </button>
          </div>
          <nav aria-label={t.nav.mobile} className="mt-6 flex flex-1 flex-col">
            {[
              { href: "/", label: c.nav.home },
              { href: "/tours", label: c.nav.tours },
              { href: "/gallery", label: c.nav.gallery },
              { href: "/reviews", label: c.nav.reviews },
              { href: "/about", label: c.nav.about },
              { href: "/contact", label: c.nav.contact },
            ].map((l) => (
              <Link
                key={l.href}
                href={lp(lang, l.href)}
                onClick={close}
                className="flex items-center justify-between border-b border-white/15 py-4 font-display text-2xl font-semibold"
              >
                {l.label}
                <ArrowRight size={22} aria-hidden />
              </Link>
            ))}
            <ul className="mt-5 grid gap-1">
              {TOURS.map((x) => (
                <li key={x.slug}>
                  <Link href={lp(lang, `/tours/${x.slug}`)} onClick={close} className="block py-1.5 text-[15px] text-white/80">
                    {x.title}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={whatsappLink()}
              className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-green px-6 py-4 font-semibold text-white"
            >
              <MessageCircle size={20} aria-hidden />
              {t.nav.chatOnWhatsapp}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
