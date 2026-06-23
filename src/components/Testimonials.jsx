import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import ScrollAnimateCard from './ScrollAnimateCard';

const testimonials = [
  {
    initials: 'PM',
    avatarBg: 'border-brandTeal/30 text-brandTeal bg-brandTeal/5',
    name: 'Priya M.',
    role: 'Data Operator',
    college: 'Sophitorium Engineering College',
    quote: 'The selection process was transparent and the team was supportive throughout. I felt prepared for my tasks because of the clear onboarding instructions.'
  },
  {
    initials: 'RK',
    avatarBg: 'border-brandAmber/30 text-brandAmber bg-brandAmber/5',
    name: 'Rohit K.',
    role: 'Data Miner',
    college: 'Sophitorium Group of Institutions',
    quote: 'I joined as a fresher with zero industry experience. AB IT Solutions gave me real project work from week one, helping me build skills rapidly.'
  },
  {
    initials: 'SP',
    avatarBg: 'border-brandTeal/30 text-brandTeal bg-brandTeal/5',
    name: 'Sneha P.',
    role: 'Project Coordinator',
    college: 'Sophitorium Engineering College',
    quote: 'The Project Coordinator role stretched my leadership and communication skills in ways college projects never did. The environment rewards performance.'
  },
  {
    initials: 'AS',
    avatarBg: 'border-brandAmber/30 text-brandAmber bg-brandAmber/5',
    name: 'Arjun S.',
    role: 'Data Operator',
    college: 'Sophitorium Group of Institutions',
    quote: 'Quick response from HR, clear job descriptions, and a smooth onboarding experience. Highly recommend to final-year candidates seeking real exposure.'
  }
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [hovered, setHovered] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || hovered) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [emblaApi, hovered]);

  return (
    <section id="testimonials" className="pt-24 pb-10 px-6 bg-bgDark relative overflow-hidden z-20">
      {/* Decorative Orb */}
      <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full bg-brandTeal/5 filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 25 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <span className="font-mono text-xs font-bold text-brandTeal tracking-widest uppercase block mb-3">
              ✦ FEEDBACK
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-textPrimary tracking-tight uppercase text-3d">
              PLACED CANDIDATES
            </h2>
          </div>
          
          {/* Navigation Arrows */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full border border-white/60 hover:border-brandTeal/40 bg-white/40 flex items-center justify-center text-textPrimary hover:text-brandTeal hover:bg-white/80 transition-colors duration-300"
              aria-label="Previous slide"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full border border-white/60 hover:border-brandTeal/40 bg-white/40 flex items-center justify-center text-textPrimary hover:text-brandTeal hover:bg-white/80 transition-colors duration-300"
              aria-label="Next slide"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
 
        {/* Carousel Viewport */}
        <ScrollAnimateCard index={1} yOffset={35}>
          <div 
            className="overflow-hidden" 
            ref={emblaRef}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="flex -ml-6">
              {testimonials.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-6 py-2"
                >
                  <div className={`glass-card p-6 ${
                    idx % 2 === 0 ? 'rounded-[32px_8px_32px_8px]' : 'rounded-[8px_32px_8px_32px]'
                  } border border-white/60 h-full flex flex-col justify-between relative hover:border-brandTeal/20 card-3d-teal transition-all duration-300`}>
                    {/* Card content */}
                    <div>
                      {/* Giant Quote Mark */}
                      <span className="font-display text-7xl text-brandTeal opacity-25 leading-none select-none block -mt-4">
                        “
                      </span>
                      <p className="text-textPrimary/80 text-sm leading-relaxed mb-4 italic font-sans -mt-2">
                        {item.quote}
                      </p>
                    </div>
 
                    {/* Card bottom: rating, avatar and identity */}
                    <div>
                      {/* Stars */}
                      <div className="flex gap-1 mb-3">
                        {Array(5).fill(0).map((_, sIdx) => (
                          <Star key={sIdx} size={12} fill="#1A3D63" className="text-brandAmber" />
                        ))}
                      </div>

                      {/* Candidate Details */}
                      <div className="flex items-center gap-3.5">
                        {/* Initials Circle */}
                        <div className={`w-10 h-10 rounded-full border flex items-center justify-center font-mono text-xs font-bold ${item.avatarBg}`}>
                          {item.initials}
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-sm text-textPrimary">
                            {item.name}
                          </h4>
                          <p className="font-mono text-[9px] text-brandTeal font-bold uppercase tracking-wider">
                            {item.role}
                          </p>
                          <p className="text-[10px] text-textMuted font-sans">
                            {item.college}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {scrollSnaps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  selectedIndex === idx 
                    ? 'bg-brandTeal w-6 shadow-neon-teal' 
                    : 'bg-brandTeal/10 hover:bg-brandTeal/25'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </ScrollAnimateCard>

      </div>
    </section>
  );
}
