import { motion } from 'framer-motion';
import Hero3DCanvas from './3d/Hero3DCanvas';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden">
      
      {/* Subtle Spatial Light Emittance */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#00B6FF]/8 via-transparent to-[#FF1E43]/6 blur-[150px] rounded-full pointer-events-none -z-10" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Authoritative Editorial Statement */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Studio Discipline Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100/80 border border-slate-200/80 text-slate-700 text-xs font-medium mb-6">
              <span className="led-blue" />
              <span>Production-Grade AI & Spatial Computing</span>
            </div>

            {/* Main Headline: Bold, Architectural, Zero AI Gimmicks */}
            <h1 className="text-4xl sm:text-5xl md:text-[58px] font-extrabold tracking-hero text-slate-900 leading-[1.08] mb-6 font-heading">
              Engineering autonomous agentic systems and interactive 3D WebXR simulators.
            </h1>

            {/* Sub-headline: Clear, direct, professional */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-sans max-w-2xl mb-9">
              We deploy custom multi-model agent pipelines, zero-install 3D equipment pilots, and modernized technical training environments for industrial and enterprise operations.
            </p>

            {/* Studio Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-12">
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-studio-primary px-7 py-3.5 rounded-lg text-sm font-semibold tracking-wide inline-flex items-center justify-center cursor-pointer"
              >
                Book Architecture Discovery
              </button>

              <button
                onClick={() => scrollToSection('solutions')}
                className="btn-studio-secondary px-6 py-3.5 rounded-lg text-sm font-semibold tracking-wide inline-flex items-center justify-center cursor-pointer"
              >
                Inspect Disciplines
              </button>
            </div>

            {/* Studio Engineering Architectural Specs — Clean Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 hairline-t w-full">
              <div>
                <div className="text-xs font-semibold text-slate-900 tracking-tight">Zero-Install Runtime</div>
                <div className="text-xs text-slate-500 mt-1 leading-normal">
                  WebGL & WebXR interactive modules optimized under 1.4 MB
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-900 tracking-tight">Multi-Model Agents</div>
                <div className="text-xs text-slate-500 mt-1 leading-normal">
                  Self-healing event workflows connecting web to backends
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-900 tracking-tight">Industrial Standards</div>
                <div className="text-xs text-slate-500 mt-1 leading-normal">
                  OSHA & ISO aligned curriculum with WCAG alt-text compliance
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Studio 3D Workbench */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full flex justify-center"
          >
            <div className="relative w-full aspect-square max-w-[480px] lg:max-w-none lg:h-[530px] rounded-2xl studio-panel overflow-hidden">
              {/* Header Telemetry Bar */}
              <div className="absolute top-0 left-0 right-0 z-20 px-4 py-2.5 hairline-b bg-white/80 backdrop-blur-md flex items-center justify-between text-[11px] font-mono text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="led-blue" />
                  <span className="font-semibold text-slate-800">SPATIAL SANDBOX</span>
                </div>
                <span className="text-slate-600">WEBXR // THREE.JS</span>
              </div>

              {/* 3D WebGL Canvas */}
              <Hero3DCanvas className="w-full h-full pt-8" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
