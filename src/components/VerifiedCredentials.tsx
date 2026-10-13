import { ShieldCheck, Award, Cpu, CheckCircle } from 'lucide-react';

export default function VerifiedCredentials() {
  const credentials = [
    {
      role: 'Google Certified AI Educator',
      authority: 'VERIFIED CURRICULUM AUTHORITY',
      description: 'Enterprise upskilling, prompt engineering, and non-technical workforce AI enablement.',
      telemetry: 'CREDENTIAL // VERIFIED :: 2026',
      icon: Award,
      accent: 'blue',
    },
    {
      role: 'Google Certified Search & Performance',
      authority: 'DATA-DRIVEN SYSTEMS ARCHITECTURE',
      description: 'Measured performance engineering, algorithmic indexing, and automated acquisition campaigns.',
      telemetry: 'CREDENTIAL // VERIFIED :: ACTIVE',
      icon: ShieldCheck,
      accent: 'crimson',
    },
    {
      role: 'Google Cloud & AI Studio Architecture',
      authority: 'GEMINI ECOSYSTEM DEPLOYMENT',
      description: 'Production context engineering, structured JSON schemas, Gemini 2.5 / Flash, and NotebookLM workflows.',
      telemetry: 'CREDENTIAL // VERIFIED :: PRODUCTION',
      icon: Cpu,
      accent: 'blue',
    },
  ];

  return (
    <section id="credentials" className="relative z-10 py-10 px-4 sm:px-6 lg:px-8 border-y border-white/[0.08] bg-[#090A0F]/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        
        {/* Ribbon Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/[0.06] gap-3">
          <div className="flex items-center gap-2.5 font-mono text-xs text-slate-400">
            <span className="ping-crimson animate-pulse" />
            <span className="tracking-widest uppercase text-white font-bold">
              VERIFIED CREDENTIALS // ARCHITECTURAL TELEMETRY
            </span>
          </div>
          <div className="font-mono text-[11px] text-slate-400">
            VERIFICATION HARNESS: GOOGLE ECOSYSTEM & INDUSTRIAL STANDARDS
          </div>
        </div>

        {/* 3 Telemetry Credential Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {credentials.map((cred) => {
            const Icon = cred.icon;
            const isCrimson = cred.accent === 'crimson';

            return (
              <div 
                key={cred.role}
                className="obsidian-glass-panel p-6 rounded-2xl flex flex-col justify-between group hover:border-white/20 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl bg-white/[0.04] border border-white/10 ${
                      isCrimson ? 'text-[#FF2E2E]' : 'text-[#00B6FF]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1.5 font-semibold">
                      <CheckCircle className="w-3 h-3 text-emerald-400" />
                      <span>AUTHENTICATED</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight font-heading mb-1">
                    {cred.role}
                  </h3>
                  
                  <div className={`font-mono text-[10px] tracking-wider uppercase font-semibold mb-3 ${
                    isCrimson ? 'text-[#FF2E2E]' : 'text-[#00B6FF]'
                  }`}>
                    {cred.authority}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans mb-5">
                    {cred.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] font-mono text-[10px] text-slate-400 flex items-center justify-between">
                  <span>{cred.telemetry}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${isCrimson ? 'bg-[#FF2E2E]' : 'bg-[#00B6FF]'}`} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
