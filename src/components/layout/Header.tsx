"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown, MessageCircle, X, Menu as MenuIcon } from "lucide-react";
import { CATEGORIES } from "@/data/tours";
import { whatsappLink } from "@/lib/whatsapp";
import Button from "@/components/ui/Button";

const linkCls = "text-[15px] font-semibold text-ink hover:text-brand-deep";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-20">
        <Link href="/" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo.png"
            alt="Ammar Tours"
            width={160}
            height={56}
            priority
            className="h-10 w-auto lg:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          <Menu as="div" className="relative">
            <MenuButton className={`${linkCls} inline-flex items-center gap-1`}>
              Tours <ChevronDown size={16} />
            </MenuButton>
            <MenuItems
              anchor={{ to: "bottom start", gap: 14 }}
              className="z-50 w-64 rounded-2xl border border-line bg-white p-2 shadow-xl focus:outline-none"
            >
              <MenuItem>
                <Link href="/tours" className="block rounded-lg px-3 py-2.5 text-[15px] font-semibold text-ink data-[focus]:bg-ink data-[focus]:text-white">
                  All tours
                </Link>
              </MenuItem>
              {CATEGORIES.map((c) => (
                <MenuItem key={c.id}>
                  <Link
                    href={`/tours?category=${c.id}`}
                    className="block rounded-lg px-3 py-2.5 text-[15px] text-ink data-[focus]:bg-ink data-[focus]:text-white"
                  >
                    {c.name}
                  </Link>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
          <Link href="/about" className={linkCls}>About</Link>
          <Link href="/contact" className={linkCls}>Contact</Link>
          <Button href={whatsappLink()} icon={<MessageCircle size={18} />}>
            WhatsApp
          </Button>
        </nav>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-line lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>

      {open && (
        <nav
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-white px-5 pb-6 pt-4 lg:hidden"
          aria-label="Mobile"
        >
          <Link href="/tours" onClick={() => setOpen(false)} className="block py-3 text-lg font-semibold">
            All tours
          </Link>
          <ul className="mb-2 ml-1 border-l-2 border-line pl-4">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/tours?category=${c.id}`}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-[16px] text-ink/80"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/about" onClick={() => setOpen(false)} className="block py-3 text-lg font-semibold">
            About
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="block py-3 text-lg font-semibold">
            Contact
          </Link>
          <Button href={whatsappLink()} size="lg" className="mt-3 w-full" icon={<MessageCircle size={20} />}>
            Chat on WhatsApp
          </Button>
        </nav>
      )}
    </header>
  );
}
