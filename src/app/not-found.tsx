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
    <Container className="py-24 sm:py-32">
      <p className="font-semibold text-dune">Error 404</p>
      <h1 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
        We could not find that page
      </h1>
      <p className="mt-4 max-w-xl text-lg text-ink/80">
        The link may be old or mistyped. You can look at all our tours, or ask us on WhatsApp and we will help.
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
