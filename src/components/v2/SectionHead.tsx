import Link from "next/link";
import { ArrowRight } from "lucide-react";

// "WHERE TO START" eyebrow, heading, optional subtitle and "View all →" link on the right.
export default function SectionHead({
  eyebrow,
  title,
  sub,
  more,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  more?: { href: string; label: string };
  light?: boolean;
}) {
  return (
    <div className="reveal flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <p className={`eyebrow ${light ? "!text-brand" : ""}`}>{eyebrow}</p>}
        <h2 className={`mt-1.5 text-[clamp(1.5rem,2.4vw,1.9rem)] font-semibold leading-tight ${light ? "text-white" : "text-forest"}`}>{title}</h2>
        {sub && <p className={`mt-1.5 text-[14.5px] ${light ? "text-white/70" : "text-ink/60"}`}>{sub}</p>}
      </div>
      {more && (
        <Link href={more.href} className={`inline-flex items-center gap-1 text-[14px] font-semibold ${light ? "text-brand" : "text-brand-deep"} hover:underline`}>
          {more.label}
          <ArrowRight size={15} aria-hidden />
        </Link>
      )}
    </div>
  );
}
