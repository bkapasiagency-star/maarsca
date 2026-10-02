"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarCheck, Phone, X } from "lucide-react";
import { firm } from "@/lib/content";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { BackToTop } from "./BackToTop";

/**
 * Appears once the visitor has scrolled past the hero, and hides while the
 * contact form or footer base is on screen so it never covers them.
 */
export function FloatingContact() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const hiddenBy = useRef(new Set<Element>());
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.8 && hiddenBy.current.size === 0);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? hiddenBy.current.add(e.target) : hiddenBy.current.delete(e.target)));
      update();
    });
    document.querySelectorAll("#contact, [data-footer-base]").forEach((el) => io.observe(el));
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const shown = visible || open;
  const actions = [
    { label: "WhatsApp MAARS", href: firm.whatsappHref, external: true, icon: <WhatsAppIcon className="size-4 text-[#1ea952]" /> },
    { label: "Talk to an Expert", href: firm.phoneHref, icon: <Phone className="size-4 text-brand" strokeWidth={1.5} /> },
    { label: "Book a Consultation", href: "#contact", icon: <CalendarCheck className="size-4 text-brand" strokeWidth={1.5} /> },
  ];

  return (
    <>
    <BackToTop raised={shown} suppressed={open} />
    <div
      ref={wrap}
      className={`pointer-events-none fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:bottom-6 sm:right-6 ${
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      inert={!shown}
    >
      <ul
        id="quick-contact"
        className={`flex flex-col items-end gap-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "pointer-events-auto translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
        inert={!open}
      >
        {actions.map((a) => (
          <li key={a.label}>
            <a
              href={a.href}
              onClick={() => setOpen(false)}
              {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex h-12 items-center gap-3 rounded-full border border-line bg-white pl-4 pr-5 text-sm font-semibold text-navy shadow-[0_16px_40px_-16px_rgba(10,37,64,0.45)] transition-colors hover:border-brand"
            >
              {a.icon}
              {a.label}
            </a>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="quick-contact"
        aria-label={open ? "Close contact options" : "Contact MAARS"}
        className={`flex h-14 items-center gap-2.5 rounded-full bg-[#25D366] ${shown ? "pointer-events-auto" : ""} pl-4 pr-4 text-sm font-semibold text-navy-900 shadow-[0_16px_40px_-12px_rgba(10,37,64,0.5)] transition-colors hover:bg-[#3be07a] sm:pr-6`}
      >
        <span className="relative grid size-6 place-items-center">
          <WhatsAppIcon className={`absolute size-5 transition-all duration-300 ${open ? "rotate-90 scale-0" : ""}`} />
          <X className={`absolute size-5 transition-all duration-300 ${open ? "" : "-rotate-90 scale-0"}`} strokeWidth={1.5} />
        </span>
        <span className="hidden sm:inline">Talk to MAARS</span>
      </button>
    </div>
    </>
  );
}
