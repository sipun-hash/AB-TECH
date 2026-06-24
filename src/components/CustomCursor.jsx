import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(true);

  const hoveredRef = useRef(false);
  const hiddenRef = useRef(true);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 35, stiffness: 450, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device supports fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsMobile(!mediaQuery.matches);

    const handleMediaChange = (e) => {
      setIsMobile(!e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    const moveCursor = (e) => {
      if (e.target && e.target.closest('.yarl__portal')) {
        hiddenRef.current = true;
        setHidden(true);
        return;
      }

      cursorX.set(e.clientX - (hoveredRef.current ? 28 : 6));
      cursorY.set(e.clientY - (hoveredRef.current ? 28 : 6));
      if (hiddenRef.current) {
        hiddenRef.current = false;
        setHidden(false);
      }
    };

    const handleMouseLeave = () => {
      hiddenRef.current = true;
      setHidden(true);
    };
    
    const handleMouseEnter = () => {
      hiddenRef.current = false;
      setHidden(false);
    };

    // Window level Event Delegation for dynamic interactive hovers
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      const interactive = target.closest('a, button, select, input, textarea, [role="button"], .interactive');
      if (interactive && !hoveredRef.current) {
        setHovered(true);
        hoveredRef.current = true;
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (!target) return;
      const interactive = target.closest('a, button, select, input, textarea, [role="button"], .interactive');
      if (interactive && hoveredRef.current && (!e.relatedTarget || !interactive.contains(e.relatedTarget))) {
        setHovered(false);
        hoveredRef.current = false;
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []); // Run exactly once

  if (isMobile || hidden) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        width: hovered ? 56 : 12,
        height: hovered ? 56 : 12,
        backgroundColor: hovered ? 'rgba(255, 255, 255, 0.35)' : '#1E6B7B',
        border: hovered ? '1.5px solid rgba(255, 255, 255, 0.75)' : 'none',
        boxShadow: hovered 
			? '0 8px 32px rgba(30, 107, 123, 0.12), inset 0 2px 4px rgba(255, 255, 255, 0.45), inset 0 -2px 4px rgba(0, 0, 0, 0.05)' 
          : '0 0 8px rgba(30, 107, 123, 0.4)',
      }}
      transition={{
        width: { type: 'spring', stiffness: 500, damping: 30 },
        height: { type: 'spring', stiffness: 500, damping: 30 },
        backgroundColor: { duration: 0.15 },
        border: { duration: 0.15 },
      }}
    />
  );
}
