"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flag, Handshake, Layers, Scale, Sparkles, UserPlus, Users } from "lucide-react";
import { firm, journey } from "@/lib/content";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const icons = [Flag, Scale, Handshake, Layers, Users, UserPlus, Sparkles];

/**
 * Firm history. Desktop: the panel pins and vertical scroll drives the
 * milestones horizontally, with a progress line lighting each node in turn.
 * Mobile: a vertical timeline with the same scrubbed fill.
 */
export function Journey() {
  const root = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const [current, setCurrent] = useState(journey.length - 1);

  useGSAP(
    () => {
      if (!document.documentElement.classList.contains("js")) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-milestone]");
      const activate = (p: number) => {
        const idx = Math.min(items.length - 1, Math.floor(p * (items.length - 1) + 0.35));
        items.forEach((el, i) => (el.dataset.state = i < idx ? "done" : i === idx ? "active" : "idle"));
        setCurrent(idx);
      };
      activate(0);

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const vp = viewport.current!;
        const tr = track.current!;
        const distance = () => Math.max(0, tr.scrollWidth - vp.clientWidth);
        gsap.set("[data-fill-y]", { scaleY: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "center center",
            end: () => `+=${distance() + 400}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => activate(self.progress),
          },
        });
        tl.to(tr, { x: () => -distance(), duration: 1 }, 0).fromTo(
          "[data-fill-x]",
          { scaleX: 0 },
          { scaleX: 1, duration: 1 },
          0,
        );
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          "[data-fill-y]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: track.current,
              start: "top 70%",
              end: "bottom 60%",
              scrub: 0.5,
              onUpdate: (self) => activate(self.progress),
            },
          },
        );
      });

      // Cards rise in once as the panel arrives.
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="on-dark relative isolate mt-16 overflow-hidden rounded-3xl bg-navy-900 text-white shadow-[0_50px_100px_-50px_rgba(10,37,64,0.7)] lg:mt-20"
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_80%_at_0%_0%,rgba(1,88,125,0.6),transparent_60%),radial-gradient(ellipse_50%_70%_at_100%_100%,rgba(124,200,238,0.14),transparent_60%)]" />
      <div aria-hidden className="absolute inset-x-10 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-sky/50 to-transparent" />

      <div className="flex flex-wrap items-end justify-between gap-6 px-6 pt-9 sm:px-10 sm:pt-11">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky">Our journey</p>
          <h3 className="mt-3 text-[1.75rem] font-bold leading-tight tracking-tight sm:text-4xl">
            Built steadily since {firm.founded}
          </h3>
        </div>
        <div className="flex items-baseline gap-3" aria-hidden>
          <span className="tabular bg-gradient-to-r from-sky to-white bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl">
            {journey[current].year}
          </span>
          <span className="text-sm font-medium text-white/50">
            {String(current + 1).padStart(2, "0")} / {String(journey.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div ref={viewport} className="no-scrollbar overflow-x-auto lg:[html.js_&]:overflow-hidden lg:[mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]" tabIndex={-1}>
        <ol ref={track} className="relative flex flex-col gap-5 px-6 pb-10 pt-10 sm:px-10 lg:w-max lg:flex-row lg:gap-6 lg:pb-12 lg:pt-12">
          {/* Desktop rail */}
          <span aria-hidden className="absolute left-[calc(2.5rem+1.25rem)] right-[calc(2.5rem+18.5rem-1.25rem)] top-[calc(3rem+1.25rem)] hidden h-0.5 rounded-full bg-white/10 lg:block">
            <span data-fill-x className="block h-full origin-left rounded-full bg-gradient-to-r from-brand via-sky to-sky shadow-[0_0_16px_rgba(124,200,238,0.7)]" />
          </span>
          {/* Mobile rail */}
          <span aria-hidden className="absolute bottom-10 left-[calc(1.5rem+1.25rem)] top-10 w-0.5 rounded-full bg-white/10 sm:left-[calc(2.5rem+1.25rem)] lg:hidden">
            <span data-fill-y className="block h-full w-full origin-top rounded-full bg-gradient-to-b from-brand via-sky to-sky shadow-[0_0_16px_rgba(124,200,238,0.7)]" />
          </span>

          {journey.map((j, i) => {
            const Icon = icons[i];
            return (
              <li
                key={j.year}
                data-milestone
                className="group/m relative grid grid-cols-[2.5rem_1fr] gap-4 lg:block lg:w-[18.5rem]"
              >
                <span
                  className="relative z-10 grid size-10 place-items-center rounded-full border border-white/15 bg-navy-900 text-white/45 transition-all duration-500 group-data-[state=active]/m:scale-110 group-data-[state=active]/m:border-sky group-data-[state=active]/m:bg-sky group-data-[state=active]/m:text-navy-900 group-data-[state=active]/m:shadow-[0_0_0_6px_rgba(124,200,238,0.15),0_0_30px_rgba(124,200,238,0.6)] group-data-[state=done]/m:border-sky/60 group-data-[state=done]/m:text-sky"
                >
                  <Icon className="size-[1.125rem]" strokeWidth={2} aria-hidden />
                </span>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all lg:backdrop-blur-sm duration-500 group-data-[state=active]/m:-translate-y-1 group-data-[state=active]/m:border-sky/35 group-data-[state=active]/m:bg-white/[0.08] group-data-[state=active]/m:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.6)] group-data-[state=idle]/m:opacity-50 lg:mt-7 lg:min-h-[13.5rem] lg:p-6">
                  <p className="bg-gradient-to-r from-sky to-white bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
                    {j.year}
                  </p>
                  <p className="mt-3 font-bold leading-snug text-white">{j.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{j.copy}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
