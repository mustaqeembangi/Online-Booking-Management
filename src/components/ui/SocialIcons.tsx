// Brand icons (lucide no longer ships them). Simple single-path marks, sized like lucide icons.
type P = { size?: number; className?: string };
const svg = (size: number, className: string | undefined, d: string) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d={d} />
  </svg>
);
export const InstagramIcon = ({ size = 20, className }: P) =>
  svg(size, className, "M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 4.7a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2zm0 8.4a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6zm5.3-9.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z");
export const FacebookIcon = ({ size = 20, className }: P) =>
  svg(size, className, "M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2H7.5v3.6h2.8v9.7H14v-9.7h2.8l.4-3.6H14z");
export const WhatsAppIcon = ({ size = 20, className }: P) =>
  svg(size, className, "M12 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2zm0 18.1c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.1zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.6.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2s.2-1.1.1-1.2-.2-.1-.4-.2z");
export const TripadvisorIcon = ({ size = 20, className }: P) =>
  svg(size, className, "M12 5.5c-2.3 0-4.6.6-6.5 1.9H2l1.6 1.7A4.9 4.9 0 0 0 7.4 17a4.9 4.9 0 0 0 3.2-1.2L12 17.5l1.4-1.7A4.9 4.9 0 0 0 20.4 9l1.6-1.7h-3.5A11.7 11.7 0 0 0 12 5.5zM7.4 15.4a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm9.2 0a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM7.4 10.6a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2zm9.2 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z");
