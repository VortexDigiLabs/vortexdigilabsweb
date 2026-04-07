import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TimeWarp from './TimeWarp';

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
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-2"
        >
          <span className="text-silver">VORTEX</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-blue-500">
            DIGI LABS
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
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-mono font-bold text-charcoal bg-cyan hover:bg-white transition-colors duration-300 w-full sm:w-auto overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
            <span className="relative flex items-center gap-2">
              INITIATE CONSULTATION
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          
          <Link
            to="/vault"
            className="inline-flex items-center justify-center px-8 py-4 font-mono font-bold text-silver border border-silver/20 hover:border-cyan hover:text-cyan transition-colors duration-300 w-full sm:w-auto"
          >
            ACCESS VAULT
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
