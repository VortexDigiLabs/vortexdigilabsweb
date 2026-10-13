import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Check, 
  AlertCircle, 
  Loader2, 
  MessageSquare,
  Calendar,
  Terminal,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwsGVrodJSBRgk6vqoZOTLK1CRC_fV4ZeK66rMFCUFJeet8bNlRnsGQdqZgr4XqKd5EuQ/exec';
const WHATSAPP_NUMBER = '27658024718';

export default function ArchitectureDiscovery() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    pillar: '3d-twin',
    preferredDate: '',
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
      Primary_Service: `Technical Discovery -> ${formData.pillar} [Date: ${formData.preferredDate || 'Flexible'}]`,
      Budget: 'Futuristic Minimalist Discovery Sprint',
      Lead_Score: 95,
      Vision: formData.scope || 'Direct Booking via Vortex Digi Labs Obsidian portal'
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

      confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
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
      id="discovery" 
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08] overflow-hidden"
      aria-label="Technical Discovery and Architecture Session"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 font-mono text-[11px] mb-4">
            <span className="ping-crimson" />
            <span>DISCOVERY TERMINAL // DIRECT BOOKING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-heading">
            READY TO ARCHITECT YOUR AI ADVANTAGE?
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Direct technical scoping session with Lead Systems Architect Terence Dean Allen. Zero agency fluff — pure systems feasibility.
          </p>
        </div>

        {/* Discovery Booking Console Card */}
        <div className="max-w-2xl mx-auto rounded-3xl obsidian-glass-panel p-8 sm:p-12 border border-white/10 relative overflow-hidden">
          
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6 text-emerald-400">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-heading uppercase text-white mb-2">
                DISCOVERY TRANSMISSION RECEIVED
              </h3>
              <p className="text-sm text-slate-300 font-mono mb-8 max-w-md mx-auto leading-relaxed">
                Our lead systems engineer will review your operational requirements and return an initial feasibility brief within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Vortex Digi Labs! I just booked a Technical Discovery Session for ${formData.company || formData.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glass-cta px-6 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>DIRECT WHATSAPP SYNC</span>
                </a>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs font-mono text-slate-400 hover:text-white uppercase font-bold py-2 px-3"
                >
                  SUBMIT ANOTHER BRIEF
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs">
                <span className="text-white font-bold">TERMINAL // INTAKE FORM</span>
                <span className="text-[#00B6FF]">SYS: 2026-STABLE</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[11px] text-slate-300 uppercase block mb-1.5 font-semibold">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-slate-500 focus:border-[#FF2E2E] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] text-slate-300 uppercase block mb-1.5 font-semibold">
                    WORK EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@enterprise.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-slate-500 focus:border-[#FF2E2E] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[11px] text-slate-300 uppercase block mb-1.5 font-semibold">
                    ENTERPRISE / COMPANY
                  </label>
                  <input
                    type="text"
                    placeholder="Organization Name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-slate-500 focus:border-[#FF2E2E] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] text-slate-300 uppercase block mb-1.5 font-semibold">
                    PREFERRED SESSION DATE
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-slate-500 focus:border-[#00B6FF] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[11px] text-slate-300 uppercase block mb-1.5 font-semibold">
                  PRIMARY CAPABILITY DISCIPLINE
                </label>
                <select
                  value={formData.pillar}
                  onChange={(e) => setFormData({ ...formData, pillar: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white focus:border-[#FF2E2E] focus:outline-none transition-colors"
                >
                  <option value="3d-twin">Pillar 1: Interactive 3D & Digital Twin Pilots (WebGL/Three.js)</option>
                  <option value="agentic-workflows">Pillar 2: Autonomous Workflows & Agentic Systems (Google AI Studio/RAG)</option>
                  <option value="rapid-prototyping">Pillar 3: High-Velocity Application Prototyping (PWAs & Edge Tools)</option>
                  <option value="ai-enablement">Pillar 4: Enterprise AI Enablement & Training (Workforce Upskilling)</option>
                </select>
              </div>

              <div>
                <label className="font-mono text-[11px] text-slate-300 uppercase block mb-1.5 font-semibold">
                  OPERATIONAL SCOPE & OBJECTIVES
                </label>
                <textarea
                  rows={3}
                  placeholder="Outline the bottlenecks, legacy CAD files, or automated pipelines you need architected..."
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-slate-500 focus:border-[#FF2E2E] focus:outline-none transition-colors resize-none"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-950/40 border border-red-500/50 text-[#FF2E2E] font-mono text-xs">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-glass-cta py-4 rounded-full font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#FF2E2E]" />
                    <span>TRANSMITTING DISCOVERY REQUEST...</span>
                  </>
                ) : (
                  <>
                    <span>TRANSMIT DISCOVERY BRIEF</span>
                    <Send className="w-4 h-4 text-[#FF2E2E]" />
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
