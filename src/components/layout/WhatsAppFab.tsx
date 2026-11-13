import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";
import { UI, type Lang } from "@/i18n";

export default function WhatsAppFab({ lang }: { lang: Lang }) {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={UI[lang].fab}
      style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom) + var(--fab-offset, 0px))" }}
      className="whatsapp-fab fixed end-[max(1.25rem,env(safe-area-inset-right))] z-30 grid h-14 w-14 place-items-center rounded-full bg-brand text-ink shadow-[0_12px_32px_-8px_rgb(11_18_14/0.5)] transition-transform duration-300 hover:scale-110"
    >
      <MessageCircle size={26} />
    </a>
  );
}
