import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import InteractiveCanvasBackground from "../InteractiveCanvasBackground";

const slides = [
  {
    id: 1,
    image: "https://huprbedahpwszatolkce.supabase.co/storage/v1/object/public/Vortex%20Mp4%20Drive/Section%201.png",
  },
  {
    id: 2,
    image: "https://huprbedahpwszatolkce.supabase.co/storage/v1/object/public/Vortex%20Mp4%20Drive/Section%202.jpeg",
  },
  {
    id: 3,
    image: "https://huprbedahpwszatolkce.supabase.co/storage/v1/object/public/Vortex%20Mp4%20Drive/Section%203.jpeg",
  }
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center">
      <InteractiveCanvasBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row items-center justify-between gap-12 pointer-events-none">
        
        {/* Static Text Section */}
        <div className="flex-1 text-left pointer-events-auto z-20">
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl text-white">
            [Main Title Placeholder]
            <br />
            <span className="bg-gradient-to-r from-cyan to-cyan/60 bg-clip-text text-transparent">
              [Subtitle Placeholder]
            </span>
          </h1>
          <p className="mb-6 max-w-xl text-lg text-silver/90">
            [Description Placeholder 1: This is a static description placeholder. Please replace this text with the content from your design. The robots will animate and cycle through the pages while this text remains static.]
          </p>
          <p className="mb-8 max-w-xl text-lg text-silver/70">
            [Description Placeholder 2: Additional text block for any secondary information or bullet points from the image placeholders.]
          </p>
          
          <div className="flex gap-4 items-center mt-8">
            <button 
              onClick={prevSlide}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all border border-white/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all border border-white/20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Animated Robot Image Carousel */}
        <div className="flex-1 relative h-[500px] w-full flex items-center justify-center pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.img
                src={slides[currentIndex].image}
                alt={`Robot ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain drop-shadow-[0_0_30px_rgba(0,229,255,0.3)]"
                animate={{ 
                  y: [0, -20, 0],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
