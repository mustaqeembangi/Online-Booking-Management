import { whatsappLink } from "@/lib/whatsapp";
import { UI, type Lang } from "@/i18n";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

// Desktop only; phones have WhatsApp in the bottom bar.
export default function WhatsAppFab({ lang }: { lang: Lang }) {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab fixed bottom-6 end-6 z-30 hidden items-center gap-2.5 rounded-full bg-green py-3 pe-6 ps-3 font-semibold text-white shadow-[0_14px_32px_-10px_rgb(31_138_60/0.8)] transition-[scale,background-color] duration-300 hover:scale-105 hover:bg-forest lg:inline-flex"
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20"><WhatsAppIcon size={22} /></span>
      {UI[lang].fab}
    </a>
  );
}
