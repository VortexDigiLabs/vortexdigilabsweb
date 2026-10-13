import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
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
    { name: 'Disciplines', href: '/#solutions' },
    { name: 'Field Deployments', href: '/#pilots' },
    { name: 'Architecture Sprint', href: '/#contact' },
    { name: 'Archive', href: '/vault' },
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/90 shadow-sm py-3' 
            : 'bg-white/60 backdrop-blur-md border-b border-slate-200/40 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Identity / Official Emblem */}
            <Link to="/" className="flex items-center gap-3.5 group">
              <div className="relative flex items-center">
                <img
                  src="/vortex-logo.png"
                  alt="Vortex Digi Labs"
                  className="h-10 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </div>

              <div className="hidden sm:flex flex-col border-l border-slate-200 pl-3">
                <span className="font-heading text-[13px] font-bold tracking-tight text-slate-900 leading-none">
                  Vortex Digi Labs
                </span>
                <span className="text-[11px] text-slate-600 font-medium mt-1 leading-none">
                  Agentic AI & Interactive 3D Studio
                </span>
              </div>
            </Link>
            
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-7" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isHashActive = location.hash === link.href.replace('/', '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-[13px] font-medium tracking-tight transition-colors py-1 ${
                      isHashActive 
                        ? 'text-slate-950 font-semibold' 
                        : 'text-slate-700 hover:text-slate-950'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}

              <div className="h-4 w-[1px] bg-slate-200" aria-hidden="true" />

              {/* Status Indicator */}
              <div className="flex items-center gap-2 text-[12px] text-slate-700 font-medium">
                <span className="led-blue" />
                <span>Active Studio</span>
              </div>

              {/* Primary Call to Action */}
              <a
                href="/#contact"
                onClick={() => handleNavClick('/#contact')}
                className="btn-studio-primary px-4 py-2 rounded-lg text-xs font-semibold tracking-wide inline-flex items-center justify-center"
              >
                Book Discovery
              </a>
            </nav>
            
            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex items-center gap-2">
              <a
                href="/#contact"
                onClick={() => handleNavClick('/#contact')}
                className="btn-studio-primary px-3 py-1.5 rounded-md text-xs font-semibold"
              >
                Discovery
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-lg bg-slate-100/90 border border-slate-200 text-slate-800"
                aria-label="Open navigation menu"
              >
                <span className="block w-4 h-[2px] bg-slate-900 mb-1" />
                <span className="block w-4 h-[2px] bg-slate-900 mb-1" />
                <span className="block w-4 h-[2px] bg-slate-900" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <button
          className="close-btn"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close navigation menu"
        >
          ✕
        </button>
        <div className="flex flex-col items-center gap-7">
          <img
            src="/vortex-logo.png"
            alt="Vortex Digi Labs"
            className="h-14 w-auto object-contain mb-2"
          />
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-lg font-medium text-slate-900 hover:text-[#00B6FF] transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={() => handleNavClick('/#contact')}
            className="btn-studio-primary px-6 py-3 rounded-lg text-sm font-semibold tracking-wide mt-4"
          >
            Book Architecture Discovery
          </a>
        </div>
      </div>
    </>
  );
}
