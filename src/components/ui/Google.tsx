import { Star } from "lucide-react";
import { google } from "@/lib/content";

export function GoogleG({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.09 3.57-5.16 3.57-8.81z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.9l-3.87-3.01c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95H1.27v3.11A11.99 11.99 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.6H1.27a12 12 0 0 0 0 10.8l4-3.11z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.27 6.6l4 3.11C6.22 6.88 8.87 4.77 12 4.77z" />
    </svg>
  );
}

export function Stars({ value = 5, className = "size-4" }: { value?: number; className?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden
          className={`${className} ${i < Math.round(value) ? "fill-[#FBBC05] text-[#FBBC05]" : "fill-line text-line"}`}
          strokeWidth={1}
        />
      ))}
    </span>
  );
}

/** Compact "4.9 ★★★★★ on Google" badge linking to the Google listing. */
export function GoogleRatingBadge({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <a
      href={google.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-3 rounded-full border px-4 py-2.5 transition-colors ${
        dark ? "border-white/15 bg-white/5 hover:bg-white/10" : "border-line bg-white hover:border-brand/40"
      }`}
    >
      <GoogleG className="size-5" />
      <span className={`text-lg font-extrabold leading-none ${dark ? "text-white" : "text-navy"}`}>{google.rating}</span>
      <Stars value={google.rating} />
      <span className={`text-sm font-medium ${dark ? "text-white/70" : "text-muted"} group-hover:underline`}>
        {google.reviewCount} Google reviews
      </span>
    </a>
  );
}
