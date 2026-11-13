import { Star } from "lucide-react";

// Five stars filled to `value` (out of 5), to the nearest half star.
export default function Stars({ value, size = 16, label }: { value: number; size?: number; label: string }) {
  const v = Math.round(value * 2) / 2;
  return (
    <span role="img" aria-label={label} className="inline-flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, v - i));
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star size={size} className="absolute inset-0 fill-line text-line" aria-hidden />
            {fill > 0 && (
              <span className="absolute inset-y-0 start-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star size={size} className="fill-dune text-dune" aria-hidden />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}
