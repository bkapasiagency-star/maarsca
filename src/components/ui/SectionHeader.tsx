import { SplitWords } from "./SplitWords";

export function Eyebrow({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <p
      data-reveal="up"
      className={`text-[0.8125rem] font-semibold uppercase tracking-[0.12em] ${tone === "dark" ? "text-sky" : "text-brand"}`}
    >
      {children}
    </p>
  );
}

/** Eyebrow + split-word H2 + optional lead paragraph. */
export function SectionHeader({
  id,
  eyebrow,
  title,
  lead,
  tone = "light",
  align = "split",
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: "light" | "dark";
  align?: "split" | "stack";
}) {
  const dark = tone === "dark";
  return (
    <div className={align === "split" ? "grid gap-6 lg:grid-cols-12 lg:items-end" : "max-w-3xl"}>
      <div className={align === "split" ? "lg:col-span-7" : ""}>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <h2
          id={id}
          data-split
          className={`heading mt-4 text-[clamp(2rem,4.2vw,3.25rem)] ${dark ? "text-white" : "text-ink"}`}
        >
          <SplitWords text={title} emphasisClass={dark ? "text-sky" : "text-brand"} />
        </h2>
      </div>
      {lead ? (
        <p
          data-reveal="up"
          className={`text-[1.0625rem] leading-relaxed ${dark ? "text-white/70" : "text-body"} ${
            align === "split" ? "lg:col-span-5 lg:pb-1" : "mt-5"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
