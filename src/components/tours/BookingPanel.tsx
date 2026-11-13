"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, MessageCircle, Plus, X } from "lucide-react";
import Button from "@/components/ui/Button";
import DatePicker from "@/components/ui/DatePicker";
import Stepper from "@/components/ui/Stepper";
import Select from "@/components/ui/Select";
import TextField from "@/components/ui/TextField";
import { formatPrice, type Tour } from "@/data/tours";
import { bookingMessage, bookingTourTitle, whatsappLink } from "@/lib/whatsapp";
import { UI, type Lang } from "@/i18n";

const dateFmt = (lang: Lang) =>
  new Intl.DateTimeFormat(lang === "ar" ? "ar-AE-u-nu-latn" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

type Errors = Partial<
  Record<"date" | "type" | "pickup" | "name" | "guests", string>
>;

export default function BookingPanel({ tour, lang }: { tour: Tour; lang: Lang }) {
  const b = UI[lang].booking;
  const p = UI[lang].price;
  const min = tour.minGuests ?? 1;
  const [date, setDate] = useState<Date | undefined>();
  const [adults, setAdults] = useState(Math.max(2, min));
  const [children, setChildren] = useState(0);
  const [type, setType] = useState(tour.types.length === 1 ? tour.types[0] : "");
  const [pickup, setPickup] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [open, setOpen] = useState(false);

  const price = tour.price;
  const guests = adults + children;
  const estimate = price
    ? price.amount * adults + (price.childAmount ?? price.amount) * children
    : null;
  const estimateText =
    price && estimate !== null ? formatPrice({ ...price, amount: estimate }) : null;

  // Keep the WhatsApp button clear of the bottom bar on phones.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const apply = () =>
      document.documentElement.style.setProperty(
        "--fab-offset",
        mq.matches ? "5.25rem" : "0px",
      );
    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      document.documentElement.style.removeProperty("--fab-offset");
    };
  }, []);

  // Sheet: close on Escape and stop the page scrolling behind it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  function validate(): Errors {
    const e: Errors = {};
    if (!date) e.date = b.errDate;
    if (tour.types.length > 1 && !type) e.type = b.errType;
    if (!pickup.trim()) e.pickup = b.errPickup;
    if (!name.trim()) e.name = b.errName;
    if (tour.minGuests && guests < tour.minGuests)
      e.guests = b.errGuests(tour.minGuests);
    return e;
  }

  function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    const msg = bookingMessage(
      {
      tourTitle: bookingTourTitle(tour.slug, lang),
      date: dateFmt(lang).format(date!),
      adults,
      children,
      pickup: pickup.trim(),
      name: name.trim(),
      note: note.trim() || undefined,
      estimate: estimateText ?? undefined,
      tourType: type ? b.typeNames[type] ?? type : undefined,
      },
      lang,
    );
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  const err = (m?: string) =>
    m ? (
      <p role="alert" className="mt-1.5 text-sm font-medium text-[#B3261E]">
        {m}
      </p>
    ) : null;

  const priceLine = price ? (
    <>
      <span className="text-sm text-ink/60">{price.unit ? "" : `${p.from} `}</span>
      <span className="font-display text-2xl font-semibold text-dune">
        {formatPrice(price)}
      </span>
      <span className="text-sm text-ink/60">
        {price.unit ? ` ${price.unit}` : ""}
      </span>
    </>
  ) : (
    <span className="font-display text-xl font-semibold text-dune">{p.ask}</span>
  );

  const form = (
    <form onSubmit={submit} noValidate className="space-y-4">
      <div>
        <DatePicker label={b.date} placeholder={b.chooseDate} lang={lang} value={date} onChange={setDate} />
        {err(errors.date)}
      </div>

      <div className="space-y-3">
        <Stepper label={b.adults} fewerLabel={b.fewer(b.adults)} moreLabel={b.more(b.adults)} value={adults} min={1} onChange={setAdults} />
        <Stepper label={b.children} fewerLabel={b.fewer(b.children)} moreLabel={b.more(b.children)} value={children} min={0} onChange={setChildren} />
        {err(errors.guests)}
        {tour.minGuests && !errors.guests && (
          <p className="text-sm text-ink/60">
            {b.min(tour.minGuests)}
          </p>
        )}
      </div>

      {tour.types.length > 1 && (
        <div>
          <Select
            label={b.type}
            value={type}
            onChange={setType}
            options={tour.types.map((t) => ({ value: t, label: b.typeNames[t] ?? t }))}
            placeholder={b.typePlaceholder}
          />
          {err(errors.type)}
        </div>
      )}

      <div>
        <TextField
          label={b.pickup}
          required
          value={pickup}
          onChange={setPickup}
          placeholder={b.pickupPlaceholder}
          autoComplete="off"
        />
        {err(errors.pickup)}
      </div>
      <div>
        <TextField
          label={b.name}
          required
          value={name}
          onChange={setName}
          autoComplete="name"
        />
        {err(errors.name)}
      </div>
      {showNote ? (
        <TextField
          label={b.note}
          multiline
          rows={2}
          value={note}
          onChange={setNote}
          placeholder={b.notePlaceholder}
          optionalLabel={b.optional}
        />
      ) : (
        <button
          type="button"
          onClick={() => setShowNote(true)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-deep underline decoration-2 underline-offset-4 hover:text-ink"
        >
          <Plus size={15} aria-hidden />
          {b.addNote}
        </button>
      )}

      <div className="border-t border-line pt-4">
        {estimateText ? (
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[15px] text-ink/70">{b.estimate}</span>
            <span className="font-display text-2xl font-semibold text-dune">
              {estimateText}
            </span>
          </div>
        ) : (
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[15px] text-ink/70">{b.price}</span>
            <span className="font-semibold text-dune">{p.ask}</span>
          </div>
        )}
        {estimateText && (
          <p className="mt-1 text-sm text-ink/60">
            {b.estimateNote}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        icon={<MessageCircle size={20} />}
      >
        {b.send}
      </Button>
      <p className="text-center text-sm text-ink/60">
        {b.nothing}
      </p>
      {tour.gyg && (
        <p className="text-center text-sm text-ink/60">
          {b.payOnline}{" "}
          <a
            href={tour.gyg.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-0.5 font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4 hover:text-brand-deep"
          >
            {b.gyg}
            <ArrowUpRight size={15} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </a>
        </p>
      )}
      {sent && (
        <p role="status" className="text-center text-sm font-semibold text-brand-deep">
          {b.sent}
        </p>
      )}
    </form>
  );

  return (
    <>
      {/* Desktop and iPad landscape: sticky card in the side column */}
      <div className="sticky top-24 hidden max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-[var(--radius-card)] border border-line bg-white p-[clamp(1.1rem,1.6vw,1.6rem)] shadow-[0_40px_80px_-40px_rgb(11_18_14/0.45)] lg:block">
        <div className="mb-5">{priceLine}</div>
        {form}
      </div>

      {/* Phones and iPad portrait: sticky bottom bar */}
      <div className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 rounded-full border border-white/70 bg-white/90 shadow-[0_16px_40px_-16px_rgb(11_18_14/0.5)] backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between gap-4 py-2 ps-6 pe-2">
          <div className="min-w-0 leading-tight">{priceLine}</div>
          <Button onClick={() => setOpen(true)} variant="ink" size="md" className="shrink-0">
            {b.book}
          </Button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label={b.bookTitle(tour.title)}>
          <button
            type="button"
            aria-label={b.closeForm}
            className="absolute inset-0 bg-ink/60"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 flex max-h-[92dvh] animate-[sheet-up_.25s_ease-out] flex-col rounded-t-[2rem] bg-white pb-[env(safe-area-inset-bottom)] shadow-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
              <h2 className="text-lg font-semibold leading-snug text-ink">{b.sheetTitle}</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={b.closeSheet}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-ink hover:border-ink"
              >
                <X size={18} />
              </button>
            </div>
            <div className="overflow-y-auto overscroll-contain px-5 pb-8 pt-5">{form}</div>
          </div>
        </div>
      )}
    </>
  );
}
