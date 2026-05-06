import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const VIDEOS = [
  { id: 'v1', src: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082593/hyl4rk0mqayz4rui0ywy.mp4', title: 'QUANTUM SHIFT' },
  { id: 'v2', src: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082574/siu8fd0joplzizqstfdh.mp4', title: 'CYBER PULSE' },
  { id: 'v3', src: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082533/wuyv3wxyz7jaafsuoaj5.mp4', title: 'DIGITAL FLUX' },
  { id: 'v4', src: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082511/siqikkwcak8qetpqcbo2.mp4', title: 'NEURAL NETWORK' },
  { id: 'v5', src: 'https://bxmgsjtsxygxfgvpnnjh.supabase.co/storage/v1/object/public/Website/31.03.2026_20.23.42_REC.mp4', title: 'CORE RECORDING' },
  { id: 'v6', src: 'https://bxmgsjtsxygxfgvpnnjh.supabase.co/storage/v1/object/public/Website/Fetty\'s%20Deli_compress_lv2.mp4', title: 'FETTYS DELI' },
  { id: 'v7', src: 'https://bxmgsjtsxygxfgvpnnjh.supabase.co/storage/v1/object/public/Website/KAHANA_compress_lv2.mp4', title: 'KAHANA LUXURY' },
  { id: 'v8', src: 'https://bxmgsjtsxygxfgvpnnjh.supabase.co/storage/v1/object/public/Website/Video%20Project%2010.mp4', title: 'VAULT PROJECT 10' },
  { id: 'v9', src: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082498/fwq6hupyz9ynfkynr9vy.mp4', title: 'VORTEX STREAM' },
  { id: 'v10', src: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082479/uhmjmrlp7kcicnksxxaa.mp4', title: 'BIO RHYTHM' },
  { id: 'v11', src: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082473/ruhug5awcq6j8rdr3wub.mp4', title: 'PLASMA CORE' },
  { id: 'v12', src: 'https://res.cloudinary.com/ddfuc0ktg/video/upload/v1778082371/bmda3o4eq1aux93vekf1.mp4', title: 'ECHO LOGIC' }
];

export default function VideoSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const expandedVideo = VIDEOS.find(v => v.id === expandedId);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl premium-heading mb-4 glitch-text" data-text="PORTFOLIO">
          PORTFOLIO
        </h2>
        <p className="text-silver text-lg max-w-2xl mx-auto">
          A glimpse into our latest visual experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {VIDEOS.map((vid) => (
          <VideoCard 
            key={vid.id} 
            src={vid.src} 
            id={vid.id}
            onClick={() => setExpandedId(vid.id)} 
          />
        ))}
      </div>

      <AnimatePresence>
        {expandedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8 cursor-zoom-out backdrop-blur-sm"
            onClick={() => setExpandedId(null)}
          >
            <motion.div 
              layoutId={`video-${expandedVideo.id}`}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {expandedVideo.src.endsWith('.gif') ? (
                <img 
                  src={expandedVideo.src} 
                  className="w-full h-full object-contain"
                  alt="Expanded work"
                />
              ) : (
                <video 
                  src={expandedVideo.src} 
                  autoPlay 
                  controls
                  className="w-full h-full object-contain"
                />
              )}
              <button 
                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-colors z-10"
                onClick={() => setExpandedId(null)}
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function VideoCard({ src, id, onClick }: { src: string; id: string; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play/pause based on scroll visibility to save performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {});
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div 
      layoutId={`video-${id}`}
      className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,229,255,0.1)] border border-white/10 group cursor-pointer" 
      onClick={onClick}
    >
      {src.endsWith('.gif') ? (
        <img 
          src={src} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 contrast-110 brightness-110"
          alt={id}
        />
      ) : (
        <video 
          ref={videoRef}
          src={src} 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 contrast-[1.15] brightness-110 saturate-[1.1]"
        />
      )}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg mb-4 transform scale-90 group-hover:scale-100 transition-transform">
          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1 drop-shadow-md" />
        </div>
        <p className="text-white font-display text-lg font-bold tracking-widest uppercase drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
          {VIDEOS.find(v => v.id === id)?.title}
        </p>
      </div>
    </motion.div>
  );
}
