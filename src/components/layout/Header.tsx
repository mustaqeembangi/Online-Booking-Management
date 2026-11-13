"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ArrowUpRight, ChevronDown, Languages, MessageCircle, X, Menu as MenuIcon } from "lucide-react";
import { getCategories } from "@/data/tours";
import { UI, lp, type Lang } from "@/i18n";
import { whatsappLink } from "@/lib/whatsapp";
import Button from "@/components/ui/Button";

const linkCls =
  "rounded-full px-4 py-2 text-[15px] font-medium text-ink transition-colors hover:bg-ink hover:text-white";

// Same page in the other language: /tours/x <-> /ar/tours/x.
function useOtherLangPath(lang: Lang) {
  const path = usePathname() || "/";
  if (lang === "ar") return path.replace(/^\/ar(?=\/|$)/, "") || "/";
  return path === "/" ? "/ar" : `/ar${path}`;
}

export default function Header({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const CATEGORIES = getCategories(lang);
  const other = useOtherLangPath(lang);
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

  return (
    <header className="fixed inset-x-0 top-[max(0.75rem,env(safe-area-inset-top))] z-40 px-3">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between rounded-full border border-white/70 bg-white/85 ps-5 pe-2 shadow-[0_16px_40px_-20px_rgb(11_18_14/0.45)] backdrop-blur-xl sm:ps-6">
        <Link href={lp(lang, "/")} className="flex shrink-0 items-center" onClick={close}>
          <Image
            src="/images/logo.png"
            alt="Ammar Tours"
            width={56}
            height={44}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label={t.nav.main}>
          <Menu as="div" className="relative">
            <MenuButton className={`${linkCls} inline-flex items-center gap-1`}>
              {t.nav.tours} <ChevronDown size={16} />
            </MenuButton>
            <MenuItems
              anchor={{ to: "bottom start", gap: 18 }}
              className="z-50 w-72 rounded-3xl border border-line bg-white p-2 shadow-2xl focus:outline-none"
            >
              <MenuItem>
                <Link href={lp(lang, "/tours")} className="block rounded-2xl px-4 py-3 text-[15px] font-semibold text-ink data-[focus]:bg-ink data-[focus]:text-white">
                  {t.nav.allTours}
                </Link>
              </MenuItem>
              {CATEGORIES.map((c) => (
                <MenuItem key={c.id}>
                  <Link
                    href={lp(lang, `/tours?category=${c.id}`)}
                    className="block rounded-2xl px-4 py-3 text-[15px] text-ink data-[focus]:bg-ink data-[focus]:text-white"
                  >
                    {c.name}
                  </Link>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
          <Link href={lp(lang, "/about")} className={linkCls}>{t.nav.about}</Link>
          <Link href={lp(lang, "/contact")} className={linkCls}>{t.nav.contact}</Link>
          <a
            href={other}
            hrefLang={t.langSwitch.hreflang}
            lang={t.langSwitch.hreflang}
            title={t.langSwitch.title}
            className={`${linkCls} inline-flex items-center gap-1.5`}
          >
            <Languages size={16} aria-hidden />
            {t.langSwitch.label}
          </a>
          <Button href={whatsappLink()} variant="ink" className="ms-2" icon={<MessageCircle size={18} />}>
            {t.nav.whatsapp}
          </Button>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
        <a
          href={other}
          hrefLang={t.langSwitch.hreflang}
          lang={t.langSwitch.hreflang}
          title={t.langSwitch.title}
          className="inline-flex h-12 items-center rounded-full px-3.5 text-[15px] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
        >
          {t.langSwitch.label}
        </a>
        <button
          type="button"
          className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white"
          aria-label={t.nav.openMenu}
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <MenuIcon size={22} />
        </button>
        </div>
      </div>

      {open && (
        <div
          className="on-ink fixed inset-0 z-50 flex animate-[fade-in_.2s_ease-out] flex-col overflow-y-auto overscroll-contain bg-ink px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] text-white md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menu}
        >
          <div className="flex justify-end">
            <button
              type="button"
              aria-label={t.nav.closeMenu}
              onClick={close}
              className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink"
            >
              <X size={22} />
            </button>
          </div>
          <nav aria-label={t.nav.mobile} className="mt-4 flex flex-1 flex-col">
            {[
              { href: "/tours", label: t.nav.allTours },
              { href: "/about", label: t.nav.about },
              { href: "/contact", label: t.nav.contact },
            ].map((l) => (
              <Link
                key={l.href}
                href={lp(lang, l.href)}
                onClick={close}
                className="flex items-center justify-between border-b border-white/15 py-4 font-display text-[clamp(2.25rem,11vw,3.5rem)] font-semibold leading-none tracking-tight"
              >
                {l.label}
                <ArrowUpRight size={30} aria-hidden />
              </Link>
            ))}
            <ul className="mt-6 grid grid-cols-2 gap-x-4">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link
                    href={lp(lang, `/tours?category=${c.id}`)}
                    onClick={close}
                    className="block py-2.5 text-[16px] text-white/80"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Button href={whatsappLink()} size="lg" className="mt-auto w-full" icon={<MessageCircle size={20} />}>
              {t.nav.chatOnWhatsapp}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
