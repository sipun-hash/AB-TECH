import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Roles', href: '#roles' },
  { name: 'Process', href: '#process' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu is open, and pause Lenis scroll
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new CustomEvent('lenis-control', { detail: { action: 'stop' } }));
    } else {
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('lenis-control', { detail: { action: 'start' } }));
    }
    return () => {
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('lenis-control', { detail: { action: 'start' } }));
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 80; // Navbar height offset
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/40 shadow-md ${scrolled
            ? 'bg-white/80 backdrop-blur-[20px] py-3 shadow-teal-900/5'
            : 'bg-white/50 backdrop-blur-[12px] py-4 shadow-none'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group" onClick={(e) => handleLinkClick(e, '#home')}>
            <img
              src="/assets/WhatsApp Image 2026-06-21 at 6.52.02 PM (1).jpeg"
              alt="AB IT Solutions Logo"
              className="w-8 h-8 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-display font-bold text-sm md:text-base tracking-wider text-textPrimary group-hover:text-brandTeal transition-colors duration-300">
              AB IT Solutions
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 bg-[#E4EFF1]/40 border border-white/40 px-6 py-2 rounded-full">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs font-semibold text-textMuted hover:text-textPrimary transition-colors duration-200 relative"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Right */}
          <div className="hidden lg:block">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSf2urYgREjCCoBM_jHaKPhgvEnQU4IkJ0M9_0Ez_Jlw9kNOwQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-btn px-5 py-2 bg-brandAmber text-white rounded-full font-display text-xs font-semibold tracking-wide shadow-md hover:scale-102 transition-all duration-300 inline-block"
            >
              Apply Now
            </a>
          </div>

          {/* Premium Custom Hamburger Menu button with Asymmetric Morphing Interaction */}
          <button
            className="lg:hidden flex flex-col items-end justify-center gap-[5px] w-10 h-10 rounded-full bg-[#E4EFF1]/55 hover:bg-white/80 border border-white/60 text-[#1E6B7B] hover:text-brandTeal hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm px-2.5 group"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Toggle menu"
          >
            <span className="w-5 h-[1.8px] bg-current rounded-full transition-all duration-300 group-hover:w-3.5" />
            <span className="w-3 h-[1.8px] bg-current rounded-full transition-all duration-300 group-hover:w-5" />
            <span className="w-4.5 h-[1.8px] bg-current rounded-full transition-all duration-300 group-hover:w-2.5" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay (moderate blur, clean fade-in without CSS conflicts) */}
            <motion.div
              className="fixed inset-0 bg-[#112F35]/30 backdrop-blur-[4px] z-[999] lg:hidden pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Sidebar container (zero CSS transitions to avoid interfering with Framer Motion transforms) */}
            <motion.div
              className="fixed top-0 right-0 w-[290px] sm:w-[340px] h-full z-[1000] lg:hidden shadow-[-10px_0_40px_rgba(17,47,53,0.15)] flex flex-col p-6 pointer-events-auto"
              style={{ willChange: 'transform' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Glass background nested inside container to prevent layout shifting glitches */}
              <div className="absolute inset-0 bg-[#f2f2f2]/90 backdrop-blur-[16px] border-l border-brandTeal/10 -z-10 pointer-events-none" />

              {/* Sidebar Header */}
              <div className="flex items-center justify-between pb-6 border-b border-brandTeal/10 mb-6">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/assets/WhatsApp Image 2026-06-21 at 6.52.02 PM (1).jpeg"
                    alt="Logo"
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="font-display font-bold text-sm tracking-wider text-textPrimary">
                    AB IT Solutions
                  </span>
                </div>
                  <motion.button
                    onClick={() => setMobileMenuOpen(false)}
                  whileHover={{ scale: 1.08, rotate: 90, backgroundColor: '#FFFFFF' }}
                    whileTap={{ scale: 0.92 }}
                  className="w-8 h-8 rounded-full bg-white/70 border border-brandTeal/10 text-textPrimary hover:text-brandTeal flex items-center justify-center shadow-sm transition-colors duration-200"
                    aria-label="Close menu"
                  >
                    <X size={16} />
                  </motion.button>
                </div>

              {/* Navigation Links with Micro-Interactions, Chevron Arrows, and Divider Borders */}
              <motion.div
                className="flex flex-col gap-1.5 flex-1"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.04, delayChildren: 0.05 }
                  },
                  closed: {}
                }}
              >
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    variants={{
                      open: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
                      closed: { x: 15, opacity: 0 }
                    }}
                    whileHover={{ x: 4, backgroundColor: 'rgba(30, 107, 123, 0.06)' }}
                    whileTap={{ scale: 0.98 }}
                    className="text-base font-display font-semibold text-textPrimary hover:text-brandTeal flex items-center justify-between rounded-xl px-4 py-3 transition-colors duration-200 group/item border-b border-brandTeal/5 last:border-b-0"
                  >
                    <span>{link.name}</span>
                    <div className="w-7 h-7 rounded-full border border-brandTeal/20 flex items-center justify-center group-hover/item:border-brandTeal group-hover/item:bg-brandTeal/5 transition-all duration-200">
                      <ArrowUpRight size={14} className="text-textMuted group-hover/item:text-brandTeal group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all duration-200" />
                    </div>
                  </motion.a>
                ))}
              </motion.div>

              {/* Sidebar Footer & Premium Gradient Call To Action */}
              <motion.div
                className="pt-6 border-t border-brandTeal/10 flex flex-col gap-4 mt-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                <motion.a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSf2urYgREjCCoBM_jHaKPhgvEnQU4IkJ0M9_0Ez_Jlw9kNOwQ/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 20px -5px rgba(30, 107, 123, 0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  className="continuous-shine w-full py-3.5 bg-gradient-to-r from-brandTeal to-[#124551] text-white rounded-full font-display text-sm font-semibold tracking-wider text-center shadow-lg block"
                >
                  Apply Now
                </motion.a>
                <p className="font-mono text-[9px] text-textMuted/60 text-center uppercase tracking-wider">
                  © 2026 AB IT Solutions Pvt Ltd
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
