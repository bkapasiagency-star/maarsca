"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileCheck2, LayoutDashboard, TrendingUp } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Illustrative sample data only, not client figures.
const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
const revenue = [30, 34, 33, 37, 36, 40, 43, 41, 46, 48, 47, 52];
const margin = [28, 29, 28.5, 30, 30.5, 31, 31.8, 31.2, 32, 32.4, 32.1, 32.6];

const kpis = [
  { label: "Revenue", value: 4.8, decimals: 1, prefix: "₹", suffix: " Cr", delta: "+18.2%" },
  { label: "Gross Margin", value: 32.6, decimals: 1, prefix: "", suffix: "%", delta: "+2.1 pts" },
  { label: "Operating Cash Flow", value: 82, decimals: 0, prefix: "₹", suffix: " L", delta: "+9.6%" },
];

const W = 480;
const CH = 160;
const STEP = W / revenue.length;
const BAR = 18;
const maxRev = 66;
const my = (m: number) => CH - ((m - 26) / 9) * CH;
const mx = (i: number) => i * STEP + STEP / 2;
const linePath = margin.map((m, i) => `${i ? "L" : "M"}${mx(i).toFixed(1)} ${my(m).toFixed(1)}`).join(" ");
const areaPath = `${linePath} L${mx(margin.length - 1).toFixed(1)} ${CH} L${mx(0).toFixed(1)} ${CH} Z`;

export function CfoDashboard() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!document.documentElement.classList.contains("js")) return;
      gsap.set("[data-cbar]", { transformOrigin: "50% 100%" });
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });
      tl.fromTo("[data-dash]", { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 1.3 })
        .fromTo("[data-cbar]", { scaleY: 0 }, { scaleY: 1, duration: 1.1, stagger: 0.04 }, 0.4)
        .fromTo("[data-cline]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, 0.7)
        .fromTo("[data-carea], [data-cend]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 1.8)
        .fromTo("[data-float]", { autoAlpha: 0, y: 20, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1 }, 1.2);

      gsap.utils.toArray<HTMLElement>("[data-kpi-value]").forEach((el, i) => {
        const k = kpis[i];
        const o = { v: 0 };
        tl.to(o, { v: k.value, duration: 1.8, ease: "power3.out", onUpdate: () => (el.textContent = o.v.toFixed(k.decimals)) }, 0.3);
      });

      gsap.to("[data-float]", { y: -8, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.4 });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative [perspective:1800px]">
      {/* Gentle 3D tilt on desktop that settles on hover */}
      <div className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:[transform:rotateY(-7deg)_rotateX(3deg)] lg:hover:[transform:rotateY(0)_rotateX(0)]">
        <div
          data-dash
          role="img"
          aria-label="Sample Virtual CFO dashboard showing revenue, gross margin and operating cash flow (illustrative data)"
          className="relative rounded-2xl bg-white p-5 text-ink shadow-[0_50px_100px_-30px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)] sm:p-7"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-lg bg-navy text-white">
                <LayoutDashboard className="size-5" strokeWidth={1.75} aria-hidden />
              </span>
              <div>
                <p className="font-bold leading-tight text-navy">Management Dashboard</p>
                <p className="text-xs text-muted">Financial year · Monthly MIS</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span aria-hidden className="hidden rounded-lg bg-surface p-1 text-xs font-semibold text-muted sm:flex">
                <span className="rounded-md px-2.5 py-1">M</span>
                <span className="rounded-md bg-white px-2.5 py-1 text-navy shadow-sm">Q</span>
                <span className="rounded-md px-2.5 py-1">Y</span>
              </span>
              <span className="rounded-full border border-line px-2.5 py-1 text-[0.6875rem] font-semibold text-muted">
                Sample data
              </span>
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-3 gap-2.5 sm:gap-3">
            {kpis.map((k, i) => (
              <div
                key={k.label}
                className={`rounded-xl p-3 sm:p-4 ${i === 0 ? "bg-navy text-white" : "border border-line bg-surface/60"}`}
              >
                <dt className={`text-[0.6875rem] font-medium sm:text-xs ${i === 0 ? "text-white/65" : "text-muted"}`}>{k.label}</dt>
                <dd className={`tabular mt-1.5 text-lg font-extrabold tracking-tight sm:text-2xl ${i === 0 ? "text-white" : "text-navy"}`}>
                  {k.prefix}
                  <span data-kpi-value>{k.value.toFixed(k.decimals)}</span>
                  <span className={i === 0 ? "text-sky" : "text-brand"}>{k.suffix}</span>
                </dd>
                <dd
                  className={`mt-2 inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[0.625rem] font-bold sm:text-[0.6875rem] ${
                    i === 0 ? "bg-emerald-400/15 text-emerald-300" : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  <TrendingUp className="size-3" strokeWidth={2.5} aria-hidden />
                  {k.delta}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 rounded-xl border border-line p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-navy">Revenue &amp; gross margin</p>
              <div className="flex items-center gap-4 text-xs text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-sm bg-gradient-to-b from-brand to-sky" /> Revenue
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-0.5 w-3 rounded-full bg-amber-500" /> Margin
                </span>
              </div>
            </div>
            <svg viewBox={`0 0 ${W} ${CH + 26}`} className="mt-4 w-full" aria-hidden>
              <defs>
                <linearGradient id="cfo-bar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#01587d" />
                  <stop offset="1" stopColor="#7cc8ee" stopOpacity="0.55" />
                </linearGradient>
                <linearGradient id="cfo-bar-hi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#0a2540" />
                  <stop offset="1" stopColor="#01587d" />
                </linearGradient>
                <linearGradient id="cfo-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#f59e0b" stopOpacity="0.22" />
                  <stop offset="1" stopColor="#f59e0b" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0, 40, 80, 120, 160].map((y) => (
                <line key={y} x1="0" x2={W} y1={y} y2={y} stroke="#e2e8f0" strokeDasharray={y === CH ? undefined : "3 5"} />
              ))}
              {revenue.map((r, i) => {
                const h = (r / maxRev) * CH;
                const last = i === revenue.length - 1;
                return (
                  <rect
                    key={i}
                    data-cbar
                    x={mx(i) - BAR / 2}
                    y={CH - h}
                    width={BAR}
                    height={h}
                    rx="4"
                    fill={last ? "url(#cfo-bar-hi)" : "url(#cfo-bar)"}
                    opacity={last ? 1 : 0.85}
                  />
                );
              })}
              <path data-carea d={areaPath} fill="url(#cfo-area)" />
              <path data-cline d={linePath} pathLength={1} strokeDasharray="1" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
              <g data-cend>
                <circle cx={mx(11)} cy={my(32.6)} r="9" fill="#f59e0b" fillOpacity="0.2" />
                <circle cx={mx(11)} cy={my(32.6)} r="4.5" fill="#fff" stroke="#f59e0b" strokeWidth="2.5" />
                <rect x={mx(11) - 50} y={my(32.6) - 34} width="42" height="20" rx="6" fill="#0a2540" />
                <text x={mx(11) - 29} y={my(32.6) - 20} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">
                  32.6%
                </text>
              </g>
              {months.map((m, i) => (
                <text key={m} x={mx(i)} y={CH + 20} textAnchor="middle" fontSize="11" fill="#64748b">
                  {m}
                </text>
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* Floating detail card */}
      <div
        data-float
        aria-hidden
        className="absolute -bottom-6 -left-3 hidden items-center gap-3 rounded-xl border border-white/60 bg-white/95 py-3 pl-3 pr-5 text-ink shadow-[0_24px_50px_-20px_rgba(0,0,0,0.55)] backdrop-blur sm:flex lg:-left-10"
      >
        <span className="grid size-10 place-items-center rounded-full bg-emerald-50 text-emerald-600">
          <FileCheck2 className="size-5" strokeWidth={1.75} />
        </span>
        <span>
          <span className="block text-sm font-bold text-navy">Monthly MIS report</span>
          <span className="block text-xs text-muted">Ready for leadership review</span>
        </span>
      </div>
    </div>
  );
}
