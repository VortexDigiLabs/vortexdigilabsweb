import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Compass, Terminal, ShieldCheck, Box } from 'lucide-react';
import Hero3DCanvas from './3d/Hero3DCanvas';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 bg-[#07080b]">
      {/* Precision Industrial Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#00e5ff 1px, transparent 1px), linear-gradient(90deg, #00e5ff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Ambient Lighting Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan/10 blur-[130px] rounded-full pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Mission Architectural Copy (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-mono tracking-wider mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan animate-pulse shadow-[0_0_8px_#00e5ff]" />
              <span className="uppercase font-semibold tracking-widest text-[11px]">Solutions Lab • Active Engineering</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-[1.08] mb-6 font-heading">
              Agentic AI Systems,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-sky-300 to-blue-500">
                Interactive 3D,
              </span>{' '}
              and Autonomous Workflow Engineering.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg md:text-xl text-silver/80 leading-relaxed font-sans font-light max-w-2xl mb-8">
              We engineer autonomous agentic pipelines, interactive 3D WebXR simulators, and modernised technical training environments for industrial and enterprise operations.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              {/* Primary CTA */}
              <button
                onClick={() => scrollToSection('contact')}
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl bg-cyan text-black font-mono font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-white hover:shadow-[0_0_25px_rgba(0,229,255,0.45)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Book Architecture Discovery</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={() => scrollToSection('pilots')}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/5 border border-white/15 text-silver hover:text-cyan hover:border-cyan/40 hover:bg-cyan/5 font-mono text-sm uppercase tracking-wider transition-all duration-300 backdrop-blur-sm cursor-pointer"
              >
                <Compass className="w-4 h-4 mr-2 text-cyan" />
                <span>Explore Interactive Pilots</span>
              </button>
            </div>

            {/* Engineering Metrics / Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 w-full max-w-xl font-mono text-xs text-silver/70">
              <div>
                <div className="text-white font-bold text-lg text-cyan font-mono">WebXR & 3D</div>
                <div className="text-[11px] text-silver/50 tracking-tight">Zero-Install Runtime</div>
              </div>
              <div>
                <div className="text-white font-bold text-lg text-amber-400 font-mono">Multi-Model</div>
                <div className="text-[11px] text-silver/50 tracking-tight">Agentic Orchestration</div>
              </div>
              <div>
                <div className="text-white font-bold text-lg text-emerald-400 font-mono">Industrial</div>
                <div className="text-[11px] text-silver/50 tracking-tight">Curriculum Systems</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Viewport (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="lg:col-span-5 w-full flex justify-center"
          >
            <div className="relative w-full aspect-square max-w-[500px] lg:max-w-none lg:h-[540px] rounded-2xl bg-gradient-to-b from-[#0f121a] to-[#080a0f] border border-cyan/25 shadow-[0_0_40px_rgba(0,229,255,0.12)] overflow-hidden group">
              
              {/* Corner Architectural Brackets */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan/70 z-20 pointer-events-none" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-cyan/70 z-20 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-cyan/70 z-20 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-cyan/70 z-20 pointer-events-none" />

              {/* 3D WebGL Canvas */}
              <Hero3DCanvas className="w-full h-full" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
