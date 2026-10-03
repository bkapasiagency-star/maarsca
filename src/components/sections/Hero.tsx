import { MapPin, Phone } from "lucide-react";
import { firm, milestones } from "@/lib/content";
import { Button, TextLink } from "@/components/ui/Button";
import { SplitWords } from "@/components/ui/SplitWords";

// Entrance motion is CSS (see globals.css) so the hero paints with the HTML
// instead of waiting for hydration.
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="on-dark relative isolate overflow-hidden bg-navy pb-20 pt-32 text-white sm:pt-36 lg:pb-28 lg:pt-44"
    >
      {/* Soft depth, no imagery */}
      <div aria-hidden className="glow absolute -right-[512px] -top-[512px] -z-10 size-[1400px] [--glow:color-mix(in_srgb,var(--brand)_45%,transparent)]" />
      <div aria-hidden className="glow absolute -bottom-[496px] -left-[400px] -z-10 size-[1040px] [--glow:var(--navy-800)]" />

      <div className="mx-auto grid max-w-[1280px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <p
            data-hero="eyebrow"
            className="whitespace-nowrap text-[clamp(0.5625rem,2.75vw,0.8125rem)] font-semibold uppercase tracking-[0.08em] text-sky sm:tracking-[0.14em]"
          >
            Chartered Accountants &amp; Business Advisors
          </p>

          <h1 id="hero-title" data-hero="title" className="heading mt-5 text-[clamp(2.5rem,5.6vw,4.5rem)] font-extrabold">
            <SplitWords text="Financial clarity for businesses *ready* *to* *grow.*" emphasisClass="text-sky" />
          </h1>

          <p data-hero="copy" className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/75 sm:text-lg">
            From taxation and audit to Virtual CFO, corporate finance and strategic advisory, MAARS &amp; Associates
            helps businesses make confident financial decisions at every stage of growth.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <div data-hero="cta">
              <Button href="#contact" variant="white" className="w-full sm:w-auto">
                Book a Consultation
              </Button>
            </div>
            <div data-hero="cta">
              <Button href="#services" variant="outline-light" icon={false} className="w-full sm:w-auto">
                Explore Our Expertise
              </Button>
            </div>
          </div>
          <div data-hero="cta" className="mt-6">
            <TextLink href={firm.phoneHref} className="text-[0.9375rem] text-sky hover:text-white">
              Talk to an Expert
            </TextLink>
          </div>
        </div>

        <aside
          data-hero="panel"
          aria-label="Firm at a glance"
          className="rounded-xl bg-white p-7 text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)] sm:p-9 lg:col-span-5"
        >
          <div className="flex items-baseline justify-between gap-4 border-b border-line pb-5">
            <p className="text-lg font-bold text-navy">A trusted practice</p>
            <p className="text-sm font-semibold text-brand">Since {firm.founded}</p>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-7 py-7">
            {milestones.map((m) => (
              <div key={m.label}>
                <dd className="tabular text-[1.75rem] font-extrabold sm:text-[2.125rem] leading-none tracking-tight text-navy">
                  {m.prefix}
                  <span data-count={m.value}>{m.value.toLocaleString("en-IN")}</span>
                  <span className="text-brand">{m.suffix}</span>
                </dd>
                <dt className="mt-2 text-sm text-muted">{m.label}</dt>
              </div>
            ))}
          </dl>
          <div className="flex flex-col gap-3 border-t border-line pt-5 text-sm sm:flex-row sm:items-center sm:justify-between">
            <span className="inline-flex items-center gap-2 text-body">
              <MapPin className="size-4 text-brand" aria-hidden /> Surat · Kashipur
            </span>
            <a href={firm.phoneHref} className="inline-flex items-center gap-2 font-semibold text-navy hover:text-brand">
              <Phone className="size-4 text-brand" aria-hidden /> {firm.phoneDisplay}
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
