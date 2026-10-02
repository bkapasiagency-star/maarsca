import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { firm } from "@/lib/content";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { SplitWords } from "@/components/ui/SplitWords";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { ContactForm } from "./ContactForm";

const channels = [
  { icon: Phone, label: "Call", value: firm.phoneDisplay, href: firm.phoneHref },
  { icon: Mail, label: "Email", value: firm.email, href: `mailto:${firm.email}` },
  { icon: Clock, label: "Office hours", value: firm.hours },
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="on-dark relative isolate overflow-hidden bg-navy py-20 text-white sm:py-28 lg:py-32"
    >
      <div aria-hidden className="absolute -right-40 -top-40 -z-10 size-[640px] rounded-full bg-brand/40 blur-[150px]" />

      <div className="mx-auto grid max-w-[1280px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Eyebrow tone="dark">Get in touch</Eyebrow>
          <h2 id="contact-title" data-split className="heading mt-4 text-[clamp(2.25rem,4.6vw,3.5rem)]">
            <SplitWords text="Ready to make better financial *decisions?*" emphasisClass="text-sky" />
          </h2>
          <p data-reveal="up" className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-white/75">
            Whether you are building, scaling or restructuring your business, MAARS &amp; Associates can help you
            navigate the numbers with clarity.
          </p>

          <a
            data-reveal="up"
            href={firm.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 items-center gap-2.5 rounded-md bg-[#25D366] px-6 font-semibold text-navy-900 transition-colors hover:bg-[#3be07a]"
          >
            <WhatsAppIcon className="size-5" /> Talk to MAARS on WhatsApp
          </a>

          <dl className="mt-10 space-y-5 border-t border-white/10 pt-8">
            {channels.map(({ icon: Icon, label, value, href }) => (
              <div key={label} data-reveal="up" className="flex items-center gap-4">
                <dt className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10">
                  <Icon className="size-4 text-sky" strokeWidth={2} aria-label={label} />
                </dt>
                <dd className="text-[1.0625rem] font-medium">
                  {href ? (
                    <a href={href} className="hover:text-sky">
                      {value}
                    </a>
                  ) : (
                    <span className="text-white/80">{value}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {firm.offices.map((o) => (
              <address key={o.city} data-reveal="up" className="not-italic">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-sky">
                  <MapPin className="size-3.5" strokeWidth={2} aria-hidden />
                  {o.label}
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/75">
                  {o.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </p>
              </address>
            ))}
          </div>
        </div>

        <div data-reveal="up" className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
