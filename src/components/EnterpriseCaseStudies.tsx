import { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ChevronDown, Check, ArrowRight } from 'lucide-react';

interface SectorDeployment {
  id: string;
  sectorCode: string;
  sectorName: string;
  scope: string;
  execution: string;
  status: string;
  metric: string;
  metricLabel: string;
  specs: { label: string; value: string }[];
  stack: string[];
  terminalLog: string;
  accent: 'blue' | 'crimson';
}

const SECTOR_DEPLOYMENTS: SectorDeployment[] = [
  {
    id: 'heavy-agri-industrial',
    sectorCode: 'SECTOR 01',
    sectorName: 'Heavy Agri-Industrial & Technical Education',
    scope: 'Industrial Curriculum Modernisation & Digital Twin Transformation',
    execution: 'Comprehensive overhaul of 20 legacy vocational training modules. Converted decades-old hand-drawn schematics into responsive 2D/3D digital vectors and deployed an interactive zero-install WebGL grain milling machinery simulation suite to production. Engineered a complete alt-text compliance register for screen-reader synchronisation.',
    status: 'PILOT DEPLOYED // CONTINUOUS ITERATION',
    metric: '20 Modules',
    metricLabel: 'Legacy Schematics Overhauled to 3D Space',
    specs: [
      { label: 'Asset Payload', value: '< 1.4 MB per Assembly (Draco Compression)' },
      { label: 'Accessibility', value: '100% WCAG 2.1 Alt-Text & Screen-Reader Synced' },
      { label: 'Simulation Target', value: '60fps Zero-Install Browser WebGL Engine' },
      { label: 'Schematic Overhaul', value: 'Static Hand-Drawn Diagrams to Dynamic Vectors' }
    ],
    stack: ['WebGL / Three.js', 'Draco Mesh', 'Blender Pipeline', 'Vector CAD', 'WCAG 2.1'],
    terminalLog: `$ vdl-industrial-pipeline --inspect "bucket-elevator-v4.cad"
[Draco] Geometry decimation: 14.8MB -> 1.18MB (-92.0%)
[WebGL] 60fps locked on mobile Safari & Chromium runtimes
[WCAG] Alt-text audio narration register: 100% Synchronized`,
    accent: 'blue'
  },
  {
    id: 'hospitality-commerce',
    sectorCode: 'SECTOR 02',
    sectorName: 'Quick-Service Hospitality & Digital Commerce',
    scope: 'Omnichannel Menu PWA & Automated Order Routing',
    execution: 'High-velocity Progressive Web App deployment with dynamic visual menus, high-conversion cart architecture, and automated operational WhatsApp order dispatching. Engineered an event-driven webhook state machine connecting customer checkouts directly to local kitchen dispatchers without manual telephone overhead.',
    status: 'PRODUCTION ACTIVE',
    metric: '< 650ms',
    metricLabel: 'Checkout-to-WhatsApp Dispatch Latency',
    specs: [
      { label: 'Architecture', value: 'Serverless Event-Driven State Machine' },
      { label: 'Routing Engine', value: 'Meta Cloud API Direct Webhook Integration' },
      { label: 'Edge Caching', value: 'ServiceWorker Offline Persistence & Sync' },
      { label: 'Failover', value: 'Self-Healing Retry Queue with Dead-Letter Storage' }
    ],
    stack: ['React / Vite', 'ServiceWorker PWA', 'Meta Cloud API', 'Edge Functions', 'PostgreSQL'],
    terminalLog: `POST /api/orchestrator/dispatch-order HTTP/2
{
  "orderId": "VDL-9042",
  "routingEngine": "edge-priority-queue",
  "whatsappPayload": "DISPATCH_AUTHORIZED"
} -> 200 OK (38ms latency)`,
    accent: 'crimson'
  },
  {
    id: 'media-automation',
    sectorCode: 'SECTOR 03',
    sectorName: 'Automated Media & Creative Production Pipelines',
    scope: 'Script-to-Screen Short-Form Video Automation',
    execution: 'Custom programmatic content pipelines integrating LLM structured scripting, neural voice generation, and automated motion graphics workflows. Ingests raw operational documentation and automatically generates high-fidelity technical instructional video sequences and multi-lingual voice tracks without manual studio shoots.',
    status: 'PIPELINE VERIFIED',
    metric: '10x',
    metricLabel: 'Production Velocity vs Studio Shoots',
    specs: [
      { label: 'Script Engine', value: 'Structured Gemini 2.5 Multi-Modal Prompting' },
      { label: 'Acoustic Model', value: 'Custom Neural Voice Synthesis & Sub-Phoneme Sync' },
      { label: 'Visual Rendering', value: 'Headless ComfyUI Node Graphs + FFmpeg Assembly' },
      { label: 'Template Dependency', value: '0% Stock Clichés — 100% Procedural Generation' }
    ],
    stack: ['Gemini 2.5', 'ComfyUI', 'Neural Voice', 'FFmpeg', 'Canva Enterprise'],
    terminalLog: `[VDL-MediaWorker] Ingesting Technical Markdown Spec...
Executing Latent Motion -> Audio Mel Spectrogram Sync...
Video render complete: 1080p60 H.265 (Render Time: 42s)`,
    accent: 'blue'
  }
];

export default function EnterpriseCaseStudies() {
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  const toggleLog = (id: string) => {
    setExpandedLog(expandedLog === id ? null : id);
  };

  return (
    <section 
      id="pilots" 
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08] overflow-hidden"
      aria-label="Sector Deployments and Industrial Proof"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 font-mono text-[11px] mb-4">
            <span className="ping-crimson" />
            <span>PROVEN SECTOR DEPLOYMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-heading">
            INDUSTRIAL PROOF & SECTOR DEPLOYMENTS
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Real-world enterprise systems in production across heavy industrial manufacturing, omnichannel digital commerce, and automated generative media.
          </p>
        </div>

        {/* Deployments List */}
        <div className="space-y-8">
          {SECTOR_DEPLOYMENTS.map((deployment) => {
            const isCrimson = deployment.accent === 'crimson';
            const isLogOpen = expandedLog === deployment.id;

            return (
              <article 
                key={deployment.id}
                className="obsidian-glass-panel rounded-3xl p-8 sm:p-12 transition-all duration-300 hover:border-white/20"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Sector Meta & Verified Metric */}
                  <div className="lg:col-span-4 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center gap-2 mb-2 font-mono text-xs">
                        <span className={isCrimson ? 'ping-crimson' : 'ping-blue'} />
                        <span className="text-white font-bold tracking-wider">{deployment.sectorCode}</span>
                        <span className="text-white/20">//</span>
                        <span className="text-slate-400 text-[10px]">{deployment.status}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-heading mb-6">
                        {deployment.sectorName}
                      </h3>

                      {/* Highlight Metric Card */}
                      <div className="p-6 rounded-2xl bg-black/40 border border-white/10 mb-6">
                        <div className={`text-4xl sm:text-5xl font-black tracking-tight font-heading ${
                          isCrimson ? 'text-[#FF2E2E]' : 'text-[#00B6FF]'
                        }`}>
                          {deployment.metric}
                        </div>
                        <div className="text-xs text-slate-300 font-mono mt-1.5 leading-snug">
                          {deployment.metricLabel}
                        </div>
                      </div>
                    </div>

                    {/* Stack Pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {deployment.stack.map((tech) => (
                        <span 
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/[0.04] border border-white/10 text-slate-300 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Scope, Narrative, Specifications & Execution Trace */}
                  <div className="lg:col-span-8">
                    <div className="text-xs font-mono tracking-wider uppercase text-slate-400 mb-2 font-semibold">
                      SCOPE: {deployment.scope}
                    </div>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                      {deployment.execution}
                    </p>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-6">
                      {deployment.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="text-xs">
                          <span className="font-mono text-slate-400 block text-[11px] mb-0.5">{spec.label}:</span>
                          <span className="text-white font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Terminal Inspection Button & Drawer */}
                    <div>
                      <button
                        onClick={() => toggleLog(deployment.id)}
                        className="text-xs font-mono font-semibold text-slate-300 hover:text-white inline-flex items-center gap-2 transition-colors cursor-pointer py-1"
                      >
                        <Terminal className="w-3.5 h-3.5 text-[#FF2E2E]" />
                        <span>{isLogOpen ? 'COLLAPSE EXECUTION LOG' : 'INSPECT DEPLOYMENT TELEMETRY LOG'}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isLogOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isLogOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 rounded-2xl bg-black text-slate-300 p-5 font-mono text-xs overflow-x-auto border border-white/10 shadow-2xl"
                        >
                          <div className="flex items-center justify-between text-slate-400 text-[10px] pb-2 mb-3 border-b border-white/10">
                            <span>TRACE HARNESS: PRODUCTION VERIFIED</span>
                            <span>STATUS: 200 OK</span>
                          </div>
                          <pre className="whitespace-pre-wrap leading-relaxed text-slate-200">
                            {deployment.terminalLog}
                          </pre>
                        </motion.div>
                      )}
                    </div>

                  </div>

                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
