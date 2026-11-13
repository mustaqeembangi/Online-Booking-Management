"use client";

import { useState } from "react";

// Shows the first part of long content with a fade, and a "See more" button that opens the rest.
export default function Expandable({
  children,
  more,
  less,
  collapsedHeight = "18rem",
}: {
  children: React.ReactNode;
  more: string;
  less: string;
  collapsedHeight?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div
        className={`relative overflow-hidden transition-[max-height] duration-500 ease-out ${open ? "" : "[mask-image:linear-gradient(to_bottom,black_65%,transparent)]"}`}
        style={{ maxHeight: open ? "none" : collapsedHeight }}
      >
        {children}
      </div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mt-3 font-semibold text-ink underline decoration-2 underline-offset-4 hover:text-brand-deep"
      >
        {open ? less : more}
      </button>
    </div>
  );
}
