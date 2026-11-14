"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

// Destination chips that switch the card grid below (OceanAir's "Where to, first?").
export default function Tabs({ tabs }: { tabs: { id: string; label: string; content: React.ReactNode }[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  return (
    <div>
      <div role="tablist" className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => {
          const on = t.id === active;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActive(t.id)}
              className={`inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-4 text-[14px] font-medium transition-colors ${
                on ? "border-forest bg-forest text-white" : "border-line bg-white text-ink hover:border-forest"
              }`}
            >
              <MapPin size={15} aria-hidden />
              {t.label}
            </button>
          );
        })}
      </div>
      {tabs.map((t) => (
        <div key={t.id} role="tabpanel" hidden={t.id !== active} className="mt-6 [animation:fade-in_0.3s_ease-out]">
          {t.content}
        </div>
      ))}
    </div>
  );
}
