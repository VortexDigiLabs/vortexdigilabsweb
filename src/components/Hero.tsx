import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TimeWarp from './TimeWarp';
import { StardustButton } from './ui/stardust-button';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <TimeWarp />
      
      <style>{`
        .social-icon a {
          position: absolute;
          background: white;
          color: white;
          box-shadow: -1px -1px 20px 0px rgba(0,0,0,0.30);
          display: inline-block;
          width: 150px;
          height: 80px;  
          transform-origin: 50% 50%;
          transition: .15s ease-out;
        }
        
        .social-icon i {
          position: absolute;
          pointer-events: none;
          z-index: 1000;
          transition: .15s ease-out;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-2 premium-heading"
        >
          <span className="text-silver glitch-text" data-text="VORTEX">VORTEX</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-blue-500">
            Digi Labs
          </span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl sm:text-2xl md:text-3xl font-mono text-cyan tracking-widest mb-6 uppercase"
        >
          Quantum Intelligence
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-silver/70 mb-10 font-light px-2"
        >
          Bridging the Digital Divide: Synchronising Digital Intelligence with Real-World Excellence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8"
        >
          <Link to="/contact">
            <StardustButton className="w-full sm:w-auto">
              INITIATE CONSULTATION
            </StardustButton>
          </Link>
          
          <Link to="/vault">
            <StardustButton className="w-full sm:w-auto">
              ACCESS VAULT
            </StardustButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
