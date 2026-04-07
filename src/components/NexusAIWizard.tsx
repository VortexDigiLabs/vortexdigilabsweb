import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  User
} from 'lucide-react';

// ===== CONFIGURATION =====
const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwsGVrodJSBRgk6vqoZOTLK1CRC_fV4ZeK66rMFCUFJeet8bNlRnsGQdqZgr4XqKd5EuQ/exec';

interface WizardData {
  painPoint: string;
  goal: string;
  timeline: string;
  budget: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  vision: string;
}

const INITIAL_DATA: WizardData = {
  painPoint: '',
  goal: '',
  timeline: '',
  budget: '',
  name: '',
  email: '',
  phone: '',
  company: '',
  vision: '',
};

export default function NexusAIWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [direction, setDirection] = useState(1); // 1 for next, -1 for back
  const [typing, setTyping] = useState(false);

  // GA4 Helper
  const trackEvent = (name: string, params?: object) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', name, params);
    }
  };

  useEffect(() => {
    trackEvent('wizard_started');
    return () => {
      if (!isSubmitted) {
        trackEvent('wizard_abandoned', { last_completed_step: step });
      }
    };
  }, []);

  const handleNext = (field?: keyof WizardData, value?: string) => {
    if (field && value) {
      setData(prev => ({ ...prev, [field]: value }));
      trackEvent(`wizard_step_${step + 1}_complete`, { step_number: step + 1, answer: value });
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

  const validateStep5 = () => {
    if (!data.name.trim()) return "Identification required.";
    if (!data.email.trim() || !data.email.includes('@')) return "Valid contact vector required.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateStep5();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Mapping logic
    const primaryService = `${data.painPoint} -> ${data.goal}`;
    const mappedBudget = {
      starter: 'R3k - R8k',
      growth: 'R8k - R25k',
      scale: 'R25k - R50k+',
      discuss: "Let's Discuss"
    }[data.budget] || data.budget;

    const summaryVision = `
Challenge: ${data.painPoint}
Goal: ${data.goal}
Urgency: ${data.timeline}
Budget: ${mappedBudget}
Message: ${data.vision}
    `.trim();

    const payload = {
      timestamp: new Date().toISOString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      primary_service: primaryService,
      addons: '',
      budget: mappedBudget,
      vision: summaryVision
    };

    try {
      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      trackEvent('generate_lead', { 
        form_name: 'nexus_ai_wizard',
        pain_point: data.painPoint,
        goal: data.goal,
        timeline: data.timeline,
        budget: data.budget
      });

      setIsSubmitted(true);
    } catch (err) {
      setError('Signal lost. Please try re-transmitting.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Components for each step
  const Step1 = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-mono text-cyan mb-6">What's your biggest challenge right now?</h3>
      <div className="grid grid-cols-1 gap-3">
        {[
          { label: "Nobody can find me online", value: "invisible", color: "border-red-500/30 hover:border-red-500 text-red-100" },
          { label: "My website looks outdated", value: "outdated", color: "border-orange-500/30 hover:border-orange-500 text-orange-100" },
          { label: "Visitors don't become customers", value: "no_conversions", color: "border-orange-400/30 hover:border-orange-400 text-orange-50" },
          { label: "I'm overwhelmed by manual work", value: "overwhelmed", color: "border-green-500/30 hover:border-green-500 text-green-100" },
          { label: "Starting fresh - no online presence", value: "new_business", color: "border-purple-500/30 hover:border-purple-500 text-purple-100" },
          { label: "Something else...", value: "other", color: "border-white/20 hover:border-white text-white" }
        ].map(opt => (
          <button
            key={opt.value}
            onClick={() => handleNext('painPoint', opt.value)}
            className={`w-full p-4 rounded-xl bg-white/5 border ${opt.color} transition-all duration-300 text-left backdrop-blur-sm group flex items-center justify-between`}
          >
            <span className="font-mono text-sm uppercase tracking-wider">{opt.label}</span>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>
    </div>
  );

  const Step2 = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-mono text-cyan mb-6">Got it. If we solve that, what's your #1 goal?</h3>
      <div className="grid grid-cols-1 gap-3">
        {[
          { label: "More qualified inquiries", value: "more_leads", icon: Target },
          { label: "Direct online revenue", value: "more_sales", icon: Rocket },
          { label: "Look like an industry leader", value: "brand_authority", icon: User },
          { label: "Automate & save time", value: "time_savings", icon: Clock },
          { label: "All of the above!", value: "all_above", icon: CheckCircle2 }
        ].map(opt => (
          <button
            key={opt.value}
            onClick={() => handleNext('goal', opt.value)}
            className="w-full p-4 rounded-xl bg-white/5 border border-cyan/20 hover:border-cyan text-silver transition-all duration-300 text-left backdrop-blur-sm group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <opt.icon className="w-5 h-5 text-cyan" />
              <span className="font-mono text-sm uppercase tracking-wider">{opt.label}</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>
    </div>
  );

  const Step3 = () => (
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
            onClick={() => handleNext('timeline', opt.value)}
            className="w-full p-4 rounded-xl bg-white/5 border border-cyan/20 hover:border-cyan text-silver transition-all duration-300 text-left backdrop-blur-sm group flex items-center justify-between"
          >
            <span className="font-mono text-sm uppercase tracking-wider">{opt.label}</span>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>
    </div>
  );

  const Step4 = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-mono text-cyan mb-6">Investment range you're comfortable with?</h3>
      <div className="grid grid-cols-1 gap-3">
        {[
          { label: "Starter (R3k - R8k)", value: "starter", color: "text-green-400" },
          { label: "Growth (R8k - R25k)", value: "growth", color: "text-blue-400" },
          { label: "Scale (R25k - R50k+)", value: "scale", color: "text-purple-400" },
          { label: "Show me options first", value: "discuss", color: "text-silver" }
        ].map(opt => (
          <button
            key={opt.value}
            onClick={() => handleNext('budget', opt.value)}
            className="w-full p-4 rounded-xl bg-white/5 border border-cyan/20 hover:border-cyan text-silver transition-all duration-300 text-left backdrop-blur-sm group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Wallet className={`w-4 h-4 ${opt.color}`} />
              <span className="font-mono text-sm uppercase tracking-wider">{opt.label}</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>
    </div>
  );

  const Step5 = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-mono text-cyan mb-4">Perfect! Last step - your details:</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name *"
            value={data.name}
            onChange={e => setData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full bg-white/5 border border-white/20 p-3 rounded-lg font-mono text-sm text-silver placeholder:text-silver/30 focus:border-cyan outline-none"
          />
          <input
            type="email"
            placeholder="Email *"
            value={data.email}
            onChange={e => setData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full bg-white/5 border border-white/20 p-3 rounded-lg font-mono text-sm text-silver placeholder:text-silver/30 focus:border-cyan outline-none"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="tel"
            placeholder="Phone/WhatsApp"
            value={data.phone}
            onChange={e => setData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full bg-white/5 border border-white/20 p-3 rounded-lg font-mono text-sm text-silver placeholder:text-silver/30 focus:border-cyan outline-none"
          />
          <input
            type="text"
            placeholder="Company"
            value={data.company}
            onChange={e => setData(prev => ({ ...prev, company: e.target.value }))}
            className="w-full bg-white/5 border border-white/20 p-3 rounded-lg font-mono text-sm text-silver placeholder:text-silver/30 focus:border-cyan outline-none"
          />
        </div>
        <textarea
          placeholder="Any specific features or ideas..."
          rows={3}
          value={data.vision}
          onChange={e => setData(prev => ({ ...prev, vision: e.target.value }))}
          className="w-full bg-white/5 border border-white/20 p-3 rounded-lg font-mono text-sm text-silver placeholder:text-silver/30 focus:border-cyan outline-none resize-none"
        />
        
        {error && (
          <div className="flex items-center gap-2 text-red-400 text-xs font-mono">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full py-4 bg-cyan hover:bg-white text-charcoal font-mono font-bold uppercase tracking-widest rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Transmit Discovery Data'}
          {!isSubmitting && <Send className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );

  const SuccessState = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-20 h-20 bg-cyan rounded-full flex items-center justify-center mx-auto"
      >
        <CheckCircle2 className="w-12 h-12 text-charcoal" />
      </motion.div>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">Discovery complete! 🚀</h2>
        <p className="font-mono text-silver/80">Thanks {data.name}! Our team will analyze your challenges and reach out within 24 hours.</p>
      </div>
      
      <div className="p-6 bg-white/5 border border-cyan/20 rounded-2xl text-left space-y-3">
        <h4 className="font-mono text-cyan text-xs uppercase tracking-widest border-b border-cyan/10 pb-2">We heard you:</h4>
        <div className="space-y-2 font-mono text-xs">
          <p><span className="text-silver/50 uppercase">Challenge:</span> {data.painPoint}</p>
          <p><span className="text-silver/50 uppercase">Goal:</span> {data.goal}</p>
          <p><span className="text-silver/50 uppercase">Urgency:</span> {data.timeline}</p>
          <p><span className="text-silver/50 uppercase">Budget:</span> {data.budget}</p>
        </div>
      </div>

      <button
        onClick={() => {
          setData(INITIAL_DATA);
          setStep(0);
          setIsSubmitted(false);
        }}
        className="text-cyan hover:text-white font-mono text-sm underline transition-colors"
      >
        SUBMIT ANOTHER PROJECT
      </button>
    </motion.div>
  );

  const steps = [Step1, Step2, Step3, Step4, Step5];
  const CurrentStep = steps[step];

  if (isSubmitted) return (
    <section id="contact" className="py-24 max-w-2xl mx-auto px-6">
      <SuccessState />
    </section>
  );

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-charcoal">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent opacity-50" />
      
      <div className="max-w-xl mx-auto px-6 relative z-10">
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === step ? 'w-8 bg-cyan' : i < step ? 'w-4 bg-cyan/40' : 'w-4 bg-white/10'
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] text-silver/40 uppercase tracking-widest">
            Step {step + 1} of 5
          </span>
        </div>

        {/* Wizard Container */}
        <div className="relative min-h-[450px]">
          <AnimatePresence mode="wait" custom={direction}>
            {!typing && (
              <motion.div
                key={step}
                custom={direction}
                variants={{
                  initial: (dir: number) => ({ opacity: 0, x: dir * 50, scale: 0.98 }),
                  animate: { opacity: 1, x: 0, scale: 1 },
                  exit: (dir: number) => ({ opacity: 0, x: dir * -50, scale: 0.98 })
                }}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
              >
                <div className="mb-8">
                  {step > 0 && (
                    <button
                      onClick={handleBack}
                      className="flex items-center gap-1 text-silver/40 hover:text-silver transition-colors font-mono text-[10px] uppercase tracking-widest mb-4"
                    >
                      <ChevronLeft className="w-3 h-3" /> Back
                    </button>
                  )}
                  <CurrentStep />
                </div>
              </motion.div>
            )}

            {typing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-48"
              >
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      className="w-1.5 h-1.5 bg-cyan rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Footer text */}
        <div className="mt-8 text-center">
          <p className="text-[10px] font-mono text-silver/20 uppercase tracking-widest">
            Nexus AI Discovery Wizard • Secure Channel Encrypted
          </p>
        </div>
      </div>
    </section>
  );
}
