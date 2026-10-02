"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Page-wide declarative scroll motion. Sections stay server components and
 * opt in with data attributes:
 *
 *   data-reveal="up" | "fade" | "mask" | "line"   – enter animation
 *   data-split                                     – word-by-word heading reveal (use <SplitWords>)
 *   data-count="1000" data-format="plain"          – number transition
 *   data-parallax="0.12"                           – subtle scroll-linked drift
 */
export function ScrollAnimations() {
  useGSAP(() => {
    const root = document.documentElement;
    if (!root.classList.contains("js")) return;

    const ease = "expo.out";

    ScrollTrigger.batch("[data-reveal]", {
      start: "top 88%",
      once: true,
      onEnter: (els) => {
        const elements = els as HTMLElement[];
        const byType = (t: string) => elements.filter((e) => e.dataset.reveal === t);
        const tween = (t: string, from: gsap.TweenVars, to: gsap.TweenVars) => {
          const targets = byType(t);
          if (targets.length) gsap.fromTo(targets, from, to);
        };

        tween(
          "up",
          { autoAlpha: 0, y: 32 },
          { autoAlpha: 1, y: 0, duration: 1.2, ease, stagger: 0.09, overwrite: true },
        );
        tween(
          "fade",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1.4, ease: "power2.out", stagger: 0.08 },
        );
        tween(
          "mask",
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 1.4, ease, stagger: 0.12 },
        );
        tween(
          "line",
          { autoAlpha: 1, scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 1.6, ease, stagger: 0.1 },
        );
      },
    });

    gsap.utils.toArray<HTMLElement>("[data-split]").forEach((heading) => {
      const words = heading.querySelectorAll(".split-word > span");
      gsap.to(words, {
        yPercent: 0,
        y: 0,
        duration: 1.25,
        ease,
        stagger: 0.045,
        scrollTrigger: { trigger: heading, start: "top 88%", once: true },
      });
    });

    gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
      const target = Number(el.dataset.count);
      const plain = el.dataset.format === "plain";
      const from = plain ? Math.round(target * 0.985) : 0;
      const counter = { v: from };
      const render = () => {
        const n = Math.round(counter.v);
        el.textContent = plain ? String(n) : n.toLocaleString("en-IN");
      };
      render();
      gsap.to(counter, {
        v: target,
        duration: 2.2,
        ease: "power3.out",
        onUpdate: render,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax) || 0.1;
        gsap.fromTo(
          el,
          { yPercent: amount * 50 },
          {
            yPercent: amount * -50,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });

    root.classList.add("motion-ready");
    requestAnimationFrame(() => ScrollTrigger.refresh());
  });

  return null;
}
