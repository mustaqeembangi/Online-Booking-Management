import { SITE } from "@/data/site";
import { bookingMessage } from "@/lib/whatsapp";
import Container from "@/components/ui/Container";

const STEPS = [
  { title: "Choose a tour", text: "Look through the tours and pick the one you like." },
  { title: "Send your details", text: "Tell us the date, how many of you are coming and where you are staying." },
  { title: "We confirm your pickup", text: "We reply on WhatsApp to confirm your booking and pickup. Nothing is charged on this website." },
];

export default function HowBooking() {
  const sample = bookingMessage({
    tourTitle: "Evening Desert Safari",
    date: "Saturday, 12 December 2026",
    adults: 2,
    children: 1,
    pickup: "Your hotel",
    name: "Your name",
  });
  return (
    <Container as="section" className="pb-[clamp(4.5rem,9vw,10rem)]">
      <div className="grid gap-[clamp(2.5rem,6vw,7rem)] lg:grid-cols-[1.15fr_1fr]">
        <div>
          <h2 className="display-xl reveal">
            Booking takes <span className="accent-word text-brand-deep">one message</span>
          </h2>
          <ol className="mt-[clamp(2rem,4vw,4rem)]">
            {STEPS.map((s, i) => (
              <li key={s.title} className="reveal grid grid-cols-[clamp(2.5rem,5vw,5rem)_1fr] border-t border-line py-[clamp(1.1rem,2vw,2rem)]">
                <span className="accent-word text-[clamp(1.75rem,3vw,3rem)] leading-none text-brand-deep">{i + 1}</span>
                <div>
                  <h3 className="text-[clamp(1.4rem,2.2vw,2.5rem)] leading-tight">{s.title}</h3>
                  <p className="mt-1.5 max-w-xl text-ink/65">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <figure className="reveal flex items-center justify-center rounded-[var(--radius-card)] bg-ink p-[clamp(1.25rem,3vw,3.5rem)]">
          <div className="w-full max-w-md">
            <figcaption className="mb-4 flex items-center gap-3 text-white">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand font-display font-semibold text-ink">A</span>
              <span>
                <span className="block font-semibold leading-tight">{SITE.name}</span>
                <span className="block text-sm text-white/55">Example of the message you send</span>
              </span>
            </figcaption>
            <p className="whitespace-pre-line rounded-3xl rounded-tr-md bg-brand p-5 text-[15px] leading-relaxed text-ink">
              {sample}
            </p>
          </div>
        </figure>
      </div>
    </Container>
  );
}
