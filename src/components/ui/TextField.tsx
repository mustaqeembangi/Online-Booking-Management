"use client";

import { useId } from "react";

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "email" | "tel";
  name?: string;
  autoComplete?: string;
}

export const fieldClass =
  "w-full rounded-xl border border-line bg-white px-4 text-[15px] text-ink placeholder:text-ink/40 transition-colors hover:border-ink/40 focus:border-ink focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-brand";

export default function TextField({
  label,
  value,
  onChange,
  multiline,
  rows = 3,
  placeholder,
  required,
  type = "text",
  name,
  autoComplete,
}: Props) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
        {!required && <span className="font-normal text-ink/50"> (optional)</span>}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${fieldClass} resize-none py-3`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${fieldClass} h-12`}
        />
      )}
    </div>
  );
}
