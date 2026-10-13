/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CoreCapabilities from './components/CoreCapabilities';
import EnterpriseCaseStudies from './components/EnterpriseCaseStudies';
import ArchitectureDiscovery from './components/ArchitectureDiscovery';
import Footer from './components/Footer';
import VaultPage from './pages/VaultPage';
import ContactPage from './pages/ContactPage';
import AssetsPage from './pages/AssetsPage';
import DemoPage from './pages/demo';

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        // Small delay to ensure all canvas mounts are established
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-[#07080b] text-silver selection:bg-cyan/30 selection:text-white">
      <Navbar />
      <main>
        {/* 1. Hero Section with 3D Canvas, Copy, and CTAs */}
        <Hero />

        {/* 2. Core Capabilities: 3 Distinct Pillars */}
        <CoreCapabilities />

        {/* 3. Enterprise Case Studies / Proof of Capability (#pilots) */}
        <EnterpriseCaseStudies />

        {/* 4. Architecture Discovery & Engagement Framework (#contact) */}
        <ArchitectureDiscovery />
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
        <Route path="/assets" element={<AssetsPage />} />
      </Routes>
    </Router>
  );
}
