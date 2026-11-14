"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Select from "@/components/ui/Select";
import DatePicker from "@/components/ui/DatePicker";
import { UI, lp, type Lang } from "@/i18n";

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

// "Find Tours": opens the chosen tour with the date and guests filled into its booking form,
// or the tours list when no tour is chosen.
export default function HeroSearch({ lang, tours }: { lang: Lang; tours: { value: string; label: string }[] }) {
  const s = UI[lang].classic.search;
  const router = useRouter();
  const [tour, setTour] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [adults, setAdults] = useState("2");

  function find(e: React.FormEvent) {
    e.preventDefault();
    if (!tour) return router.push(lp(lang, "/tours"));
    const q = new URLSearchParams({ adults });
    if (date) q.set("date", iso(date));
    router.push(`${lp(lang, `/tours/${tour}`)}?${q}`);
  }

  return (
    <form
      onSubmit={find}
      className="grid gap-3 rounded-2xl bg-white p-4 text-ink shadow-[0_24px_60px_-24px_rgb(0_0_0/0.6)] sm:grid-cols-2 lg:max-w-5xl lg:grid-cols-[1.4fr_1fr_0.8fr_auto] lg:items-end"
    >
      <Select label={s.tour} value={tour} onChange={setTour} options={tours} placeholder={s.tour} />
      <DatePicker label={s.date} value={date} onChange={setDate} lang={lang} placeholder={UI[lang].booking.chooseDate} />
      <Select
        label={s.guests}
        value={adults}
        onChange={setAdults}
        options={Array.from({ length: 10 }, (_, i) => ({ value: String(i + 1), label: s.adults(i + 1) }))}
      />
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-green px-7 font-semibold text-white transition-[background-color,scale] duration-300 hover:bg-forest active:scale-[0.98] sm:col-span-2 lg:col-span-1"
      >
        {s.find}
        <ArrowRight size={18} aria-hidden />
      </button>
    </form>
  );
}
