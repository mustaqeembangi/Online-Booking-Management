import Container from "@/components/ui/Container";

const steps = [
  { title: "Choose a tour", text: "Look through the tours and pick the one you like." },
  { title: "Send your details on WhatsApp", text: "Tell us the date, how many of you are coming and where you are staying." },
  { title: "The team confirms your pickup", text: "We reply to confirm your pickup." },
];

export default function HowBooking() {
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <Container>
        <h2 className="max-w-2xl text-3xl font-semibold sm:text-5xl">How booking works</h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title}>
              <div className="font-display text-6xl font-semibold text-brand-deep">{i + 1}</div>
              <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-ink/70">{s.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
