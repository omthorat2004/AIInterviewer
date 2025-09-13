// import  Header  from './components/landingPage/Header';
import Header from "../components/landingPage/Header"
import  Hero  from '../components/landingPage/Hero';
import  {Problem}  from '../components/landingPage/Problem';
import  {Solution}  from '../components/landingPage/Solution';
import  Features  from '../components/landingPage/Features';
import  HowItWorks  from '../components/landingPage/HowitWorks';
import  {Testimonials}  from '../components/landingPage/Testimonials';
import { Pricing }  from '../components/landingPage/Pricing';
import  FAQ  from '../components/landingPage/FAQ';
import  FinalCTA  from '../components/landingPage/FinalCTA';
import  Footer  from '../components/landingPage/Footer';

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