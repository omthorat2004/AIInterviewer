import { Header } from "../components/LandingPage/Header";
import { Hero } from "../components/LandingPage/Hero";
import { Problem } from "../components/LandingPage/Problem";
import { Solution } from "../components/LandingPage/Solution";
import { Features } from "../components/LandingPage/Features";
import { HowItWorks } from "../components/LandingPage/HowItWorks";
import { Testimonials } from "../components/LandingPage/Testimonials";
import { Pricing } from "../components/LandingPage/Pricing";
import { FAQ } from "../components/LandingPage/FAQ";
import { FinalCTA } from "../components/LandingPage/FinalCTA";
import { Footer } from "../components/LandingPage/Footer";

function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <section id="features">
          <Features />
        </section>
        <section id="how-it-works">
          <HowItWorks />
        </section>
        <Testimonials />
        <section id="pricing">
          <Pricing />
        </section>
        <section id="faq">
          <FAQ />
        </section>
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;