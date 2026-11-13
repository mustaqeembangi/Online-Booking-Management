"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { CalendarDays } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { ar } from "react-day-picker/locale";
import "react-day-picker/style.css";

const fmt = (lang: "en" | "ar") =>
  new Intl.DateTimeFormat(lang === "ar" ? "ar-AE-u-nu-latn" : "en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function DatePicker({
  label,
  value,
  onChange,
  placeholder = "Choose a date",
  lang = "en",
}: {
  lang?: "en" | "ar";
  label: string;
  value: Date | undefined;
  onChange: (d: Date | undefined) => void;
  placeholder?: string;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    <Popover className="relative">
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      <PopoverButton className="flex h-12 w-full items-center justify-between gap-2 rounded-xl border border-line bg-white px-4 text-start text-[15px] text-ink transition-colors hover:border-ink/40 focus:border-ink data-[open]:border-ink">
        <span className={value ? "" : "text-ink/40"}>{value ? fmt(lang).format(value) : placeholder}</span>
        <CalendarDays size={18} className="shrink-0 text-ink/60" />
      </PopoverButton>
      <PopoverPanel
        anchor={{ to: "bottom start", gap: 6, padding: 12 }}
        className="z-50 rounded-2xl border border-line bg-white p-3 shadow-xl focus:outline-none"
      >
        {({ close }) => (
          <DayPicker
            mode="single"
            {...(lang === "ar" && { locale: ar, dir: "rtl" as const })}
            selected={value}
            defaultMonth={value ?? today}
            disabled={{ before: today }}
            onSelect={(d) => {
              onChange(d);
              if (d) close();
            }}
          />
        )}
      </PopoverPanel>
    </Popover>
  );
}
