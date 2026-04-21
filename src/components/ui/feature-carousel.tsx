"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf,
  Users,
  Globe,
  Award,
  Cloud,
  Smartphone,
  BarChart3,
  ShieldCheck,
  Wand2,
  MapPin,
} from "lucide-react";
import { cn } from "../../lib/utils";

const FEATURES = [
  {
    id: "sustainable",
    label: "Sustainable Sourcing",
    icon: Leaf,
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200",
    description: "Ethically sourced ingredients from local farmers.",
  },
  {
    id: "community",
    label: "Community Focused",
    icon: Users,
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200",
    description: "Building stronger bonds through shared experiences.",
  },
  {
    id: "global",
    label: "Global Reach",
    icon: Globe,
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200",
    description: "Connecting visionaries across all continents.",
  },
  {
    id: "award",
    label: "Award Winning",
    icon: Award,
    image:
      "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?q=80&w=1200",
    description: "Recognized excellence in design and innovation.",
  },
  {
    id: "cloud",
    label: "Cloud Ready",
    icon: Cloud,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
    description: "Scale your infrastructure with seamless ease.",
  },
  {
    id: "mobile",
    label: "Mobile First",
    icon: Smartphone,
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200",
    description: "A world-class experience on every single device.",
  },
  {
    id: "analytics",
    label: "Real-time Analytics",
    icon: BarChart3,
    image:
      "https://huprbedahpwszatolkce.supabase.co/storage/v1/object/public/Vortex%20Digi%20Labs%20-%20Website/representation-user-experience-interface-design.jpg",
    description: "Insights at your fingertips, updated in real-time.",
  },
  {
    id: "security",
    label: "Enterprise Security",
    icon: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
    description: "Bank-grade security protocols for your data.",
  },
  {
    id: "magic",
    label: "Magic Automations",
    icon: Wand2,
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200",
    description: "Let AI handle the repetitive tasks for you.",
  },
  {
    id: "local",
    label: "Locally Owned",
    icon: MapPin,
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200",
    description: "Supporting local businesses and creators.",
  },
  {
    id: "underwater-vis",
    label: "Deep Sea Viz",
    icon: Globe,
    image:
      "https://bxmgsjtsxygxfgvpnnjh.supabase.co/storage/v1/object/public/Vortex%20Digi%20labs%20Main%20Website/Underwater.gif",
    description: "Immersive underwater data visualization.",
  },
  {
    id: "underwater-flow",
    label: "Flow Dynamics",
    icon: Wand2,
    image:
      "https://bxmgsjtsxygxfgvpnnjh.supabase.co/storage/v1/object/public/Vortex%20Digi%20labs%20Main%20Website/Underwater%20Flow.gif",
    description: "Fluid motion analytics and simulations.",
  },
];

const AUTO_PLAY_INTERVAL = 3000;
const ITEM_HEIGHT = 65;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <section id="features" className="w-full bg-charcoal py-24">
      <div className="w-full max-w-7xl mx-auto md:p-8">
        <div className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[4rem] flex flex-col lg:flex-row min-h-[600px] lg:aspect-video border border-cyan/20 shadow-[0_0_40px_rgba(0,229,255,0.1)]">
          <div className="w-full lg:w-[40%] min-h-[350px] md:min-h-[450px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-16 lg:pl-16 bg-black/50 backdrop-blur-md">
            <div className="absolute inset-x-0 top-0 h-12 md:h-20 lg:h-16 bg-gradient-to-b from-black via-black/80 to-transparent z-40" />
            <div className="absolute inset-x-0 bottom-0 h-12 md:h-20 lg:h-16 bg-gradient-to-t from-black via-black/80 to-transparent z-40" />
            <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
              {FEATURES.map((feature, index) => {
                const isActive = index === currentIndex;
                const distance = index - currentIndex;
                const wrappedDistance = wrap(
                  -(FEATURES.length / 2),
                  FEATURES.length / 2,
                  distance
                );

                return (
                  <motion.div
                    key={feature.id}
                    style={{
                      height: ITEM_HEIGHT,
                      width: "fit-content",
                    }}
                    animate={{
                      y: wrappedDistance * ITEM_HEIGHT,
                      opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 90,
                      damping: 22,
                      mass: 1,
                    }}
                    className="absolute flex items-center justify-start"
                  >
                    <button
                      onClick={() => handleChipClick(index)}
                      onMouseEnter={() => setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                      className={cn(
                        "relative flex items-center gap-4 px-6 md:px-10 lg:px-8 py-3.5 md:py-5 lg:py-4 rounded-full transition-all duration-700 text-left group border",
                        isActive
                          ? "bg-cyan/10 text-cyan border-cyan z-10 shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                          : "bg-transparent text-silver/60 border-silver/20 hover:border-cyan/50 hover:text-cyan"
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center transition-colors duration-500",
                          isActive ? "text-cyan" : "text-silver/40"
                        )}
                      >
                        <feature.icon size={18} strokeWidth={2} />
                      </div>

                      <span className="font-mono text-sm md:text-[15px] tracking-widest whitespace-nowrap uppercase">
                        {feature.label}
                      </span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="flex-1 min-h-[500px] md:min-h-[600px] lg:h-full relative bg-black/80 flex items-center justify-center py-16 md:py-24 lg:py-16 px-6 md:px-12 lg:px-10 overflow-hidden border-t lg:border-t-0 lg:border-l border-cyan/20">
            <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
              {FEATURES.map((feature, index) => {
                const status = getCardStatus(index);
                const isActive = status === "active";
                const isPrev = status === "prev";
                const isNext = status === "next";

                return (
                  <motion.div
                    key={feature.id}
                    initial={false}
                    animate={{
                      x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                      scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                      opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                      rotate: isPrev ? -3 : isNext ? 3 : 0,
                      zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 25,
                      mass: 0.8,
                    }}
                    className="absolute inset-0 rounded-[2rem] md:rounded-[2.8rem] overflow-hidden border-2 md:border-4 border-cyan/30 bg-charcoal origin-center shadow-[0_0_30px_rgba(0,229,255,0.2)]"
                  >
                    <img
                      src={feature.image}
                      alt={feature.label}
                      className={cn(
                        "w-full h-full object-cover transition-all duration-700",
                        isActive
                          ? "grayscale-0 blur-0 opacity-80"
                          : "grayscale blur-[2px] brightness-50 opacity-40"
                      )}
                    />

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute inset-x-0 bottom-0 p-8 pt-32 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end pointer-events-none"
                        >
                          <div className="bg-cyan/10 text-cyan px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.2em] w-fit shadow-[0_0_15px_rgba(0,229,255,0.3)] mb-4 border border-cyan/30 backdrop-blur-md">
                            {index + 1} • {feature.label}
                          </div>
                          <p className="text-white font-sans font-light text-xl md:text-2xl leading-tight drop-shadow-md tracking-tight">
                            {feature.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div
                      className={cn(
                        "absolute top-8 left-8 flex items-center gap-3 transition-opacity duration-300",
                        isActive ? "opacity-100" : "opacity-0"
                      )}
                    >
                      <div className="w-2 h-2 rounded-full bg-cyan shadow-[0_0_10px_#00E5FF] animate-pulse" />
                      <span className="text-cyan/80 text-[10px] font-normal uppercase tracking-[0.3em] font-mono">
                        Active Node
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureCarousel;
