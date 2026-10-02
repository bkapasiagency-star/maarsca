"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLenis } from "@/components/motion/SmoothScroll";

const R = 21;
const CIRC = 2 * Math.PI * R;

/**
 * Back-to-top button with a ring showing scroll progress. Sits above the
 * floating contact button, drops into the corner when that button hides,
 * and steps aside while the contact menu is open.
 */
export function BackToTop({ raised, suppressed }: { raised: boolean; suppressed: boolean }) {
  const lenis = useLenis();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setVisible(window.scrollY > window.innerHeight * 1.2);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const show = visible && !suppressed;

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      inert={!show}
      className={`group fixed right-5 z-40 grid size-12 place-items-center rounded-full bg-white text-navy shadow-[0_12px_32px_-12px_rgba(10,37,64,0.5)] transition-[bottom,opacity,transform,background-color,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-navy hover:text-white sm:right-6 ${
        raised ? "bottom-[5.5rem] sm:bottom-[6.25rem]" : "bottom-4 sm:bottom-6"
      } ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90" aria-hidden>
        <circle cx="24" cy="24" r={R} fill="none" stroke="var(--line)" strokeWidth="2" />
        <circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="var(--brand)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC * (1 - progress)}
          className="group-hover:stroke-sky"
        />
      </svg>
      <ArrowUp className="relative size-5 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={2} />
    </button>
  );
}
