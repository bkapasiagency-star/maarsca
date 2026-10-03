import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { firm, team } from "@/lib/content";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { SplitWords } from "@/components/ui/SplitWords";
import { Journey } from "./Journey";

export function Intro() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-white py-20 sm:py-28 lg:py-32">
      <div aria-hidden className="glow absolute -right-[464px] -top-60 size-[1000px] [--glow:color-mix(in_srgb,var(--sky)_15%,transparent)]" />

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>About MAARS</Eyebrow>
            <h2 id="about-title" data-split className="heading mt-4 text-[clamp(2.25rem,4.8vw,3.75rem)]">
              <SplitWords text="More than compliance. A financial *partner* for your business." />
            </h2>
            <div data-reveal="up" className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4 lg:mt-12">
              <div className="flex -space-x-3">
                {team.map((m) => (
                  <span key={m.name} className="relative size-12 overflow-hidden rounded-full bg-navy ring-[3px] ring-white">
                    <Image src={m.photo} alt={`CA ${m.name}`} fill sizes="48px" className="object-cover object-[50%_18%]" />
                  </span>
                ))}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-navy">Led by four Chartered Accountant partners</p>
                <a href="#team" className="group mt-0.5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Meet the team
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-12">
            <p data-reveal="up" className="text-lg font-medium leading-relaxed text-navy sm:text-xl">
              MAARS &amp; Associates works with start-ups and established businesses across accounting, taxation, audit,
              corporate finance and strategic advisory.
            </p>
            <p data-reveal="up" className="mt-5 leading-relaxed text-body">
              We begin by understanding how your business actually runs: its margins, its people and its ambitions. Then we
              bring professional rigour to the decisions that follow, guided by our values of{" "}
              {firm.values.slice(0, -1).join(", ").toLowerCase()} and {firm.values.at(-1)?.toLowerCase()}.
            </p>

          </div>
        </div>

        <Journey />
      </div>
    </section>
  );
}
