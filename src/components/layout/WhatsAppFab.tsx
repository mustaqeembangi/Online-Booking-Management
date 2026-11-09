import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";

export default function WhatsAppFab() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      style={{ bottom: "calc(1.25rem + var(--fab-offset, 0px))" }}
      className="fixed right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-brand text-ink shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle size={26} />
    </a>
  );
}
