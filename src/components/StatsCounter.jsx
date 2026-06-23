import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Custom hook to handle count up animation on scroll entry
function useCountUp(targetValue, duration = 2400) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let startTime = null;
    let rafId = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // easeOutQuad curve: progress * (2 - progress)
      const easeProgress = progress * (2 - progress);
      const currentCount = Math.floor(easeProgress * targetValue);
      
      setCount(currentCount);

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setCount(targetValue);
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [started, targetValue, duration]);

  return [count, elementRef];
}

function StatItem({ targetValue, suffix, label }) {
  const [count, elementRef] = useCountUp(targetValue, 2400);
  
  return (
    <div 
      ref={elementRef} 
      className="flex flex-col items-center p-2 rounded-none select-none"
    >
      <span className="font-display font-extrabold text-4xl md:text-6xl text-white tracking-tight stat-number-3d">
        {count}{suffix}
      </span>
      <span className="font-mono text-[10px] md:text-xs text-white/85 tracking-widest uppercase mt-3">
        {label}
      </span>
    </div>
  );
}
 
export default function StatsCounter() {
  return (
    <div className="w-full bg-gradient-to-r from-[#1A5C6A] via-[#1E6B7B] to-[#1A5C6A] py-8 px-6 relative overflow-hidden z-20 border-y border-brandTeal/10">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6">
          <StatItem targetValue={50} suffix="+" label="Candidates Placed" />
          <StatItem targetValue={3} suffix="" label="Open Positions" />
          <StatItem targetValue={5} suffix="+" label="Years of Operation" />
          <StatItem targetValue={100} suffix="%" label="Fresher Welcome" />
        </div>
      </div>
    </div>
  );
}
