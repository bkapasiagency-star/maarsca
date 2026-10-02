import { Compass, FileBarChart2, PieChart, Wallet } from "lucide-react";
import { firm } from "@/lib/content";
import { SplitWords } from "@/components/ui/SplitWords";
import { Button, TextLink } from "@/components/ui/Button";
import { CfoDashboard } from "./CfoDashboard";

const outcomes = [
  { icon: Wallet, title: "Cash flow visibility", copy: "Know what is coming in, going out and what it means for next quarter." },
  { icon: PieChart, title: "Profitability insight", copy: "See which products, clients and channels actually make money." },
  { icon: FileBarChart2, title: "Management reporting", copy: "Monthly reports your leadership team will read and act on." },
  { icon: Compass, title: "Strategic decisions", copy: "Budgets, pricing, hiring and funding, all backed by the numbers." },
];

export function VirtualCfo() {
  return (
    <section
      id="virtual-cfo"
      aria-labelledby="vcfo-title"
      className="on-dark relative isolate overflow-hidden bg-navy-900 py-20 text-white sm:py-28 lg:py-36"
    >
      {/* Depth: layered glows and hairline edges */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_15%_0%,rgba(1,88,125,0.55),transparent_60%),radial-gradient(ellipse_60%_60%_at_95%_70%,rgba(124,200,238,0.16),transparent_60%)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-sky/40 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto grid max-w-[1280px] items-center gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <p data-reveal="up" className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 py-1 pl-1 pr-4 text-sm">
            <span className="rounded-full bg-sky px-2.5 py-0.5 text-xs font-bold text-navy-900">Featured</span>
            <span className="font-medium text-white/85">Virtual CFO Services</span>
          </p>
          <h2 id="vcfo-title" data-split className="heading mt-6 text-[clamp(2.25rem,4.4vw,3.5rem)]">
            <SplitWords
              text="Your business does not just need accounts. It needs financial *direction.*"
              emphasisClass="bg-gradient-to-r from-sky to-white bg-clip-text text-transparent"
            />
          </h2>
          <p data-reveal="up" className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/70">
            Growing businesses outgrow bookkeeping long before they can justify a full-time CFO. Our Virtual CFO service
            gives founders and leadership teams senior financial thinking, structured reporting and a partner for the
            decisions that shape the next stage of growth.
          </p>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {outcomes.map(({ icon: Icon, title, copy }) => (
              <li
                key={title}
                data-reveal="up"
                className="group flex gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-colors sm:block duration-300 hover:border-sky/30 hover:bg-white/[0.07]"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-sky/25 to-sky/5 text-sky ring-1 ring-sky/20">
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
                <div>
                  <h3 className="font-semibold text-white sm:mt-4">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">{copy}</p>
                </div>
              </li>
            ))}
          </ul>

          <div data-reveal="up" className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
            <Button href="#contact" data-service="Virtual CFO" variant="white">
              Explore Virtual CFO
            </Button>
            <TextLink href={firm.phoneHref} className="text-sky hover:text-white">
              Talk to an expert
            </TextLink>
          </div>
        </div>

        <div className="lg:col-span-6">
          <CfoDashboard />
        </div>
      </div>
    </section>
  );
}
