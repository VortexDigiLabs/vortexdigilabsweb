import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Check, Terminal, ChevronDown } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  domain: string;
  impactMetric: string;
  impactLabel: string;
  narrative: string;
  specs: { label: string; value: string }[];
  stack: string[];
  terminalLog: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'sagma-curriculum',
    title: 'Industrial Grain Milling Curriculum Modernisation',
    client: 'South African Grain Milling Academy (SAGMA)',
    domain: 'Mechanical Equipment & WebXR Digital Twins',
    impactMetric: '20 Modules',
    impactLabel: 'Legacy Equipment Overhauled to 3D Space',
    narrative: 'Overhaul of 20 legacy print training modules into zero-install interactive 3D WebXR equipment pilots. Replaced static 2D print diagrams with real-time browser assemblies allowing apprentices to inspect complex mill mechanical components in 360° space on standard low-spec mobile and desktop devices.',
    specs: [
      { label: 'Mesh Compression', value: 'Draco Algorithmic Compression (< 1.4 MB per Assembly)' },
      { label: 'Accessibility', value: '100% Alt-Text & Screen-Reader Synchronized' },
      { label: 'Rendering Target', value: '60fps Zero-Install Edge Browser Runtime' },
      { label: 'Legacy Conversion', value: '2D Engineering CAD Schematics to Optimized GLTF' }
    ],
    stack: ['Three.js', 'WebXR', 'Blender Pipeline', 'Vector CAD', 'WCAG 2.1'],
    terminalLog: `$ sagma-inspect --module="bucket-elevator-v4"
[Draco] Geometry decimation: 14.8MB -> 1.18MB (-92.0%)
[WebXR] Touch interaction bound: Pan / Orbit / Explode sub-assemblies
[A11y] Screen-reader narration tracks: Synchronized`
  },
  {
    id: 'edge-order-orchestration',
    title: 'Edge Order Orchestration & Automated Dispatch',
    domain: 'Real-Time Transaction Queue & WhatsApp Routing',
    client: 'Commercial Multi-Tenant Operations',
    impactMetric: '< 650ms',
    impactLabel: 'End-to-End Operator Dispatch Latency',
    narrative: 'Full-stack progressive web application driving real-time order processing and automated WhatsApp dispatch workflows. Engineered an event-driven state machine connecting frontend checkouts directly to local mobile operations without manual dispatch bottlenecks or operational downtime.',
    specs: [
      { label: 'Architecture', value: 'Serverless Event-Driven State Machine' },
      { label: 'Notification Path', value: 'Meta Cloud API Direct Webhook Integration' },
      { label: 'Edge Resilience', value: 'ServiceWorker Offline Queue & Background Sync' },
      { label: 'Reliability', value: 'Self-Healing Webhook Queue with Auto-Retry' }
    ],
    stack: ['React', 'Event Webhooks', 'Meta Cloud API', 'Edge Functions', 'PostgreSQL'],
    terminalLog: `POST /api/orchestrator/dispatch-order HTTP/2
{
  "orderId": "VDL-9042",
  "routingEngine": "edge-priority-queue",
  "whatsappPayload": "DISPATCH_AUTHORIZED"
} -> 200 OK (38ms latency)`
  },
  {
    id: 'generative-media-pipelines',
    title: 'Generative Technical Media Automation',
    domain: 'Modular Procedural Video & Technical Training AV',
    client: 'Enterprise Technical Communications',
    impactMetric: '10x',
    impactLabel: 'Production Velocity vs Studio Shoots',
    narrative: 'Synthetic instructional content and automated multi-modal production pipelines built without stock templates. Automated the ingestion of raw technical documentation to generate high-fidelity technical instructional video sequences and synchronized voice tracks.',
    specs: [
      { label: 'Pipeline Engine', value: 'Headless ComfyUI Procedural Node Graphs' },
      { label: 'Diffusion Core', value: 'Wan 2.1 / LTX High-Resolution Latent Models' },
      { label: 'Acoustic Model', value: 'Custom Voice Synthesis & Sub-phoneme Lip Sync' },
      { label: 'Template Reliance', value: '0% Stock Clichés — 100% Procedural Generation' }
    ],
    stack: ['ComfyUI', 'Wan 2.1', 'Latent Diffusion', 'FFmpeg', 'Voice Synthesis'],
    terminalLog: `[ComfyUI-Worker-02] Ingesting Technical Markdown Spec...
Executing Latent Diffusion -> Audio Mel Spectrogram Sync...
Video render complete: 1080p60 H.265 (Render Time: 42s)`
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
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 hairline-t bg-slate-50/50"
      aria-label="Verified Field Deployments"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-slate-200/90 text-slate-700 text-xs font-medium mb-4">
            <span className="led-blue" />
            <span>Field Deployments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-title text-slate-900 leading-tight font-heading">
            Verified production systems in operation.
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            Real-world deployments bridging mechanical equipment curriculum, edge operations, and autonomous generative media systems.
          </p>
        </div>

        {/* Case Studies Dossiers */}
        <div className="space-y-8">
          {CASE_STUDIES.map((cs) => {
            const isLogOpen = expandedLog === cs.id;

            return (
              <article 
                key={cs.id}
                className="studio-panel rounded-2xl p-6 sm:p-10 transition-all duration-200"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Context & Metrics (4 cols) */}
                  <div className="lg:col-span-4 flex flex-col justify-between h-full">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-1">
                        {cs.client}
                      </div>
                      <div className="text-xs text-slate-600 font-medium mb-6">
                        {cs.domain}
                      </div>

                      {/* Verified Metric Block */}
                      <div className="p-5 rounded-xl bg-slate-100/70 border border-slate-200/80 mb-6">
                        <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
                          {cs.impactMetric}
                        </div>
                        <div className="text-xs text-slate-600 font-medium mt-1">
                          {cs.impactLabel}
                        </div>
                      </div>
                    </div>

                    {/* Stack Pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {cs.stack.map((tech) => (
                        <span 
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white border border-slate-200 text-slate-700 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Title, Narrative & Specs (8 cols) */}
                  <div className="lg:col-span-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-4 font-heading">
                      {cs.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
                      {cs.narrative}
                    </p>

                    {/* Specifications List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-white border border-slate-200/90 mb-5">
                      {cs.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="text-xs">
                          <span className="font-semibold text-slate-900 block">{spec.label}:</span>
                          <span className="text-slate-600">{spec.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Terminal Inspection Toggle */}
                    <div>
                      <button
                        onClick={() => toggleLog(cs.id)}
                        className="text-xs font-mono font-semibold text-slate-700 hover:text-slate-900 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Terminal className="w-3.5 h-3.5" />
                        <span>{isLogOpen ? 'Hide Execution Trace' : 'Inspect Execution Trace'}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isLogOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isLogOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 rounded-xl bg-slate-950 text-slate-200 p-4 font-mono text-xs overflow-x-auto shadow-inner"
                        >
                          <pre className="whitespace-pre-wrap leading-relaxed text-slate-300">
                            {cs.terminalLog}
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
