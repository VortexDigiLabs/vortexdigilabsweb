import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';

const ARCHIVE_IMAGES = [
  { id: 1, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778087451/diq2qo5wkyvc1ummicyk.png', title: 'Neural Synthesis' },
  { id: 2, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778087450/zfjgeqoqm2wl1mn0igr9.png', title: 'Digital Architecture' },
  { id: 3, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778087445/e6bbijzatgyph2rum6fi.jpg', title: 'Cyber Pulse' },
  { id: 4, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778087445/skhrgz0zzihs1uwwqomd.jpg', title: 'Vortex Flow' },
  { id: 5, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778087445/hciw3wpb7o1yywpscj5u.jpg', title: 'Quantum Core' },
  { id: 6, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778087444/ta36ifpqhpqaveyzrbf0.jpg', title: 'Bio Rhythm' },
  { id: 7, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778087444/cquq9svooyce8fua2ob6.jpg', title: 'Digital Echo' },
  { id: 8, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778087442/wcv9xkqhipcyefuyuszo.jpg', title: 'Neural Stream' },
  { id: 9, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778087297/c04kkfnvuyfljgu533vh.png', title: 'Plasma Flux' },
  { id: 10, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778429286/jz3sz7i2jrlxlxvi74w0.jpg', title: 'Cosmic Nexus' },
  { id: 11, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778429286/o7agv6aodue4feadiic1.jpg', title: 'Data Flow' },
  { id: 12, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778429286/x51klfocv04utvq4w6oh.jpg', title: 'Neural Core' },
  { id: 13, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778429286/bjbpqmxi8eqbc5ymmi2a.jpg', title: 'Cyber Pulse' },
  { id: 14, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778429286/b79ptmqwmp2kxvlcm1bg.jpg', title: 'Vortex Flow' },
  { id: 15, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778429285/cmc49pzgabr9z8kmgrme.jpg', title: 'Digital Echo' },
  { id: 16, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778429285/sqq6uun93uovsrifro0d.jpg', title: 'Bio Rhythm' },
  { id: 17, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778429285/iwjgierpkonsn2xyk3av.jpg', title: 'Quantum Shift' },
  { id: 18, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778429285/imn20ohrvwjzmyx5cnwm.jpg', title: 'Neural Path' },
  { id: 19, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778429285/xwghgqidttgftb2punzm.jpg', title: 'Signal Trace' },
  { id: 20, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778429285/zd5hzihw5lom5jnuxcsj.jpg', title: 'Void Engine' },
  { id: 21, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778429284/viy4rydxzqwacwidktma.jpg', title: 'Aether Drift' },
  { id: 22, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778429284/s5olj3mieovtfhwcnmwy.jpg', title: 'Neon Pulse' },
  { id: 23, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778429593/kcjqjnmclqdlb1slyp38.png', title: 'Vector Grid' },
  { id: 24, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778429284/hy2lr39blj9kzx9ypsqe.jpg', title: 'Chrome Helix' },
  { id: 25, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778429284/xhx5evg7acwx3mlkbm9r.jpg', title: 'Digital Soul' },
  { id: 26, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778429283/zdrerxnw0ymi2gynivuo.jpg', title: 'Logic Gate' },
  { id: 27, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778429283/rh7nyipsky4lwgwzg4oi.jpg', title: 'Cyber Vision' },
  { id: 28, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778429283/grv6zqsz38ranha2z9ld.jpg', title: 'Neural Link' },
  { id: 29, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778429283/zjrya9cedfkenuuasvds.jpg', title: 'System Shock' },
  { id: 30, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778429282/oft39am6mkui3q4qmqwv.jpg', title: 'Vortex Core' },
  { id: 31, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778429282/g5iocctjlwmmrp08cgwg.jpg', title: 'Plasma Flux' },
  { id: 32, url: 'https://res.cloudinary.com/ddfuc0ktg/image/upload/v1778429280/tyltocfe4bods3anifen.jpg', title: 'Infinite Loop' },
];

const ScrollingRow = ({ images, direction = 'left', speed = 40, onSelect }: { 
  images: typeof ARCHIVE_IMAGES, 
  direction?: 'left' | 'right',
  speed?: number,
  onSelect: (img: typeof ARCHIVE_IMAGES[0]) => void
}) => {
  return (
    <div className="flex overflow-hidden group py-4">
      <motion.div
        animate={{
          x: direction === 'left' ? [0, -1920] : [-1920, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
        className="flex gap-6 whitespace-nowrap"
      >
        {[...images, ...images, ...images].map((img, idx) => (
          <div
            key={`${img.id}-${idx}`}
            className="relative w-64 md:w-80 aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer border border-white/5 bg-white/5 backdrop-blur-sm group/card"
            onClick={() => onSelect(img)}
          >
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110 opacity-80 group-hover/card:opacity-100"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
              <span className="text-cyan font-mono text-[10px] tracking-widest uppercase mb-1">Archive Asset</span>
              <h4 className="text-white font-bold text-lg">{img.title}</h4>
              <Maximize2 className="absolute top-4 right-4 w-4 h-4 text-white/50" />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function ImageArchive() {
  const [selectedImage, setSelectedImage] = useState<typeof ARCHIVE_IMAGES[0] | null>(null);

  return (
    <section className="py-24 bg-charcoal relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-cyan/50" />
            <span className="text-cyan font-mono text-xs tracking-[0.4em] uppercase">Visual Intelligence</span>
            <div className="w-12 h-[1px] bg-cyan/50" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6">
            THE <span className="text-cyan">ARCHIVE</span>
          </h2>
          <p className="text-silver/50 max-w-2xl mx-auto font-light">
            A continuous stream of neural synthesis and digital architectural studies. 
            Exploring the intersection of biological patterns and algorithmic precision.
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-charcoal to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-charcoal to-transparent z-10" />
        
        <ScrollingRow 
          images={ARCHIVE_IMAGES} 
          direction="left" 
          speed={50} 
          onSelect={setSelectedImage} 
        />
        <ScrollingRow 
          images={[...ARCHIVE_IMAGES].reverse()} 
          direction="right" 
          speed={60} 
          onSelect={setSelectedImage} 
        />
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/98 backdrop-blur-3xl p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white p-3 rounded-full bg-white/5 border border-white/10 transition-all z-[160]"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/40 to-transparent">
                <span className="text-cyan font-mono text-xs tracking-widest uppercase mb-1 block">Asset Reference</span>
                <h3 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-tight">{selectedImage.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
