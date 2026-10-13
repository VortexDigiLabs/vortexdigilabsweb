import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import CelestialGlobeCanvas from './3d/CelestialGlobeCanvas';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      
      {/* Ambient Red and Blue Space Blooms (matching image_9.png) */}
      <div className="absolute top-1/4 left-1/12 w-[500px] h-[500px] bg-[#FF2E2E]/8 blur-[160px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/12 w-[550px] h-[550px] bg-[#00B6FF]/8 blur-[170px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Typographic Content (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* System Ticker Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 font-mono text-[11px] mb-6 backdrop-blur-md">
              <span className="ping-green" />
              <span className="tracking-wider uppercase text-white font-semibold">
                SYSTEM STATUS // ONLINE
              </span>
              <span className="text-white/20">::</span>
              <span className="text-[#FF2E2E] tracking-wider font-semibold">
                REGION: AFRICA / GLOBAL
              </span>
            </div>

            {/* Main Headline (Directly matching image_9.png) */}
            <h1 className="text-3xl sm:text-5xl md:text-[54px] font-black tracking-tight text-white uppercase leading-[1.08] mb-6 font-heading">
              AGENTIC AI SYSTEMS,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-600 drop-shadow-[0_0_20px_rgba(255,46,46,0.35)]">
                INTERACTIVE 3D
              </span>
              , AND AUTONOMOUS WORKFLOW ENGINEERING
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-2xl mb-8">
              Bespoke AI orchestrations, browser-native digital twins, and enterprise enablement for forward-leaning teams. High-end glassmorphic interfaces, cybernetic blue and rich metallic red accents.
            </p>

            {/* Action Suite */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={() => scrollToSection('discovery')}
                className="btn-glass-cta px-8 py-4 rounded-full font-mono font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center cursor-pointer"
              >
                BOOK DISCOVERY
              </button>

              <button
                onClick={() => scrollToSection('capabilities')}
                className="btn-glass-secondary px-7 py-4 rounded-full font-mono text-xs uppercase tracking-wider font-semibold inline-flex items-center justify-center cursor-pointer group"
              >
                <span>EXPLORE CAPABILITIES</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-200 group-hover:translate-x-1 text-[#FF2E2E]" />
              </button>
            </div>

            {/* Monospace Telemetry Strip */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10 w-full max-w-xl font-mono text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="ping-blue" />
                <span>LATENCY: 12ms</span>
              </div>
              <span className="text-white/20">//</span>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-300">CORE: GEMINI EXP</span>
              </div>
              <span className="text-white/20">//</span>
              <div className="flex items-center gap-1.5">
                <span className="ping-crimson" />
                <span className="text-white">STREAM: ACTIVE</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Celestial Particle Globe (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full flex justify-center"
          >
            <div className="relative w-full aspect-square max-w-[500px] lg:max-w-none lg:h-[540px] rounded-3xl overflow-hidden group">
              <CelestialGlobeCanvas className="w-full h-full" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
