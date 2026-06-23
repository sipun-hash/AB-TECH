import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Maximize2, Users, Award, Coffee, BookOpen, Presentation, Heart, ArrowUpRight } from 'lucide-react';

const galleryItems = [
  {
    title: 'Team Briefing',
    desc: 'Alignment meetings discussing client deliverables and milestones.',
    icon: Users,
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Training Session',
    desc: 'Onboarding bootcamps for freshers focusing on Excel and core processes.',
    icon: BookOpen,
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Award Day',
    desc: 'Recognizing monthly top performers across data and leadership roles.',
    icon: Award,
    url: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Onboarding Desk',
    desc: 'Setting up new workspaces and accounts for the incoming cohort.',
    icon: Coffee,
    url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Project Review',
    desc: 'Structured quality assessment audits of database models.',
    icon: Presentation,
    url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Team Outing',
    desc: 'Building bonds beyond coordinates and corporate structures.',
    icon: Heart,
    url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
  }
];

function GalleryCard({ item, idx, scrollYProgress, isMobile, onClick }) {
  const Icon = item.icon;

  // Subtle image parallax effect relative to overall scroll progress
  // Translate the image horizontally from -5% to 5% to create depth without exposing borders
  const xImg = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <div
      onClick={onClick}
      className="w-[75vw] sm:w-[45vw] md:w-[36vw] lg:w-[28vw] shrink-0 border border-textPrimary/10 relative flex flex-col justify-end group cursor-pointer transition-all duration-500 select-none rounded-none overflow-hidden h-full"
    >
      {/* Full-screen Background Image Wrapper */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.img
          src={item.url}
          alt={item.title}
          style={{ x: isMobile ? "0%" : xImg, scale: 1.15, willChange: 'transform' }}
          whileHover={{ scale: 1.22 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
        />
      </div>

      {/* Glass Effect Bottom Panel (covers approx 30% on mobile and 26% on desktop) */}
      <div className="relative z-20 bg-white/75 backdrop-blur-md border-t border-textPrimary/10 p-5 flex flex-col justify-between min-h-[30%] md:min-h-[26%] w-full transition-all duration-500 group-hover:bg-white/85 shrink-0">
        {/* Top row: Title, Icon & Card Number */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-brandTeal/10 border border-brandTeal/20 text-brandTeal">
              <Icon size={12} />
            </div>
            <h3 className="font-display font-bold text-[11px] text-textPrimary uppercase tracking-wider">
              {item.title}
            </h3>
          </div>
          <span className="font-mono text-xl font-bold text-brandTeal">
            {String(idx + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Bottom row: Description */}
        <p className="text-textMuted text-[12px] leading-relaxed font-sans font-medium line-clamp-2 mt-1.5">
          {item.desc}
        </p>
      </div>
    </div>
  );
}

export default function Gallery({ onExplore }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [xTranslation, setXTranslation] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Calculate exact translation offset required to reveal the entire track
  useEffect(() => {
    if (!trackRef.current) return;

    const calculateTranslation = () => {
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      // We want to translate by trackWidth - viewportWidth
      // Only horizontal scroll if the track is larger than viewport
      if (trackWidth > viewportWidth) {
        setXTranslation(-(trackWidth - viewportWidth));
      } else {
        setXTranslation(0);
      }
    };

    // Calculate immediately and also on resize
    calculateTranslation();

    const resizeObserver = new ResizeObserver(() => {
      calculateTranslation();
    });
    resizeObserver.observe(trackRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, xTranslation]);
  const slides = galleryItems.map(item => ({ src: item.url }));

  return (
    <section 
      ref={containerRef} 
      id="gallery" 
      className="relative h-[300vh] bg-bgDark z-30"
    >
      {/* Sticky Fullscreen Container - Padding on X removed to allow full-width scroll */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden py-6 md:py-10 lg:py-14 text-textPrimary">
        
        {/* Header - Retains alignment with page grid margins */}
        <div className="px-6 md:px-16 border-b border-textPrimary/10 pb-4 mb-4 md:pb-6 md:mb-6 w-full">
          <div>
            <span className="font-mono text-xs font-bold text-brandTeal tracking-widest uppercase block mb-2">
              ✦ WORKSPACE CULTURE
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-textPrimary tracking-tight uppercase text-3d">
              LIFE AT AB IT SOLUTIONS
            </h2>
          </div>
        </div>

        {/* Horizontal Track Area - Full width overflow with responsive card heights */}
        <div className="relative flex items-center overflow-hidden w-full">
          <motion.div
            ref={trackRef}
            style={{ x, willChange: 'transform' }}
            className="flex h-[42vh] md:h-[48vh] lg:h-[52vh] min-h-[280px] max-h-[520px] items-stretch gap-8 pl-6 md:pl-16 pr-6 md:pr-16"
          >
            {galleryItems.map((item, idx) => (
              <GalleryCard
                key={idx}
                item={item}
                idx={idx}
                scrollYProgress={scrollYProgress}
                isMobile={isMobile}
                onClick={() => {
                  setIndex(idx);
                  setOpen(true);
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Explore Gallery Action Button */}
        <div className="mt-4 md:mt-6 flex justify-center w-full z-40">
          <button
            onClick={onExplore}
            className="shimmer-btn px-6 py-3 bg-brandTeal text-white rounded-none font-display font-semibold text-xs tracking-wider uppercase border border-brandTeal/30 hover:bg-brandTeal/90 transition-all duration-300 flex items-center gap-2 shadow-neon-teal active:scale-95"
          >
            Explore Gallery
            <ArrowUpRight size={14} />
          </button>
        </div>

      </div>

      {/* Lightbox Modal */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        styles={{
          container: { backgroundColor: 'rgba(242, 242, 242, 0.98)' }
        }}
      />
    </section>
  );
}
