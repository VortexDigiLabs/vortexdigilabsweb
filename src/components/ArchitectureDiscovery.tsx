import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Calendar,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwsGVrodJSBRgk6vqoZOTLK1CRC_fV4ZeK66rMFCUFJeet8bNlRnsGQdqZgr4XqKd5EuQ/exec';
const WHATSAPP_NUMBER = '27658024718';

const ENGAGEMENT_MODELS = [
  {
    tier: "SPRINT 01",
    name: "Architecture Discovery Sprint",
    timeline: "2-Week Rapid Diagnostic",
    description: "Deep technical feasibility assessment for digital twins or agentic automation pipelines before capital commitment.",
    deliverables: [
      "2D-to-3D asset pipeline audit & Draco budget validation",
      "Multi-model LLM latency & unit economics map",
      "Full architecture specification & interactive prototype wireframe",
      "Executive risk & compliance review (Atlas syllabus)"
    ],
    recommendedFor: "Enterprises testing operational feasibility",
    accent: "blue"
  },
  {
    tier: "SPRINT 02",
    name: "Production Pilot Deployment",
    timeline: "4–8 Week Engineering Cycle",
    description: "End-to-end production development and zero-install browser deployment of a mission-critical pilot.",
    deliverables: [
      "High-fidelity Three.js/WebXR interactive equipment suite",
      "Self-healing agentic task runner with API webhook routing",
      "Automated fallback & error-recovery telemetry",
      "Full WCAG / Alt-text compliance & screen-reader integration"
    ],
    recommendedFor: "Industrial training & high-velocity edge operations",
    featured: true,
    accent: "crimson"
  },
  {
    tier: "SPRINT 03",
    name: "Enterprise SLA & Engineering Retainer",
    timeline: "Quarterly / Annual Partnership",
    description: "Dedicated systems engineering pod maintaining operational agents, 3D pipelines, and executive enablement.",
    deliverables: [
      "Ongoing multi-model prompt & weight fine-tuning",
      "Monthly Atlas executive syllabus workshops & upskilling",
      "Sub-hour incident escalation & telemetry monitoring",
      "Zero-downtime model routing upgrades"
    ],
    recommendedFor: "Organizations with recurring technical transformation",
    accent: "deep-blue"
  }
];

export default function ArchitectureDiscovery() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    pillar: '3d-twin',
    scope: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please provide your name and work email.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const payload = {
      Name: formData.name,
      Email: formData.email,
      Phone: formData.phone || '',
      Company: formData.company || '',
      Primary_Service: `Architecture Discovery -> ${formData.pillar}`,
      Budget: 'Architecture Discovery Sprint',
      Lead_Score: 95,
      Vision: formData.scope || 'Discovery Booking via Solutions Lab portal'
    };

    try {
      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload)
      });

      confetti({ particleCount: 120, spread: 60, origin: { y: 0.6 } });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setError('Signal lost. Please try again or connect via direct WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 overflow-hidden"
      aria-label="Architecture Discovery and Engagement Sprint Framework"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#00B6FF] mb-3 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#00B6FF] animate-pulse" />
            <span>Structured Engagement Framework</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-heading text-slate-900">
            Book Architecture <span className="brand-gradient-text-alt">Discovery</span>
          </h2>
          <p className="mt-4 text-slate-700 text-base md:text-lg font-normal leading-relaxed">
            Eliminate technical ambiguity. We conduct structured sprints to evaluate your industrial CAD assets, agentic pipelines, and operational readiness.
          </p>
        </div>

        {/* Engagement Sprints Grid (Luminous Frosted Glass Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {ENGAGEMENT_MODELS.map((model) => (
            <div
              key={model.name}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 luminous-glass-card ${
                model.featured
                  ? 'border-2 border-[#FF1E43]/60 shadow-xl shadow-red-500/10 relative'
                  : 'hover:border-[#00B6FF]/50'
              }`}
            >
              {model.featured && (
                <span className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-[#FF1E43] text-white font-mono text-[10px] font-bold uppercase tracking-widest shadow-md">
                  Recommended Model
                </span>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-slate-600 font-bold uppercase">{model.tier}</span>
                  <span className="font-mono text-xs font-bold text-[#00B6FF] uppercase">{model.timeline}</span>
                </div>
                <h3 className="text-xl font-bold font-heading uppercase text-slate-900 mb-3">
                  {model.name}
                </h3>
                <p className="text-sm text-slate-700 font-normal mb-6 leading-relaxed">
                  {model.description}
                </p>

                <div className="space-y-2.5 mb-8 pt-4 border-t border-slate-200">
                  <span className="font-mono text-[11px] text-slate-600 font-bold uppercase tracking-wider block">
                    Core Deliverables:
                  </span>
                  {model.deliverables.map((deliv, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-[#00B6FF] flex-shrink-0" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <span className="font-mono text-[10px] text-slate-600 font-bold uppercase block mb-3">
                  Best For: {model.recommendedFor}
                </span>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Vortex Digi Labs, I would like to schedule a ${model.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center py-3 rounded-xl bg-slate-100 hover:bg-[#00B6FF] hover:text-white border border-slate-300 hover:border-[#00B6FF] text-xs font-mono uppercase tracking-wider font-bold transition-all text-slate-900"
                >
                  Direct Inquiry
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Transmission Booking Card */}
        <div className="max-w-2xl mx-auto rounded-3xl p-8 sm:p-12 shadow-2xl luminous-glass-card relative overflow-hidden border border-slate-200/90">
          
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#00B6FF]/15 border border-[#00B6FF] flex items-center justify-center mx-auto mb-6 text-[#00B6FF]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-heading uppercase text-slate-900 mb-2">
                Discovery Transmission Received
              </h3>
              <p className="text-sm text-slate-700 font-mono mb-8 max-w-md mx-auto">
                Our lead systems engineer will review your operational requirements and return an initial feasibility brief within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Vortex Digi Labs! I just booked an Architecture Discovery for ${formData.company || formData.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#25D366] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:bg-[#1ebe5b] transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Immediate WhatsApp Sync</span>
                </a>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs font-mono text-slate-500 hover:text-[#00B6FF] uppercase font-bold"
                >
                  Submit Another Brief
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#00B6FF] font-bold block mb-1">
                  Architecture Discovery Intake
                </span>
                <h3 className="text-2xl font-black font-heading uppercase text-slate-900">
                  Schedule Direct Technical Session
                </h3>
                <p className="text-xs text-slate-600 font-normal mt-1">
                  Connect directly with Lead Systems Architect Terence Dean Allen.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[11px] text-slate-700 font-bold uppercase block mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 placeholder-slate-400 focus:border-[#00B6FF] focus:outline-none transition-colors shadow-sm"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] text-slate-700 font-bold uppercase block mb-1.5">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@enterprise.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 placeholder-slate-400 focus:border-[#00B6FF] focus:outline-none transition-colors shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[11px] text-slate-700 font-bold uppercase block mb-1.5">
                    Enterprise / Company
                  </label>
                  <input
                    type="text"
                    placeholder="Organization Name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 placeholder-slate-400 focus:border-[#00B6FF] focus:outline-none transition-colors shadow-sm"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] text-slate-700 font-bold uppercase block mb-1.5">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+27..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 placeholder-slate-400 focus:border-[#00B6FF] focus:outline-none transition-colors shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[11px] text-slate-700 font-bold uppercase block mb-1.5">
                  Primary Capability Discipline
                </label>
                <select
                  value={formData.pillar}
                  onChange={(e) => setFormData({ ...formData, pillar: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 focus:border-[#00B6FF] focus:outline-none transition-colors shadow-sm"
                >
                  <option value="3d-twin">Pillar 1: Interactive 3D & Digital Twin Pilots (WebXR/Three.js)</option>
                  <option value="agentic-workflows">Pillar 2: Autonomous Agentic Workflows (Multi-Model AI Orchestration)</option>
                  <option value="ai-enablement">Pillar 3: Enterprise AI Enablement & Training (Atlas Syllabus)</option>
                  <option value="curriculum">Industrial Technical Curriculum Modernisation (e.g. SAGMA style)</option>
                </select>
              </div>

              <div>
                <label className="font-mono text-[11px] text-slate-700 font-bold uppercase block mb-1.5">
                  Operational Scope & Objectives
                </label>
                <textarea
                  rows={3}
                  placeholder="Outline the manual bottlenecks, legacy CAD assets, or automated workflows you need engineered..."
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 placeholder-slate-400 focus:border-[#00B6FF] focus:outline-none transition-colors shadow-sm resize-none"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-[#FF1E43] font-mono text-xs">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-electric-gradient py-4 rounded-full font-mono font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting Discovery Request...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Architecture Brief</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

        </div>

      </div>
    </section>
  );
}
