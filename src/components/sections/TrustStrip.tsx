import { practiceAreas } from "@/lib/content";

export function TrustStrip() {
  return (
    <section aria-label="Practice areas" className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-5 py-7 sm:px-8 lg:flex-row lg:items-center lg:gap-10">
        <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Our practice</p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:flex-1 lg:justify-between lg:gap-x-4">
          {practiceAreas.map((area, i) => (
            <li key={area} data-reveal="up" className="flex items-center gap-6 text-[0.9375rem] font-bold text-navy lg:gap-4">
              {area}
              {i < practiceAreas.length - 1 ? <span aria-hidden className="size-1.5 rounded-full bg-brand/40" /> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
