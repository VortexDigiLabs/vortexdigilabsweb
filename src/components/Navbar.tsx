import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '/#hero' },
    { name: 'CAPABILITIES', href: '/#capabilities' },
    { name: 'PILOTS', href: '/#pilots' },
    { name: 'CREDENTIALS', href: '/#credentials' },
    { name: 'DISCOVERY', href: '/#discovery' },
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
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 lg:px-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Wordmark (image_9.png: Left side) */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex flex-col">
              <span className="font-heading text-sm sm:text-base font-extrabold tracking-wider text-white uppercase leading-none silver-chrome-text">
                VORTEX DIGI LABS
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-semibold mt-1">
                // AI & 3D SYSTEMS
              </span>
            </div>
          </Link>

          {/* Centered Floating Pill Navigation Capsule (image_9.png) */}
          <nav 
            className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full nav-pill-capsule"
            aria-label="Main Navigation"
          >
            {/* Top Indicator LEDs */}
            <div className="flex items-center gap-1.5 mr-3 pr-3 border-r border-white/10" aria-hidden="true">
              <span className="ping-crimson" />
              <span className="ping-blue" />
            </div>

            {navLinks.map((link) => {
              const isCurrent = location.hash === link.href.replace('/', '') || (link.name === 'HOME' && !location.hash);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-3.5 py-1 rounded-full text-[11px] font-mono tracking-widest transition-all ${
                    isCurrent
                      ? 'bg-white/15 text-white font-bold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Button: Glowing Glass BOOK DISCOVERY (image_9.png) */}
          <div className="hidden md:flex items-center">
            <a
              href="/#discovery"
              onClick={() => handleNavClick('/#discovery')}
              className="btn-glass-cta px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center justify-center cursor-pointer"
            >
              BOOK DISCOVERY
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="/#discovery"
              onClick={() => handleNavClick('/#discovery')}
              className="btn-glass-cta px-3 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase"
            >
              DISCOVERY
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white"
              aria-label="Toggle navigation menu"
            >
              <span className="block w-4 h-[2px] bg-[#FF2E2E] mb-1" />
              <span className="block w-4 h-[2px] bg-white mb-1" />
              <span className="block w-4 h-[2px] bg-[#00B6FF]" />
            </button>
          </div>

        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <button
          className="close-btn"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>
        <div className="flex flex-col items-center gap-7">
          <div className="flex flex-col items-center mb-2">
            <span className="font-heading text-lg font-extrabold tracking-wider text-white uppercase">
              VORTEX DIGI LABS
            </span>
            <span className="font-mono text-xs text-slate-400 mt-1">
              // AI & 3D SYSTEMS
            </span>
          </div>

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => handleNavClick(link.href)}
              className="font-mono text-base text-slate-200 hover:text-[#FF2E2E] tracking-widest"
            >
              {link.name}
            </a>
          ))}

          <a
            href="/#discovery"
            onClick={() => handleNavClick('/#discovery')}
            className="btn-glass-cta px-6 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-wider mt-4"
          >
            BOOK DISCOVERY
          </a>
        </div>
      </div>
    </>
  );
}
