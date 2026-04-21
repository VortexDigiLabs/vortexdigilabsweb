import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function Contact() {
  const [message, setMessage] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimize = async () => {
    if (!message.trim()) return;
    setIsOptimizing(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Rewrite the following message to be more professional, concise, and impactful for a business inquiry to Vortex Digi Labs (a Digital Innovation and Facilities Management company). Keep it under 3 sentences if possible. Message: "${message}"`
      });
      setMessage(response.text || message);
    } catch (error) {
      console.error("Optimization failed:", error);
    } finally {
      setIsOptimizing(false);
    }
  };

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
          action="https://formspree.io/f/your_formspree_id"
          method="POST"
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
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="message" className="block text-sm font-mono text-cyan">TRANSMISSION DATA</label>
              <button
                type="button"
                onClick={handleOptimize}
                disabled={isOptimizing || !message.trim()}
                className="flex items-center gap-2 text-xs font-mono text-blue hover:text-cyan disabled:opacity-50 transition-colors"
                title="Use AI to optimize your message"
              >
                {isOptimizing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                OPTIMIZE MESSAGE
              </button>
            </div>
            <textarea 
              id="message" 
              name="message" 
              rows={5} 
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-silver/5 border border-silver/20 focus:border-cyan text-silver px-4 py-3 outline-none transition-colors font-mono resize-none"
              placeholder="Enter Message"
            ></textarea>
          </div>

          <button 
            type="submit"
            className="w-full group relative inline-flex items-center justify-center px-8 py-4 font-mono font-bold text-charcoal bg-blue hover:bg-white transition-colors duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
            <span className="relative flex items-center gap-2">
              TRANSMIT MESSAGE
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.form>
      </div>
    </section>
  );
}
