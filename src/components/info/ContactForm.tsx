"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import { SITE } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { UI, type Lang } from "@/i18n";

export default function ContactForm({ lang }: { lang: Lang }) {
  const f = UI[lang].contactPage.form;
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const [sent, setSent] = useState(false);

  function validate(n: string, m: string) {
    const e: { name?: string; message?: string } = {};
    if (!n.trim()) e.name = f.errName;
    if (!m.trim()) e.message = f.errMessage;
    return e;
  }

  function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate(name, message);
    setErrors(e);
    if (e.name || e.message) return;
    const text = `${UI[lang].message.contact(SITE.name, name.trim())}\n\n${message.trim()}`;
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div>
        <TextField
          label={f.name}
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
          label={f.message}
          value={message}
          required
          multiline
          rows={5}
          placeholder={f.placeholder}
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
        {f.submit}
      </Button>
      <p aria-live="polite" className="text-sm text-ink/70">
        {sent
          ? f.sent
          : f.hint}
      </p>
    </form>
  );
}
