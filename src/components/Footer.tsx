import React from 'react';
import { Hexagon, Github, Facebook, Video, Cpu, Mic, FileText, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';
import { Sparkles } from './ui/sparkles-new';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050608] border-t border-white/10 overflow-hidden relative text-white">
      {/* Decorative Cyber Lighting Gradient */}
      <div className="relative -mt-24 h-64 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] pointer-events-none">
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#00E5FF,transparent_75%)] before:opacity-15" />
        <Sparkles
          density={800}
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
          color="#00e5ff"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <Hexagon className="text-cyan w-6 h-6" />
              <span className="font-heading text-xl font-black tracking-tight text-white uppercase italic">
                Vortex<span className="text-cyan">Digi</span>Labs
              </span>
            </div>
            <p className="text-silver/70 text-sm font-light leading-relaxed max-w-sm">
              Elite Agentic AI Engineering and Interactive 3D Studio. We engineer autonomous agentic pipelines, WebXR simulators, and modernised technical training environments for industrial operations.
            </p>
            <div className="flex items-center gap-2 font-mono text-xs text-silver/50 pt-2">
              <ShieldCheck className="w-4 h-4 text-cyan" />
              <span>ISO / OSHA Aligned Industrial Practices • Global Deployment</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="uppercase text-silver/40 tracking-widest block mb-4">
              Core Architecture
            </span>
            <ul className="space-y-2.5">
              <li>
                <a href="/#solutions" className="text-silver/70 hover:text-cyan transition-colors">
                  Pillar 1: Interactive 3D & Digital Twins
                </a>
              </li>
              <li>
                <a href="/#solutions" className="text-silver/70 hover:text-cyan transition-colors">
                  Pillar 2: Autonomous Agentic Workflows
                </a>
              </li>
              <li>
                <a href="/#solutions" className="text-silver/70 hover:text-cyan transition-colors">
                  Pillar 3: Enterprise AI Enablement
                </a>
              </li>
              <li>
                <a href="/#pilots" className="text-silver/70 hover:text-cyan transition-colors">
                  SAGMA Curriculum Modernisation
                </a>
              </li>
              <li>
                <a href="/#pilots" className="text-silver/70 hover:text-cyan transition-colors">
                  Edge Order Orchestration
                </a>
              </li>
            </ul>
          </div>

          {/* AI Machine Discovery & Compliance (4 cols) */}
          <div className="md:col-span-4 space-y-4 font-mono text-xs">
            <span className="uppercase text-silver/40 tracking-widest block">
              Machine Readability & Discovery
            </span>
            <p className="text-silver/60 text-xs font-light leading-relaxed">
              Automated AI crawlers, LLM agents, and discovery engines can ingest our structured plain-text specifications:
            </p>
            <div className="space-y-2">
              <a
                href="/llms.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan/10 border border-cyan/30 text-cyan hover:bg-cyan hover:text-black transition-all"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View public/llms.txt Documentation</span>
                <ArrowUpRight className="w-3 h-3 ml-1" />
              </a>
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-silver/40 block">Founder & Lead Systems Architect:</span>
              <span className="text-white text-xs font-semibold">Terence Dean Allen</span>
            </div>
          </div>

        </div>

        {/* Bottom Socials & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-silver/50">
          <div className="flex items-center gap-6">
            <a href="https://github.com/VortexDigiLabs" target="_blank" rel="noopener noreferrer" title="GitHub" className="text-silver/60 hover:text-cyan transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.facebook.com/VortexDigiLabs" target="_blank" rel="noopener noreferrer" title="Facebook" className="text-silver/60 hover:text-cyan transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://manus.im/invitation/XZDS0OAWATATW" target="_blank" rel="noopener noreferrer" title="Manus AI" className="text-silver/60 hover:text-cyan transition-colors">
              <Cpu className="w-4 h-4" />
            </a>
          </div>

          <p>&copy; {new Date().getFullYear()} Vortex Digi Labs. All rights reserved. Engineering Base: South Africa.</p>

          <button
            onClick={scrollToTop}
            className="hover:text-cyan transition-colors uppercase tracking-wider text-[11px]"
          >
            [ Back to Top ↑ ]
          </button>
        </div>
      </div>
    </footer>
  );
}
