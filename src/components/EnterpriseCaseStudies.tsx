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
  accent: 'cyan' | 'amber' | 'blue';
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
    accent: "cyan",
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
    accent: "amber",
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
    accent: "blue",
    terminalSnippet: `[ComfyUI-Worker-02] Ingesting Technical Markdown Spec...
Executing Latent Diffusion -> Audio Mel Spectrogram Sync...
Video render complete: 1080p60 H.265 (Render Time: 42s)`
  }
];

export default function EnterpriseCaseStudies() {
  const [activeSnippetId, setActiveSnippetId] = useState<string>(CASE_STUDIES[0].id);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="pilots" 
      className="relative w-full bg-[#07080c] text-white py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 overflow-hidden"
      aria-label="Enterprise Case Studies and Proof of Capability"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-cyan mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan" />
            <span>Proven Enterprise Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-heading text-white">
            Enterprise Proof <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-sky-300 to-amber-400">of Capability</span>
          </h2>
          <p className="mt-4 text-silver/70 text-base md:text-lg font-light leading-relaxed">
            Real-world deployments bridging mechanical equipment curriculum, edge operations, and autonomous generative media systems.
          </p>
        </div>

        {/* Case Studies Detailed Cards */}
        <div className="space-y-12">
          {CASE_STUDIES.map((cs, idx) => {
            const isCyan = cs.accent === 'cyan';
            const isAmber = cs.accent === 'amber';

            return (
              <motion.article
                key={cs.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative rounded-3xl bg-[#0c0e15] border p-6 sm:p-10 transition-all duration-300 shadow-2xl overflow-hidden ${
                  isCyan 
                    ? 'border-cyan/25 hover:border-cyan/50 shadow-[0_0_30px_rgba(0,229,255,0.06)]' 
                    : isAmber
                    ? 'border-amber-500/25 hover:border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.06)]'
                    : 'border-sky-500/25 hover:border-sky-500/50 shadow-[0_0_30px_rgba(56,189,248,0.06)]'
                }`}
              >
                {/* Tech Bracket */}
                <div className="absolute top-4 right-4 font-mono text-[11px] text-silver/40 uppercase">
                  {cs.number} // PRODUCTION ACTIVE
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Case Content (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      {/* Client / Tagline */}
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-xs font-mono tracking-widest text-silver/60 uppercase">
                          {cs.client}
                        </span>
                        <span className="text-silver/30">•</span>
                        <span className={`text-xs font-mono font-bold tracking-wider uppercase ${
                          isCyan ? 'text-cyan' : isAmber ? 'text-amber-400' : 'text-sky-400'
                        }`}>
                          {cs.tagline}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl font-black font-heading uppercase text-white mb-4 tracking-tight">
                        {cs.title}
                      </h3>

                      {/* Highlighted Metric Badge */}
                      <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                        <span className={`w-2 h-2 rounded-full ${
                          isCyan ? 'bg-cyan shadow-[0_0_8px_#00e5ff]' : isAmber ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]' : 'bg-sky-400 shadow-[0_0_8px_#38bdf8]'
                        }`} />
                        <span className="font-mono text-xs uppercase tracking-wider text-silver/60">Verified Metric:</span>
                        <span className="font-mono font-bold text-sm text-white">{cs.metric}</span>
                      </div>

                      {/* Impact Detail */}
                      <p className="text-silver/80 text-sm sm:text-base leading-relaxed mb-6 font-light font-sans">
                        {cs.impactDetail}
                      </p>
                    </div>

                    {/* Stack Badges */}
                    <div>
                      <span className="font-mono text-[11px] text-silver/40 uppercase tracking-widest block mb-2">
                        Validated Stack:
                      </span>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {cs.stack.map(item => (
                          <span 
                            key={item}
                            className={`px-2.5 py-1 rounded text-xs font-mono border ${
                              isCyan
                                ? 'bg-cyan/10 border-cyan/30 text-cyan'
                                : isAmber
                                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                                : 'bg-sky-500/10 border-sky-500/30 text-sky-300'
                            }`}
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={scrollToContact}
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan hover:text-white transition-colors cursor-pointer"
                      >
                        <span>Request Architecture Blueprint</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Case Specs & Interactive Terminal Telemetry (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    
                    {/* Architectural Specifications Table */}
                    <div className="rounded-2xl bg-black/50 border border-white/10 p-5 font-mono text-xs">
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-silver/40 uppercase text-[10px] tracking-wider">
                        <span>Architecture Spec</span>
                        <span>Telemetry</span>
                      </div>
                      <div className="space-y-3">
                        {cs.specs.map(spec => (
                          <div key={spec.label} className="flex justify-between items-start gap-4">
                            <span className="text-silver/60 text-[11px]">{spec.label}:</span>
                            <span className="text-right text-white font-medium text-[11px]">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Terminal Execution Snippet */}
                    {cs.terminalSnippet && (
                      <div className="rounded-2xl bg-[#050608] border border-cyan/20 p-4 font-mono text-[11px] overflow-x-auto shadow-inner">
                        <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/5 text-[10px] text-silver/40">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-red-500/80" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                            <div className="w-2 h-2 rounded-full bg-green-500/80" />
                            <span className="ml-2 font-mono text-silver/60">vdl-runtime // logs</span>
                          </div>
                          <span className="text-cyan">STATUS: VERIFIED</span>
                        </div>
                        <pre className="text-silver/80 whitespace-pre-wrap leading-relaxed">
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
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-cyan/10 via-[#0d1017] to-amber-500/10 border border-cyan/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="text-xl font-bold font-heading uppercase text-white mb-1">
              Have a complex physical or operational workflow to digitize?
            </h4>
            <p className="text-sm text-silver/70 font-light">
              We conduct initial architectural viability audits and prototype high-fidelity pilots under two-week discovery sprints.
            </p>
          </div>
          <button
            onClick={scrollToContact}
            className="flex-shrink-0 px-6 py-3.5 rounded-xl bg-cyan text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-white hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all cursor-pointer"
          >
            Initiate Pilot Assessment
          </button>
        </div>

      </div>
    </section>
  );
}
