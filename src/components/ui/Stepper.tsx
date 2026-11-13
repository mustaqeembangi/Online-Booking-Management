"use client";

import { Minus, Plus } from "lucide-react";

export default function Stepper({
  label,
  value,
  onChange,
  min = 0,
  max = 99,
  hint,
  fewerLabel,
  moreLabel,
}: {
  label: string;
  fewerLabel?: string;
  moreLabel?: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  hint?: string;
}) {
  const btn =
    "grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink transition-colors hover:border-ink disabled:opacity-35 disabled:hover:border-line";
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <div className="text-[15px] font-semibold text-ink">{label}</div>
        {hint && <div className="text-sm text-ink/60">{hint}</div>}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className={btn}
          aria-label={fewerLabel ?? `Fewer ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          <Minus size={16} />
        </button>
        <span className="w-6 text-center font-semibold tabular-nums" aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          className={btn}
          aria-label={moreLabel ?? `More ${label.toLowerCase()}`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
