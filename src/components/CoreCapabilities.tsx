import React from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  Workflow, 
  GraduationCap, 
  CheckCircle2, 
  ArrowUpRight, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Activity,
  Zap,
  Terminal,
  FileCode2
} from 'lucide-react';

interface PillarCardProps {
  number: string;
  title: string;
  tagline: string;
  focus: string;
  highlights: string[];
  techStack: string[];
  icon: React.ReactNode;
  accentColor: 'cyan' | 'amber' | 'emerald';
  badge: string;
}

const PILLARS: PillarCardProps[] = [
  {
    number: "01",
    title: "Interactive 3D & Digital Twin Pilots",
    tagline: "High-Fidelity Browser Spatial Computing",
    focus: "WebGL/Three.js interactive equipment suites, industrial simulation, and technical curriculum transformation.",
    highlights: [
      "Legacy 2D-to-3D vector overhauls converting static schematics to spatial models",
      "High-fidelity browser runtime rendering optimized under 1.5 MB budgets",
      "Zero-install interactive training modules with WebXR and mobile touch support"
    ],
    techStack: ["Three.js", "WebXR", "GLTF / GLB", "Blender Pipeline", "GLSL Shaders", "Vector CAD"],
    icon: <Box className="w-8 h-8 text-cyan" />,
    accentColor: "cyan",
    badge: "Spatial Simulation Engine"
  },
  {
    number: "02",
    title: "Autonomous Agentic Workflows",
    tagline: "Resilient Multi-Model Orchestration",
    focus: "Multi-model AI orchestration, bespoke task automation, and API integration.",
    highlights: [
      "Self-healing task runners and continuous background verification loops",
      "Cost and latency-aware routing across local and cloud LLMs (Claude, GPT, DeepSeek, Ollama)",
      "Operational data pipelines connecting web frontends to mission-critical business backends"
    ],
    techStack: ["LangChain", "Autonomous Agents", "Event Webhooks", "DeepSeek R1", "Claude 3.7", "PostgreSQL"],
    icon: <Workflow className="w-8 h-8 text-amber-400" />,
    accentColor: "amber",
    badge: "Agentic Task Runners"
  },
  {
    number: "03",
    title: "Enterprise AI Enablement & Training",
    tagline: "Workforce Upskilling & Governance",
    focus: "Practical executive enablement, technical workshops (Atlas syllabus), and workforce upskilling.",
    highlights: [
      "Hands-on operational agent tooling tailored for engineering teams and operators",
      "Rigorous prompt architecture, schema enforcement, and automated eval harnesses",
      "Enterprise compliance standards, data privacy isolation, and security protocols"
    ],
    techStack: ["Atlas Syllabus", "Structured Outputs", "Prompt Engineering", "OSHA / ISO Aligned", "Audit Trails"],
    icon: <GraduationCap className="w-8 h-8 text-emerald-400" />,
    accentColor: "emerald",
    badge: "Atlas Curriculum"
  }
];

export default function CoreCapabilities() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="solutions" 
      className="relative w-full bg-[#0a0c10] text-white py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 overflow-hidden"
      aria-label="Core Capabilities and Strategic Pillars"
    >
      {/* Background Decorative Grid */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#00e5ff 1px, transparent 1px), linear-gradient(90deg, #00e5ff 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-cyan mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan" />
              <span>Core Engineering Pillars</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-heading text-white">
              Architectural <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-blue-400">Capabilities</span>
            </h2>
            <p className="mt-4 text-silver/70 text-base md:text-lg font-light leading-relaxed">
              Replacing fragmented agency services with three dedicated engineering disciplines designed to deploy robust, production-grade autonomous systems and spatial pilots.
            </p>
          </div>

          <div className="font-mono text-xs text-silver/50 hidden md:block text-right">
            <div>FRAMEWORK: SOLUTIONS LAB V2</div>
            <div>RUNTIME: EDGE / BROWSER / CLOUD</div>
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PILLARS.map((pillar, idx) => {
            const isCyan = pillar.accentColor === 'cyan';
            const isAmber = pillar.accentColor === 'amber';

            return (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`relative flex flex-col justify-between rounded-2xl bg-[#0f121a]/90 border transition-all duration-300 p-8 hover:-translate-y-1.5 shadow-xl backdrop-blur-md group ${
                  isCyan
                    ? 'border-cyan/20 hover:border-cyan/50 hover:shadow-[0_12px_35px_rgba(0,229,255,0.12)]'
                    : isAmber
                    ? 'border-amber-500/20 hover:border-amber-500/50 hover:shadow-[0_12px_35px_rgba(245,158,11,0.12)]'
                    : 'border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_12px_35px_rgba(16,185,129,0.12)]'
                }`}
              >
                {/* Pillar Header & Tag */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-black text-silver/20 group-hover:text-silver/40 transition-colors">
                      {pillar.number}
                    </span>
                    <span className={`px-2.5 py-1 rounded text-[11px] font-mono uppercase tracking-wider border ${
                      isCyan
                        ? 'bg-cyan/10 text-cyan border-cyan/30'
                        : isAmber
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    }`}>
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="mb-4">
                    <div className="p-3 w-fit rounded-xl bg-white/5 border border-white/10 mb-4 group-hover:scale-105 transition-transform">
                      {pillar.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-heading uppercase tracking-tight text-white mb-2">
                      {pillar.title}
                    </h3>
                    <p className={`text-xs font-mono tracking-wider uppercase mb-4 ${
                      isCyan ? 'text-cyan' : isAmber ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      {pillar.tagline}
                    </p>
                  </div>

                  {/* Focus Description */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 mb-6 text-sm text-silver/90 leading-relaxed font-sans">
                    <strong className="text-white block font-mono text-[11px] uppercase tracking-wider mb-1 text-silver/60">
                      Primary Focus:
                    </strong>
                    {pillar.focus}
                  </div>

                  {/* Key Highlights */}
                  <div className="space-y-3 mb-8">
                    <span className="font-mono text-xs uppercase tracking-wider text-silver/40 block">
                      Architectural Highlights:
                    </span>
                    {pillar.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-xs text-silver/80">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          isCyan ? 'text-cyan' : isAmber ? 'text-amber-400' : 'text-emerald-400'
                        }`} />
                        <span className="leading-snug">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Tech Stack Tags & Action */}
                <div className="pt-6 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {pillar.techStack.map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-silver/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={scrollToContact}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono uppercase tracking-wider text-silver hover:text-white transition-all border border-white/10 hover:border-white/20 group/btn cursor-pointer"
                  >
                    <span>Deploy Solution Discovery</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
