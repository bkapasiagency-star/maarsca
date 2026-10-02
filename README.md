# MAARS & Associates — Homepage Concept

A homepage design concept prepared for MAARS & Associates, Chartered Accountants.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Lenis · Lucide · Plus Jakarta Sans

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Structure

- `src/lib/content.ts` holds all copy and facts. Edit content here, not in components.
- `src/components/sections/*` has one file per homepage section.
- `src/components/motion/` contains:
  - `SmoothScroll` (Lenis synced to the GSAP ticker)
  - `ScrollAnimations` (declarative `data-reveal`, `data-split`, `data-count` and `data-parallax` attributes)
- Reduced-motion users get static content: Lenis and GSAP reveals are skipped.

## Content sources

Facts come from maarsca.in and maarsca.in/about-company, retrieved 2 Oct 2026:

- Services
- Team names, CA designations and focus areas
- Testimonials (verbatim)
- Addresses, phone, email and hours
- Firm history and milestones

## Confirm with the firm before launch

- [ ] **Milestones** (since 2012, 1000+ income tax clients, 300+ GST clients, 100+ tax audits, ₹100 Cr+ loan funding), shown in the hero panel. These are as published on the About page; re-confirm the current figures.
- [ ] **Team bios.** These come only from the published firm history. Extended profiles are welcome. (Photographs: done.)
- [ ] **Team roles.** "Founder" and "Partner" are inferred from the About-page timeline.
- [ ] **Industry descriptions.** Manufacturing, IT and hospitality are named on the site. E-commerce comes from the firm's e-commerce vertical. "Professional Services" was added for this concept.
- [ ] **Virtual CFO dashboard.** It uses illustrative sample data and is labelled as such.
- [ ] **Social links.** Only WhatsApp is published, so no LinkedIn link has been added.
- [ ] **Contact form.** It validates and shows a success state but does not send anything yet. Connect it to an inbox or CRM.
- [ ] **Indexing.** `robots: noindex` is set in `layout.tsx` while this is a concept. Remove it at launch.
- [ ] **CA India logo.** Used unaltered in the header, footer and favicon. The firm should confirm its use follows ICAI's logo guidelines for members.
- [ ] **Legal links.** These currently point to the existing maarsca.in policy pages.
