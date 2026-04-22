import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const VIDEOS = [
  { id: 'v1', src: 'https://huprbedahpwszatolkce.supabase.co/storage/v1/object/public/Vortex%20Digi%20Labs%20-%20Website/CATS%20(1).mp4' },
  { id: 'v2', src: 'https://huprbedahpwszatolkce.supabase.co/storage/v1/object/public/Vortex%20Digi%20Labs%20-%20Website/Platteland.mp4' },
  { id: 'v3', src: "https://huprbedahpwszatolkce.supabase.co/storage/v1/object/public/Vortex%20Digi%20Labs%20-%20Website/Fettys%20Bilton%20Showcase%20Vid.mp4" },
  { id: 'v4', src: 'https://huprbedahpwszatolkce.supabase.co/storage/v1/object/public/Vortex%20Digi%20Labs%20-%20Website/DJ%20Coby%20Jinx%202.mp4' },
  { id: 'v5', src: 'https://bxmgsjtsxygxfgvpnnjh.supabase.co/storage/v1/object/public/Vortex%20Digi%20labs%20Main%20Website/Underwater.gif' },
  { id: 'v6', src: 'https://bxmgsjtsxygxfgvpnnjh.supabase.co/storage/v1/object/public/Vortex%20Digi%20labs%20Main%20Website/Underwater%20Flow.gif' }
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
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          alt="Featured work"
        />
      ) : (
        <video 
          ref={videoRef}
          src={src} 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 group-hover:scale-100">
          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1 drop-shadow-md" />
        </div>
      </div>
    </motion.div>
  );
}
