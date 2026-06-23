import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import ScrollAnimateCard from './ScrollAnimateCard';

const Linkedin = ({ size = 16, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);


import amanImg from '../assets/team_aman.png';
import subhashreeImg from '../assets/team_subhashree.png';
import biswajitImg from '../assets/team_biswajit.png';
import rashmiImg from '../assets/team_rashmi.png';
import divyaImg from '../assets/team_divya.png';

const teamMembers = [
  {
    name: 'Chinmayee Padhi',
    role: 'Founder & CEO',
    bio: 'Sets the strategic direction and drives the core vision of bridging the gap between fresh graduates and real-world tech career pathways.',
    image: '/assets/મજામાં .jpg',
    linkedin: 'https://linkedin.com',
    email: 'cpadhy92383@gmail.com'
  },
  {
    name: 'Biswabhusan Mangaraj',
    role: 'Cordinator',
    bio: 'Oversees organizational workflows, resource planning, and HR policies to maintain an efficient, supportive, and performance-oriented ecosystem.',
    image: "/assets/image.png",
    linkedin: 'https://linkedin.com',
    email: 'biswabhusanmangraj68@gmail.com'
  },
  {
    name: 'Nabin Kumar Nag',
    role: 'Tech Lead & Cordinator',
    bio: 'Mentors young developers, oversees system architecture, and guides the technical execution of all client deliverables and data pipelines.',
    image: "/assets/image.png",
    linkedin: 'https://linkedin.com',
    email: ''
  },
  {
    name: '',
    role: 'Lead Project Coordinator',
    bio: 'Manages project module allocations, monitors daily delivery metrics, and ensures clear client communication and top-tier output accuracy.',
    image: "/assets/image.png",
    linkedin: 'https://linkedin.com',
    email: ''
  },
  {
    name: '',
    role: '',
    bio: 'Drives recruitment drives at campuses, builds corporate connections, and assists final-year candidates in securing core industry placements.',
    image: "/assets/image.png",
    linkedin: 'https://linkedin.com',
    email: ''
  }
];

function TeamMemberCard({ member, idx, onFlipChange }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipTimerRef = React.useRef(null);
  const touchStartRef = React.useRef({ x: 0, y: 0 });
  const isScrollingRef = React.useRef(false);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    isScrollingRef.current = false;
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - touchStartRef.current.x);
    const dy = Math.abs(touch.clientY - touchStartRef.current.y);
    if (dx > 8 || dy > 8) {
      isScrollingRef.current = true;
    }
  };

  const handleButtonClick = (e) => {
    if (isScrollingRef.current) {
      e.preventDefault();
      return;
    }
    handleFlip(true);
  };

  const handleFlip = (flippedState) => {
    setIsFlipped(flippedState);
    if (onFlipChange) {
      onFlipChange(idx, flippedState);
    }

    if (flipTimerRef.current) {
      clearTimeout(flipTimerRef.current);
      flipTimerRef.current = null;
    }

    // Auto-unflip back to front after 15 seconds of inactivity
    if (flippedState) {
      flipTimerRef.current = setTimeout(() => {
        setIsFlipped(false);
        if (onFlipChange) {
          onFlipChange(idx, false);
        }
      }, 15000);
    }
  };

  useEffect(() => {
    return () => {
      if (flipTimerRef.current) {
        clearTimeout(flipTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full h-[150px] perspective-1000">
      <div
        className={`w-full h-full relative transition-transform duration-700 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Side - 2-Column Layout */}
        <div className="absolute inset-0 backface-hidden group glass-card p-4 flex items-center border border-white/60 hover:border-brandTeal/20 hover:bg-white/65 card-3d-teal transition-all duration-300 rounded-none">
          {/* Hover gradient micro-glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-brandTeal/0 to-brandTeal/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <div className="flex gap-4 items-center w-full z-10">
            {/* Left side: Photo */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 overflow-hidden relative border-2 border-brandTeal/50 bg-white/20 rounded-full">
              <img
                src={member.image}
                alt={member.name || 'Team member'}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Right side: Details and Button */}
            <div className="flex flex-col justify-between h-20 sm:h-24 flex-1 min-w-0">
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-textPrimary leading-tight group-hover:text-brandTeal transition-colors duration-300 truncate">
                  {member.name || 'AB Tech Coordinator'}
                </h3>
                <p className="font-mono text-[10px] sm:text-[11px] font-bold text-brandTeal uppercase tracking-wider mt-1 truncate">
                  {member.role || 'Process Executive'}
                </p>
              </div>

              {/* View Detail Button */}
              <button
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onClick={handleButtonClick}
                className="w-full py-1.5 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-white bg-brandTeal hover:bg-brandTeal/90 transition-all duration-300 rounded border border-brandTeal/20 hover:shadow-neon-teal"
              >
                View Details
              </button>
            </div>
          </div>
        </div>

        {/* Back Side - Single Column with side-by-side footer */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 glass-card p-4 flex flex-col justify-between border border-white/60 bg-white/75 card-3d-teal transition-all duration-300 rounded-none">
          <div className="flex flex-col h-full justify-between z-10">
            <div>
              {/* Bio */}
              <p className="text-textMuted text-[11px] sm:text-xs leading-relaxed font-sans mt-2">
                {member.bio}
              </p>
            </div>

            {/* Footer with social and back button side by side */}
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/20">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 shrink-0 rounded bg-white/40 hover:bg-brandTeal/10 border border-white/60 hover:border-brandTeal/20 flex items-center justify-center text-textMuted hover:text-brandTeal transition-all duration-300 active:scale-95"
                aria-label={`${member.name || 'Member'} LinkedIn`}
              >
                <Linkedin size={13} />
              </a>
              <a
                href={`mailto:${member.email}`}
                className="w-7 h-7 shrink-0 rounded bg-white/40 hover:bg-brandTeal/10 border border-white/60 hover:border-brandTeal/20 flex items-center justify-center text-textMuted hover:text-brandTeal transition-all duration-300 active:scale-95"
                aria-label={`${member.name || 'Member'} Email`}
              >
                <Mail size={13} />
              </a>
              <button
                onClick={() => handleFlip(false)}
                className="flex-1 py-1 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-brandTeal hover:text-white bg-brandTeal/10 hover:bg-brandTeal transition-all duration-300 rounded border border-brandTeal/20 text-center"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OurTeam() {
  const containerRef = React.useRef(null);
  const [flippedCards, setFlippedCards] = useState({});

  const anyCardFlipped = Object.values(flippedCards).some(Boolean);

  const handleCardFlip = useCallback((cardIdx, isFlipped) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardIdx]: isFlipped
    }));
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId;
    let isMouseOver = false;
    let isTouching = false;
    let isIntersecting = false;
    let resumeScrollTime = 0;
    let maxScroll = container.scrollWidth / 3;

    const scrollSpeed = 0.8; // Butter smooth auto-scroll speed

    // ResizeObserver to cache maxScroll without layout thrashing
    const resizeObserver = new ResizeObserver(() => {
      maxScroll = container.scrollWidth / 3;
    });
    resizeObserver.observe(container);

    const scroll = () => {
      if (!isIntersecting) {
        animationFrameId = null;
        return;
      }

      const now = Date.now();
      if (!isMouseOver && !isTouching && !anyCardFlipped && now >= resumeScrollTime) {
        container.scrollLeft += scrollSpeed;
      }

      if (maxScroll > 0) {
        if (container.scrollLeft >= maxScroll * 2) {
          container.scrollLeft -= maxScroll;
        } else if (container.scrollLeft <= maxScroll) {
          container.scrollLeft += maxScroll;
        }
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    // IntersectionObserver to pause scroll loop when out of view
    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      if (isIntersecting && !animationFrameId) {
        animationFrameId = requestAnimationFrame(scroll);
      } else if (!isIntersecting && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }, { threshold: 0.01 });

    observer.observe(container);

    const handleMouseEnter = () => { isMouseOver = true; };
    const handleMouseLeave = () => { isMouseOver = false; };
    const handleTouchStart = () => { isTouching = true; };
    const handleTouchEnd = () => {
      isTouching = false;
      resumeScrollTime = Date.now() + 3000; // Stay static for 3 seconds after swiping
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      resizeObserver.disconnect();
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [anyCardFlipped]);

  return (
    <section id="our-team" className="pt-10 pb-10 bg-bgDark relative overflow-hidden z-20">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-brandTeal/5 filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-brandAmber/5 filter blur-[100px] pointer-events-none" />

      {/* Header Container (Constrained width to align with page grid) */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-8">
        {/* Section Header */}
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 25 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="font-mono text-xs font-bold text-brandTeal tracking-widest uppercase block mb-3">
              ✦ MEET THE MINDS
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-textPrimary tracking-tight uppercase text-3d">
              OUR LEADERSHIP TEAM
            </h2>
            <p className="text-textMuted max-w-xl mt-4 text-sm font-sans">
              Dedicated industry professionals driving operational excellence and shaping professional careers.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scrollable Marquee Wrapper (Full width) */}
      <ScrollAnimateCard index={1} yOffset={30} className="w-full">
        <div
          ref={containerRef}
          className="w-full overflow-x-auto scrollbar-none py-4 flex select-none touch-pan-x cursor-grab active:cursor-grabbing"
        >
          <div className="flex">
            {/* We repeat the members list 3 times to make the infinite scroll perfectly seamless on large viewports */}
            {[...teamMembers, ...teamMembers, ...teamMembers].map((member, idx) => (
              <div
                key={`${idx}-${member.name}`}
                className="w-[315px] sm:w-[340px] md:w-[370px] lg:w-[410px] shrink-0 px-3 py-2"
              >
                <TeamMemberCard
                  member={member}
                  idx={idx}
                  onFlipChange={handleCardFlip}
                />
              </div>
            ))}
          </div>
        </div>
      </ScrollAnimateCard>
    </section>
  );
}
