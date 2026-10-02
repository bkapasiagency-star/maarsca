import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollAnimations } from "@/components/motion/ScrollAnimations";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Intro } from "@/components/sections/Intro";
import { Expertise } from "@/components/sections/Expertise";
import { VirtualCfo } from "@/components/sections/VirtualCfo";
import { Industries } from "@/components/sections/Industries";
import { WhyMaars } from "@/components/sections/WhyMaars";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Location } from "@/components/sections/Location";

export default function Home() {
  return (
    <SmoothScroll>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-navy focus:px-4 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <TrustStrip />
        <Intro />
        <Expertise />
        <VirtualCfo />
        <Industries />
        <WhyMaars />
        <Team />
        <Testimonials />
        <Contact />
        <Location />
      </main>
      <Footer />
      <FloatingContact />
      <ScrollAnimations />
    </SmoothScroll>
  );
}
