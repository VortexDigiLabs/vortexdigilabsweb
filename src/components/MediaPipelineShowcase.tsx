import { FileCode, Mic, Film, Share2, Sparkles, CheckCircle2 } from 'lucide-react';

export default function MediaPipelineShowcase() {
  const steps = [
    {
      step: '01',
      title: 'Script & Strategy',
      subtitle: 'Structured Prompt Engineering',
      description: 'Ingesting technical manuals, customer FAQs, or operational specs to generate deterministic structured screenplays with precise timing metadata.',
      icon: FileCode,
      metrics: 'Gemini 2.5 Multi-Modal Reasoning',
      accent: 'blue',
    },
    {
      step: '02',
      title: 'Voice & Tone',
      subtitle: 'Neural Voice Synthesis',
      description: 'State-of-the-art acoustic voice models delivering studio-quality, accent-accurate narration with sub-phoneme pacing and audio mastering.',
      icon: Mic,
      metrics: '48kHz Lossless Audio Masters',
      accent: 'crimson',
    },
    {
      step: '03',
      title: 'Visual Generation',
      subtitle: 'Code-Rendered Motion Graphics',
      description: 'Automated assembly of dynamic visuals, Canva enterprise brand kits, 3D WebGL camera orbits, and procedural motion sequences without stock footage.',
      icon: Film,
      metrics: '100% Procedural Node Rendering',
      accent: 'blue',
    },
    {
      step: '04',
      title: 'Multi-Channel Dispatch',
      subtitle: 'Automated Multi-Format Export',
      description: 'Instant multi-aspect ratio rendering (9:16 vertical reels, 16:9 training masterclasses, 1:1 embeds) deployed directly to enterprise LMS and portals.',
      icon: Share2,
      metrics: 'Sub-minute Render Pipeline',
      accent: 'crimson',
    },
  ];

  return (
    <section className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 font-mono text-[11px] mb-4">
            <span className="ping-blue" />
            <span>SCRIPT-TO-SCREEN AUTOMATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-heading">
            PROPRIETARY MEDIA PIPELINE SHOWCASE
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            How Vortex Digi Labs eliminates manual content bottlenecks with automated, code-rendered production engines.
          </p>
        </div>

        {/* 4 Pipeline Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            const isCrimson = item.accent === 'crimson';

            return (
              <div 
                key={item.step}
                className={`obsidian-glass-panel p-6 rounded-3xl flex flex-col justify-between group transition-all duration-300 ${
                  isCrimson ? 'hover:border-[#FF2E2E]/40' : 'hover:border-[#00B6FF]/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-black text-white/30 group-hover:text-white transition-colors">
                      {item.step}
                    </span>
                    <div className={`p-2.5 rounded-xl bg-white/[0.04] border border-white/10 ${
                      isCrimson ? 'text-[#FF2E2E]' : 'text-[#00B6FF]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white font-heading tracking-tight mb-1">
                    {item.title}
                  </h3>
                  
                  <div className={`font-mono text-[10px] tracking-wider uppercase font-semibold mb-3 ${
                    isCrimson ? 'text-[#FF2E2E]' : 'text-[#00B6FF]'
                  }`}>
                    {item.subtitle}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] font-mono text-[10px] text-slate-400 flex items-center justify-between">
                  <span>{item.metrics}</span>
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
