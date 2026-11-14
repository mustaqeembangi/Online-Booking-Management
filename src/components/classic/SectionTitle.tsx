// "— Our Popular Tours —": centred title with short green lines either side.
export default function SectionTitle({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 className={`reveal flex items-center justify-center gap-4 text-center text-[clamp(1.5rem,2.6vw,2.1rem)] ${light ? "text-white" : "text-ink"}`}>
      <span aria-hidden className="h-0.5 w-10 shrink-0 rounded-full bg-green" />
      {children}
      <span aria-hidden className="h-0.5 w-10 shrink-0 rounded-full bg-green" />
    </h2>
  );
}
