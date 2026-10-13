import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, ShieldCheck, Cpu, Box, Sparkles } from 'lucide-react';
import Hero3DCanvas from './3d/Hero3DCanvas';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16">
      
      {/* Soft Luminous Edge Ambient Backdrops */}
      <div className="absolute -top-20 -left-20 w-[550px] h-[550px] bg-[#00B6FF]/10 blur-[130px] rounded-full pointer-events-none -z-0" />
      <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-[#FF1E43]/8 blur-[140px] rounded-full pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Typographic Content (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* System Status Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-200/90 text-slate-800 text-xs font-mono tracking-wider mb-6 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#00B6FF] animate-pulse shadow-[0_0_8px_#00B6FF]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-800">
                Solutions Lab // Active Engineering
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[10px] font-bold uppercase text-[#FF1E43]">
                Luminous Spatial
              </span>
            </div>

            {/* Primary H1 with High-Contrast Deep Slate and Electric Blue -> Crimson Gradient */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 uppercase leading-[1.08] mb-6 font-heading">
              Agentic AI Systems,{' '}
              <span className="brand-gradient-text-alt">
                Interactive 3D,
              </span>{' '}
              and Autonomous Workflow Engineering.
            </h1>

            {/* Sub-headline: High-Contrast Slate 700 text */}
            <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed font-sans font-normal max-w-2xl mb-8">
              We engineer autonomous agentic pipelines, interactive 3D WebXR simulators, and modernised technical training environments for industrial and enterprise operations.
            </p>

            {/* Action Callout Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              {/* Primary CTA: Intense Blue-Crimson Gradient Pill */}
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-electric-gradient group px-8 py-4 rounded-full font-mono font-bold text-sm uppercase tracking-wider inline-flex items-center justify-center cursor-pointer"
              >
                <span>Book Architecture Discovery</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Secondary CTA: Silver Metallic / Light Glass Border */}
              <button
                onClick={() => scrollToSection('pilots')}
                className="btn-metallic-chrome px-7 py-4 rounded-full font-mono text-sm uppercase tracking-wider font-semibold inline-flex items-center justify-center cursor-pointer"
              >
                <Compass className="w-4 h-4 mr-2 text-[#00B6FF]" />
                <span>Explore Interactive Pilots</span>
              </button>
            </div>

            {/* Engineering Metrics / Badges (Frosted Glass with Chrome Border) */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/90 w-full max-w-xl font-mono text-xs">
              <div className="p-3 rounded-xl bg-white/70 border border-slate-200/80 shadow-sm backdrop-blur-sm">
                <div className="text-slate-900 font-bold text-base font-heading tracking-wide text-[#00B6FF]">
                  WebXR & 3D
                </div>
                <div className="text-[11px] text-slate-500 font-medium">Zero-Install Runtime</div>
              </div>
              <div className="p-3 rounded-xl bg-white/70 border border-slate-200/80 shadow-sm backdrop-blur-sm">
                <div className="text-slate-900 font-bold text-base font-heading tracking-wide text-[#FF1E43]">
                  Multi-Model
                </div>
                <div className="text-[11px] text-slate-500 font-medium">Agentic Orchestration</div>
              </div>
              <div className="p-3 rounded-xl bg-white/70 border border-slate-200/80 shadow-sm backdrop-blur-sm">
                <div className="text-slate-900 font-bold text-base font-heading tracking-wide text-slate-800">
                  Industrial
                </div>
                <div className="text-[11px] text-slate-500 font-medium">Curriculum Systems</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Luminous Interactive 3D Viewport (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="lg:col-span-5 w-full flex justify-center"
          >
            <div className="relative w-full aspect-square max-w-[500px] lg:max-w-none lg:h-[540px] rounded-3xl bg-gradient-to-b from-white/90 via-slate-50/80 to-slate-100/90 border border-slate-200/90 shadow-xl shadow-slate-200/60 overflow-hidden backdrop-blur-md group">
              
              {/* Corner Metallic Chrome Brackets */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#00B6FF] z-20 pointer-events-none" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#FF1E43] z-20 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#00B6FF] z-20 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#FF1E43] z-20 pointer-events-none" />

              {/* Modern 3D WebGL Canvas */}
              <Hero3DCanvas className="w-full h-full" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
