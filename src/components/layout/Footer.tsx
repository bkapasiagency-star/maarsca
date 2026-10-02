import Image from "next/image";
import { firm, nav, services } from "@/lib/content";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { GoogleRatingBadge } from "@/components/ui/Google";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark bg-navy-900 text-white">
      <div className="mx-auto max-w-[1280px] px-5 pt-16 sm:px-8 lg:pt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-12 lg:gap-10">
          <div className="col-span-2 lg:col-span-4">
            <div className="flex items-center gap-4">
              <span className="grid h-11 place-items-center rounded-md bg-white px-1.5">
                <Image src="/brand/ca-india.png" alt="CA India" width={640} height={453} className="h-8 w-auto" />
              </span>
              <span aria-hidden className="h-8 w-px bg-white/20" />
              <Image
                src="/brand/maars-logo-light.png"
                alt={`${firm.name}, Chartered Accountants`}
                width={2107}
                height={252}
                className="h-6 w-auto"
              />
            </div>
            <p className="mt-5 max-w-xs leading-relaxed text-white/65">{firm.descriptor}</p>
            <div className="mt-6">
              <GoogleRatingBadge tone="dark" />
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex h-11 items-center rounded-md bg-white px-5 text-sm font-semibold text-navy transition-colors hover:bg-sky"
              >
                Book a Consultation
              </a>
              <a
                href={firm.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp MAARS & Associates"
                className="grid size-11 place-items-center rounded-md bg-[#25D366] text-navy-900 transition-colors hover:bg-[#3be07a]"
              >
                <WhatsAppIcon className="size-5" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer services" className="lg:col-span-2">
            <p className="text-sm font-bold text-white">Services</p>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem] text-white/65">
              {services.map((s) => (
                <li key={s.no}>
                  <a href="#services" className="hover:text-white">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer firm links" className="lg:col-span-2">
            <p className="text-sm font-bold text-white">Firm</p>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem] text-white/65">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-white">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 grid gap-8 sm:grid-cols-2 lg:col-span-4">
            {firm.offices.map((o) => (
              <address key={o.city} className="not-italic">
                <p className="text-sm font-bold text-white">{o.label}</p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/65">
                  {o.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </p>
              </address>
            ))}
            <div className="sm:col-span-2">
              <p className="text-sm font-bold text-white">Contact</p>
              <ul className="mt-4 space-y-1.5 text-[0.9375rem] text-white/65">
                <li>
                  <a href={firm.phoneHref} className="hover:text-white">
                    {firm.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${firm.email}`} className="hover:text-white">
                    {firm.email}
                  </a>
                </li>
                <li>{firm.hours}</li>
              </ul>
            </div>
          </div>
        </div>

        <div
          data-footer-base
          className="mt-14 flex flex-col gap-4 border-t border-white/10 pb-24 pt-7 text-sm text-white/50 sm:pb-8 lg:flex-row lg:items-center lg:justify-between"
        >
          <p>
            © {year} {firm.name}, Chartered Accountants. All rights reserved.
          </p>
          <p className="text-xs text-white/40">Concept preview for MAARS &amp; Associates</p>
          <ul className="flex gap-6">
            {firm.legal.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
