import { MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { SITE } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { UI, lp, type Lang } from "@/i18n";

export const notFoundMeta = (lang: Lang) => ({ title: UI[lang].meta.notFound, robots: { index: false } });

export default function NotFoundView({ lang }: { lang: Lang }) {
  const t = UI[lang].notFound;
  return (
    <Container className="flex min-h-[85svh] flex-col justify-end pb-[clamp(3rem,6vw,6rem)] pt-32">
      <h1 className="hero-title">
        {t.title[0]} <span className="accent-word text-brand-deep">{t.title[1]}</span>
      </h1>
      <p className="mt-4 max-w-xl text-lg text-ink/80">{t.text}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href={lp(lang, "/tours")} size="lg">
          {t.seeAll}
        </Button>
        <Button
          href={whatsappLink(UI[lang].message.help(SITE.name))}
          variant="outline"
          size="lg"
          icon={<MessageCircle size={20} aria-hidden />}
        >
          {t.ask}
        </Button>
      </div>
    </Container>
  );
}
