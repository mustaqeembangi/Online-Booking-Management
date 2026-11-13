"use client";

import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import type { Review } from "@/data/reviews";

const LONG = 240;

export default function ReviewCard({
  review,
  date,
  labels,
  footer,
}: {
  review: Review;
  date: string;
  labels: { verified: string; more: string; less: string };
  footer?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const long = review.text.length > LONG;
  return (
    <figure className="reveal flex h-full min-w-0 flex-col rounded-[var(--radius-card)] border border-line bg-white p-[clamp(1.25rem,2vw,1.75rem)] transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgb(11_18_14/0.45)]">
      <figcaption className="flex items-center gap-3">
        <span aria-hidden className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink font-display text-lg font-semibold text-brand">
          {review.name.charAt(0).toUpperCase()}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-semibold leading-tight">
            {review.name}
            {review.country && <span className="font-normal text-ink/60"> · {review.country}</span>}
          </span>
          <span className="mt-0.5 flex items-center gap-1 text-sm text-ink/60">
            <BadgeCheck size={15} className="shrink-0 text-brand-deep" aria-hidden />
            {date} · {labels.verified}
          </span>
        </span>
      </figcaption>
      {/* Reviews are shown as the guest wrote them, in English. */}
      <blockquote lang="en" dir="ltr" className={`mt-4 text-start text-[16.5px] leading-relaxed ${long && !open ? "line-clamp-5" : ""}`}>
        {review.text}
      </blockquote>
      {long && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-2 self-start text-sm font-semibold text-brand-deep underline decoration-2 underline-offset-4 hover:text-ink"
        >
          {open ? labels.less : labels.more}
        </button>
      )}
      {footer && <div className="mt-auto pt-4">{footer}</div>}
    </figure>
  );
}
