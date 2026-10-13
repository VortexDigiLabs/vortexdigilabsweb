import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VideoSection from '../components/VideoSection';
import LuminousBackground from '../components/effects/LuminousBackground';
import CursorVortex from '../components/effects/CursorVortex';

export default function VaultPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="relative min-h-screen text-slate-900 selection:bg-[#00B6FF]/25 selection:text-[#0F172A] flex flex-col">
      <LuminousBackground />
      <CursorVortex />
      <Navbar />
      <main className="flex-grow pt-24 relative z-10">
        <VideoSection />
      </main>
      <Footer />
    </div>
  );
}
