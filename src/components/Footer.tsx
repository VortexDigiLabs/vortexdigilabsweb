import { Github, Facebook, Cpu, FileText, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-50 hairline-t relative text-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 hairline-b">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/vortex-logo.png"
                alt="Vortex Digi Labs"
                className="h-10 w-auto object-contain"
              />
              <div className="flex flex-col border-l border-slate-200 pl-3">
                <span className="font-heading text-sm font-bold tracking-tight text-slate-900 leading-none">
                  Vortex Digi Labs
                </span>
                <span className="text-[11px] text-slate-600 font-medium mt-1 leading-none">
                  Agentic AI & Interactive 3D Studio
                </span>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              We deploy custom multi-model agent pipelines, zero-install 3D equipment pilots, and modernized technical training environments for industrial operations.
            </p>
            <div className="text-xs text-slate-500 pt-1">
              <span>Lead Systems Architect: </span>
              <span className="text-slate-800 font-semibold">Terence Dean Allen</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-semibold text-slate-900 block mb-3">
              Core Disciplines
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="/#solutions" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Interactive 3D & Digital Twins
                </a>
              </li>
              <li>
                <a href="/#solutions" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Autonomous Agentic Workflows
                </a>
              </li>
              <li>
                <a href="/#solutions" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Enterprise AI Enablement & Training
                </a>
              </li>
              <li>
                <a href="/#pilots" className="text-slate-600 hover:text-slate-900 transition-colors">
                  SAGMA Industrial 3D Curriculum
                </a>
              </li>
              <li>
                <a href="/#pilots" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Edge Order Orchestration
                </a>
              </li>
            </ul>
          </div>

          {/* Machine Discovery & Compliance (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-semibold text-slate-900 block mb-2">
              Machine Readability & Discovery
            </span>
            <p className="text-slate-600 text-xs leading-relaxed">
              Automated AI crawlers, LLM agents, and discovery engines can ingest our structured plain-text specifications:
            </p>
            <div>
              <a
                href="/llms.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-800 hover:border-slate-400 hover:text-slate-900 transition-all text-xs font-medium shadow-sm"
              >
                <FileText className="w-3.5 h-3.5 text-slate-600" />
                <span>View /llms.txt documentation</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Socials & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-5">
            <a href="https://github.com/VortexDigiLabs" target="_blank" rel="noopener noreferrer" title="GitHub" className="text-slate-500 hover:text-slate-800 transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.facebook.com/VortexDigiLabs" target="_blank" rel="noopener noreferrer" title="Facebook" className="text-slate-500 hover:text-slate-800 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://manus.im/invitation/XZDS0OAWATATW" target="_blank" rel="noopener noreferrer" title="Manus AI" className="text-slate-500 hover:text-slate-800 transition-colors">
              <Cpu className="w-4 h-4" />
            </a>
          </div>

          <p>&copy; {new Date().getFullYear()} Vortex Digi Labs. All rights reserved. Engineering Base: South Africa.</p>

          <button
            onClick={scrollToTop}
            className="hover:text-slate-900 transition-colors text-xs font-medium inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
