import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

import CustomCursor from './components/CustomCursor';
import MilkRipple from './components/MilkRipple';
import PageLoader from './components/PageLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import About from './components/About';
import Roles from './components/Roles';
import WhyJoin from './components/WhyJoin';
import SelectionProcess from './components/SelectionProcess';
import EligibilitySkills from './components/EligibilitySkills';
import Gallery from './components/Gallery';
import GalleryPage from './components/GalleryPage';
import Testimonials from './components/Testimonials';
import OurTeam from './components/OurTeam';
import StatsCounter from './components/StatsCounter';
import FAQ from './components/FAQ';
import ApplyNow from './components/ApplyNow';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showPage, setShowPage] = useState(false);
  const [galleryPageOpen, setGalleryPageOpen] = useState(false);
  const lenisRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Handle body overflow locking to prevent premature scrolling
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [loading]);

  useEffect(() => {
    // Initialize global Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Start with scroll stopped if we are still loading
    if (loading) {
      lenis.stop();
    }

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Update Lenis state when loading finishes, and listen to custom events for scroll locking
  useEffect(() => {
    if (lenisRef.current) {
      if (loading) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }

    const handleLenisControl = (e) => {
      if (lenisRef.current) {
        if (e.detail.action === 'stop') {
          lenisRef.current.stop();
        } else {
          lenisRef.current.start();
        }
      }
    };

    window.addEventListener('lenis-control', handleLenisControl);
    return () => {
      window.removeEventListener('lenis-control', handleLenisControl);
    };
  }, [loading]);

  // Lock/Unlock Lenis smooth scrolling when full-screen gallery page is toggled
  useEffect(() => {
    if (lenisRef.current) {
      if (galleryPageOpen) {
        lenisRef.current.stop();
      } else {
        if (!loading) {
          lenisRef.current.start();
        }
      }
    }
  }, [galleryPageOpen, loading]);

  return (
    <>
      {/* Scroll Progress Bar — Only rendered after loading is complete to prevent visual overlay glitch */}
      {!loading && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-brandTeal z-[99999] origin-left shadow-neon-teal"
          style={{ scaleX }}
        />
      )}

      {/* Page Loader */}
      <PageLoader 
        onRevealStart={() => setShowPage(true)}
        onComplete={() => setLoading(false)} 
      />

      {(showPage || !loading) && (
        <div className={`relative text-textPrimary bg-bgDark min-h-screen selection:bg-brandTeal selection:text-white ${loading ? 'pointer-events-none h-screen overflow-hidden' : ''}`}>
          {/* Custom Cursor */}
          <CustomCursor />

          {/* Milk Ripple Click Waves Effect */}
          <MilkRipple />

          {/* Sticky Navbar */}
          <Navbar />

          {/* Page Sections */}
          <main>
            <Hero />
            <Ticker />
            <About />
            <Roles />
            <WhyJoin />
            <SelectionProcess />
            <EligibilitySkills />
            <Gallery onExplore={() => setGalleryPageOpen(true)} />
            <Testimonials />
            <OurTeam />
            <StatsCounter />
            <FAQ />
            <ApplyNow />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />

          {/* Full-screen Gallery Page overlay */}
          <AnimatePresence>
            {galleryPageOpen && (
              <GalleryPage onClose={() => setGalleryPageOpen(false)} />
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
