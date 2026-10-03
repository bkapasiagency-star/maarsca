import Image from "next/image";
import { team } from "@/lib/content";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Team() {
  return (
    <section id="team" aria-labelledby="team-title" className="bg-white py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeader
          id="team-title"
          eyebrow="Our Team"
          title="Meet the people behind the *numbers.*"
          lead="A partner-led team of Chartered Accountants, each bringing focused expertise to the work that matters most to your business."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <li key={m.name} data-reveal="up">
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-shadow duration-300 hover:shadow-[0_24px_48px_-24px_rgba(10,37,64,0.3)]">
                <div className="relative aspect-[4/5] overflow-hidden bg-navy">
                  <div aria-hidden className="glow absolute -right-48 -top-48 size-[480px] [--glow:color-mix(in_srgb,var(--brand)_60%,transparent)]" />
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-900/60 to-transparent" />
                  <Image
                    src={m.photo}
                    alt={`CA ${m.name}, ${m.focus}`}
                    fill
                    sizes="(min-width: 1024px) 296px, (min-width: 640px) 45vw, 90vw"
                    className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="flex min-h-10 items-end text-xs font-semibold uppercase leading-5 tracking-[0.1em] text-brand">{m.focus}</p>
                  <h3 className="mt-2 text-xl font-bold tracking-tight text-navy">CA {m.name}</h3>
                  <p className="text-sm font-medium text-muted">Chartered Accountant · {m.role}</p>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-body">{m.bio}</p>
                  {"linkedin" in m ? (
                    <div className="mt-auto flex justify-end pt-5">
                      <a
                        href={m.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`CA ${m.name} on LinkedIn`}
                        title="View LinkedIn profile"
                        className="grid size-10 place-items-center rounded-full border border-line text-[#0A66C2] transition-colors duration-300 hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white"
                      >
                        <LinkedInIcon className="size-[1.125rem]" />
                      </a>
                    </div>
                  ) : null}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
