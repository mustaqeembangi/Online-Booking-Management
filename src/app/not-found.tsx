import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[85svh] flex-col justify-end pb-[clamp(3rem,6vw,6rem)] pt-32">
      <h1 className="hero-title">
        Lost in the <span className="accent-word text-brand-deep">dunes.</span>
      </h1>
      <p className="mt-4 max-w-xl text-lg text-ink/80">
        We could not find that page. The link may be old or mistyped. You can look at all our tours, or ask us on WhatsApp and we will help.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/tours" size="lg">
          See all tours
        </Button>
        <Button
          href={whatsappLink("Hello Ammar Tours, I need some help.")}
          variant="outline"
          size="lg"
          icon={<MessageCircle size={20} aria-hidden />}
        >
          Ask on WhatsApp
        </Button>
      </div>
    </Container>
  );
}
