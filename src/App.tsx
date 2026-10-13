/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VerifiedCredentials from './components/VerifiedCredentials';
import CoreCapabilities from './components/CoreCapabilities';
import EnterpriseCaseStudies from './components/EnterpriseCaseStudies';
import MediaPipelineShowcase from './components/MediaPipelineShowcase';
import ArchitectureDiscovery from './components/ArchitectureDiscovery';
import Footer from './components/Footer';
import CosmicBackground from './components/effects/CosmicBackground';
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
    <div className="relative min-h-screen text-slate-200 selection:bg-[#FF2E2E]/30 selection:text-white bg-[#090A0F]">
      {/* 1. Obsidian Cosmic Background with Stellar Dust & Grid */}
      <CosmicBackground />

      {/* 2. Interactive Cursor Particle Vortex (1000ms Lifetime) */}
      <CursorVortex />

      {/* 3. Centered Floating Glass Navigation Capsule */}
      <Navbar />

      <main className="relative z-10">
        {/* Hero Section: Split Viewport with Celestial Particle Globe */}
        <Hero />

        {/* Verified Credentials & Engineering Telemetry Strip */}
        <VerifiedCredentials />

        {/* 4 Core Solutions Architecture (Bespoke Glass Cards) */}
        <CoreCapabilities />

        {/* Sector Deployments & Industrial Proof (Anonymised Dossiers) */}
        <EnterpriseCaseStudies />

        {/* Proprietary Media Pipeline Showcase */}
        <MediaPipelineShowcase />

        {/* Discovery Booking Terminal */}
        <ArchitectureDiscovery />
      </main>

      {/* Terminal Obsidian Footer */}
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
