import { BedDouble, Cpu, Factory, Rocket, ShoppingCart, Users } from "lucide-react";
import { industries } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";

const icons = [Factory, Rocket, ShoppingCart, Cpu, BedDouble, Users];

export function Industries() {
  return (
    <section id="industries" aria-labelledby="industries-title" className="bg-white py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeader
          id="industries-title"
          eyebrow="Industries"
          title="Built around the way your business *works.*"
          lead="Every sector runs on different margins, cycles and regulations. We bring that context to the work, so advice fits the business in front of us."
        />

        <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => {
            const Icon = icons[i];
            return (
              <li key={ind.name} data-reveal="up" className="group bg-white p-7 transition-colors duration-300 hover:bg-navy sm:p-8">
                <Icon className="size-7 text-brand transition-colors duration-300 group-hover:text-sky" strokeWidth={1.75} aria-hidden />
                <h3 className="mt-5 text-lg font-bold text-navy transition-colors duration-300 group-hover:text-white">{ind.name}</h3>
                <p className="mt-2 leading-relaxed text-body transition-colors duration-300 group-hover:text-white/70">{ind.copy}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
