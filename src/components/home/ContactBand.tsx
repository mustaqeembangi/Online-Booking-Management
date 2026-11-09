import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { SITE } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

export default function ContactBand() {
  return (
    <section className="on-ink bg-ink py-20 text-white sm:py-24">
      <Container>
        <h2 className="max-w-2xl text-3xl font-semibold sm:text-5xl">Talk to the Ammar Tours team</h2>
        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <dl className="grid gap-6 sm:grid-cols-2 lg:gap-12">
            <div>
              <dt className="text-sm text-white/60">Phone</dt>
              <dd className="mt-1 text-xl font-semibold">
                <a href={SITE.phoneHref} className="hover:underline">{SITE.phone}</a>
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="text-sm text-white/60">Email</dt>
              <dd className="mt-1 break-words text-xl font-semibold">
                <a href={SITE.emailHref} className="hover:underline">{SITE.email}</a>
              </dd>
            </div>
          </dl>
          <Button href={whatsappLink()} size="lg" className="self-start">
            Message us on WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  );
}
