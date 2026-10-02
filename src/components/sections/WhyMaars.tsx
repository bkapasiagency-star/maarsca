import { Handshake, Lightbulb, Target, UserCheck } from "lucide-react";
import { principles } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";

const icons = [Target, UserCheck, Lightbulb, Handshake];

export function WhyMaars() {
  return (
    <section id="why" aria-labelledby="why-title" className="bg-surface py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeader
          id="why-title"
          eyebrow="Why MAARS"
          title="Why businesses *choose* MAARS"
          lead="Four principles shape how we work with every client, from a first-time founder to an established group."
        />

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => {
            const Icon = icons[i];
            return (
              <li
                key={p.title}
                data-reveal="up"
                className="relative overflow-hidden rounded-xl border border-line bg-white p-7 before:absolute before:inset-x-0 before:top-0 before:h-1 before:origin-left before:scale-x-0 before:bg-brand before:transition-transform before:duration-500 hover:before:scale-x-100"
              >
                <span className="grid size-12 place-items-center rounded-full bg-navy text-white">
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-6 text-lg font-bold text-navy">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-body">{p.copy}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
