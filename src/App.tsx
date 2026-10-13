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
import LuminousBackground from './components/effects/LuminousBackground';
import CursorVortex from './components/effects/CursorVortex';
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
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="relative min-h-screen text-slate-900 selection:bg-[#00B6FF]/25 selection:text-[#0F172A]">
      {/* 1. Animated Living Spatial Canvas Background */}
      <LuminousBackground />

      {/* 2. Interactive Cursor Particle Vortex (1000ms Lifetime) */}
      <CursorVortex />

      {/* 3. Luminous Translucent Topbar */}
      <Navbar />

      <main className="relative z-10">
        {/* Luminous Hero Section (Spatial Minimalist) */}
        <Hero />

        {/* 3-Pillar Core Capabilities */}
        <CoreCapabilities />

        {/* Enterprise Case Studies (#pilots) */}
        <EnterpriseCaseStudies />

        {/* Architecture Discovery Engagement Framework (#contact) */}
        <ArchitectureDiscovery />
      </main>

      {/* Luminous Footer */}
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
