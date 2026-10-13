import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Layers, 
  ExternalLink, 
  CheckCircle2, 
  Workflow, 
  Sparkles, 
  Terminal, 
  ArrowRight,
  Maximize2,
  Share2,
  FileText
} from 'lucide-react';

interface CaseStudy {
  id: string;
  number: string;
  title: string;
  client: string;
  tagline: string;
  metric: string;
  impactDetail: string;
  stack: string[];
  specs: { label: string; value: string }[];
  accent: 'blue' | 'crimson' | 'deep-blue';
  terminalSnippet?: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "sagma-curriculum",
    number: "CASE 01",
    title: "SAGMA Technical Curriculum Modernisation",
    client: "South African Grain Milling Academy (SAGMA)",
    tagline: "Industrial Training Overhaul & WebXR Digital Twins",
    metric: "20 Legacy Modules Modernised",
    impactDetail: "Overhaul of 20 legacy modules into interactive 3D equipment pilots and digital vector libraries with full Alt-Text compliance. Replaced static black-and-white print diagrams with zero-install browser WebXR simulators allowing mechanical apprentices to inspect mill components in 360° space.",
    stack: ["WebXR", "Three.js", "Blender GLB Pipeline", "Vector CAD", "WCAG 2.1 Alt-Text"],
    specs: [
      { label: "Asset Format", value: "Optimised GLB (Draco Compression)" },
      { label: "Target Payload", value: "< 1.4 MB per Equipment Module" },
      { label: "Accessibility", value: "100% Alt-Text & Screen-Reader Synchronised" },
      { label: "Deployment", value: "Zero-Install Edge Browser Engine" }
    ],
    accent: "blue",
    terminalSnippet: `$ vdl-pipeline --convert "bucket-elevator-v4.cad"
✓ Draco mesh compression: 14.8MB -> 1.18MB (-92%)
✓ Node hierarchy verified: 48 sub-assemblies
✓ WebXR touch controls enabled [60fps target]`
  },
  {
    id: "edge-order-orchestration",
    number: "CASE 02",
    title: "Edge Order Orchestration & PWA Routing",
    client: "Commercial Multi-Tenant Operations",
    tagline: "Real-Time Transaction Queue & Automated Dispatch",
    metric: "Sub-Second Dispatch Execution",
    impactDetail: "Full-stack progressive web application driving real-time order processing and automated WhatsApp dispatch workflows. Engineered an event-driven webhook pipeline connecting frontend checkouts directly to local mobile operations without human dispatch delays.",
    stack: ["Next.js/React", "Webhooks", "Automated Notification Routing", "Edge Functions", "Meta Cloud API"],
    specs: [
      { label: "Architecture", value: "Serverless Event-Driven State Machine" },
      { label: "Dispatch Latency", value: "< 650ms to WhatsApp Operator" },
      { label: "Offline Support", value: "ServiceWorker Edge Order Persistence" },
      { label: "Reliability", value: "Self-Healing Webhook Queue with Auto-Retry" }
    ],
    accent: "crimson",
    terminalSnippet: `POST /api/orchestrator/dispatch-order HTTP/2
{
  "orderId": "VDL-9042",
  "routingEngine": "edge-priority-queue",
  "whatsappPayload": "DISPATCH_AUTHORIZED"
} -> 200 OK (38ms latency)`
  },
  {
    id: "generative-media-pipelines",
    number: "CASE 03",
    title: "Generative Technical Media Pipelines",
    client: "Technical Training & Enterprise Communications",
    tagline: "Automated Synthetic Media & Modular AV Production",
    metric: "10x Production Velocity vs Studio Shoots",
    impactDetail: "Synthetic avatar instructional content and automated multi-modal production pipelines built without stock templates. Automated the ingestion of raw technical documentation to generate high-fidelity technical instructional video sequences and multi-lingual voice tracks.",
    stack: ["Custom ComfyUI", "Wan / LTX Video Models", "Voice Synthesis", "Automated Assembly", "FFmpeg Pipelines"],
    specs: [
      { label: "Pipeline Core", value: "Headless ComfyUI Node Graphs" },
      { label: "Video Generation", value: "Wan 2.1 / LTX High-Resolution Latent Models" },
      { label: "Voice Cloning", value: "Custom Acoustic Models & Sub-phoneme Lip Sync" },
      { label: "Template Dependency", value: "0% Stock Clichés — 100% Procedural" }
    ],
    accent: "deep-blue",
    terminalSnippet: `[ComfyUI-Worker-02] Ingesting Technical Markdown Spec...
Executing Latent Diffusion -> Audio Mel Spectrogram Sync...
Video render complete: 1080p60 H.265 (Render Time: 42s)`
  }
];

export default function EnterpriseCaseStudies() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="pilots" 
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 overflow-hidden"
      aria-label="Enterprise Case Studies and Proof of Capability"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#00B6FF] mb-3 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#00B6FF]" />
            <span>Proven Enterprise Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-heading text-slate-900">
            Enterprise Proof <span className="brand-gradient-text-alt">of Capability</span>
          </h2>
          <p className="mt-4 text-slate-700 text-base md:text-lg font-normal leading-relaxed">
            Real-world deployments bridging mechanical equipment curriculum, edge operations, and autonomous generative media systems.
          </p>
        </div>

        {/* Case Studies Detailed Cards (Bright Modular Panels) */}
        <div className="space-y-12">
          {CASE_STUDIES.map((cs, idx) => {
            const isBlue = cs.accent === 'blue';
            const isCrimson = cs.accent === 'crimson';

            return (
              <motion.article
                key={cs.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative rounded-3xl p-8 sm:p-12 transition-all duration-300 luminous-glass-card ${
                  isBlue 
                    ? 'hover:border-[#00B6FF]/50' 
                    : isCrimson
                    ? 'hover:border-[#FF1E43]/50'
                    : 'hover:border-[#2437FF]/50'
                }`}
              >
                {/* Tech Bracket Indicator */}
                <div className="absolute top-6 right-8 font-mono text-[11px] text-slate-600 font-semibold uppercase">
                  {cs.number} // PRODUCTION VERIFIED
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Case Content (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      {/* Client / Tagline */}
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-xs font-mono tracking-widest text-slate-600 font-bold uppercase">
                          {cs.client}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className={`text-xs font-mono font-bold tracking-wider uppercase ${
                          isBlue ? 'text-[#00B6FF]' : isCrimson ? 'text-[#FF1E43]' : 'text-[#2437FF]'
                        }`}>
                          {cs.tagline}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl font-black font-heading uppercase text-slate-900 mb-4 tracking-tight">
                        {cs.title}
                      </h3>

                      {/* Highlighted Metric Badge */}
                      <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 shadow-sm mb-6">
                        <span className={`w-2 h-2 rounded-full ${
                          isBlue ? 'bg-[#00B6FF] shadow-[0_0_8px_#00B6FF]' : isCrimson ? 'bg-[#FF1E43] shadow-[0_0_8px_#FF1E43]' : 'bg-[#2437FF] shadow-[0_0_8px_#2437FF]'
                        }`} />
                        <span className="font-mono text-xs uppercase tracking-wider text-slate-500 font-bold">Verified Metric:</span>
                        <span className="font-mono font-bold text-sm text-slate-900">{cs.metric}</span>
                      </div>

                      {/* Impact Detail */}
                      <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 font-normal font-sans">
                        {cs.impactDetail}
                      </p>
                    </div>

                    {/* Stack Badges */}
                    <div>
                      <span className="font-mono text-[11px] text-slate-500 font-bold uppercase tracking-widest block mb-2">
                        Validated Stack:
                      </span>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {cs.stack.map(item => (
                          <span 
                            key={item}
                            className={`px-3 py-1 rounded-md text-xs font-mono border font-medium ${
                              isBlue
                                ? 'bg-[#00B6FF]/10 border-[#00B6FF]/30 text-[#00B6FF]'
                                : isCrimson
                                ? 'bg-[#FF1E43]/10 border-[#FF1E43]/30 text-[#FF1E43]'
                                : 'bg-[#2437FF]/10 border-[#2437FF]/30 text-[#2437FF]'
                            }`}
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={scrollToContact}
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-[#00B6FF] hover:text-[#FF1E43] transition-colors cursor-pointer"
                      >
                        <span>Request Architecture Blueprint</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Specifications & Terminal (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    
                    {/* Architectural Specifications Table (Light Alloy Style) */}
                    <div className="rounded-2xl bg-slate-50/90 border border-slate-200/90 p-5 font-mono text-xs shadow-sm">
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                        <span>Architecture Spec</span>
                        <span>Telemetry</span>
                      </div>
                      <div className="space-y-3">
                        {cs.specs.map(spec => (
                          <div key={spec.label} className="flex justify-between items-start gap-4">
                            <span className="text-slate-600 text-[11px]">{spec.label}:</span>
                            <span className="text-right text-slate-900 font-bold text-[11px]">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Telemetry Terminal Output */}
                    {cs.terminalSnippet && (
                      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 font-mono text-[11px] overflow-x-auto shadow-md text-slate-100">
                        <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800 text-[10px] text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-[#FF1E43]" />
                            <div className="w-2 h-2 rounded-full bg-amber-400" />
                            <div className="w-2 h-2 rounded-full bg-[#00B6FF]" />
                            <span className="ml-2 font-mono text-slate-400">vdl-runtime // telemetry</span>
                          </div>
                          <span className="text-[#00B6FF] font-bold">STATUS: OK</span>
                        </div>
                        <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                          {cs.terminalSnippet}
                        </pre>
                      </div>
                    )}

                  </div>

                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Pilot Verification CTA Banner */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-white via-slate-50 to-white border border-slate-200/90 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="text-xl font-bold font-heading uppercase text-slate-900 mb-1">
              Have a complex physical or operational workflow to digitize?
            </h4>
            <p className="text-sm text-slate-600 font-normal">
              We conduct initial architectural viability audits and prototype high-fidelity pilots under two-week discovery sprints.
            </p>
          </div>
          <button
            onClick={scrollToContact}
            className="flex-shrink-0 btn-electric-gradient px-7 py-4 rounded-full font-mono font-bold text-xs uppercase tracking-wider cursor-pointer"
          >
            Initiate Pilot Assessment
          </button>
        </div>

      </div>
    </section>
  );
}
