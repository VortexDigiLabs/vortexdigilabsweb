import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle body overflow when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => document.body.classList.remove('menu-open');
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'HOME', href: '/#showcase' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Featured Work', href: '/vault' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-charcoal/90 backdrop-blur-md border-b border-cyan/20' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2">
              <motion.svg
                viewBox="0 0 24 24"
                className="w-8 h-8 text-cyan"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" strokeDasharray="6 4" />
                <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" strokeDasharray="4 4" opacity="0.6" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
              </motion.svg>
              <span className="font-heading text-xl font-black tracking-tight text-silver italic">
                Vortex<span className="text-cyan">Digi</span>Labs
              </span>
            </Link>
            
            {/* Desktop Nav */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-silver hover:text-cyan transition-colors px-3 py-2 rounded-md font-mono text-sm uppercase tracking-widest"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Hamburger Button — Mobile Only */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 flex flex-col justify-center items-center gap-[5px]"
                aria-label="Open menu"
              >
                <span style={{ display: 'block', width: '20px', height: '2px', background: '#FFFFFF' }} />
                <span style={{ display: 'block', width: '20px', height: '2px', background: '#FFFFFF' }} />
                <span style={{ display: 'block', width: '20px', height: '2px', background: '#FFFFFF' }} />
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
          aria-label="Close menu"
        >
          ✕
        </button>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </>
  );
}
