import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import InteractiveCanvasBackground from "../InteractiveCanvasBackground";

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="relative overflow-hidden">
      {/* Interactive Canvas Background */}
      <InteractiveCanvasBackground />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex min-h-[500px] flex-col items-center justify-center px-4 py-16 text-center text-silver pointer-events-none"
      >
        <motion.h1
          variants={itemVariants}
          className="mb-6 text-5xl font-bold tracking-tight md:text-7xl text-white pointer-events-auto"
        >
          Build Amazing
          <br />
          <span className="bg-gradient-to-r from-cyan to-cyan/60 bg-clip-text text-transparent">
            User Experiences
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mb-8 max-w-2xl text-lg text-silver/90 pointer-events-auto"
        >
          Create stunning, animated interfaces with our collection of
          production-ready components. Built with React, Framer Motion, and
          TailwindCSS.
        </motion.p>

        <motion.div variants={itemVariants} className="flex gap-4 pointer-events-auto">
          <a href="#contact" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-cyan text-black hover:bg-cyan/90 h-11 px-8 gap-2">
            Get Started
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-12 flex items-center gap-8 text-sm text-silver/80 pointer-events-auto"
        >
          <div>
            <div className="text-2xl font-bold text-white">
              10k+
            </div>
            <div>Downloads</div>
          </div>
          <div className="h-8 w-px bg-white/20" />
          <div>
            <div className="text-2xl font-bold text-white">50+</div>
            <div>Components</div>
          </div>
          <div className="h-8 w-px bg-white/20" />
          <div>
            <div className="text-2xl font-bold text-white">
              100%
            </div>
            <div>Open Source</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
