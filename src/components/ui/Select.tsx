"use client";

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

export default function Select({
  label,
  value,
  onChange,
  options,
  placeholder = "Choose",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: SelectOption[];
  placeholder?: string;
}) {
  const current = options.find((o) => o.value === value);
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
        <ListboxButton className="flex h-12 w-full items-center justify-between gap-2 rounded-xl border border-line bg-white px-4 text-start text-[15px] text-ink transition-colors hover:border-ink/40 focus:border-ink data-[open]:border-ink">
          <span className={current ? "" : "text-ink/40"}>{current?.label ?? placeholder}</span>
          <ChevronDown size={18} className="shrink-0 text-ink/60" />
        </ListboxButton>
        <ListboxOptions
          anchor={{ to: "bottom start", gap: 6 }}
          className="z-50 w-(--button-width) rounded-xl border border-line bg-white p-1 shadow-xl [--anchor-max-height:16rem] focus:outline-none"
        >
          {options.map((o) => (
            <ListboxOption
              key={o.value}
              value={o.value}
              className="flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-[15px] text-ink data-[focus]:bg-ink data-[focus]:text-white"
            >
              {o.label}
              {o.value === value && <Check size={16} />}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
