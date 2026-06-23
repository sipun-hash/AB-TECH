import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MilkRipple() {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      // Ignore clicks on input fields or textareas to not interfere with typing
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const x = e.clientX;
      const y = e.clientY;
      const id = Date.now() + Math.random().toString(36).substr(2, 9);
      
      setRipples((prev) => [...prev, { id, x, y }]);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const handleAnimationComplete = (id) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
        {ripples.map((ripple) => (
          <RippleInstance
            key={ripple.id}
            x={ripple.x}
            y={ripple.y}
            onComplete={() => handleAnimationComplete(ripple.id)}
          />
        ))}
      </div>
    </>
  );
}

function RippleInstance({ x, y, onComplete }) {
  // 3 concentric waves with a staggered delay
  const waves = [0, 1, 2];

  return (
    <div
      className="absolute"
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {waves.map((waveIndex) => (
        <motion.div
          key={waveIndex}
          initial={{ scale: 0.05, opacity: 0.7, borderWidth: '5px' }}
          animate={{ 
            scale: 2.2, 
            opacity: 0,
            borderWidth: '0.5px'
          }}
          transition={{
            duration: 1.4,
            delay: waveIndex * 0.14,
            ease: [0.16, 1, 0.3, 1], // premium smooth deceleration
          }}
          onAnimationComplete={waveIndex === waves.length - 1 ? onComplete : undefined}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 120,
            height: 120,
            transform: 'translate(-50%, -50%)',
            left: -60,
            top: -60,
            willChange: 'transform, opacity',
            // Organic milk white style
            borderStyle: 'solid',
            borderColor: 'rgba(255, 255, 255, 0.9)',
            backgroundColor: 'rgba(255, 255, 255, 0.01)',
            filter: 'blur(0.8px)', // softens the edges to create a 3D liquid highlight look
            // Multi-layered shadow for 3D liquid ridge feel
            boxShadow: `
              0 4px 12px rgba(30, 60, 90, 0.08),
              inset 0 3px 6px rgba(255, 255, 255, 0.95),
              inset 0 -3px 6px rgba(30, 60, 90, 0.04)
            `,
          }}
        />
      ))}
    </div>
  );
}
