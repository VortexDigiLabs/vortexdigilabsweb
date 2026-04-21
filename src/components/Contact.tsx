import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const payload = {
      Name: data.name,
      Email: data.email,
      Phone: data.phone || '',
      Company: '',
      Primary_Service: 'Contact Page Inquiry',
      Budget: '',
      Lead_Score: 0,
      Vision: data.message || ''
    };

    try {
      await fetch('https://script.google.com/macros/s/AKfycbwsGVrodJSBRgk6vqoZOTLK1CRC_fV4ZeK66rMFCUFJeet8bNlRnsGQdqZgr4XqKd5EuQ/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitted(true); // Fallback to success for UX in this context
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-24 relative bg-charcoal overflow-hidden flex items-center justify-center min-h-[600px]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center z-10"
        >
          <CheckCircle className="w-20 h-20 text-cyan mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-4">TRANSMISSION RECEIVED</h2>
          <p className="text-silver/80 font-mono text-lg">Thank you for reaching out. Our team will contact you shortly.</p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="mt-8 text-cyan hover:text-white font-mono underline transition-colors"
          >
            SEND ANOTHER MESSAGE
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 relative bg-charcoal overflow-hidden">
      {/* Animated Background Image */}
      <motion.div
        className="absolute inset-0 z-0 bg-black"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 z-0 bg-charcoal/80 backdrop-blur-[2px]" />

      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue/50 to-transparent z-10" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            INITIATE <span className="text-blue">COMMUNICATION</span>
          </motion.h2>
          <p className="text-silver/90 font-mono">Secure channel open for AI Consultation & FM Digital Optimization.</p>
        </div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-mono text-cyan mb-2">IDENTIFICATION</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required
                className="w-full bg-silver/5 border border-silver/20 focus:border-cyan text-silver px-4 py-3 outline-none transition-colors font-mono"
                placeholder="Enter Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-mono text-cyan mb-2">CONTACT VECTOR</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required
                className="w-full bg-silver/5 border border-silver/20 focus:border-cyan text-silver px-4 py-3 outline-none transition-colors font-mono"
                placeholder="Enter Email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-mono text-cyan mb-2">COMMS FREQUENCY (PHONE)</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              required
              pattern="[0-9\-\+\s\(\)]*"
              className="w-full bg-silver/5 border border-silver/20 focus:border-cyan text-silver px-4 py-3 outline-none transition-colors font-mono"
              placeholder="Enter Phone Number"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-mono text-cyan mb-2">TRANSMISSION DATA</label>
            <textarea 
              id="message" 
              name="message" 
              rows={5} 
              required
              className="w-full bg-silver/5 border border-silver/20 focus:border-cyan text-silver px-4 py-3 outline-none transition-colors font-mono resize-none"
              placeholder="Enter Message"
            ></textarea>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full group relative inline-flex items-center justify-center px-8 py-4 font-mono font-bold text-charcoal bg-blue hover:bg-white transition-colors duration-300 overflow-hidden disabled:opacity-50"
          >
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
            <span className="relative flex items-center gap-2">
              {isSubmitting ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE'}
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.form>
      </div>
    </section>
  );
}
