import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { StatsSection } from "@/components/site/Stats";
import { Socials } from "@/components/site/Socials";
import { Audience } from "@/components/site/Audience";
import { Portfolio } from "@/components/site/Portfolio";
import { Brands } from "@/components/site/Brands";
import { Services } from "@/components/site/Services";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export default function MediaKitPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-primary selection:text-primary-foreground relative">
      <Header />

      <main className="w-full py-8 space-y-24 md:space-y-32 overflow-x-hidden">
        <Hero />
        <About />
        <StatsSection />
        <Socials />
        <Audience />
        <Portfolio />
        <Brands />
        <Services />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
