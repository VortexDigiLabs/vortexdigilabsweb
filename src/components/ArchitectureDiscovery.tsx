import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Check, 
  AlertCircle, 
  Loader2, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwsGVrodJSBRgk6vqoZOTLK1CRC_fV4ZeK66rMFCUFJeet8bNlRnsGQdqZgr4XqKd5EuQ/exec';
const WHATSAPP_NUMBER = '27658024718';

const ENGAGEMENT_MODELS = [
  {
    tier: 'Diagnostic Sprint',
    name: 'Architecture Discovery',
    timeline: '2-Week Rapid Diagnostic',
    description: 'Deep technical feasibility assessment for digital twins or agentic automation pipelines before capital commitment.',
    deliverables: [
      '2D-to-3D asset pipeline audit & Draco budget validation',
      'Multi-model LLM latency & unit economics calculation',
      'Full architectural specification & interactive prototype wireframe',
      'Executive risk & compliance review (Atlas syllabus)'
    ],
    recommendedFor: 'Enterprises testing operational feasibility',
  },
  {
    tier: 'Core Engineering',
    name: 'Production Pilot Deployment',
    timeline: '4–8 Week Engineering Cycle',
    description: 'End-to-end production development and zero-install browser deployment of a mission-critical pilot.',
    deliverables: [
      'High-fidelity Three.js/WebXR interactive equipment suite',
      'Self-healing agentic task runner with API webhook routing',
      'Automated fallback & error-recovery telemetry',
      'Full WCAG / Alt-text compliance & screen-reader integration'
    ],
    recommendedFor: 'Industrial training & high-velocity edge operations',
    featured: true,
  },
  {
    tier: 'Ongoing Partnership',
    name: 'Enterprise SLA & Engineering Retainer',
    timeline: 'Quarterly / Annual Retainer',
    description: 'Dedicated systems engineering pod maintaining operational agents, 3D pipelines, and executive enablement.',
    deliverables: [
      'Ongoing multi-model prompt & weight fine-tuning',
      'Monthly Atlas executive syllabus workshops & upskilling',
      'Sub-hour incident escalation & telemetry monitoring',
      'Zero-downtime model routing upgrades'
    ],
    recommendedFor: 'Organizations with recurring technical transformation',
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

      confetti({ particleCount: 80, spread: 50, origin: { y: 0.6 } });
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
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 hairline-t bg-[#FCFDFF]"
      aria-label="Architecture Discovery and Engagement Sprint Framework"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100/90 border border-slate-200/80 text-slate-700 text-xs font-medium mb-4">
            <span className="led-blue" />
            <span>Structured Engagements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-title text-slate-900 leading-tight font-heading">
            Book an architecture discovery sprint.
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            Eliminate technical ambiguity. We conduct structured sprints to evaluate your industrial CAD assets, agentic pipelines, and operational readiness.
          </p>
        </div>

        {/* Engagement Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {ENGAGEMENT_MODELS.map((model) => (
            <div
              key={model.name}
              className={`studio-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between ${
                model.featured
                  ? 'border-slate-400/90 ring-1 ring-slate-400/30'
                  : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500">{model.tier}</span>
                  <span className="text-xs font-mono text-slate-700">{model.timeline}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2 font-heading">
                  {model.name}
                </h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {model.description}
                </p>

                <div className="space-y-2 mb-8 pt-4 hairline-t">
                  <div className="text-xs font-semibold text-slate-900 mb-2">Deliverables:</div>
                  {model.deliverables.map((deliv, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <Check className="w-3.5 h-3.5 mt-0.5 text-emerald-600 flex-shrink-0" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 hairline-t">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Vortex Digi Labs, I would like to schedule a ${model.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center py-2.5 rounded-lg btn-studio-secondary text-xs font-semibold"
                >
                  Schedule Initial Consultation
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Intake Booking Form Card */}
        <div className="max-w-2xl mx-auto rounded-2xl studio-panel p-6 sm:p-10">
          
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-5 text-emerald-600">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2 font-heading">
                Discovery brief received
              </h3>
              <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto leading-relaxed">
                Our lead systems engineer will review your operational requirements and return an initial feasibility brief within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Vortex Digi Labs! I just booked an Architecture Discovery for ${formData.company || formData.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-studio-primary px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Immediate WhatsApp Sync</span>
                </a>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-slate-500 hover:text-slate-900 font-medium py-2 px-3"
                >
                  Submit another brief
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  Schedule Direct Technical Session
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Connect directly with Lead Systems Architect Terence Dean Allen.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-800 block mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-800 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-800 block mb-1.5">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@enterprise.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-800 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-800 block mb-1.5">
                    Enterprise / Company
                  </label>
                  <input
                    type="text"
                    placeholder="Organization Name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-800 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-800 block mb-1.5">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+27..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-800 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-800 block mb-1.5">
                  Primary Capability Discipline
                </label>
                <select
                  value={formData.pillar}
                  onChange={(e) => setFormData({ ...formData, pillar: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:border-slate-800 focus:outline-none transition-colors"
                >
                  <option value="3d-twin">Discipline 1: Interactive 3D & Digital Twin Pilots (WebXR/Three.js)</option>
                  <option value="agentic-workflows">Discipline 2: Autonomous Agentic Workflows (Multi-Model AI Orchestration)</option>
                  <option value="ai-enablement">Discipline 3: Enterprise AI Enablement & Training (Atlas Syllabus)</option>
                  <option value="curriculum">Industrial Technical Curriculum Modernisation (e.g. SAGMA)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-800 block mb-1.5">
                  Operational Scope & Objectives
                </label>
                <textarea
                  rows={3}
                  placeholder="Outline the manual bottlenecks, legacy CAD assets, or automated workflows you need engineered..."
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-800 focus:outline-none transition-colors resize-none"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-studio-primary py-3.5 rounded-lg text-sm font-semibold tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
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
