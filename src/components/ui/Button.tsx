import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "white" | "outline" | "outline-light";

const styles: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-600 shadow-[0_8px_24px_-12px_rgba(1,88,125,0.7)]",
  white: "bg-white text-navy hover:bg-sky/90 hover:text-navy-900",
  outline: "border border-navy/20 text-navy hover:border-navy hover:bg-navy hover:text-white",
  "outline-light": "border border-white/30 text-white hover:border-white hover:bg-white hover:text-navy",
};

export function Button({
  children,
  variant = "primary",
  icon = true,
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; icon?: boolean; children: ReactNode }) {
  return (
    <a
      {...props}
      className={`group/btn inline-flex min-h-12 items-center justify-center gap-2.5 rounded-md px-6 text-[0.9375rem] font-semibold transition-all duration-300 ${styles[variant]} ${className}`}
    >
      {children}
      {icon ? (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
          strokeWidth={2}
        />
      ) : null}
    </a>
  );
}

export function TextLink({
  children,
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  return (
    <a {...props} className={`group/link inline-flex items-center gap-2 font-semibold ${className}`}>
      {children}
      <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover/link:translate-x-1" strokeWidth={2} />
    </a>
  );
}
