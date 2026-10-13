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
  FileCode2,
  Sparkles
} from 'lucide-react';

interface PillarCardProps {
  number: string;
  title: string;
  tagline: string;
  focus: string;
  highlights: string[];
  techStack: string[];
  icon: React.ReactNode;
  accentColor: 'blue' | 'crimson' | 'indigo';
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
    icon: <Box className="w-7 h-7 text-[#00B6FF]" />,
    accentColor: "blue",
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
    icon: <Workflow className="w-7 h-7 text-[#FF1E43]" />,
    accentColor: "crimson",
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
    icon: <GraduationCap className="w-7 h-7 text-[#2437FF]" />,
    accentColor: "indigo",
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
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 overflow-hidden"
      aria-label="Core Capabilities and Strategic Pillars"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#00B6FF] mb-3 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#00B6FF]" />
              <span>Core Engineering Disciplines</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-heading text-slate-900">
              Architectural <span className="brand-gradient-text">Capabilities</span>
            </h2>
            <p className="mt-4 text-slate-700 text-base md:text-lg font-normal leading-relaxed">
              Replacing fragmented agency services with three dedicated engineering disciplines designed to deploy robust, production-grade autonomous systems and spatial pilots.
            </p>
          </div>

          <div className="font-mono text-xs text-slate-500 hidden md:block text-right">
            <div>FRAMEWORK: SOLUTIONS LAB V2</div>
            <div>CANVAS: LUMINOUS SPATIAL</div>
          </div>
        </div>

        {/* 3 Pillars Grid (Luminous Frosted Glass Containers) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PILLARS.map((pillar, idx) => {
            const isBlue = pillar.accentColor === 'blue';
            const isCrimson = pillar.accentColor === 'crimson';

            return (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 luminous-glass-card group ${
                  isBlue
                    ? 'hover:border-[#00B6FF]/60'
                    : isCrimson
                    ? 'hover:border-[#FF1E43]/60'
                    : 'hover:border-[#2437FF]/60'
                }`}
              >
                {/* Pillar Header & Geometric Indicator */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-black text-slate-300 group-hover:text-slate-500 transition-colors">
                      {pillar.number}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold border ${
                      isBlue
                        ? 'bg-[#00B6FF]/10 text-[#00B6FF] border-[#00B6FF]/30'
                        : isCrimson
                        ? 'bg-[#FF1E43]/10 text-[#FF1E43] border-[#FF1E43]/30'
                        : 'bg-[#2437FF]/10 text-[#2437FF] border-[#2437FF]/30'
                    }`}>
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="mb-4">
                    <div className="p-3.5 w-fit rounded-2xl bg-white border border-slate-200/90 shadow-sm mb-4 group-hover:scale-105 transition-transform">
                      {pillar.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-heading uppercase tracking-tight text-slate-900 mb-2">
                      {pillar.title}
                    </h3>
                    <p className={`text-xs font-mono tracking-wider uppercase font-bold mb-4 ${
                      isBlue ? 'text-[#00B6FF]' : isCrimson ? 'text-[#FF1E43]' : 'text-[#2437FF]'
                    }`}>
                      {pillar.tagline}
                    </p>
                  </div>

                  {/* Focus Description */}
                  <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 mb-6 text-sm text-slate-700 leading-relaxed font-sans">
                    <strong className="text-slate-900 block font-mono text-[11px] uppercase tracking-wider mb-1">
                      Primary Focus:
                    </strong>
                    {pillar.focus}
                  </div>

                  {/* Key Highlights */}
                  <div className="space-y-3 mb-8">
                    <span className="font-mono text-xs uppercase tracking-wider text-slate-500 font-bold block">
                      Architectural Highlights:
                    </span>
                    {pillar.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          isBlue ? 'text-[#00B6FF]' : isCrimson ? 'text-[#FF1E43]' : 'text-[#2437FF]'
                        }`} />
                        <span className="leading-snug">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Tech Stack Tags & Action */}
                <div className="pt-6 border-t border-slate-200/80">
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {pillar.techStack.map((tech) => (
                      <span 
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-slate-100 border border-slate-200 text-slate-600 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* High-visibility dark text on silver/glass button */}
                  <button
                    onClick={scrollToContact}
                    className="w-full flex items-center justify-between px-5 py-3 rounded-xl bg-white hover:bg-slate-900 text-slate-900 hover:text-white text-xs font-mono uppercase tracking-wider font-bold transition-all border border-slate-300 hover:border-slate-900 shadow-sm group/btn cursor-pointer"
                  >
                    <span>Deploy Solution Discovery</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
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
