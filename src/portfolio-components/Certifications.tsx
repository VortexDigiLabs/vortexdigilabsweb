import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Palette, 
  Bot, 
  HardHat, 
  Cpu, 
  Landmark
} from 'lucide-react';
import { cn } from '../lib/utils';

const options = [
  {
    id: 1,
    icon: GraduationCap,
    main: 'Canva Teacher',
    sub: 'Essentials Certificate',
    bgUrl: '/credentials/Canva Teacher Essentials.PNG',
    color: '#ED5565',
    link: '/credentials/Canva Teacher Essentials.PNG'
  },
  {
    id: 2,
    icon: Palette,
    main: 'Canva Essentials',
    sub: 'Graphic Design',
    bgUrl: '/credentials/Canva Essentials.PNG',
    color: '#FC6E51',
    link: '/credentials/Canva-essentials-certificate.pdf'
  },
  {
    id: 3,
    icon: HardHat,
    main: 'OSHA',
    sub: 'Occupational Safety',
    bgUrl: '',
    color: '#FFCE54',
    link: '/credentials/OSHA CERTIF.pdf'
  },
  {
    id: 4,
    icon: Bot,
    main: 'HuggingFace',
    sub: 'AI & Machine Learning',
    bgUrl: '/credentials/HuggingFace Certificate.jpeg',
    color: '#2ECC71',
    link: '/credentials/HuggingFace Certificate.jpeg'
  },
  {
    id: 5,
    icon: Cpu,
    main: 'Outskill AI',
    sub: 'Mastermind',
    bgUrl: '/credentials/Outskill Certificate AI Mastermind.png',
    color: '#EC87C0',
    link: '/credentials/Outskill Certificate AI Mastermind.png'
  },
  {
    id: 6,
    icon: Landmark,
    main: 'WITS',
    sub: 'University',
    bgUrl: '',
    color: '#4A89DC',
    link: '/credentials/WITS PDF.pdf'
  }
];

export default function Certifications() {
  const [activeId, setActiveId] = useState(1);

  return (
    <section id="certifications" className="py-24 relative bg-black border-t border-silver/10 min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <style>{`
        .options-container {
          width: 100%;
          max-width: 1200px;
        }
        @media screen and (max-width: 900px) {
          .option-item:nth-child(6) { display: none; }
        }
        @media screen and (max-width: 768px) {
          .option-item:nth-child(5) { display: none; }
        }
        @media screen and (max-width: 640px) {
          .option-item:nth-child(4) { display: none; }
        }
        @media screen and (max-width: 500px) {
          .option-item:nth-child(3) { display: none; }
        }
      `}</style>
      
      <div className="text-center mb-16 w-full max-w-7xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white"
        >
          VERIFIED <span className="text-cyan">CREDENTIALS</span>
        </motion.h2>
      </div>

      <div className="options-container flex flex-row items-stretch overflow-hidden h-[400px] mx-auto transition-all duration-250 px-4">
        {options.map((option) => {
          const isActive = activeId === option.id;
          const Icon = option.icon;
          
          return (
            <div
              key={option.id}
              onClick={() => setActiveId(option.id)}
              className={cn(
                "option-item relative overflow-hidden m-[5px] sm:m-[10px] cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.05,0.61,0.41,0.95)]",
                isActive ? "flex-[10000] max-w-[600px] m-0 rounded-[40px]" : "flex-1 min-w-[50px] sm:min-w-[60px] rounded-[30px]"
              )}
              style={{
                background: `url(${option.bgUrl})`,
                backgroundSize: isActive ? 'auto 100%' : 'auto 120%',
                backgroundPosition: 'center',
                backgroundColor: option.color
              }}
            >
              <div 
                className={cn(
                  "absolute left-0 right-0 h-[120px] transition-all duration-500 ease-[cubic-bezier(0.05,0.61,0.41,0.95)]",
                  isActive 
                    ? "bottom-0 shadow-[inset_0_-120px_120px_-120px_black,inset_0_-120px_120px_-100px_black]" 
                    : "-bottom-[40px] shadow-[inset_0_-120px_0px_-120px_black,inset_0_-120px_0px_-100px_black]"
                )}
              />
              
              <div 
                className={cn(
                  "flex absolute right-0 h-[40px] transition-all duration-500 ease-[cubic-bezier(0.05,0.61,0.41,0.95)]",
                  isActive ? "bottom-[20px] left-[20px]" : "bottom-[10px] left-[10px]"
                )}
              >
                <div 
                  className="flex flex-row justify-center items-center min-w-[40px] max-w-[40px] h-[40px] rounded-full bg-white"
                  style={{ color: option.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="flex flex-col justify-center ml-[10px] text-white whitespace-pre">
                  <div 
                    className={cn(
                      "relative transition-all duration-500 ease-[cubic-bezier(0.05,0.61,0.41,0.95)]",
                      isActive ? "left-0 opacity-100" : "left-[20px] opacity-0"
                    )}
                  >
                    <div className="font-bold text-[1.2rem]">{option.main}</div>
                  </div>
                  <div 
                    className={cn(
                      "relative transition-all duration-500 ease-[cubic-bezier(0.05,0.61,0.41,0.95)] delay-100",
                      isActive ? "left-0 opacity-100" : "left-[20px] opacity-0"
                    )}
                  >
                    <div className="text-sm text-white/80">{option.sub}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
