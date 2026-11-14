"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ArrowRight, ChevronDown, Globe, MapPin, MessageCircle, X, Menu as MenuIcon } from "lucide-react";
import { destinationOf, getTours } from "@/data/tours";
import { SITE } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { UI, lp, type Lang } from "@/i18n";

// Same page in the other language: /tours/x <-> /ar/tours/x.
function useOtherLangPath(lang: Lang) {
  const path = usePathname() || "/";
  if (lang === "ar") return path.replace(/^\/ar(?=\/|$)/, "") || "/";
  return path === "/" ? "/ar" : `/ar${path}`;
}

const item = "block rounded-lg px-3.5 py-2.5 text-[14px] text-ink data-[focus]:bg-mist data-[focus]:text-brand-deep";

export default function Header({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const v = t.v2;
  const TOURS = getTours(lang);
  const other = useOtherLangPath(lang);
  const path = usePathname() || "/";
  const onHome = path === lp(lang, "/");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

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

  // Over the home page photo the bar is see-through with white text, until the visitor scrolls.
  const clear = onHome && !scrolled && !open;
  const linkCls = `text-[14px] font-medium transition-colors ${clear ? "text-white/90 hover:text-white" : "text-ink hover:text-brand-deep"}`;
  const destinations = ["dubai", "abu-dhabi"].map((d) => ({ id: d, count: TOURS.filter((x) => destinationOf(x) === d).length }));

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300 ${
        clear ? "border-b border-transparent bg-transparent" : "border-b border-line bg-white/95 shadow-[0_6px_20px_-16px_rgb(3_40_54/0.5)] backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[1240px] items-center justify-between gap-6 px-[var(--gutter)] xl:px-6">
        <Link href={lp(lang, "/")} className="flex shrink-0 items-center" onClick={close}>
          <Image
            src="/images/logo.png"
            alt={SITE.name}
            width={60}
            height={47}
            priority
            className={`h-11 w-auto rounded-lg transition-[background-color,padding] duration-300 ${clear ? "bg-white/95 p-1" : ""}`}
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label={t.nav.main}>
          <Menu as="div" className="relative">
            <MenuButton className={`${linkCls} inline-flex items-center gap-1`}>
              {v.nav.experiences} <ChevronDown size={15} aria-hidden />
            </MenuButton>
            <MenuItems anchor={{ to: "bottom start", gap: 14 }} className="z-50 w-80 rounded-xl border border-line bg-white p-1.5 shadow-2xl focus:outline-none">
              {TOURS.map((x) => (
                <MenuItem key={x.slug}>
                  <Link href={lp(lang, `/tours/${x.slug}`)} className={item}>{x.title}</Link>
                </MenuItem>
              ))}
              <MenuItem>
                <Link href={lp(lang, "/tours")} className={`${item} font-semibold text-brand-deep`}>{v.viewAll} →</Link>
              </MenuItem>
            </MenuItems>
          </Menu>
          <Menu as="div" className="relative">
            <MenuButton className={`${linkCls} inline-flex items-center gap-1`}>
              {v.nav.destinations} <ChevronDown size={15} aria-hidden />
            </MenuButton>
            <MenuItems anchor={{ to: "bottom start", gap: 14 }} className="z-50 w-64 rounded-xl border border-line bg-white p-1.5 shadow-2xl focus:outline-none">
              {destinations.map((d) => (
                <MenuItem key={d.id}>
                  <Link href={lp(lang, `/tours?category=${d.id === "dubai" ? "desert-safari" : "city-tours"}`)} className={`${item} flex items-center gap-3`}>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-forest text-[13px] font-bold text-white">
                      {v.destinations[d.id].charAt(0)}
                    </span>
                    <span>
                      <span className="block font-semibold">{v.destinations[d.id]}</span>
                      <span className="block text-xs text-ink/55">{v.experiences(d.count)}</span>
                    </span>
                  </Link>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
          <Link href={lp(lang, "/gallery")} className={linkCls}>{v.nav.gallery}</Link>
          <Link href={lp(lang, "/reviews")} className={linkCls}>{v.nav.reviews}</Link>
          <Link href={lp(lang, "/about")} className={linkCls}>{v.nav.about}</Link>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={other}
            hrefLang={t.langSwitch.hreflang}
            lang={t.langSwitch.hreflang}
            title={t.langSwitch.title}
            className={`inline-flex h-10 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-semibold transition-colors ${
              clear ? "border-white/40 text-white hover:bg-white hover:text-forest" : "border-line text-ink hover:border-forest"
            }`}
          >
            <Globe size={15} aria-hidden />
            {t.langSwitch.label} · AED
          </a>
          <Link
            href={lp(lang, "/tours")}
            className="hidden h-10 items-center rounded-full bg-forest px-5 text-[14px] font-semibold text-white transition-colors hover:bg-brand-deep sm:inline-flex"
          >
            {v.nav.bookNow}
          </Link>
          <button
            type="button"
            className={`grid h-10 w-10 place-items-center rounded-full lg:hidden ${clear ? "bg-white/15 text-white" : "bg-forest text-white"}`}
            aria-label={t.nav.openMenu}
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <MenuIcon size={20} />
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex animate-[fade-in_.2s_ease-out] flex-col overflow-y-auto overscroll-contain bg-white px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] text-ink lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menu}
        >
          <div className="flex items-center justify-between">
            <Image src="/images/logo.png" alt={SITE.name} width={60} height={47} className="h-11 w-auto" />
            <button type="button" aria-label={t.nav.closeMenu} onClick={close} className="grid h-10 w-10 place-items-center rounded-full bg-forest text-white">
              <X size={20} />
            </button>
          </div>
          <nav aria-label={t.nav.mobile} className="mt-6 flex flex-1 flex-col">
            {[
              { href: "/", label: t.classic.nav.home },
              { href: "/tours", label: v.nav.experiences },
              { href: "/gallery", label: v.nav.gallery },
              { href: "/reviews", label: v.nav.reviews },
              { href: "/about", label: v.nav.about },
              { href: "/contact", label: t.nav.contact },
            ].map((l) => (
              <Link key={l.href} href={lp(lang, l.href)} onClick={close} className="flex items-center justify-between border-b border-line py-4 text-xl font-semibold">
                {l.label}
                <ArrowRight size={20} aria-hidden className="text-brand-deep" />
              </Link>
            ))}
            <p className="eyebrow mt-6">{v.nav.destinations}</p>
            <ul className="mt-2 grid gap-1">
              {destinations.map((d) => (
                <li key={d.id}>
                  <Link
                    href={lp(lang, `/tours?category=${d.id === "dubai" ? "desert-safari" : "city-tours"}`)}
                    onClick={close}
                    className="flex items-center gap-2 py-1.5 text-[15px]"
                  >
                    <MapPin size={16} className="text-brand-deep" aria-hidden />
                    {v.destinations[d.id]} <span className="text-ink/50">· {v.experiences(d.count)}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <a href={whatsappLink()} className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-4 font-semibold text-white">
              <MessageCircle size={20} aria-hidden />
              {t.nav.chatOnWhatsapp}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
