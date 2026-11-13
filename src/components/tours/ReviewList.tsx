"use client";

import { useState } from "react";
import Stars from "@/components/ui/Stars";
import type { Review } from "@/data/reviews";

const LONG = 280;
const AVATAR = ["bg-dune text-white", "bg-brand-deep text-white", "bg-ink text-brand", "bg-brand text-ink"];

function Item({ r, i, date, labels }: { r: Review; i: number; date: string; labels: Labels }) {
  const [open, setOpen] = useState(false);
  const long = r.text.length > LONG;
  return (
    <li className="reveal border-b border-line py-6 first:pt-0">
      <Stars value={r.rating ?? 5} size={18} label={labels.stars} />
      <div className="mt-3 flex items-center gap-3">
        <span aria-hidden className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-lg font-semibold ${AVATAR[i % AVATAR.length]}`}>
          {r.name.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="truncate font-semibold leading-tight">
            {r.name}
            {r.country && <span className="font-semibold"> – {r.country}</span>}
          </p>
          <p className="mt-0.5 text-sm text-ink/60">
            {date} · {labels.verified}
          </p>
        </div>
      </div>
      {/* Reviews are shown as the guest wrote them, in English. */}
      <p lang="en" dir="ltr" className={`mt-3 text-start text-[16.5px] leading-relaxed ${long && !open ? "line-clamp-4" : ""}`}>
        {r.text}
      </p>
      {long && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-1.5 text-sm font-semibold underline decoration-2 underline-offset-4 hover:text-brand-deep"
        >
          {open ? labels.less : labels.more}
        </button>
      )}
    </li>
  );
}

type Labels = { verified: string; more: string; less: string; stars: string };

export default function ReviewList({ reviews, dates, labels }: { reviews: Review[]; dates: string[]; labels: Labels }) {
  return (
    <ul>
      {reviews.map((r, i) => (
        <Item key={r.name + r.date} r={r} i={i} date={dates[i]} labels={labels} />
      ))}
    </ul>
  );
}
