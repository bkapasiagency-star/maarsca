"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight, Pause, Play, Quote } from "lucide-react";
import { google, testimonials } from "@/lib/content";
import { GoogleG, GoogleRatingBadge, Stars } from "@/components/ui/Google";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { SplitWords } from "@/components/ui/SplitWords";

/** Scroll position that aligns `item` with the rail's padded start edge. */
function itemOffset(rail: HTMLElement, item: HTMLElement) {
  return item.offsetLeft - rail.offsetLeft - parseFloat(getComputedStyle(rail).paddingLeft);
}

const TOTAL = testimonials.length + google.reviews.length;
const INTERVAL = 5000;

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export function Testimonials() {
  const rail = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [tick, setTick] = useState(0);
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);

  // Auto-rotation stops whenever the visitor is engaged or can't see it.
  const autoplay = !userPaused && !reduced;
  const rotating = autoplay && !hovering && !focused && inView && expanded === null;

  const onScroll = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    const items = Array.from(el.children) as HTMLElement[];
    const dist = (item: HTMLElement) => Math.abs(itemOffset(el, item) - el.scrollLeft);
    let nearest = 0;
    items.forEach((item, i) => {
      if (dist(item) < dist(items[nearest])) nearest = i;
    });
    setIndex(nearest);
  }, []);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  // Loops at both ends.
  const go = useCallback(
    (dir: 1 | -1) => {
      const el = rail.current;
      if (!el) return;
      let next = index + dir;
      if (dir === 1 && progress > 0.99) next = 0;
      if (next < 0) next = TOTAL - 1;
      next = Math.min(next, TOTAL - 1);
      el.scrollTo({ left: itemOffset(el, el.children[next] as HTMLElement), behavior: "smooth" });
      setTick((t) => t + 1);
    },
    [index, progress],
  );

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!rotating) return;
    const t = window.setTimeout(() => {
      if (document.hidden) setTick((n) => n + 1);
      else go(1);
    }, INTERVAL);
    return () => window.clearTimeout(t);
  }, [rotating, index, tick, go]);

  return (
    <section
      aria-labelledby="testimonials-title"
      aria-roledescription="carousel"
      // Keyboard focus pauses rotation; mouse clicks on the controls don't.
      onFocus={(e) => e.target.matches(":focus-visible") && setFocused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false)}
      className="overflow-hidden bg-surface py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Client Testimonials</Eyebrow>
            <h2 id="testimonials-title" data-split className="heading mt-4 text-[clamp(2rem,4.2vw,3.25rem)]">
              <SplitWords text="Trusted by businesses across *industries.*" />
            </h2>
            <div data-reveal="up" className="mt-6">
              <GoogleRatingBadge />
            </div>
          </div>
          <div className="flex items-center gap-2" data-reveal="up">
            {!reduced ? (
              <button
                type="button"
                onClick={() => setUserPaused((p) => !p)}
                aria-label={autoplay ? "Pause automatic rotation" : "Start automatic rotation"}
                title={autoplay ? "Pause" : "Play"}
                className="mr-1 grid size-12 place-items-center rounded-full text-navy transition-colors hover:bg-white"
              >
                {autoplay ? <Pause className="size-4" strokeWidth={2.25} /> : <Play className="size-4" strokeWidth={2.25} />}
              </button>
            ) : null}
            {([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => go(dir)}
                aria-label={dir === -1 ? "Previous testimonial" : "Next testimonial"}
                className="grid size-12 place-items-center rounded-full border border-navy/15 bg-white text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
              >
                {dir === -1 ? <ArrowLeft className="size-5" strokeWidth={2} /> : <ArrowRight className="size-5" strokeWidth={2} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ul
        ref={rail}
        aria-label="Client testimonials"
        aria-live={rotating ? "off" : "polite"}
        tabIndex={0}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
        onPointerLeave={() => setHovering(false)}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-4 sm:scroll-px-8 sm:px-8 xl:scroll-px-[calc((100vw-1280px)/2+2rem)] xl:px-[calc((100vw-1280px)/2+2rem)]"
      >
        {testimonials.map((t) => (
          <li
            key={t.name}
            data-reveal="up"
            className="flex w-[86vw] shrink-0 snap-start sm:w-[26rem] lg:w-[30rem]"
          >
            <figure className="flex w-full flex-col rounded-xl border border-line bg-white p-7 sm:p-9">
              <Quote className="size-9 fill-brand/10 text-brand" strokeWidth={1.5} aria-hidden />
              <blockquote className="mt-5 flex-1">
                <p className="text-[1.0625rem] leading-relaxed text-ink sm:text-lg">{t.quote}</p>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full bg-navy text-sm font-bold text-white">
                  {t.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </span>
                <div>
                  <p className="font-bold text-navy">{t.name}</p>
                  <p className="text-sm text-muted">
                    {t.title}, {t.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          </li>
        ))}
        {google.reviews.map((r) => (
          <li key={r.name} data-reveal="up" className="flex w-[86vw] shrink-0 snap-start sm:w-[26rem] lg:w-[30rem]">
            <figure className="flex w-full flex-col rounded-xl border border-line bg-white p-7 sm:p-9">
              <div className="flex items-center justify-between">
                <Stars value={r.stars} className="size-5" />
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-muted">
                  <GoogleG className="size-4" /> Google review
                </span>
              </div>
              <div className="mt-5 flex-1">
                <blockquote>
                  <p
                    id={`review-${r.name.replace(/\s/g, "-")}`}
                    className={`text-[1.0625rem] leading-relaxed text-ink sm:text-lg ${expanded === r.name ? "" : "line-clamp-5"}`}
                  >
                    {r.text}
                  </p>
                </blockquote>
                {r.text.length > 200 ? (
                  <button
                    type="button"
                    onClick={() => setExpanded(expanded === r.name ? null : r.name)}
                    aria-expanded={expanded === r.name}
                    aria-controls={`review-${r.name.replace(/\s/g, "-")}`}
                    className="mt-3 text-sm font-semibold text-brand hover:underline"
                  >
                    {expanded === r.name ? "Show less" : "Read more"}
                  </button>
                ) : null}
              </div>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white">
                  {r.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </span>
                <div>
                  <p className="font-bold text-navy">{r.name}</p>
                  <p className="text-sm text-muted">Posted on Google · {r.date}</p>
                </div>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-8 max-w-[1280px] px-5 sm:px-8">
        <div className="h-1 w-full overflow-hidden rounded-full bg-line" aria-hidden>
          <div
            className="h-full rounded-full bg-brand transition-[width] duration-300"
            style={{ width: `${Math.max(1 / TOTAL, progress) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
