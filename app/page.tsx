import { AboutSection } from "@/components/public/home/about-section";
import { Coverage } from "@/components/public/home/coverage";
import { CTASection } from "@/components/public/home/cta-section";
import { FAQ } from "@/components/public/home/faq";
import { Footer } from "@/components/public/home/footer";
import { Hero } from "@/components/public/home/hero";
import { HowItWorks } from "@/components/public/home/how-it-works";
import { Navbar } from "@/components/public/home/navbar";
import { Services } from "@/components/public/home/services";
import { Stats } from "@/components/public/home/stats";
import { Testimonials } from "@/components/public/home/testimonials";
import { TrustStrip } from "@/components/public/home/trust-strip";
import { WhyChooseUs } from "@/components/public/home/why-choose-us";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <TrustStrip />
      <AboutSection />
      <HowItWorks />
      <Services />
      <WhyChooseUs />
      <Stats />
      <Testimonials />
      <Coverage />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
}
