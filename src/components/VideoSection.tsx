import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

const VIDEOS = [
  { id: 'v1', src: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082593/hyl4rk0mqayz4rui0ywy.mp4', title: 'PULSE RISING', description: 'Immersive visuals and pulsating rhythms from our latest festival production.' },
  { id: 'v2', src: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082574/siu8fd0joplzizqstfdh.mp4', title: 'CATS PROJECT', description: 'Dynamic 3D character animation and interactive narrative design.' },
  { id: 'v3', src: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082498/fwq6hupyz9ynfkynr9vy.mp4', title: 'VORTEX CORE', description: 'Advanced system architecture and real-time data visualization.' },
  { id: 'v4', src: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082511/siqikkwcak8qetpqcbo2.mp4', title: 'TOUCH WOOD', description: 'Ian Matthews: Master carpentry meets digital precision.' },
  { id: 'v5', src: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082533/wuyv3wxyz7jaafsuoaj5.mp4', title: 'DIGITAL FLUX', description: 'High-energy motion graphics and particle simulation systems.' },
  { id: 'v6', src: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082479/uhmjmrlp7kcicnksxxaa.mp4', title: 'BIO RHYTHM', description: 'Organic interface design and biological data flow.' },
  { id: 'v7', src: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082473/ruhug5awcq6j8rdr3wub.mp4', title: 'PLASMA CORE', description: 'High-intensity energy visualization and reactive lighting.' },
  { id: 'v8', src: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082371/bmda3o4eq1aux93vekf1.mp4', title: 'ECHO LOGIC', description: 'Recursive algorithmic patterns and digital echo systems.' }
];

const VideoCard = ({ video }: { video: typeof VIDEOS[0] }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(videoRef, { amount: 0.6 });

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(e => console.log("Auto-play blocked:", e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  return (
    <motion.div 
      className="relative flex-shrink-0 w-[85vw] md:w-[600px] aspect-video rounded-2xl overflow-hidden group border border-white/10 bg-black/40 backdrop-blur-sm"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <video
        ref={videoRef}
        src={video.src}
        className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-700"
        loop
        muted
        playsInline
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 flex flex-col justify-end">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-[1px] bg-cyan" />
            <span className="text-cyan font-mono text-[10px] tracking-[0.3em] uppercase">Project Node</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight mb-2 uppercase">{video.title}</h3>
          <p className="text-silver/70 text-sm max-w-md line-clamp-2 font-light italic">
            {video.description}
          </p>
        </motion.div>
      </div>

      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Play className="w-4 h-4 text-cyan fill-cyan" />
      </div>
    </motion.div>
  );
};

export default function VideoSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 632 : window.innerWidth * 0.85 + 32;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-24 bg-charcoal overflow-hidden relative border-t border-white/5">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-12 h-[1px] bg-cyan" />
            <span className="text-cyan font-mono text-xs tracking-[0.4em] uppercase">Intelligence Archive</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase">
            PORTFOLIO <span className="text-cyan">MATRIX</span>
          </h2>
        </div>
        
        {/* Navigation Arrows */}
        <div className="flex gap-4">
          <button 
            onClick={() => scroll('left')}
            className="p-4 rounded-full border border-white/10 bg-white/5 hover:bg-cyan hover:border-cyan hover:text-charcoal transition-all duration-300 group"
            aria-label="Previous Project"
          >
            <ChevronLeft className="w-6 h-6 transition-transform group-active:scale-90" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-4 rounded-full border border-white/10 bg-white/5 hover:bg-cyan hover:border-cyan hover:text-charcoal transition-all duration-300 group"
            aria-label="Next Project"
          >
            <ChevronRight className="w-6 h-6 transition-transform group-active:scale-90" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto px-[5vw] md:px-[calc((100vw-1280px)/2+2rem)] no-scrollbar py-8 snap-x snap-mandatory"
      >
        {VIDEOS.map((vid) => (
          <div key={vid.id} className="snap-center">
            <VideoCard video={vid} />
          </div>
        ))}
      </div>

      {/* Helper text */}
      <div className="max-w-7xl mx-auto px-4 mt-8 flex justify-center md:justify-start">
        <p className="text-silver/30 font-mono text-[10px] tracking-widest uppercase animate-pulse">
          [ Swipe or use arrows to navigate ]
        </p>
      </div>
    </section>
  );
}
