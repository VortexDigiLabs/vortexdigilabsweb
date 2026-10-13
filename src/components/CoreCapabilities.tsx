import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  Workflow, 
  Layers, 
  Sparkles, 
  ArrowUpRight, 
  Check, 
  Radio, 
  Code2, 
  Smartphone,
  Presentation
} from 'lucide-react';

interface Pillar {
  id: string;
  tag: string;
  number: string;
  headline: string;
  title: string;
  description: string;
  visualType: 'wireframe' | 'nodes' | 'dashboard' | 'stack';
  accent: 'blue' | 'crimson';
  deliverables: string[];
  techStack: string[];
}

const PILLARS: Pillar[] = [
  {
    id: '3d-twins',
    number: '01',
    tag: 'SYSTEM // WEBGL-THREEJS',
    title: 'Interactive 3D & Digital Twin Pilots',
    headline: 'Browser-Based Equipment Simulation & Digital Twins',
    description: 'Lightweight, zero-install WebGL and Three.js machinery pilots, industrial asset visualisers, and comprehensive modernisation of multi-decade technical schematics into responsive 2D/3D vectors.',
    visualType: 'wireframe',
    accent: 'blue',
    deliverables: [
      'Zero-install WebGL/WebXR equipment inspection in 60fps browser space',
      'Under 1.4 MB Draco geometry budgets ensuring instant mobile loading',
      'Complete vector schematic overhaul with 100% alt-text accessibility'
    ],
    techStack: ['Three.js', 'WebXR', 'Blender GLB', 'Draco Mesh', 'GLSL Shaders']
  },
  {
    id: 'agentic-systems',
    number: '02',
    tag: 'ORCHESTRATION // MULTI-MODEL',
    title: 'Autonomous Workflows & Agentic Systems',
    headline: 'Custom Knowledge Bases & Task Orchestration',
    description: 'Enterprise private RAG architectures built on Google AI Studio, Gemini API, and NotebookLM. Eliminates hallucinations by grounding models strictly in company handbooks, SOPs, and proprietary databases.',
    visualType: 'nodes',
    accent: 'crimson',
    deliverables: [
      'Self-healing background agent loops with automated retry logic',
      'Zero-retention private RAG grounded in enterprise standard operating procedures',
      'Multi-model fallback routing across Gemini, Claude, and local Ollama weights'
    ],
    techStack: ['Google AI Studio', 'Gemini API', 'NotebookLM', 'LangChain', 'PostgreSQL']
  },
  {
    id: 'rapid-prototyping',
    number: '03',
    tag: 'DEVELOPMENT // RAPID PROTOTYPE',
    title: 'High-Velocity Application Prototyping',
    headline: 'Progressive Web Apps, Dashboards & Micro-Tools',
    description: 'Rapid-cadence application development translating operational concepts into production-grade PWAs, internal dashboards, and Android-compatible tools using modern agentic workflows and instant Vercel cloud edge deployment.',
    visualType: 'dashboard',
    accent: 'blue',
    deliverables: [
      'Production-ready PWA deployments with offline ServiceWorker caching',
      'Real-time transaction queue and automated WhatsApp dispatch pipelines',
      'Clean TypeScript architectures ready for instant Vercel/Cloudflare edge scaling'
    ],
    techStack: ['React / Vite', 'Next.js', 'ServiceWorker PWA', 'Vercel Edge', 'Meta Cloud API']
  },
  {
    id: 'ai-enablement',
    number: '04',
    tag: 'HUMAN-IN-THE-LOOP // WORKSHOPS',
    title: 'Enterprise AI Enablement & Creative Upskilling',
    headline: 'Workforce Enablement, Canva Systems & Media Pipelines',
    description: 'Pragmatic training for executives and non-technical staff. We demystify LLMs, configure team Canva systems, and build automated script-to-screen production pipelines for generative video, neural voice synthesis, and dynamic visuals.',
    visualType: 'stack',
    accent: 'crimson',
    deliverables: [
      'Executive and operational prompt engineering workshops tailored for non-coders',
      'Structured Canva enterprise design systems for brand-safe generation',
      'Script-to-screen programmatic video pipelines with neural voice cloning'
    ],
    techStack: ['Atlas Syllabus', 'Canva Systems', 'Neural Voice', 'ComfyUI', 'Executive Enablement']
  }
];

export default function CoreCapabilities() {
  const scrollToDiscovery = () => {
    const el = document.getElementById('discovery');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="capabilities" 
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08] overflow-hidden"
      aria-label="Core Solutions Architecture"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Telemetry Header Strip (Directly matching image_9.png) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-12 border-b border-white/10 gap-3">
          <div className="flex items-center gap-2.5 font-mono text-xs">
            <span className="text-white font-semibold">Twin Viewport // Online</span>
            <div className="flex items-center gap-1" aria-hidden="true">
              <span className="w-2 h-1 bg-[#00B6FF] rounded-xs" />
              <span className="w-2 h-1 bg-[#00B6FF] rounded-xs" />
              <span className="w-2 h-1 bg-[#00B6FF]/50 rounded-xs" />
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
            <div className="flex items-center gap-1" aria-hidden="true">
              <span className="w-2 h-1 bg-[#FF2E2E] rounded-xs" />
              <span className="w-2 h-1 bg-[#FF2E2E] rounded-xs" />
            </div>
            <span>Telemetry: OTTC / Telemetry 11.83 KB :: 4 ARCHITECTURAL PILLARS</span>
          </div>
        </div>

        {/* Section Title */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-heading">
            CORE SOLUTIONS ARCHITECTURE
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Engineered systems bridging browser-native 3D twins, multi-model private agent pipelines, rapid application prototyping, and enterprise workforce enablement.
          </p>
        </div>

        {/* 4 Bespoke Glass Cards Grid (image_9.png Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PILLARS.map((pillar) => {
            const isCrimson = pillar.accent === 'crimson';

            return (
              <article
                key={pillar.id}
                className={`obsidian-glass-panel rounded-3xl p-8 sm:p-10 flex flex-col justify-between group transition-all duration-300 ${
                  isCrimson ? 'hover:border-[#FF2E2E]/40' : 'hover:border-[#00B6FF]/40'
                }`}
              >
                <div>
                  {/* Card Micro-Header with Status Ping */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs uppercase tracking-widest text-slate-400 font-semibold">
                      {pillar.tag}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={isCrimson ? 'ping-crimson' : 'ping-blue'} />
                      <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                        ONLINE
                      </span>
                    </div>
                  </div>

                  {/* Title & Headline */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-heading mb-2">
                    {pillar.title}
                  </h3>
                  
                  <div className={`text-xs font-mono tracking-wider uppercase font-semibold mb-4 ${
                    isCrimson ? 'text-[#FF2E2E]' : 'text-[#00B6FF]'
                  }`}>
                    {pillar.headline}
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed font-sans mb-6">
                    {pillar.description}
                  </p>

                  {/* Visual Cue Diagram (image_9.png Wireframes & Schematics) */}
                  <div className="rounded-2xl bg-black/40 border border-white/[0.08] p-5 mb-6 relative overflow-hidden">
                    {pillar.visualType === 'wireframe' && (
                      <div className="h-28 flex flex-col justify-between">
                        <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                          <span>Fine WebGL wireframes</span>
                          <span className="text-[#00B6FF] flex items-center gap-1">
                            <span className="ping-blue" />
                            <span>Mesh: Draco 1.18MB</span>
                          </span>
                        </div>
                        {/* Wireframe Graphic Simulation */}
                        <div className="w-full h-14 relative flex items-center justify-center">
                          <svg className="w-full h-full text-[#00B6FF]/40" viewBox="0 0 300 60" fill="none">
                            <path d="M0,45 Q75,10 150,35 T300,20" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M0,55 Q75,25 150,45 T300,30" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                            <circle cx="75" cy="22" r="3.5" fill="#00B6FF" />
                            <circle cx="150" cy="35" r="3.5" fill="#00B6FF" />
                            <circle cx="225" cy="24" r="3.5" fill="#00B6FF" />
                          </svg>
                        </div>
                        <div className="font-mono text-[10px] text-slate-400">
                          Technical graphics // 360° Browser Runtime
                        </div>
                      </div>
                    )}

                    {pillar.visualType === 'nodes' && (
                      <div className="h-28 flex flex-col justify-between">
                        <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                          <span>Nodes / pipeline orchestration</span>
                          <span className="text-[#FF2E2E] flex items-center gap-1">
                            <span className="ping-crimson" />
                            <span>Active RAG Stream</span>
                          </span>
                        </div>
                        {/* Connected Node-Path Graph */}
                        <div className="w-full h-14 relative flex items-center justify-center">
                          <svg className="w-full h-full text-[#FF2E2E]/40" viewBox="0 0 300 60" fill="none">
                            <path d="M20,30 L90,15 L170,45 L240,25 L285,30" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="20" cy="30" r="4" fill="#FF2E2E" />
                            <circle cx="90" cy="15" r="4" fill="#00B6FF" />
                            <circle cx="170" cy="45" r="4" fill="#FF2E2E" />
                            <circle cx="240" cy="25" r="4" fill="#00B6FF" />
                            <circle cx="285" cy="30" r="4" fill="#FF2E2E" />
                          </svg>
                        </div>
                        <div className="font-mono text-[10px] text-slate-400">
                          Gemini 2.5 + NotebookLM Sovereign Context
                        </div>
                      </div>
                    )}

                    {pillar.visualType === 'dashboard' && (
                      <div className="h-28 flex flex-col justify-between">
                        <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                          <span>Edge viewport // PWA Stream</span>
                          <span className="text-emerald-400 flex items-center gap-1">
                            <span className="ping-green" />
                            <span>Vercel Edge &lt; 40ms</span>
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 my-auto">
                          <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-center">
                            <div className="text-[10px] text-slate-400 font-mono">DISPATCH</div>
                            <div className="text-xs font-bold text-white font-mono">&lt;650ms</div>
                          </div>
                          <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-center">
                            <div className="text-[10px] text-slate-400 font-mono">STATUS</div>
                            <div className="text-xs font-bold text-[#00B6FF] font-mono">SYNCED</div>
                          </div>
                          <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-center">
                            <div className="text-[10px] text-slate-400 font-mono">OFFLINE</div>
                            <div className="text-xs font-bold text-emerald-400 font-mono">ACTIVE</div>
                          </div>
                        </div>
                        <div className="font-mono text-[10px] text-slate-400">
                          Automated WhatsApp dispatch & mobile ordering
                        </div>
                      </div>
                    )}

                    {pillar.visualType === 'stack' && (
                      <div className="h-28 flex flex-col justify-between">
                        <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                          <span>Isometric syllabus & pipeline</span>
                          <span className="text-[#FF2E2E] flex items-center gap-1">
                            <span className="ping-crimson" />
                            <span>Enterprise Atlas</span>
                          </span>
                        </div>
                        <div className="flex items-center justify-around my-auto">
                          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                            <span className="w-2 h-2 rounded-xs bg-[#FF2E2E]" />
                            <span>Executive Workshop</span>
                          </div>
                          <span className="text-white/20">→</span>
                          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                            <span className="w-2 h-2 rounded-xs bg-[#00B6FF]" />
                            <span>Canva Systems</span>
                          </div>
                          <span className="text-white/20">→</span>
                          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                            <span className="w-2 h-2 rounded-xs bg-white" />
                            <span>AV Pipeline</span>
                          </div>
                        </div>
                        <div className="font-mono text-[10px] text-slate-400">
                          Script-to-Screen Automated Production
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Deliverables Bullet List */}
                  <div className="space-y-2.5 mb-8">
                    {pillar.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-300 font-medium">
                        <Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                          isCrimson ? 'text-[#FF2E2E]' : 'text-[#00B6FF]'
                        }`} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Tech Stack Tags & CTA */}
                <div className="pt-6 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {pillar.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/[0.04] border border-white/[0.08] text-slate-300 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={scrollToDiscovery}
                    className="w-full flex items-center justify-between px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-white text-xs font-mono uppercase tracking-wider font-bold transition-all border border-white/10 hover:border-white/30 cursor-pointer group/btn"
                  >
                    <span>INITIATE PILLAR DISCOVERY</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 text-[#FF2E2E]" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
