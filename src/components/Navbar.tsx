import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Cpu } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
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
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#07080b]/90 backdrop-blur-md border-b border-cyan/20 shadow-[0_4px_25px_rgba(0,0,0,0.7)]' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 rounded-lg bg-black/60 border border-cyan/40 flex items-center justify-center p-1.5 group-hover:border-cyan transition-colors shadow-[0_0_12px_rgba(0,229,255,0.2)]">
                <motion.svg
                  viewBox="0 0 24 24"
                  className="w-full h-full text-cyan"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" strokeDasharray="6 4" />
                  <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" strokeDasharray="4 4" opacity="0.6" />
                  <circle cx="12" cy="12" r="2.5" fill="currentColor" />
                </motion.svg>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg font-black tracking-tight text-white uppercase italic leading-none">
                  Vortex<span className="text-cyan">Digi</span>Labs
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-silver/50">
                  Solutions Lab // AI & 3D
                </span>
              </div>
            </Link>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-silver/80 hover:text-cyan transition-colors font-mono text-xs uppercase tracking-widest"
                >
                  {link.name}
                </a>
              ))}

              <a
                href="/#contact"
                onClick={() => handleNavClick('/#contact')}
                className="px-4 py-2 rounded-lg bg-cyan/10 hover:bg-cyan text-cyan hover:text-black border border-cyan/40 hover:border-cyan font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300"
              >
                Book Discovery
              </a>
            </div>
            
            {/* Hamburger Button — Mobile Only */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 flex flex-col justify-center items-center gap-[5px] text-white"
                aria-label="Open navigation menu"
              >
                <span className="block w-6 h-[2px] bg-cyan" />
                <span className="block w-6 h-[2px] bg-white" />
                <span className="block w-6 h-[2px] bg-cyan" />
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
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-xl font-mono uppercase tracking-widest text-white hover:text-cyan"
            >
              {link.name}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={() => handleNavClick('/#contact')}
            className="mt-4 px-6 py-3 rounded-xl bg-cyan text-black font-mono font-bold text-sm uppercase tracking-wider"
          >
            Book Discovery
          </a>
        </div>
      </div>
    </>
  );
}
