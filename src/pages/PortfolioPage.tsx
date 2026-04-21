import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Portfolio components
import PortfolioHero from '../portfolio-components/Hero';
import PortfolioMission from '../portfolio-components/Mission';
import { HeroSection as PortfolioHeroSection } from '../portfolio-components/ui/hero-section-shadcnui';
import PortfolioVortexForm from '../portfolio-components/VortexForm';
import PortfolioNexusAI from '../portfolio-components/NexusAI';

export default function PortfolioPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-charcoal text-silver selection:bg-cyan/30 selection:text-white">
      <Navbar />
      <main>
        <PortfolioHero />
        <PortfolioMission />
        <PortfolioHeroSection />
        <PortfolioVortexForm />
      </main>
      <Footer />
      <PortfolioNexusAI />
    </div>
  );
}
