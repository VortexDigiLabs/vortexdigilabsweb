import { Github, Facebook, Cpu, FileText, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#090A0F] border-t border-white/[0.08] relative text-slate-400 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/[0.06]">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex flex-col">
              <span className="font-heading text-lg font-black tracking-wider text-white uppercase silver-chrome-text">
                VORTEX DIGI LABS
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-1">
                // AGENTIC AI & INTERACTIVE 3D SYSTEMS
              </span>
            </div>
            
            <p className="text-slate-400 text-xs font-mono leading-relaxed max-w-sm">
              Bespoke multi-model agentic pipelines, zero-install WebGL digital twins, rapid application prototyping, and enterprise workforce enablement.
            </p>

            <div className="pt-2 font-mono text-[11px] text-slate-300">
              <span className="text-[#FF2E2E]">OPERATIONAL BASE:</span>{' '}
              <span>RANDBURG, SOUTH AFRICA // SERVING GLOBAL CLIENTS</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-white font-bold uppercase tracking-widest block mb-4">
              CAPABILITY MATRIX
            </span>
            <ul className="space-y-2.5">
              <li>
                <a href="/#capabilities" className="text-slate-400 hover:text-white transition-colors">
                  01 // WebGL Digital Twins
                </a>
              </li>
              <li>
                <a href="/#capabilities" className="text-slate-400 hover:text-white transition-colors">
                  02 // Autonomous Workflows
                </a>
              </li>
              <li>
                <a href="/#capabilities" className="text-slate-400 hover:text-white transition-colors">
                  03 // Rapid App Prototyping
                </a>
              </li>
              <li>
                <a href="/#capabilities" className="text-slate-400 hover:text-white transition-colors">
                  04 // Enterprise AI Enablement
                </a>
              </li>
              <li>
                <a href="/#pilots" className="text-slate-400 hover:text-white transition-colors">
                  Proof // Sector Deployments
                </a>
              </li>
            </ul>
          </div>

          {/* Machine Readability & Credentials (4 cols) */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <span className="text-white font-bold uppercase tracking-widest block mb-2">
              MACHINE DISCOVERY & AGENT INDEX
            </span>
            <p className="text-slate-400 text-xs leading-relaxed">
              Automated AI crawlers, LLM agents, and discovery engines can ingest our structured plain-text specifications:
            </p>
            <div>
              <a
                href="/llms.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-slate-200 hover:border-[#FF2E2E] hover:text-white transition-all text-xs font-mono"
              >
                <FileText className="w-3.5 h-3.5 text-[#FF2E2E]" />
                <span>INDEX /llms.txt DOCUMENTATION</span>
              </a>
            </div>
            <div className="pt-2 text-[10px] text-slate-400">
              LEAD ARCHITECT: TERENCE DEAN ALLEN // GOOGLE CERTIFIED
            </div>
          </div>

        </div>

        {/* Bottom Socials & Micro-Text */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-5">
            <a href="https://github.com/VortexDigiLabs" target="_blank" rel="noopener noreferrer" title="GitHub" className="text-slate-400 hover:text-white transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.facebook.com/VortexDigiLabs" target="_blank" rel="noopener noreferrer" title="Facebook" className="text-slate-400 hover:text-[#00B6FF] transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://manus.im/invitation/XZDS0OAWATATW" target="_blank" rel="noopener noreferrer" title="Manus AI" className="text-slate-400 hover:text-[#FF2E2E] transition-colors">
              <Cpu className="w-4 h-4" />
            </a>
          </div>

          <p>&copy; {new Date().getFullYear()} VORTEX DIGI LABS. ALL RIGHTS RESERVED. OPERATIONAL BASE: RANDBURG, SOUTH AFRICA.</p>

          <button
            onClick={scrollToTop}
            className="hover:text-white transition-colors uppercase tracking-wider text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
