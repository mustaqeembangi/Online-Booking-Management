"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import { SITE } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const [sent, setSent] = useState(false);

  function validate(n: string, m: string) {
    const e: { name?: string; message?: string } = {};
    if (!n.trim()) e.name = "Please tell us your name.";
    if (!m.trim()) e.message = "Please write a short message.";
    return e;
  }

  function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate(name, message);
    setErrors(e);
    if (e.name || e.message) return;
    const text = `Hello ${SITE.name}, my name is ${name.trim()}.\n\n${message.trim()}`;
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div>
        <TextField
          label="Your name"
          value={name}
          required
          autoComplete="name"
          onChange={(v) => {
            setName(v);
            if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
          }}
        />
        {errors.name && (
          <p role="alert" className="mt-1.5 text-sm font-semibold text-[#B3261E]">
            {errors.name}
          </p>
        )}
      </div>
      <div>
        <TextField
          label="Your message"
          value={message}
          required
          multiline
          rows={5}
          placeholder="Which tour, which date, how many people?"
          onChange={(v) => {
            setMessage(v);
            if (errors.message) setErrors((p) => ({ ...p, message: undefined }));
          }}
        />
        {errors.message && (
          <p role="alert" className="mt-1.5 text-sm font-semibold text-[#B3261E]">
            {errors.message}
          </p>
        )}
      </div>
      <Button type="submit" size="lg" icon={<MessageCircle size={20} aria-hidden />} className="w-full sm:w-auto">
        Send on WhatsApp
      </Button>
      <p aria-live="polite" className="text-sm text-ink/70">
        {sent
          ? "WhatsApp should have opened with your message. If it did not, press the button again."
          : "This opens WhatsApp with your message ready to send. Nothing is sent until you press send there."}
      </p>
    </form>
  );
}
