import React from 'react';
import { Hexagon, Github, Facebook, Cpu, FileText, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100/80 border-t border-slate-200/90 relative text-slate-800 overflow-hidden">
      
      {/* Delicate Ambient Glow on Bottom Edges */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[300px] bg-[#00B6FF]/8 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[250px] bg-[#FF1E43]/6 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-200">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/vortex-logo.png"
                alt="Vortex Digi Labs"
                className="h-10 w-auto object-contain drop-shadow-sm"
              />
              <div className="flex flex-col">
                <span className="font-heading text-base font-black tracking-tight text-slate-900 uppercase">
                  VORTEX DIGI LABS
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 font-bold">
                  Luminous Spatial Lab
                </span>
              </div>
            </div>
            <p className="text-slate-600 text-sm font-normal leading-relaxed max-w-sm">
              Elite Agentic AI Engineering and Interactive 3D Studio. We engineer autonomous agentic pipelines, WebXR simulators, and modernised technical training environments for industrial operations.
            </p>
            <div className="flex items-center gap-2 font-mono text-xs text-slate-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-[#00B6FF]" />
              <span>ISO / OSHA Aligned Industrial Practices • Global Deployment</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="uppercase text-slate-900 font-bold tracking-widest block mb-4">
              Core Architecture
            </span>
            <ul className="space-y-2.5">
              <li>
                <a href="/#solutions" className="text-slate-600 hover:text-[#00B6FF] transition-colors font-medium">
                  Pillar 1: Interactive 3D & Digital Twins
                </a>
              </li>
              <li>
                <a href="/#solutions" className="text-slate-600 hover:text-[#00B6FF] transition-colors font-medium">
                  Pillar 2: Autonomous Agentic Workflows
                </a>
              </li>
              <li>
                <a href="/#solutions" className="text-slate-600 hover:text-[#00B6FF] transition-colors font-medium">
                  Pillar 3: Enterprise AI Enablement
                </a>
              </li>
              <li>
                <a href="/#pilots" className="text-slate-600 hover:text-[#FF1E43] transition-colors font-medium">
                  SAGMA Curriculum Modernisation
                </a>
              </li>
              <li>
                <a href="/#pilots" className="text-slate-600 hover:text-[#FF1E43] transition-colors font-medium">
                  Edge Order Orchestration
                </a>
              </li>
            </ul>
          </div>

          {/* AI Machine Discovery & Compliance (4 cols) */}
          <div className="md:col-span-4 space-y-4 font-mono text-xs">
            <span className="uppercase text-slate-900 font-bold tracking-widest block">
              Machine Readability & Discovery
            </span>
            <p className="text-slate-600 text-xs font-normal leading-relaxed">
              Automated AI crawlers, LLM agents, and discovery engines can ingest our structured plain-text specifications:
            </p>
            <div className="space-y-2">
              <a
                href="/llms.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 hover:border-[#00B6FF] hover:text-[#00B6FF] transition-all shadow-sm font-semibold"
              >
                <FileText className="w-3.5 h-3.5 text-[#00B6FF]" />
                <span>View public/llms.txt Documentation</span>
                <ArrowUpRight className="w-3 h-3 ml-1" />
              </a>
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-slate-500 font-semibold block">Founder & Lead Systems Architect:</span>
              <span className="text-slate-900 text-xs font-bold">Terence Dean Allen</span>
            </div>
          </div>

        </div>

        {/* Bottom Socials & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-6">
            <a href="https://github.com/VortexDigiLabs" target="_blank" rel="noopener noreferrer" title="GitHub" className="text-slate-600 hover:text-[#00B6FF] transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.facebook.com/VortexDigiLabs" target="_blank" rel="noopener noreferrer" title="Facebook" className="text-slate-600 hover:text-[#00B6FF] transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://manus.im/invitation/XZDS0OAWATATW" target="_blank" rel="noopener noreferrer" title="Manus AI" className="text-slate-600 hover:text-[#FF1E43] transition-colors">
              <Cpu className="w-4 h-4" />
            </a>
          </div>

          <p>&copy; {new Date().getFullYear()} Vortex Digi Labs. All rights reserved. Engineering Base: South Africa.</p>

          <button
            onClick={scrollToTop}
            className="hover:text-[#00B6FF] transition-colors uppercase tracking-wider text-[11px] font-bold"
          >
            [ Back to Top ↑ ]
          </button>
        </div>
      </div>
    </footer>
  );
}
