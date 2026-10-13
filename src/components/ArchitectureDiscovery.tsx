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
    recommendedFor: "Enterprises testing operational feasibility"
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
    featured: true
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
    recommendedFor: "Organizations with recurring technical transformation"
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
      className="relative w-full bg-[#08090e] text-white py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 overflow-hidden"
      aria-label="Architecture Discovery and Engagement Sprint Framework"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-cyan mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            <span>Structured Engagement Framework</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-heading text-white">
            Book Architecture <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-blue-400">Discovery</span>
          </h2>
          <p className="mt-4 text-silver/70 text-base md:text-lg font-light leading-relaxed">
            Eliminate technical ambiguity. We conduct structured sprints to evaluate your industrial CAD assets, agentic pipelines, and operational readiness.
          </p>
        </div>

        {/* Engagement Sprints */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {ENGAGEMENT_MODELS.map((model) => (
            <div
              key={model.name}
              className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-sm ${
                model.featured
                  ? 'bg-[#0f1422] border-2 border-cyan/50 shadow-[0_0_35px_rgba(0,229,255,0.12)] relative'
                  : 'bg-[#0a0c12] border border-white/10 hover:border-white/20'
              }`}
            >
              {model.featured && (
                <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-cyan text-black font-mono text-[10px] font-bold uppercase tracking-widest shadow-md">
                  Recommended Model
                </span>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-silver/40 uppercase">{model.tier}</span>
                  <span className="font-mono text-xs text-cyan uppercase font-medium">{model.timeline}</span>
                </div>
                <h3 className="text-xl font-bold font-heading uppercase text-white mb-3">
                  {model.name}
                </h3>
                <p className="text-sm text-silver/70 font-light mb-6 leading-relaxed">
                  {model.description}
                </p>

                <div className="space-y-2.5 mb-8 pt-4 border-t border-white/5">
                  <span className="font-mono text-[11px] text-silver/40 uppercase tracking-wider block">
                    Core Deliverables:
                  </span>
                  {model.deliverables.map((deliv, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-silver/80">
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-cyan flex-shrink-0" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <span className="font-mono text-[10px] text-silver/40 uppercase block mb-3">
                  Best For: {model.recommendedFor}
                </span>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Vortex Digi Labs, I would like to schedule a ${model.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center py-2.5 rounded-lg bg-white/5 hover:bg-cyan hover:text-black border border-white/15 hover:border-cyan text-xs font-mono uppercase tracking-wider transition-all"
                >
                  Direct Inquiry
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Transmission Booking Card */}
        <div className="max-w-2xl mx-auto rounded-3xl bg-[#0c0e16] border border-cyan/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/5 blur-3xl rounded-full pointer-events-none" />

          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-cyan/20 border border-cyan flex items-center justify-center mx-auto mb-6 text-cyan">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-heading uppercase text-white mb-2">
                Discovery Transmission Received
              </h3>
              <p className="text-sm text-silver/70 font-mono mb-8 max-w-md mx-auto">
                Our lead systems engineer will review your operational requirements and return an initial feasibility brief within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Vortex Digi Labs! I just booked an Architecture Discovery for ${formData.company || formData.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#25D366] text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-white transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Immediate WhatsApp Sync</span>
                </a>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs font-mono text-silver/40 hover:text-cyan uppercase"
                >
                  Submit Another Brief
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-cyan block mb-1">
                  Architecture Discovery Intake
                </span>
                <h3 className="text-2xl font-black font-heading uppercase text-white">
                  Schedule Direct Technical Session
                </h3>
                <p className="text-xs text-silver/60 font-light mt-1">
                  Connect directly with Lead Systems Architect Terence Dean Allen.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[11px] text-silver/60 uppercase block mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-silver/30 focus:border-cyan focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] text-silver/60 uppercase block mb-1.5">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@enterprise.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-silver/30 focus:border-cyan focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[11px] text-silver/60 uppercase block mb-1.5">
                    Enterprise / Company
                  </label>
                  <input
                    type="text"
                    placeholder="Organization Name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-silver/30 focus:border-cyan focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] text-silver/60 uppercase block mb-1.5">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+27..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-silver/30 focus:border-cyan focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[11px] text-silver/60 uppercase block mb-1.5">
                  Primary Capability Discipline
                </label>
                <select
                  value={formData.pillar}
                  onChange={(e) => setFormData({ ...formData, pillar: e.target.value })}
                  className="w-full bg-[#11141e] border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white focus:border-cyan focus:outline-none transition-colors"
                >
                  <option value="3d-twin">Pillar 1: Interactive 3D & Digital Twin Pilots (WebXR/Three.js)</option>
                  <option value="agentic-workflows">Pillar 2: Autonomous Agentic Workflows (Multi-Model AI Orchestration)</option>
                  <option value="ai-enablement">Pillar 3: Enterprise AI Enablement & Training (Atlas Syllabus)</option>
                  <option value="curriculum">Industrial Technical Curriculum Modernisation (e.g. SAGMA style)</option>
                </select>
              </div>

              <div>
                <label className="font-mono text-[11px] text-silver/60 uppercase block mb-1.5">
                  Operational Scope & Objectives
                </label>
                <textarea
                  rows={3}
                  placeholder="Outline the manual bottlenecks, legacy CAD assets, or automated workflows you need engineered..."
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-silver/30 focus:border-cyan focus:outline-none transition-colors resize-none"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-cyan text-black font-mono font-bold text-sm uppercase tracking-wider hover:bg-white hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
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
