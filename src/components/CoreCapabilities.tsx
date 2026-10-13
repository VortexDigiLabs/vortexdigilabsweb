import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, 
  Workflow, 
  GraduationCap, 
  Check, 
  ChevronRight,
  Terminal,
  Layers,
  ShieldCheck,
  Cpu
} from 'lucide-react';

interface Discipline {
  id: string;
  name: string;
  tagline: string;
  description: string;
  deliverables: string[];
  specs: { label: string; value: string }[];
  stack: string[];
  indicatorClass: string;
  terminalSnippet: string;
}

const DISCIPLINES: Discipline[] = [
  {
    id: '3d-twins',
    name: 'Interactive 3D & Digital Twin Pilots',
    tagline: 'High-Fidelity Browser Spatial Computing',
    description: 'We convert static engineering CAD schematics and legacy training diagrams into zero-install, 60fps browser WebXR simulators and digital twin pilots with full touch and VR support.',
    deliverables: [
      'Legacy 2D-to-3D vector overhauls converting static print manuals into interactive spatial assemblies',
      'Runtime budget optimization with Draco mesh compression delivering full models under 1.4 MB',
      'Zero-install interactive training pilots with WebXR and mobile touch responsiveness'
    ],
    specs: [
      { label: 'Runtime Engine', value: 'Three.js / WebGL 2.0 / WebXR' },
      { label: 'Geometry Target', value: '< 1.4 MB Draco Compressed GLB' },
      { label: 'Platform Support', value: 'Zero-Install Edge Browser (Desktop/Mobile)' },
      { label: 'Compliance', value: 'WCAG 2.1 Alt-Text & Screen-Reader Synchronized' }
    ],
    stack: ['Three.js', 'WebXR', 'GLTF/GLB', 'Blender Pipeline', 'GLSL Shaders', 'Vector CAD'],
    indicatorClass: 'led-blue',
    terminalSnippet: `$ vdl-pipeline inspect --target="bucket-elevator-v4.cad"
✓ Draco mesh compression applied: 14.8MB -> 1.18MB (-92%)
✓ Sub-assembly hierarchy parsed: 48 operational nodes
✓ WebXR touch controls linked: 60fps locked on mobile safari & chrome`
  },
  {
    id: 'agentic-workflows',
    name: 'Autonomous Agentic Workflows',
    tagline: 'Multi-Model AI Orchestration & Task Runners',
    description: 'We architect autonomous background agent loops that connect web interfaces to core operational backends with continuous validation, self-healing retries, and cost/latency-aware routing.',
    deliverables: [
      'Self-healing task runners and continuous background verification loops with deterministic recovery',
      'Cost- and latency-aware routing across local and frontier models (Claude, DeepSeek, GPT-4o, Ollama)',
      'Operational event webhooks connecting user frontends directly to dispatch operators'
    ],
    specs: [
      { label: 'Architecture', value: 'Serverless Event-Driven State Machine' },
      { label: 'Dispatch Target', value: '< 650ms to WhatsApp Operator' },
      { label: 'Schema Strategy', value: 'Strict Type-Safe Pydantic / Zod Output Validation' },
      { label: 'Reliability', value: 'Auto-Retry Event Queue with Dead-Letter Storage' }
    ],
    stack: ['Autonomous Agents', 'LangChain', 'Event Webhooks', 'DeepSeek R1', 'Claude 3.7', 'PostgreSQL'],
    indicatorClass: 'led-crimson',
    terminalSnippet: `POST /api/orchestrator/dispatch-order HTTP/2
{
  "orderId": "VDL-9042",
  "routingEngine": "edge-priority-queue",
  "whatsappPayload": "DISPATCH_AUTHORIZED"
} -> 200 OK (38ms latency, zero human bottleneck)`
  },
  {
    id: 'enterprise-enablement',
    name: 'Enterprise AI Enablement & Training',
    tagline: 'Practical Upskilling & Governance',
    description: 'We deliver hands-on technical enablement and executive workshops based on the Atlas syllabus, transforming operational workforces through safe, auditable agent tooling and prompt architecture.',
    deliverables: [
      'Hands-on operational agent tooling tailored for engineering operators and technical managers',
      'Rigorous prompt architecture, schema enforcement, and automated eval test harnesses',
      'Enterprise compliance standards, data privacy isolation, and auditable operational logs'
    ],
    specs: [
      { label: 'Curriculum Base', value: 'Atlas Technical Modernisation Syllabus' },
      { label: 'Evaluation', value: 'Automated CI/CD Eval Harness for Prompt Reliability' },
      { label: 'Data Security', value: 'Zero-Retention Zero-Training Enterprise Boundaries' },
      { label: 'Standardization', value: 'OSHA / ISO Aligned Technical Verification' }
    ],
    stack: ['Atlas Syllabus', 'Structured Outputs', 'Prompt Architecture', 'CI/CD Evals', 'Audit Trails'],
    indicatorClass: 'led-blue',
    terminalSnippet: `[VDL-Atlas] Running Evaluation Suite against v2.4 Prompt Schemas...
✓ Deterministic JSON Schema Compliance: 100% (500/500 tests)
✓ Hallucination Boundary Score: 0.002 (Within ISO Target)
✓ Executive & Apprentice Syllabus Modules: Ready for Deployment`
  }
];

export default function CoreCapabilities() {
  const [activeTab, setActiveTab] = useState<string>('3d-twins');

  const activeDiscipline = DISCIPLINES.find((d) => d.id === activeTab) || DISCIPLINES[0];

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="solutions" 
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 hairline-t bg-[#FCFDFF]"
      aria-label="Core Engineering Disciplines"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header: Minimal, Authoritative, No Clichés */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100/90 border border-slate-200/80 text-slate-700 text-xs font-medium mb-4">
            <span className="led-blue" />
            <span>Studio Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-title text-slate-900 leading-tight font-heading">
            Architectural disciplines built for industrial scale.
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            We replace generic agency handoffs with three dedicated technical disciplines designed to deploy robust, production-grade autonomous systems and spatial pilots.
          </p>
        </div>

        {/* Studio Disciplines Interactive Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation: Discipline Tabs */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {DISCIPLINES.map((discipline) => {
              const isActive = discipline.id === activeTab;
              return (
                <button
                  key={discipline.id}
                  onClick={() => setActiveTab(discipline.id)}
                  className={`text-left p-5 rounded-xl transition-all duration-200 border cursor-pointer ${
                    isActive
                      ? 'bg-white border-slate-300 shadow-sm'
                      : 'bg-slate-50/60 border-slate-200/60 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`inline-block ${discipline.indicatorClass}`} />
                    <span className="text-[11px] font-mono text-slate-400 font-medium">DISCIPLINE</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight mb-1">
                    {discipline.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {discipline.tagline}
                  </p>
                </button>
              );
            })}

            <div className="p-5 rounded-xl border border-dashed border-slate-200 bg-white/50 mt-2">
              <div className="text-xs font-semibold text-slate-800 mb-1">Custom Architectural Sprints</div>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                Need a hybrid architecture combining WebXR with local multi-model LLM agents?
              </p>
              <button
                onClick={scrollToContact}
                className="text-xs font-semibold text-slate-900 hover:text-[#00B6FF] inline-flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Initiate scoping consultation</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Area: In-Depth Discipline Workbench */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDiscipline.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="studio-panel rounded-2xl p-6 sm:p-8"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 hairline-b">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={activeDiscipline.indicatorClass} />
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                        {activeDiscipline.tagline}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
                      {activeDiscipline.name}
                    </h3>
                  </div>

                  <button
                    onClick={scrollToContact}
                    className="btn-studio-primary px-4 py-2 rounded-lg text-xs font-semibold self-start sm:self-auto cursor-pointer"
                  >
                    Scope Pilot
                  </button>
                </div>

                {/* Narrative Focus */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed my-6">
                  {activeDiscipline.description}
                </p>

                {/* Deliverables / Architectural Highlights */}
                <div className="mb-6">
                  <div className="text-xs font-semibold text-slate-900 mb-3 tracking-tight">
                    Architectural Deliverables
                  </div>
                  <div className="space-y-2.5">
                    {activeDiscipline.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                        <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="leading-normal">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 mb-6">
                  {activeDiscipline.specs.map((spec, idx) => (
                    <div key={idx}>
                      <div className="text-[11px] text-slate-500 font-medium">{spec.label}</div>
                      <div className="text-xs font-semibold text-slate-900 mt-0.5">{spec.value}</div>
                    </div>
                  ))}
                </div>

                {/* Live Pipeline Telemetry Preview */}
                <div className="rounded-xl bg-slate-950 text-slate-200 p-4 font-mono text-xs overflow-x-auto shadow-inner">
                  <div className="flex items-center justify-between text-slate-400 text-[10px] pb-2 mb-2 hairline-b border-slate-800">
                    <span>OPERATIONAL VERIFICATION TRACE</span>
                    <span>VDL-CORE // PRODUCTION</span>
                  </div>
                  <pre className="whitespace-pre-wrap leading-relaxed text-slate-300">
                    {activeDiscipline.terminalSnippet}
                  </pre>
                </div>

                {/* Tech Stack Pills */}
                <div className="mt-6 pt-5 hairline-t flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium mr-2">Production Stack:</span>
                  {activeDiscipline.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white border border-slate-200 text-slate-700 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
