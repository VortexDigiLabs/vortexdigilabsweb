import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => document.body.classList.remove('menu-open');
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Capabilities', href: '/#solutions' },
    { name: 'Enterprise Pilots', href: '/#pilots' },
    { name: 'Discovery', href: '/#contact' },
    { name: 'Archive Vault', href: '/vault' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('/#')) {
      const id = href.substring(2);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-md shadow-slate-200/40 py-3' 
            : 'bg-white/40 backdrop-blur-md border-b border-white/60 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* High-Resolution Brand Identity Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative flex items-center">
                <img
                  src="/vortex-logo.png"
                  alt="Vortex Digi Labs"
                  className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_4px_12px_rgba(0,182,255,0.2)]"
                  onError={(e) => {
                    // Fallback to text if image is not loaded yet
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Sub-label Badge */}
              <div className="hidden sm:flex flex-col border-l border-slate-300/80 pl-3">
                <span className="font-heading text-sm font-black tracking-tight text-slate-900 uppercase leading-none">
                  VORTEX DIGI LABS
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 font-semibold mt-0.5">
                  Luminous Spatial Lab
                </span>
              </div>
            </Link>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = location.hash === link.href.replace('/', '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="relative text-slate-700 hover:text-[#00B6FF] transition-colors font-mono text-xs uppercase tracking-widest font-semibold py-1 group"
                  >
                    <span>{link.name}</span>
                    {/* Active / Hover accent dot indicator */}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#00B6FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                );
              })}

              {/* Primary CTA "Book Discovery" Glossy Pill */}
              <a
                href="/#contact"
                onClick={() => handleNavClick('/#contact')}
                className="btn-electric-gradient px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider font-bold shadow-md inline-flex items-center gap-1.5"
              >
                <span>Book Discovery</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
            
            {/* Hamburger Button — Mobile Only */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2.5 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-800"
                aria-label="Open navigation menu"
              >
                <span className="block w-5 h-[2px] bg-[#00B6FF] mb-1" />
                <span className="block w-5 h-[2px] bg-slate-800 mb-1" />
                <span className="block w-5 h-[2px] bg-[#FF1E43]" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <button
          className="close-btn"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close navigation menu"
        >
          ✕
        </button>
        <div className="flex flex-col items-center gap-6">
          <img
            src="/vortex-logo.png"
            alt="Vortex Digi Labs"
            className="h-16 w-auto object-contain mb-4 drop-shadow-md"
          />
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-xl font-mono uppercase tracking-widest text-slate-800 hover:text-[#00B6FF] font-bold"
            >
              {link.name}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={() => handleNavClick('/#contact')}
            className="btn-electric-gradient mt-4 px-8 py-3.5 rounded-full font-mono font-bold text-sm uppercase tracking-wider"
          >
            Book Architecture Discovery
          </a>
        </div>
      </div>
    </>
  );
}
