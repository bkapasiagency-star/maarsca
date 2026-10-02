"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { services } from "@/lib/content";

const topics = [...services.map((s) => s.title), "Registrations & licences", "Something else"];

type Field = "name" | "company" | "email" | "phone" | "topic" | "message";
type Errors = Partial<Record<Field, string>>;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const get = (k: Field) => String(data.get(k) ?? "").trim();
  if (get("name").length < 2) errors.name = "Please enter your name.";
  if (!/^\S+@\S+\.\S+$/.test(get("email"))) errors.email = "Please enter a valid email address.";
  if (get("phone").replace(/\D/g, "").length < 10) errors.phone = "Please enter a valid phone number.";
  if (!get("topic")) errors.topic = "Please choose a topic.";
  return errors;
}

const inputBase =
  "mt-2 block w-full rounded-md border border-line bg-white px-4 text-[0.9375rem] text-ink placeholder:text-muted/70 transition-colors focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10 aria-[invalid=true]:border-red-500";

export function ContactForm() {
  const uid = useId();
  const [topic, setTopic] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<string | null>(null);

  // Clicking any service link elsewhere on the page pre-selects its topic here.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const service = (e.target as HTMLElement).closest<HTMLElement>("[data-service]")?.dataset.service;
      if (service && topics.includes(service)) setTopic(service);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const found = validate(data);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    // TODO at launch: deliver to the firm's inbox / CRM.
    setSent(String(data.get("name")).trim().split(" ")[0]);
  };

  if (sent) {
    return (
      <div role="status" className="flex min-h-[560px] flex-col items-start justify-center rounded-xl bg-white p-8 text-ink sm:p-12">
        <CheckCircle2 className="size-12 text-brand" strokeWidth={1.75} aria-hidden />
        <h3 className="mt-6 text-3xl font-bold tracking-tight text-navy">Thank you, {sent}.</h3>
        <p className="mt-3 max-w-md leading-relaxed text-body">
          Your request has been received. A member of the MAARS team will contact you shortly to arrange a convenient
          time.
        </p>
        <button type="button" onClick={() => setSent(null)} className="mt-8 text-sm font-semibold text-brand hover:underline">
          Send another request
        </button>
      </div>
    );
  }

  const id = (n: Field) => `${uid}-${n}`;
  const a11y = (n: Field) => ({
    id: id(n),
    name: n,
    "aria-invalid": errors[n] ? true : undefined,
    "aria-describedby": errors[n] ? `${id(n)}-err` : undefined,
  });
  const label = (n: Field, text: string, optional = false) => (
    <label htmlFor={id(n)} className="text-sm font-semibold text-navy">
      {text}
      {optional ? <span className="ml-1 font-normal text-muted">(optional)</span> : <span className="text-brand"> *</span>}
    </label>
  );
  const error = (n: Field) =>
    errors[n] ? (
      <p id={`${id(n)}-err`} className="mt-1.5 text-xs font-medium text-red-600">
        {errors[n]}
      </p>
    ) : null;

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-labelledby={`${uid}-title`}
      className="rounded-xl bg-white p-6 text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)] sm:p-10"
    >
      <h3 id={`${uid}-title`} className="text-2xl font-bold tracking-tight text-navy">
        Request a consultation
      </h3>
      <p className="mt-2 text-[0.9375rem] text-body">Share a few details and we will arrange a call with the right partner.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          {label("name", "Name")}
          <input {...a11y("name")} autoComplete="name" placeholder="Your full name" className={`${inputBase} h-12`} />
          {error("name")}
        </div>
        <div>
          {label("company", "Company", true)}
          <input {...a11y("company")} autoComplete="organization" placeholder="Company name" className={`${inputBase} h-12`} />
        </div>
        <div>
          {label("email", "Email")}
          <input {...a11y("email")} type="email" autoComplete="email" placeholder="you@company.com" className={`${inputBase} h-12`} />
          {error("email")}
        </div>
        <div>
          {label("phone", "Phone")}
          <input {...a11y("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="+91" className={`${inputBase} h-12`} />
          {error("phone")}
        </div>
        <div className="sm:col-span-2">
          {label("topic", "What can we help you with?")}
          <select
            {...a11y("topic")}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={`${inputBase} h-12 appearance-none bg-[url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%2364748b' stroke-width='2'><path d='m4 6 4 4 4-4'/></svg>")] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10 ${topic ? "" : "text-muted/70"}`}
          >
            <option value="" disabled>
              Select a service
            </option>
            {topics.map((t) => (
              <option key={t} value={t} className="text-ink">
                {t}
              </option>
            ))}
          </select>
          {error("topic")}
        </div>
        <div className="sm:col-span-2">
          {label("message", "Message", true)}
          <textarea
            {...a11y("message")}
            rows={4}
            placeholder="Tell us briefly about your business and requirement"
            className={`${inputBase} resize-none py-3`}
          />
        </div>
      </div>

      <button
        type="submit"
        className="group mt-7 inline-flex min-h-13 w-full items-center justify-center gap-2.5 rounded-md bg-brand px-8 font-semibold text-white transition-colors hover:bg-brand-600 sm:w-auto"
      >
        Request a Consultation
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </button>
      <p className="mt-4 text-xs text-muted">Your details are used only to respond to your enquiry.</p>
    </form>
  );
}
