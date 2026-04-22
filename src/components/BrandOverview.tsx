import { motion } from 'framer-motion';
import { 
  Box, 
  Zap, 
  Gamepad2, 
  Rocket, 
  Palette, 
  ShoppingCart, 
  Target, 
  Eye, 
  Users,
  CheckCircle2,
  Clock,
  Infinity,
  Globe
} from 'lucide-react';

const services = [
  {
    title: "3D WEBSITE DEVELOPMENT",
    description: "Full-spectrum 3D web experiences built from the ground up. Custom WebGL scenes, interactive product viewers, spatial navigation, and cinematic scrolling narratives.",
    icon: <Box className="w-8 h-8 text-vortex-accent" />,
    tags: ["#WebGL", "#Three.js", "#Interactive"]
  },
  {
    title: "MOTION DESIGN & ANIMATION",
    description: "Micro-interactions, page transitions, loading sequences, and full motion graphics suites. Static is stagnant—everything should move with purpose.",
    icon: <Zap className="w-8 h-8 text-vortex-accent" />,
    tags: ["#GSAP", "#Lottie", "#CSSAnimation"]
  },
  {
    title: "INTERACTIVE EXPERIENCES",
    description: "Gamification elements, configurators (product customizers), quizzes with 3D rewards, AR-ready implementations, and engagement-driven user journeys.",
    icon: <Gamepad2 className="w-8 h-8 text-vortex-accent" />,
    tags: ["#Gamification", "#Configurator", "#Engagement"]
  },
  {
    title: "PERFORMANCE OPTIMIZATION",
    description: "Audit and optimization of existing 3D/web experiences. Reduce load times by 60%, improve Core Web Vitals scores, implement lazy loading strategies, and ensure 60fps across devices.",
    icon: <Rocket className="w-8 h-8 text-vortex-accent" />,
    tags: ["#Speed", "#Optimization", "#CWV"]
  },
  {
    title: "BRAND UNIVERSE CREATION",
    description: "Holistic digital identity systems designed for 3D spaces. Logo animations, brand guidelines for spatial contexts, asset libraries, and consistent cross-platform 3D language.",
    icon: <Palette className="w-8 h-8 text-vortex-accent" />,
    tags: ["#Branding", "#Identity", "#3DAssets"]
  },
  {
    title: "E-COMMERCE 3D SOLUTIONS",
    description: "Next-gen online stores with 3D product displays, virtual try-on infrastructure, immersive checkout flows, and conversion-optimized spatial commerce experiences.",
    icon: <ShoppingCart className="w-8 h-8 text-vortex-accent" />,
    tags: ["#Ecommerce", "#3DProduct", "#Conversion"]
  }
];

const stats = [
  { number: "150+", label: "3D Websites Launched" },
  { number: "98%", label: "Client Satisfaction Rate" },
  { number: "3.2s", label: "Avg. Load Time Optimization" },
  { number: "24/7", label: "Support & Monitoring" },
  { number: "∞", label: "Possibilities Unlocked" },
  { number: "50+", label: "Industries Transformed" }
];

export default function BrandOverview() {
  return (
    <section 
      id="about-services" 
      className="relative w-full bg-vortex-black text-white py-24 overflow-hidden"
      aria-label="About Vortex Digi Labs"
    >
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ 
             backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
             backgroundSize: '50px 50px' 
           }} 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column - 40% (approx lg:col-span-5) */}
          <motion.aside 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col gap-10"
          >
            <div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider mb-6">
                WHO IS <span className="text-vortex-accent">VORTEX?</span>
              </h2>
              <p className="text-vortex-text-secondary text-lg leading-relaxed font-sans max-w-[60ch]">
                Vortex Digi Labs is a next-generation 3D web design agency that transforms ordinary online presence into immersive digital experiences. We specialize in creating visually stunning, highly interactive websites using cutting-edge 3D animation, motion design, and spatial computing technologies.
              </p>
            </div>

            {/* Mission Box */}
            <div className="bg-vortex-bg-secondary/50 border-l-4 border-vortex-accent p-8 rounded-r-xl backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-vortex-accent" />
                <h3 className="font-brand text-xl font-bold uppercase tracking-widest text-vortex-accent">Our Mission</h3>
              </div>
              <p className="text-silver/80 leading-relaxed italic">
                "To revolutionize digital presence by making 3D animated websites accessible, performant, and transformative for forward-thinking brands. We demystify complex technologies and deliver web experiences that feel like stepping into the future."
              </p>
            </div>

            {/* Vision Block */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Eye className="w-6 h-6 text-vortex-accent" />
                <h3 className="font-brand text-xl font-bold uppercase tracking-widest text-vortex-accent">Our Vision</h3>
              </div>
              <p className="text-vortex-text-secondary">
                A world where every website is an experience—a destination rather than a webpage. We envision the complete normalization of spatial web design, where 3D interactivity is standard, not exceptional.
              </p>
            </div>

            {/* Core Values */}
            <div className="flex flex-wrap gap-4 mt-4">
              {["IMMERSIVE", "PRECISE", "PERFORMANT", "PARTNER-DRIVEN"].map((val) => (
                <span key={val} className="px-4 py-2 bg-vortex-accent/10 border border-vortex-accent/30 text-vortex-accent font-brand font-bold text-sm tracking-widest rounded-full">
                  ⚡ {val}
                </span>
              ))}
            </div>
          </motion.aside>

          {/* Right Column - 60% (approx lg:col-span-7) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col gap-12"
          >
            {/* Visual Anchor */}
            <div className="relative aspect-video lg:aspect-auto lg:h-64 rounded-2xl overflow-hidden bg-vortex-bg-secondary flex items-center justify-center border border-vortex-border-subtle group">
               <div className="absolute inset-0 bg-gradient-to-br from-vortex-accent/5 to-purple-500/5" />
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 className="relative"
               >
                 <Globe className="w-32 h-32 text-vortex-accent/20" />
                 <div className="absolute inset-0 blur-2xl bg-vortex-accent/20 rounded-full scale-150" />
               </motion.div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="text-center">
                   <p className="font-display text-2xl font-bold tracking-tighter opacity-50">ENGINEERING THE NEXT ERA</p>
                   <p className="text-vortex-accent font-mono text-sm opacity-30 mt-2">vortex_core_v1.0.4</p>
                 </div>
               </div>
               
               {/* Tech brackets */}
               <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-vortex-accent/50" />
               <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-vortex-accent/50" />
               <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-vortex-accent/50" />
               <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-vortex-accent/50" />
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <motion.article 
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-vortex-bg-card border border-vortex-border-subtle p-6 rounded-xl hover:translate-y-[-8px] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] hover:border-vortex-accent/50 backdrop-blur-md"
                >
                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h4 className="font-brand text-lg font-bold mb-3 tracking-wide">{service.title}</h4>
                  <p className="text-vortex-text-secondary text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono text-vortex-accent/60 uppercase tracking-wider">{tag}</span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 pt-12 border-t border-vortex-border-subtle grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <span className="font-display text-3xl md:text-4xl font-black text-vortex-accent">
                {stat.number}
              </span>
              <span className="text-vortex-text-secondary text-xs uppercase tracking-widest font-brand font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
