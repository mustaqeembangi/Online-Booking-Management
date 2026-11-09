"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ArrowUpRight, ChevronDown, MessageCircle, X, Menu as MenuIcon } from "lucide-react";
import { CATEGORIES } from "@/data/tours";
import { whatsappLink } from "@/lib/whatsapp";
import Button from "@/components/ui/Button";

const linkCls =
  "rounded-full px-4 py-2 text-[15px] font-medium text-ink transition-colors hover:bg-ink hover:text-white";

export default function Header() {
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
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between rounded-full border border-white/70 bg-white/85 pl-5 pr-2 shadow-[0_16px_40px_-20px_rgb(11_18_14/0.45)] backdrop-blur-xl sm:pl-6">
        <Link href="/" className="flex shrink-0 items-center" onClick={close}>
          <Image
            src="/images/logo.png"
            alt="Ammar Tours"
            width={160}
            height={127}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          <Menu as="div" className="relative">
            <MenuButton className={`${linkCls} inline-flex items-center gap-1`}>
              Tours <ChevronDown size={16} />
            </MenuButton>
            <MenuItems
              anchor={{ to: "bottom start", gap: 18 }}
              className="z-50 w-72 rounded-3xl border border-line bg-white p-2 shadow-2xl focus:outline-none"
            >
              <MenuItem>
                <Link href="/tours" className="block rounded-2xl px-4 py-3 text-[15px] font-semibold text-ink data-[focus]:bg-ink data-[focus]:text-white">
                  All tours
                </Link>
              </MenuItem>
              {CATEGORIES.map((c) => (
                <MenuItem key={c.id}>
                  <Link
                    href={`/tours?category=${c.id}`}
                    className="block rounded-2xl px-4 py-3 text-[15px] text-ink data-[focus]:bg-ink data-[focus]:text-white"
                  >
                    {c.name}
                  </Link>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
          <Link href="/about" className={linkCls}>About</Link>
          <Link href="/contact" className={linkCls}>Contact</Link>
          <Button href={whatsappLink()} variant="ink" className="ml-2" icon={<MessageCircle size={18} />}>
            WhatsApp
          </Button>
        </nav>

        <button
          type="button"
          className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white md:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <MenuIcon size={22} />
        </button>
      </div>

      {open && (
        <div
          className="on-ink fixed inset-0 z-50 flex animate-[fade-in_.2s_ease-out] flex-col overflow-y-auto overscroll-contain bg-ink px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] text-white md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="flex justify-end">
            <button
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink"
            >
              <X size={22} />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-4 flex flex-1 flex-col">
            {[
              { href: "/tours", label: "All tours" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
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
                    href={`/tours?category=${c.id}`}
                    onClick={close}
                    className="block py-2.5 text-[16px] text-white/80"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Button href={whatsappLink()} size="lg" className="mt-auto w-full" icon={<MessageCircle size={20} />}>
              Chat on WhatsApp
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
