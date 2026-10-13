import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import ArchitectureDiscovery from '../components/ArchitectureDiscovery';
import Footer from '../components/Footer';
import LuminousBackground from '../components/effects/LuminousBackground';
import CursorVortex from '../components/effects/CursorVortex';

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen text-slate-900 selection:bg-[#00B6FF]/25 selection:text-[#0F172A]">
      <LuminousBackground />
      <CursorVortex />
      <Navbar />
      <main className="pt-24 relative z-10">
        <ArchitectureDiscovery />
      </main>
      <Footer />
    </div>
  );
}
