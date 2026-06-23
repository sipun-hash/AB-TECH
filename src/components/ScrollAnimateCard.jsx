import React, { useRef } from 'react';
import { motion } from 'framer-motion';

export default function ScrollAnimateCard({ 
  children, 
  index = 0, 
  className = "", 
  style = {}, 
  yOffset = 35, 
  delay = 0,
  duration = 0.8,
  scale = 0.98,
  blur = "8px",
  threshold = "-40px",
  viewport = {}
}) {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: yOffset,
        filter: `blur(${blur})`,
        scale: scale
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        scale: 1
      }}
      whileHover="hover"
      viewport={{ once: true, margin: threshold, ...viewport }}
      transition={{ 
        duration: duration,
        delay: delay || (index * 0.08),
        ease: [0.16, 1, 0.3, 1] // premium ease-out cubic-bezier
      }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}
