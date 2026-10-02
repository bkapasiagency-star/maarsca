import { ArrowRight, Briefcase, Check, Landmark, LineChart, Receipt, ShieldCheck, TrendingUp } from "lucide-react";
import { services } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";

const icons = [Receipt, ShieldCheck, Landmark, LineChart, Briefcase, TrendingUp];

export function Expertise() {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-surface py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeader
          id="services-title"
          eyebrow="Our Expertise"
          title="Expertise that moves your business *forward.*"
          lead="From everyday financial discipline to high-stakes strategic decisions, our expertise covers the financial needs of growing businesses."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[i];
            return (
              <li key={s.no} data-reveal="up">
                <a
                  href="#contact"
                  data-service={s.title}
                  className="group flex h-full flex-col rounded-xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_24px_48px_-24px_rgba(10,37,64,0.3)] sm:p-8"
                >
                  <span className="grid size-12 place-items-center rounded-lg bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    <Icon className="size-6" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="mt-6 text-xl font-bold tracking-tight text-navy">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-body">{s.summary}</p>
                  <ul className="mt-5 space-y-2 border-t border-line pt-5">
                    {s.detail.map((d) => (
                      <li key={d} className="flex items-center gap-2.5 text-sm text-body">
                        <Check className="size-4 shrink-0 text-brand" strokeWidth={2.25} aria-hidden />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-brand">
                    Enquire now
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <div
          data-reveal="up"
          className="mt-8 flex flex-col gap-4 rounded-xl bg-navy px-7 py-6 text-white sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-[0.9375rem] leading-relaxed text-white/80">
            <span className="font-semibold text-white">Setting up a business?</span> We also handle company, LLP and
            partnership registrations, trademarks and licences such as FSSAI, IEC and RERA.
          </p>
          <a href="#contact" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-sky hover:text-white">
            Ask about registrations <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
