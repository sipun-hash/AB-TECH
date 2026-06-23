import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-white/40 border-t border-brandTeal/10 pt-16 pb-8 px-6 relative overflow-hidden z-20">
      
      {/* Footer Content */}
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-brandTeal/10 items-start">
          
          {/* Left Column: Brand & Tagline */}
          <div className="md:col-span-6 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/WhatsApp Image 2026-06-21 at 6.52.02 PM (1).jpeg" 
                alt="AB IT Solutions Logo" 
                className="w-9 h-9 rounded object-cover"
              />
              <span className="font-display font-bold text-lg tracking-wider text-textPrimary">
                AB IT Solutions
              </span>
            </div>
            <p className="text-textMuted text-xs font-sans leading-relaxed max-w-sm">
              Empowering Talent • Building Careers • Driving Success. Providing specialized business and technical solutions with a strong focus on talent enablement.
            </p>
          </div>

          {/* Center Column: Navigation Repeats */}
          <div className="md:col-span-6 flex flex-wrap gap-x-6 gap-y-3 items-center md:justify-end">
            <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="text-xs font-medium text-textMuted hover:text-brandTeal underline underline-offset-4 decoration-brandTeal/30 hover:decoration-brandTeal transition-colors duration-200">Home</a>
            <a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className="text-xs font-medium text-textMuted hover:text-brandTeal underline underline-offset-4 decoration-brandTeal/30 hover:decoration-brandTeal transition-colors duration-200">About</a>
            <a href="#roles" onClick={(e) => handleLinkClick(e, '#roles')} className="text-xs font-medium text-textMuted hover:text-brandTeal underline underline-offset-4 decoration-brandTeal/30 hover:decoration-brandTeal transition-colors duration-200">Roles</a>
            <a href="#process" onClick={(e) => handleLinkClick(e, '#process')} className="text-xs font-medium text-textMuted hover:text-brandTeal underline underline-offset-4 decoration-brandTeal/30 hover:decoration-brandTeal transition-colors duration-200">Process</a>
            <a href="#gallery" onClick={(e) => handleLinkClick(e, '#gallery')} className="text-xs font-medium text-textMuted hover:text-brandTeal underline underline-offset-4 decoration-brandTeal/30 hover:decoration-brandTeal transition-colors duration-200">Gallery</a>
            <a href="#testimonials" onClick={(e) => handleLinkClick(e, '#testimonials')} className="text-xs font-medium text-textMuted hover:text-brandTeal underline underline-offset-4 decoration-brandTeal/30 hover:decoration-brandTeal transition-colors duration-200">Testimonials</a>
            <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="text-xs font-medium text-textMuted hover:text-brandTeal underline underline-offset-4 decoration-brandTeal/30 hover:decoration-brandTeal transition-colors duration-200">Contact</a>
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="w-full flex justify-center items-center pt-8 text-[10px] md:text-xs text-textMuted font-sans">
          <p>© 2026 AB Information Technology Solutions Pvt. Ltd. · All Rights Reserved</p>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="back-to-top"
            initial={{ opacity: 0, scale: 0.5, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-[99] w-12 h-12 rounded-full bg-brandTeal text-white flex items-center justify-center shadow-neon-teal border border-brandTeal/20 hover:scale-105 transition-transform duration-200"
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
