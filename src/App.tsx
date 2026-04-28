/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandOverview from './components/BrandOverview';
import HexGallery from './components/HexGallery';
import FeatureCarousel from './components/ui/feature-carousel';
import NexusAIWizard from './components/NexusAIWizard';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';
import VaultPage from './pages/VaultPage';
import ContactPage from './pages/ContactPage';
import GallerySection from './components/GallerySection';
import DemoPage from './pages/demo';

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-charcoal text-silver selection:bg-cyan/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <BrandOverview />
        <GallerySection />
        <FeatureCarousel />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vault" element={<VaultPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/demo" element={<DemoPage />} />
      </Routes>
    </Router>
  );
}
