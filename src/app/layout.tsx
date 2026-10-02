import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { firm } from "@/lib/content";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const title = "MAARS & Associates | Chartered Accountants & Business Advisors";
const description =
  "MAARS & Associates provides taxation, audit, corporate finance, Virtual CFO and business advisory services for growing businesses.";

export const metadata: Metadata = {
  metadataBase: new URL("https://maarsca.in"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: firm.name,
    title,
    description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  // Concept preview: keep out of search indexes until launch.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0a2540",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: firm.name,
  description,
  url: "https://maarsca.in/",
  telephone: "+91-8460777760",
  email: firm.email,
  foundingDate: String(firm.founded),
  openingHours: "Mo-Su 10:00-19:00",
  areaServed: "IN",
  address: {
    "@type": "PostalAddress",
    streetAddress: "A-7/8, 1st Floor, Tulsi Market, Ring Road",
    addressLocality: "Surat",
    addressRegion: "Gujarat",
    postalCode: "395002",
    addressCountry: "IN",
  },
  department: {
    "@type": "AccountingService",
    name: `${firm.name}, Kashipur`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "312, Arya Nagar",
      addressLocality: "Kashipur",
      addressRegion: "Uttarakhand",
      postalCode: "244713",
      addressCountry: "IN",
    },
  },
  knowsAbout: [
    "Taxation",
    "GST compliance",
    "Tax litigation",
    "Internal audit",
    "Risk assessment",
    "Corporate finance",
    "Virtual CFO",
    "Start-up consultancy",
    "IPO facilitation",
    "E-commerce reconciliation",
  ],
};

// Runs before paint: flags that JS motion will handle reveals, so animated
// elements don't flash. Falls back to plain content if motion never starts.
const motionFlag = `(function(){var d=document.documentElement;try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;}catch(e){}d.classList.add('js');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('js')},4000)})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${jakarta.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFlag }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
