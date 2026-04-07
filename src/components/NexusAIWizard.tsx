import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  Send, 
  CheckCircle2, 
  Loader2, 
  AlertCircle,
  Target,
  Rocket,
  Clock,
  Wallet,
  User,
  Globe,
  Search,
  MapPin,
  Smartphone,
  Layout,
  Zap,
  PhoneCall,
  ShoppingCart,
  Calendar,
  PenTool,
  MessageSquare,
  Database,
  Utensils,
  Briefcase,
  HardHat,
  GraduationCap,
  HeartPulse,
  MoreHorizontal
} from 'lucide-react';
import confetti from 'canvas-confetti';

// ===== CONFIGURATION =====
const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwsGVrodJSBRgk6vqoZOTLK1CRC_fV4ZeK66rMFCUFJeet8bNlRnsGQdqZgr4XqKd5EuQ/exec';
const WHATSAPP_NUMBER = '27XXXXXXXXXX'; // USER: Replace with your actual business number

interface WizardData {
  painPoint: string;
  p2_conditional: string;
  timeline: string;
  budget: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  websiteUrl: string;
  vision: string;
}

const INITIAL_DATA: WizardData = {
  painPoint: '',
  p2_conditional: '',
  timeline: '',
  budget: '',
  name: '',
  email: '',
  phone: '',
  company: '',
  websiteUrl: '',
  vision: '',
};

// --- HELPERS ---

// LEAD SCORING ALGORITHM
function calculateLeadScore(answers: WizardData) {
  let score = 0;
  
  // Budget weighting (max 30 points)
  const budgetScores: Record<string, number> = {
    'scale': 30,
    'growth': 20, 
    'starter': 10,
    'discuss': 15
  };
  
  const b = (answers.budget || '').toLowerCase();
  const budgetKey = b.includes('scale') ? 'scale' :
                    (b.includes('growth') || b.includes('r25k') || b.includes('r20k') || b.includes('r15k')) ? 'growth' :
                    (b.includes('starter') || b.includes('r8k') || b.includes('r5k') || b.includes('r3k')) ? 'starter' :
                    'discuss';
  
  score += budgetScores[budgetKey] || 5;
  
  // Timeline/Urgency weighting (max 25 points)
  const urgencyScores: Record<string, number> = {
    'urgent': 25,
    'this_month': 18,
    'next_quarter': 10,
    'exploring': 5
  };
  
  const t = (answers.timeline || '').toLowerCase();
  const timelineKey = (t.includes('urgent') || t.includes('asap')) ? 'urgent' :
                      t.includes('month') ? 'this_month' :
                      t.includes('quarter') ? 'next_quarter' :
                      'exploring';
  
  score += urgencyScores[timelineKey] || 5;
  
  // Pain point clarity (max 20 points)
  const specificPains = ['invisible', 'outdated', 'no_conversions', 'overwhelmed'];
  if (specificPains.includes(answers.painPoint)) {
    score += 20;
  } else if (answers.painPoint === 'new_business') {
    score += 12;
  } else {
    score += 5;
  }
  
  // Goal clarity (max 15 points)
  if (answers.p2_conditional && !answers.p2_conditional.toLowerCase().includes('all')) {
    score += 15;
  } else {
    score += 8;
  }
  
  // Engagement bonus (max 10 points)
  if (answers.phone) score += 3;
  if (answers.company) score += 3;
  if (answers.vision && answers.vision.length > 50) score += 4;
  
  return Math.min(score, 100);
}

const getTier = (score: number) => {
  if (score >= 80) return { label: `🔥 PRIORITY CLIENT - ${score}/100`, color: 'text-red-400', badge: 'bg-red-500/20 border-red-500', icon: '' };
  if (score >= 60) return { label: `✅ GREAT FIT - ${score}/100`, color: 'text-green-400', badge: 'bg-green-500/20 border-green-500', icon: '' };
  return { label: `🟡 WELCOME ABOARD - ${score}/100`, color: 'text-yellow-400', badge: 'bg-yellow-500/20 border-yellow-500', icon: '' };
};

// --- STEP COMPONENTS ---

const Step1 = ({ onNext }: { onNext: (f: keyof WizardData, v: string) => void }) => (
  <div className="space-y-4">
    <h3 className="text-xl font-mono text-cyan mb-6">What's your biggest challenge right now?</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {[
        { label: "Invisible Online", value: "invisible", desc: "Nobody can find me", color: "border-red-500/30 hover:border-red-500 text-red-100" },
        { label: "Outdated Image", value: "outdated", desc: "My site looks like 2010", color: "border-orange-500/30 hover:border-orange-500 text-orange-100" },
        { label: "Low Conversions", value: "no_conversions", desc: "Traffic but no sales", color: "border-orange-400/30 hover:border-orange-400 text-orange-50" },
        { label: "Manual Grind", value: "overwhelmed", desc: "Too much manual work", color: "border-green-500/30 hover:border-green-500 text-green-100" },
        { label: "Starting Fresh", value: "new_business", desc: "Build from scratch", color: "border-purple-500/30 hover:border-purple-500 text-purple-100" },
        { label: "Custom Need", value: "other", desc: "Something else...", color: "border-white/20 hover:border-white text-white" }
      ].map(opt => (
        <button
          key={opt.value}
          onClick={() => onNext('painPoint', opt.value)}
          className={`w-full p-4 rounded-xl bg-white/5 border ${opt.color} transition-all duration-300 text-left backdrop-blur-sm group`}
        >
          <div className="flex flex-col">
            <span className="font-mono text-sm uppercase tracking-wider font-bold">{opt.label}</span>
            <span className="text-[10px] opacity-40 uppercase mt-1">{opt.desc}</span>
          </div>
        </button>
      ))}
    </div>
  </div>
);

const Step2 = ({ painPoint, onNext, data, setData }: { painPoint: string, onNext: (f: keyof WizardData, v: string) => void, data: WizardData, setData: any }) => {
  const getBranch = () => {
    switch(painPoint) {
      case 'invisible': return {
        q: "Where do you want to be found?",
        opts: [
          { l: "Google Search results", v: "google", i: Search },
          { l: "Google Maps (Local)", v: "maps", i: MapPin },
          { l: "Social Media platforms", v: "social", i: Smartphone },
          { l: "Everywhere possible", v: "omni", i: Globe }
        ]
      };
      case 'outdated': return {
        q: "What's the main concern with current look?",
        opts: [
          { l: "Looks unprofessional", v: "amateur", i: User },
          { l: "Not mobile-friendly", v: "mobile", i: Smartphone },
          { l: "Slow loading / clunky", v: "speed", i: Zap },
          { l: "Just looks old", v: "stale", i: Clock }
        ]
      };
      case 'no_conversions': return {
        q: "What should visitors be doing?",
        opts: [
          { l: "Calling or emailing us", v: "leads", i: PhoneCall },
          { l: "Buying products online", v: "sales", i: ShoppingCart },
          { l: "Filling inquiry forms", v: "forms", i: Send },
          { l: "Booking appointments", v: "booking", i: Calendar }
        ]
      };
      case 'overwhelmed': return {
        q: "Which tasks take most of your time?",
        opts: [
          { l: "Creating content/posts", v: "content", i: PenTool },
          { l: "Responding to messages", v: "chat", i: MessageSquare },
          { l: "Manual admin/data entry", v: "admin", i: Database },
          { l: "Updating the website", v: "updates", i: Layout }
        ]
      };
      case 'new_business': return {
        q: "What type of business are you?",
        opts: [
          { l: "Restaurant / Food", v: "food", i: Utensils },
          { l: "Retail / E-comm", v: "retail", i: ShoppingCart },
          { l: "Professional Services", v: "pro", i: Briefcase },
          { l: "Trades / Construction", v: "trades", i: HardHat },
          { l: "Education / Coaching", v: "edu", i: GraduationCap },
          { l: "Health / Wellness", v: "health", i: HeartPulse },
          { l: "Other Industry", v: "other_ind", i: MoreHorizontal }
        ]
      };
      default: return null;
    }
  };

  const branch = getBranch();

  if (!branch) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-mono text-cyan mb-6">Tell us more about your situation:</h3>
        <textarea
          value={data.p2_conditional}
          onChange={e => setData((p: any) => ({ ...p, p2_conditional: e.target.value }))}
          className="w-full bg-white/5 border border-white/20 p-4 rounded-xl font-mono text-sm text-silver focus:border-cyan outline-none h-32 resize-none"
          placeholder="Type here..."
        />
        <button 
          onClick={() => onNext('p2_conditional', data.p2_conditional)}
          className="w-full p-4 bg-cyan/10 hover:bg-cyan/20 border border-cyan/40 text-cyan rounded-xl transition-all font-mono uppercase text-sm"
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-mono text-cyan mb-6">{branch.q}</h3>
      <div className="grid grid-cols-1 gap-2">
        {branch.opts.map(opt => (
          <button
            key={opt.v}
            onClick={() => onNext('p2_conditional', opt.v)}
            className="w-full p-4 rounded-xl bg-white/5 border border-cyan/20 hover:border-cyan text-silver transition-all duration-300 text-left backdrop-blur-sm group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <opt.i className="w-5 h-5 text-cyan" />
              <span className="font-mono text-sm uppercase tracking-wider">{opt.l}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const Step3 = ({ onNext }: { onNext: (f: keyof WizardData, v: string) => void }) => (
  <div className="space-y-4">
    <h3 className="text-xl font-mono text-cyan mb-6">When do you need this live?</h3>
    <div className="grid grid-cols-1 gap-3">
      {[
        { label: "ASAP (within 2 weeks)", value: "urgent" },
        { label: "This month", value: "this_month" },
        { label: "Next 1-3 months", value: "next_quarter" },
        { label: "Just exploring options", value: "exploring" }
      ].map(opt => (
        <button
          key={opt.value}
          onClick={() => onNext('timeline', opt.value)}
          className="w-full p-4 rounded-xl bg-white/5 border border-cyan/20 hover:border-cyan text-silver transition-all duration-300 text-left backdrop-blur-sm group flex items-center justify-between"
        >
          <span className="font-mono text-sm uppercase tracking-wider">{opt.label}</span>
          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      ))}
    </div>
  </div>
);

const Step4 = ({ painPoint, onNext }: { painPoint: string, onNext: (f: keyof WizardData, v: string) => void }) => {
  const getOpts = () => {
    if (['invisible', 'outdated'].includes(painPoint)) {
      return [
        { l: "Starter (R3k - R8k)", v: "starter", d: "Basic fix", c: "text-green-400" },
        { l: "Growth (R8k - R20k)", v: "growth", d: "Solid upgrade", c: "text-blue-400" },
        { l: "Scale (R20k - R40k+)", v: "scale", d: "Full transformation", c: "text-purple-400" },
        { l: "Show me packages", v: "discuss", d: "Advise me", c: "text-silver" }
      ];
    }
    if (['no_conversions', 'overwhelmed'].includes(painPoint)) {
      return [
        { l: "Starter (R5k - R12k)", v: "starter", d: "Essential tools", c: "text-green-400" },
        { l: "Growth (R12k - R25k)", v: "growth", d: "Optimization suite", c: "text-blue-400" },
        { l: "Scale (R25k - R50k+)", v: "scale", d: "Complete automation", c: "text-purple-400" },
        { l: "Need custom quote", v: "discuss", d: "Contact me", c: "text-silver" }
      ];
    }
    return [
      { l: "Starter (R5k - R10k)", v: "starter", d: "Launch ready", c: "text-green-400" },
      { l: "Growth (R10k - R25k)", v: "growth", d: "Professional launch", c: "text-blue-400" },
      { l: "Scale (R25k - R50k+)", v: "scale", d: "Premium presence", c: "text-purple-400" },
      { l: "Advise me first", v: "discuss", d: "Consultation", c: "text-silver" }
    ];
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-mono text-cyan mb-6">Investment range you're comfortable with?</h3>
      <div className="grid grid-cols-1 gap-2">
        {getOpts().map(opt => (
          <button
            key={opt.v}
            onClick={() => onNext('budget', opt.v)}
            className="w-full p-4 rounded-xl bg-white/5 border border-cyan/20 hover:border-cyan text-silver transition-all duration-300 text-left backdrop-blur-sm group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Wallet className={`w-4 h-4 ${opt.c}`} />
              <div>
                <span className="font-mono text-sm uppercase tracking-wider block">{opt.l}</span>
                <span className="text-[10px] opacity-40 uppercase">{opt.d}</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>
    </div>
  );
};

const Step5 = ({ data, setData, onSubmit, isSubmitting, error }: { data: WizardData, setData: any, onSubmit: any, isSubmitting: boolean, error: string }) => (
  <div className="space-y-4">
    <h3 className="text-xl font-mono text-cyan mb-4">Final transmission details:</h3>
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Name *"
          value={data.name}
          onChange={e => setData((p: any) => ({ ...p, name: e.target.value }))}
          className="w-full bg-white/5 border border-white/20 p-3 rounded-lg font-mono text-sm text-silver focus:border-cyan outline-none"
        />
        <input
          type="email"
          placeholder="Email *"
          value={data.email}
          onChange={e => setData((p: any) => ({ ...p, email: e.target.value }))}
          className="w-full bg-white/5 border border-white/20 p-3 rounded-lg font-mono text-sm text-silver focus:border-cyan outline-none"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="tel"
          placeholder="Phone/WhatsApp"
          value={data.phone}
          onChange={e => setData((p: any) => ({ ...p, phone: e.target.value }))}
          className="w-full bg-white/5 border border-white/20 p-3 rounded-lg font-mono text-sm text-silver focus:border-cyan outline-none"
        />
        <input
          type="text"
          placeholder="Company"
          value={data.company}
          onChange={e => setData((p: any) => ({ ...p, company: e.target.value }))}
          className="w-full bg-white/5 border border-white/20 p-3 rounded-lg font-mono text-sm text-silver focus:border-cyan outline-none"
        />
      </div>
      <input
        type="text"
        placeholder="Website URL (if any)"
        value={data.websiteUrl}
        onChange={e => setData((p: any) => ({ ...p, websiteUrl: e.target.value }))}
        className="w-full bg-white/5 border border-white/20 p-3 rounded-lg font-mono text-sm text-silver focus:border-cyan outline-none"
      />
      <textarea
        placeholder="How can we bring your vision to life?"
        rows={2}
        value={data.vision}
        onChange={e => setData((p: any) => ({ ...p, vision: e.target.value }))}
        className="w-full bg-white/5 border border-white/20 p-3 rounded-lg font-mono text-sm text-silver focus:border-cyan outline-none resize-none"
      />
      {error && <div className="flex items-center gap-2 text-red-400 text-xs font-mono"><AlertCircle className="w-4 h-4" /> {error}</div>}
      <button
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full py-4 bg-cyan hover:bg-white text-charcoal font-mono font-bold uppercase tracking-widest rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_0_20px_rgba(0,255,255,0.3)]"
      >
        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Launch Inquiry'}
        {!isSubmitting && <Send className="w-4 h-4" />}
      </button>
    </div>
  </div>
);

// --- MAIN WIZARD ---

export default function NexusAIWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [direction, setDirection] = useState(1);
  const [typing, setTyping] = useState(false);
  const [resumePrompt, setResumePrompt] = useState(false);

  // Recovery Logic
  useEffect(() => {
    const saved = localStorage.getItem('nexus_wizard_progress');
    if (saved) {
      const { currentStep, answers, timestamp } = JSON.parse(saved);
      const isFresh = Date.now() - timestamp < 24 * 60 * 60 * 1000;
      if (isFresh && currentStep > 0 && currentStep < 5) {
        setResumePrompt(true);
      } else {
        localStorage.removeItem('nexus_wizard_progress');
      }
    }
  }, []);

  const saveToLocal = (s: number, d: WizardData) => {
    localStorage.setItem('nexus_wizard_progress', JSON.stringify({
      currentStep: s,
      answers: d,
      timestamp: Date.now()
    }));
  };

  const handleNext = (field: keyof WizardData, value: string) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    saveToLocal(step + 1, newData);
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'wizard_branch_taken', { 
        from_step: step + 1, 
        branch_path: `${field} → ${value}` 
      });
    }

    setDirection(1);
    setTyping(true);
    setTimeout(() => {
      setStep(prev => prev + 1);
      setTyping(false);
    }, 600);
  };

  const handleBack = () => {
    setDirection(-1);
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!data.name.trim()) { setError("Identification required."); return; }
    if (!data.email.trim() || !data.email.includes('@')) { setError("Valid contact vector required."); return; }

    setIsSubmitting(true);
    setError('');

    const leadScore = calculateLeadScore(data);
    const mappedBudget = { starter: 'Starter', growth: 'Growth', scale: 'Scale', discuss: "Let's Discuss" }[data.budget] || data.budget;
    
    // Construct the flat payload (Must match Apps Script expectations exactly)
    const payload = {
      Name: data.name,
      Email: data.email,
      Phone: data.phone || '',
      Company: data.company || '',
      Primary_Service: `${data.painPoint} -> ${data.p2_conditional}`,
      Budget: mappedBudget,
      Lead_Score: Number(leadScore), // STRICT NUMBER
      Vision: data.vision || ''      // TEXT ONLY - NO PREFIXES
    };

    // ACTION 2: DEBUG LOGGING
    console.log('=== WIZARD PAYLOAD DEBUG ===');
    console.log('Full payload object:', JSON.stringify(payload, null, 2));
    console.log('Lead_Score type:', typeof payload.Lead_Score);
    console.log('Lead_Score value:', payload.Lead_Score);
    console.log('============================');

    try {
      await fetch(FORM_ENDPOINT, { 
        method: 'POST', 
        mode: 'no-cors', 
        headers: { 'Content-Type': 'text/plain' }, // Using text/plain for no-cors JSON bypass
        body: JSON.stringify(payload) 
      });
      
      // Analytics & Confetti
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'lead_scored', { score: leadScore, tier: getTier(leadScore).label });
        (window as any).gtag('event', 'generate_lead', { 
          form_name: 'nexus_ai_wizard_v2', 
          score: leadScore
        });
      }
      
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#00ffff', '#ffffff', '#a855f7'] });
      localStorage.removeItem('nexus_wizard_progress');
      setIsSubmitted(true);
    } catch (err) { 
      console.error('Submission error:', err);
      setError('Signal lost. Please try re-transmitting.'); 
    } finally { 
      setIsSubmitting(false); 
    }
  };

  const startFresh = () => {
    localStorage.removeItem('nexus_wizard_progress');
    setData(INITIAL_DATA);
    setStep(0);
    setResumePrompt(false);
  };

  const resumeSession = () => {
    const saved = localStorage.getItem('nexus_wizard_progress');
    if (saved) {
      const { currentStep, answers } = JSON.parse(saved);
      setData(answers);
      setStep(currentStep);
    }
    setResumePrompt(false);
  };

  if (resumePrompt) {
    return (
      <section id="contact" className="py-24 px-6 flex justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/5 border border-cyan/30 backdrop-blur-xl p-10 rounded-3xl text-center max-w-sm">
          <h2 className="text-2xl font-bold text-white mb-2">👋 Welcome back!</h2>
          <p className="text-silver/60 font-mono text-sm mb-8">You were at Step {step + 1} of 5. Want to continue where you left off?</p>
          <div className="flex flex-col gap-3">
            <button onClick={resumeSession} className="py-4 bg-cyan text-charcoal font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-all">Continue Session</button>
            <button onClick={startFresh} className="py-4 text-cyan font-mono text-xs uppercase tracking-widest hover:text-white transition-all">Start Fresh</button>
          </div>
        </motion.div>
      </section>
    );
  }

  if (isSubmitted) {
    const finalScore = calculateLeadScore(data);
    const tier = getTier(finalScore);
    
    // WhatsApp pre-fill
    const waMessage = `Hi Vortex Team! 👋\n\nI just completed your NEXUS AI discovery wizard.\n\n👤 Name: ${data.name}\n📧 Email: ${data.email}\n🎯 Challenge: ${data.painPoint}\n💡 Goal: ${data.p2_conditional}\n⏰ Timeline: ${data.timeline}\n💰 Budget: ${data.budget}\n\nLooking forward to hearing from you!`;
    const waUrl = `https://wa.me/27XXXXXXXXXX?text=${encodeURIComponent(waMessage)}`;

    return (
      <section id="contact" className="py-24 max-w-2xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-8">
          <div className="w-20 h-20 bg-cyan rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(0,255,255,0.4)]">
            <CheckCircle2 className="w-12 h-12 text-charcoal" />
          </div>
          <div>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2 italic">DISCOVERY COMPLETE! 🚀</h2>
            <div className={`inline-block px-4 py-1 rounded-full border ${tier.badge} text-[10px] font-bold uppercase tracking-widest ${tier.color}`}>
              {tier.icon} {tier.label}
            </div>
            <p className="font-mono text-silver/60 mt-4 max-w-md mx-auto">Thanks {data.name}! Our team has received your data and is ready to launch your vision.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-left">
                <h4 className="font-mono text-cyan text-[10px] uppercase tracking-widest mb-3">Transmission Profile</h4>
                <div className="space-y-1 text-xs font-mono opacity-60">
                  <p>ID: VLAB-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                  <p>SCORE: {finalScore}/100</p>
                  <p>STATUS: VERIFIED</p>
                </div>
             </div>
             <a 
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'whatsapp_initiated', { method: 'success_screen_button', lead_score: finalScore });
                }
              }}
              className="p-6 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-2xl flex flex-col items-center justify-center gap-2 group transition-transform hover:scale-[1.02]"
             >
                <MessageSquare className="w-8 h-8 text-white group-hover:animate-bounce" />
                <span className="text-white font-bold uppercase tracking-widest text-sm">Quick Connect via WhatsApp</span>
             </a>
          </div>

          <button onClick={() => { setData(INITIAL_DATA); setStep(0); setIsSubmitted(false); }} className="text-silver/30 hover:text-cyan font-mono text-[10px] uppercase tracking-widest transition-colors">Submit Another Project</button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-charcoal">
      <div className="max-w-xl mx-auto px-6 relative z-10">
        
        {/* PROGRESS BAR v2.0 */}
        <div className="mb-12 relative">
          <div className="flex justify-between items-center relative z-10">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <motion.div 
                  initial={false}
                  animate={{ 
                    backgroundColor: i <= step ? '#00ffff' : 'rgba(255,255,255,0.1)',
                    scale: i === step ? 1.2 : 1
                  }}
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${i < step ? 'border-cyan' : i === step ? 'border-cyan' : 'border-white/10'}`}
                >
                  {i < step ? <CheckCircle2 className="w-4 h-4 text-charcoal" /> : i === step ? <div className="w-1.5 h-1.5 bg-charcoal rounded-full animate-pulse" /> : null}
                </motion.div>
              </div>
            ))}
          </div>
          <div className="absolute top-3 left-0 w-full h-[2px] bg-white/10 -z-0" />
          <motion.div 
            className="absolute top-3 left-0 h-[2px] bg-gradient-to-r from-cyan to-purple-500 -z-0"
            initial={{ width: '0%' }}
            animate={{ width: `${step * 25}%` }}
          />
          <div className="flex justify-between mt-4">
             <span className="text-[10px] font-mono text-cyan uppercase tracking-tighter">Step {step + 1} of 5</span>
             <span className="text-[10px] font-mono text-silver/30 uppercase tracking-tighter">~{Math.max(0.5, 2 - step * 0.4).toFixed(1)} min remaining</span>
          </div>
        </div>

        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait" custom={direction}>
            {!typing && (
              <motion.div
                key={step}
                custom={direction}
                variants={{
                  initial: (dir: number) => ({ opacity: 0, x: dir * 50, filter: 'blur(10px)' }),
                  animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
                  exit: (dir: number) => ({ opacity: 0, x: dir * -50, filter: 'blur(10px)' })
                }}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ type: "spring", damping: 25, stiffness: 120 }}
                className="bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan/5 blur-3xl rounded-full -mr-16 -mt-16" />
                <div className="mb-8">
                  {step > 0 && (
                    <button onClick={handleBack} className="flex items-center gap-1 text-silver/20 hover:text-silver transition-colors font-mono text-[9px] uppercase tracking-widest mb-6 border border-white/10 px-2 py-1 rounded-md">
                      <ChevronLeft className="w-3 h-3" /> Back
                    </button>
                  )}
                  {step === 0 && <Step1 onNext={handleNext} />}
                  {step === 1 && <Step2 painPoint={data.painPoint} onNext={handleNext} data={data} setData={setData} />}
                  {step === 2 && <Step3 onNext={handleNext} />}
                  {step === 3 && <Step4 painPoint={data.painPoint} onNext={handleNext} />}
                  {step === 4 && <Step5 data={data} setData={setData} onSubmit={handleSubmit} isSubmitting={isSubmitting} error={error} />}
                </div>
              </motion.div>
            )}

            {typing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center h-64">
                <div className="flex gap-2">
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} animate={{ y: [0, -8, 0], opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }} className="w-2 h-2 bg-cyan rounded-full" />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
