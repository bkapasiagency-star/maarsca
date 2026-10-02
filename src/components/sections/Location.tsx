import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { firm, google } from "@/lib/content";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { SplitWords } from "@/components/ui/SplitWords";
import { GoogleG, Stars } from "@/components/ui/Google";

export function Location() {
  const hq = firm.offices[0];
  return (
    <section id="location" aria-labelledby="location-title" className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <Eyebrow>Visit us</Eyebrow>
          <h2 id="location-title" data-split className="heading mt-4 text-[clamp(2rem,4vw,3rem)]">
            <SplitWords text="Find us in *Surat.*" />
          </h2>

          <div data-reveal="up" className="mt-8 rounded-xl border border-line bg-surface p-6">
            <div className="flex items-center gap-3">
              <GoogleG className="size-6" />
              <div>
                <p className="font-bold text-navy">{google.placeName}</p>
                <p className="mt-1 flex items-center gap-2 text-sm">
                  <span className="font-extrabold text-navy">{google.rating}</span>
                  <Stars value={google.rating} className="size-3.5" />
                  <a href={google.mapsUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-brand hover:underline">
                    {google.reviewCount} Google reviews
                  </a>
                </p>
              </div>
            </div>

            <ul className="mt-6 space-y-4 border-t border-line pt-6 text-[0.9375rem] text-body">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                <span>{hq.lines.join(", ")}</span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                {firm.hours}
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                <a href={firm.phoneHref} className="font-semibold text-navy hover:text-brand">
                  {firm.phoneDisplay}
                </a>
              </li>
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={google.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 flex-1 items-center whitespace-nowrap justify-center gap-2 rounded-md bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
              >
                <Navigation className="size-4" aria-hidden /> Get directions
              </a>
              <a
                href={google.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 flex-1 items-center whitespace-nowrap justify-center gap-2 rounded-md border border-navy/20 px-5 text-sm font-semibold text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
              >
                View on Google Maps
              </a>
            </div>
          </div>

          <p data-reveal="up" className="mt-6 text-sm text-muted">
            Branch office: {firm.offices[1].lines.join(", ")}
          </p>
        </div>

        <div data-reveal="up" className="lg:col-span-8">
          <div className="relative h-[360px] overflow-hidden rounded-xl border border-line bg-surface shadow-[0_24px_48px_-28px_rgba(10,37,64,0.35)] sm:h-[460px] lg:h-full lg:min-h-[520px]">
            <iframe
              title={`Map showing ${google.placeName}, Surat`}
              src={google.embedUrl}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
