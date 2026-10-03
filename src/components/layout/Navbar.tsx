"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Phone } from "lucide-react";
import { firm, nav } from "@/lib/content";
import { scrollToHash, useLenis } from "@/components/motion/SmoothScroll";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

gsap.registerPlugin(useGSAP);

export function Navbar() {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const panel = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item for the section currently in view.
  useEffect(() => {
    const sections = nav.map((n) => document.getElementById(n.href.slice(1))).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .set(panel.current, { visibility: "visible" })
        .fromTo(panel.current, { autoAlpha: 0, y: -12 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" })
        .fromTo("[data-menu-item]", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.04 }, "-=0.2");
    },
    { scope: panel },
  );

  useEffect(() => {
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      tl.current?.play();
    } else {
      lenis?.start();
      document.body.style.overflow = "";
      tl.current?.reverse();
    }
  }, [open, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const wasOpen = open;
    setOpen(false);
    lenis?.start();
    setTimeout(() => scrollToHash(lenis, href), wasOpen ? 200 : 0);
  };

  // Light (white) treatment only while floating over the navy hero.
  const light = !scrolled && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-[background-color,box-shadow] duration-300 ${
          light ? "bg-transparent" : "bg-white shadow-[0_1px_0_rgba(10,37,64,0.08),0_8px_24px_-16px_rgba(10,37,64,0.25)]"
        }`}
      >
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-[1280px] items-center justify-between px-5 transition-[height] duration-300 sm:px-8 ${
            scrolled || open ? "h-16" : "h-20"
          }`}
        >
          <a
            href="#top"
            onClick={(e) => go(e, "#top")}
            className="flex shrink-0 items-center gap-3"
            aria-label={`${firm.name}, Chartered Accountants, home`}
          >
            <span
              className={`grid h-9 place-items-center rounded-md bg-white px-1.5 transition-shadow duration-300 sm:h-10 ${
                light ? "" : "ring-1 ring-line"
              }`}
            >
              <Image src="/brand/ca-india.png" alt="CA India" width={640} height={453} sizes="45px" loading="eager" className="h-7 w-auto sm:h-8" />
            </span>
            <span aria-hidden className={`h-7 w-px ${light ? "bg-white/25" : "bg-line"}`} />
            <span className="relative">
              <Image
                src="/brand/maars-logo-light.png"
                alt=""
                width={2107}
                height={252}
                sizes="(min-width: 640px) 184px, 151px"
                loading="eager"
                className={`h-[18px] w-auto transition-opacity duration-300 sm:h-[22px] ${light ? "opacity-100" : "opacity-0"}`}
              />
              <Image
                src="/brand/maars-logo.png"
                alt=""
                width={2107}
                height={252}
                sizes="(min-width: 640px) 184px, 151px"
                className={`absolute inset-0 h-[18px] w-auto transition-opacity duration-300 sm:h-[22px] ${light ? "opacity-0" : "opacity-100"}`}
              />
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => go(e, item.href)}
                  aria-current={active === item.href ? "true" : undefined}
                  className={`relative rounded-md px-4 py-2 text-[0.9375rem] font-medium transition-colors ${
                    light
                      ? "text-white/80 hover:text-white"
                      : active === item.href
                        ? "text-brand"
                        : "text-body hover:text-navy"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={firm.phoneHref}
              className={`hidden items-center gap-2 px-3 text-sm font-semibold xl:inline-flex ${
                light ? "text-white" : "text-navy"
              }`}
            >
              <Phone className="size-4" strokeWidth={2} aria-hidden />
              {firm.phoneDisplay}
            </a>
            <a
              href="#contact"
              onClick={(e) => go(e, "#contact")}
              className={`hidden h-11 items-center rounded-md px-5 text-sm font-semibold transition-colors sm:inline-flex ${
                light ? "bg-white text-navy hover:bg-sky" : "bg-brand text-white hover:bg-brand-600"
              }`}
            >
              Book a Consultation
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="-mr-2 grid size-11 place-items-center lg:hidden"
            >
              <span className="relative block h-3.5 w-6">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`absolute left-0 h-0.5 w-6 rounded-full transition-all duration-300 ${
                      light ? "bg-white" : "bg-navy"
                    } ${
                      i === 0
                        ? open
                          ? "top-1.5 rotate-45"
                          : "top-0"
                        : i === 1
                          ? open
                            ? "top-1.5 opacity-0"
                            : "top-1.5"
                          : open
                            ? "top-1.5 -rotate-45"
                            : "top-3"
                    }`}
                  />
                ))}
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panel}
        aria-hidden={!open}
        inert={!open}
        className="invisible fixed inset-x-0 bottom-0 top-16 flex flex-col overflow-y-auto bg-white px-5 pb-8 pt-4 sm:px-8 lg:hidden"
      >
        <ul className="flex flex-col">
          {nav.map((item) => (
            <li key={item.href} data-menu-item className="border-b border-line">
              <a href={item.href} onClick={(e) => go(e, item.href)} className="block py-4 text-xl font-semibold text-navy">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div data-menu-item className="mt-auto flex flex-col gap-3 pt-8">
          <a
            href="#contact"
            onClick={(e) => go(e, "#contact")}
            className="flex h-13 items-center justify-center rounded-md bg-brand font-semibold text-white"
          >
            Book a Consultation
          </a>
          <a
            href={firm.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-13 items-center justify-center gap-2 rounded-md border border-line font-semibold text-navy"
          >
            <WhatsAppIcon className="size-5 text-[#25D366]" /> WhatsApp MAARS
          </a>
          <a href={firm.phoneHref} className="mt-2 text-center text-sm font-medium text-body">
            Call {firm.phoneDisplay}
          </a>
        </div>
      </div>
    </header>
  );
}
