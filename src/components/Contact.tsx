import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ===== CONFIGURATION =====
// Your deployed Apps Script Web App URL
const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwsGVrodJSBRgk6vqoZOTLK1CRC_fV4ZeK66rMFCUFJeet8bNlRnsGQdqZgr4XqKd5EuQ/exec';

// GA4 Measurement ID (update if you have one)
const GA_MEASUREMENT_ID = 'G-XVLVEB2852'; // Replace with your actual ID

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  primaryService: string[];
  addons: string[];
  budget: string;
  vision: string;
}

interface FormErrors {
  [key: string]: string;
}

const INITIAL_STATE: FormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  primaryService: [],
  addons: [],
  budget: '',
  vision: ''
};

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Service options
  const services = [
    'Immersive 3D Website Build',
    'Premium Landing Page / Website',
    'E-Commerce Store Setup',
    'SEO & Google Maps Optimization',
    'Social Media Management',
    'AI Content (Avatars, Videos, Voice)',
    'Full Digital Strategy (Multiple Services)'
  ];

  // Add-on options
  const addonOptions = [
    'Short-form Video Content',
    'Custom AI Avatars',
    'Podcast / Voiceover Editing',
    'High-Volume Image Generation'
  ];

  // Budget ranges
  const budgetRanges = [
    'R500 - R5k',
    'R5k - R15k',
    'R15k - R40k',
    'R40k+',
    "Let's Discuss"
  ];

  // Validate single field
  const validateField = (name: string, value: string | string[]): string => {
    switch (name) {
      case 'name':
        return value.toString().trim().length < 2
          ? 'Name must be at least 2 characters'
          : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value.toString())
          ? 'Please enter a valid email address'
          : '';
      case 'phone':
        if (value && value.toString().length > 0) {
          const phoneRegex = /^[\d\s\-+()]{7,20}$/;
          return !phoneRegex.test(value.toString())
            ? 'Please enter a valid phone number'
            : '';
        }
        return '';
      default:
        return '';
    }
  };

  // Validate entire form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (validateField('name', formData.name)) newErrors.name = validateField('name', formData.name);

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (validateField('email', formData.email)) newErrors.email = validateField('email', formData.email);

    if (formData.phone && validateField('phone', formData.phone)) {
      newErrors.phone = validateField('phone', formData.phone);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle checkbox changes (arrays)
  const handleCheckboxChange = (field: keyof FormData, value: string) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[];
      const updated = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [field]: updated };
    });
  };

  // Track GA4 event
  const trackGAEvent = (eventName: string, params?: object) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, params);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      trackGAEvent('form_validation_error', { form_name: 'contact' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for Sheets (convert arrays to strings)
      const payload = {
        ...formData,
        primaryService: formData.primaryService.join(', '),
        addons: formData.addons.join(', ')
      };

      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Track successful submission in GA4
      trackGAEvent('generate_lead', {
        form_name: 'contact',
        service_interest: payload.primaryService,
        budget_range: payload.budget
      });

      setIsSubmitted(true);
      trackGAEvent('form_submit_success', { form_name: 'contact' });

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('Something went wrong. Please try again or contact us directly.');
      trackGAEvent('form_submit_error', {
        form_name: 'contact',
        error_message: error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData(INITIAL_STATE);
    setErrors({});
    setIsSubmitted(false);
    setSubmitError('');
  };

  // Input wrapper component
  const InputWrapper = ({
    children,
    className = '',
    error
  }: {
    children: React.ReactNode;
    className?: string;
    error?: string
  }) => (
    <div className={`relative ${className}`}>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-red-400 text-xs mt-1 ml-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );

  // SUCCESS STATE
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-[600px] flex items-center justify-center"
      >
        <div className="text-center p-12 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 backdrop-blur-xl">
          {/* Animated checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 flex items-center justify-center"
          >
            <svg className="w-12 h-12 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>

          <h3 className="text-3xl font-bold text-white mb-3">
            Project Started! 🚀
          </h3>

          <p className="text-gray-300 mb-8 max-w-md">
            Thank you, <span className="text-cyan-400 font-semibold">{formData.name}</span>!
            We've received your vision and will reach out within 24 hours.
          </p>

          <div className="space-y-3 text-sm text-gray-400 mb-8">
            <p>📧 Confirmation sent to: <span className="text-white">{formData.email}</span></p>
            <p>💰 Budget range: <span className="text-white">{formData.budget}</span></p>
            <p>🎯 Service: <span className="text-white">{formData.primaryService.join(', ')}</span></p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/30 transition-all duration-300"
          >
            Submit Another Project ✨
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // MAIN FORM
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-gray-900/90 to-black/90 border border-cyan-500/20 backdrop-blur-xl shadow-2xl shadow-cyan-500/10"
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-3">
          Start Your Project
        </h2>
        <p className="text-gray-400">
          Tell us about your vision. We'll make it reality.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* NAME FIELD */}
        <InputWrapper error={errors.name}>
          <input
            type="text"
            name="name"
            placeholder="Full Name *"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-5 py-4 rounded-xl bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'
              } focus:border-cyan-400/50 focus:bg-white/10 text-white placeholder-gray-500 outline-none transition-all duration-300`}
          />
        </InputWrapper>

        {/* EMAIL FIELD */}
        <InputWrapper error={errors.email}>
          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-5 py-4 rounded-xl bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'
              } focus:border-cyan-400/50 focus:bg-white/10 text-white placeholder-gray-500 outline-none transition-all duration-300`}
          />
        </InputWrapper>

        {/* PHONE FIELD */}
        <InputWrapper error={errors.phone}>
          <input
            type="tel"
            name="phone"
            placeholder="Contact Number *"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-5 py-4 rounded-xl bg-white/5 border ${errors.phone ? 'border-red-500/50' : 'border-white/10'
              } focus:border-cyan-400/50 focus:bg-white/10 text-white placeholder-gray-500 outline-none transition-all duration-300`}
          />
        </InputWrapper>

        {/* COMPANY FIELD */}
        <InputWrapper>
          <input
            type="text"
            name="company"
            placeholder="Company / Brand Name"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400/50 focus:bg-white/10 text-white placeholder-gray-500 outline-none transition-all duration-300"
          />
        </InputWrapper>

        {/* PRIMARY SERVICES CHECKBOXES */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-300 block mb-2">
            What do you need help with? *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {services.map((service) => (
              <label
                key={service}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${formData.primaryService.includes(service)
                    ? 'bg-cyan-500/20 border-cyan-400/50'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                  } border`}
              >
                <input
                  type="checkbox"
                  checked={formData.primaryService.includes(service)}
                  onChange={() => handleCheckboxChange('primaryService', service)}
                  className="w-4 h-4 rounded border-gray-600 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-0"
                />
                <span className="ml-3 text-sm text-gray-300">{service}</span>
              </label>
            ))}
          </div>
        </div>

        {/* ADD-ONS CHECKBOXES */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-300 block mb-2">
            Which AI/Content add-ons interest you? (Check all that apply)
          </label>
          <div className="grid grid-cols-2 gap-3">
            {addonOptions.map((addon) => (
              <label
                key={addon}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${formData.addons.includes(addon)
                    ? 'bg-purple-500/20 border-purple-400/50'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                  } border`}
              >
                <input
                  type="checkbox"
                  checked={formData.addons.includes(addon)}
                  onChange={() => handleCheckboxChange('addons', addon)}
                  className="w-4 h-4 rounded border-gray-600 text-purple-400 focus:ring-purple-400 focus:ring-offset-0"
                />
                <span className="ml-3 text-sm text-gray-300">{addon}</span>
              </label>
            ))}
          </div>
        </div>

        {/* BUDGET RADIO BUTTONS */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-300 block mb-2">
            Estimated Budget Range
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {budgetRanges.map((budget) => (
              <label
                key={budget}
                className={`flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all duration-200 text-center ${formData.budget === budget
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'
                  } border text-sm font-medium`}
              >
                <input
                  type="radio"
                  name="budget"
                  value={budget}
                  checked={formData.budget === budget}
                  onChange={handleChange}
                  className="sr-only"
                />
                {budget}
              </label>
            ))}
          </div>
        </div>

        {/* VISION TEXTAREA */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 block">
            Tell us about your vision
          </label>
          <textarea
            name="vision"
            rows={4}
            placeholder="E.g., I need a 3D landing page for my Johannesburg real estate company..."
            value={formData.vision}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400/50 focus:bg-white/10 text-white placeholder-gray-500 outline-none transition-all duration-300 resize-none"
          />
        </div>

        {/* ERROR MESSAGE */}
        <AnimatePresence>
          {submitError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
            >
              {submitError}
            </motion.div>
          )}
        </AnimatePresence>

        {/* SUBMIT BUTTON */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 relative overflow-hidden group ${isSubmitting
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-cyan-500 to-emerald-500 hover:shadow-lg hover:shadow-cyan-500/50 text-gray-900'
            }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : (
            <>
              Start My Project
              <span className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-x translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            </>
          )}
        </motion.button>

        <p className="text-xs text-gray-500 text-center mt-4">
          * By submitting, you agree to our privacy policy. We'll never spam you.
        </p>
      </form>
    </motion.div>
  );
}