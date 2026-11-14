import { whatsappLink } from "@/lib/whatsapp";
import { UI, type Lang } from "@/i18n";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

export default function WhatsAppFab({ lang }: { lang: Lang }) {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={UI[lang].fab}
      style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom) + var(--fab-offset, 0px))" }}
      className="whatsapp-fab fixed end-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_28px_-8px_rgb(3_40_54/0.55)] transition-transform duration-300 hover:scale-110"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
