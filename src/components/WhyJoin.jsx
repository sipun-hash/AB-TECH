import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Brain, Users, MapPin, GraduationCap, Briefcase } from 'lucide-react';

const benefitData = [
  {
    title: 'Career Growth',
    desc: 'Performance-based promotions, not time-based. Step up as soon as you deliver.',
    icon: Rocket,
    iconColor: 'text-brandTeal',
    hoverAnim: { y: [-2, -8, -2], x: [0, 4, 0], transition: { repeat: Infinity, duration: 0.8, ease: 'easeInOut' } }
  },
  {
    title: 'Skill Development',
    desc: 'Real industry projects from Day 1. Learn structured data, reporting & coordination tools.',
    icon: Brain,
    iconColor: 'text-brandAmber',
    hoverAnim: { scale: 1.15, rotate: [0, 10, -5, 0], transition: { duration: 0.6 } }
  },
  {
    title: 'Mentorship',
    desc: 'Guided by experienced IT professionals who track your daily success metrics.',
    icon: Users,
    iconColor: 'text-brandTeal',
    hoverAnim: { scale: 1.1, y: [0, -3, 0], transition: { repeat: Infinity, duration: 1.2, ease: 'easeInOut' } }
  },
  {
    title: 'Local Opportunity',
    desc: 'Work close to home in Odisha. Avoid high living expenses of metro tech hubs.',
    icon: MapPin,
    iconColor: 'text-brandAmber',
    hoverAnim: { y: [0, -6, 0], transition: { repeat: Infinity, duration: 0.8, ease: 'easeInOut' } }
  },
  {
    title: 'Fresher Friendly',
    desc: 'No prior experience needed. We value accuracy, discipline, and a strong learning attitude.',
    icon: GraduationCap,
    iconColor: 'text-brandTeal',
    hoverAnim: { rotate: [0, -12, 12, -8, 0], transition: { duration: 0.8 } }
  },
  {
    title: 'Project Exposure',
    desc: 'Work across diverse modules: data operations, system research, and client deliverables.',
    icon: Briefcase,
    iconColor: 'text-brandAmber',
    hoverAnim: { rotate: [0, -5, 5, 0], scale: 1.08, transition: { duration: 0.4 } }
  }
];

export default function WhyJoin() {


  return (
    <section id="why-join" className="pt-10 pb-10 px-6 bg-bgDark relative overflow-hidden z-20">
      {/* Decorative background grid and orbs */}
      <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] rounded-full bg-brandAmber/5 filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-brandTeal/5 filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 25 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <span className="font-mono text-xs font-bold text-brandTeal tracking-widest uppercase block mb-3">
            ✦ WORK CULTURE
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-textPrimary tracking-tight uppercase text-3d">
            WHY ACCELERATE WITH US?
          </h2>
          <p className="text-textMuted max-w-xl mx-auto mt-4 text-sm font-sans">
            We provide a healthy ecosystem designed for young engineers and graduates starting their professional journey.
          </p>
        </motion.div>

        {/* HUD Grid Container - Single 1px borders via gap-px */}
        {/* overflow-hidden ensures nothing outside the grid bleeds; bg-bgDark fills the gap-px gutters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brandTeal/30 border border-brandTeal/30 relative overflow-hidden">
          {/* Subtle Grid scan line overlay behind cards */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(30,107,123,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(30,107,123,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          {benefitData.map((benefit, idx) => {
            const isTeal = benefit.iconColor.includes('brandTeal');
            const themeColor = isTeal ? '#1E6B7B' : '#1A3D63'; // brandTeal or brandAmber (navy)
            const themeBgClass = isTeal ? 'bg-brandTeal/5 border-brandTeal/20' : 'bg-brandAmber/5 border-brandAmber/20';
            const themeTextClass = isTeal ? 'text-brandTeal' : 'text-brandAmber';

            return (
              <WhyJoinCard
                key={idx}
                benefit={benefit}
                idx={idx}
                themeColor={themeColor}
                themeBgClass={themeBgClass}
                themeTextClass={themeTextClass}
                isTeal={isTeal}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyJoinCutoutNumber({ num, themeColor }) {
  const label = String(num + 1).padStart(2, '0');
  const gradId = `wj-grad-${label}`;
  const filterId = `wj-filter-${label}`;
  return (
    <svg viewBox="0 0 80 60" width="64" height="48" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="42%" stopColor="#ffffff" />
          <stop offset="42%" stopColor={themeColor} />
          <stop offset="100%" stopColor={themeColor} />
        </linearGradient>
        <filter id={filterId} x="-8%" y="-8%" width="120%" height="130%">
          <feGaussianBlur stdDeviation="0.8" in="SourceGraphic" result="blur" />
          <feOffset dx="0" dy="2" in="blur" result="offset" />
          <feComposite operator="out" in="SourceGraphic" in2="offset" result="inverse" />
          <feFlood floodColor="#000000" floodOpacity="0.38" result="color" />
          <feComposite operator="in" in="color" in2="inverse" result="shadow" />
          <feComposite operator="over" in="shadow" in2="SourceGraphic" />
        </filter>
      </defs>
      <text
        x="50%"
        y="88%"
        textAnchor="middle"
        fill={`url(#${gradId})`}
        filter={`url(#${filterId})`}
        style={{
          fontFamily: 'Outfit, system-ui, sans-serif',
          fontWeight: 900,
          fontSize: '54px',
          letterSpacing: '-1.5px'
        }}
      >
        {label}
      </text>
    </svg>
  );
}

function WhyJoinCard({ benefit, idx, themeColor, themeBgClass, themeTextClass, isTeal }) {
  const canvasRef = React.useRef(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const mouseRef = React.useRef({ x: 100, y: 80 });
  const progressRef = React.useRef(0);

  const Icon = benefit.icon;

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: 'blur(6px)',
      scale: 0.98
    },
    visible: (customIdx) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        delay: (customIdx % 3) * 0.08,
        staggerChildren: 0.08,
        delayChildren: 0.12 + (customIdx % 3) * 0.08
      }
    })
  };

  const iconContainerVariants = {
    hidden: { opacity: 0, scale: 0.7, filter: 'blur(3px)' },
    visible: { 
      opacity: 1, 
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const descVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    progressRef.current = 0; // reset ripple progress to 0
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const handleTouchStart = (e) => {
    setIsHovered(true);
    progressRef.current = 0; // reset ripple progress to 0
    if (canvasRef.current && e.touches && e.touches[0]) {
      const rect = canvasRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas immediately if not hovered
    if (!isHovered) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    // Set canvas dimensions
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Small hexagon parameters
    const r = 10; // radius of hexagon
    const hexWidth = r * Math.sqrt(3);
    const hexHeight = r * 1.5;

    const cols = Math.ceil(width / hexWidth) + 1;
    const rows = Math.ceil(height / hexHeight) + 1;

    // Precalculate hexagon pointy-topped vertex offsets to avoid trig inside loop
    const hexOffsets = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i + Math.PI / 6;
      hexOffsets.push({
        dx: r * Math.cos(angle),
        dy: r * Math.sin(angle)
      });
    }

    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Increment expansion progress (0 to 1)
      progressRef.current += 0.02; // speed of expansion
      const progress = Math.min(progressRef.current, 1.0);

      const xc = mouseRef.current.x;
      const yc = mouseRef.current.y;
      
      // Maximum expansion radius is the diagonal of the card
      const maxRadius = Math.sqrt(width * width + height * height) * 1.2;
      const currentRadius = progress * maxRadius;
      const currentRadiusSq = currentRadius * currentRadius;

      // Draw hex grid with active radial highlight sweep
      for (let row = 0; row < rows; row++) {
        const y = row * hexHeight;
        const xOffset = (row % 2) * (hexWidth / 2);

        for (let col = 0; col < cols; col++) {
          const x = col * hexWidth + xOffset;

          // Distance squared from the ripple starting point (mouse pointer / touch pointer)
          const dx = x - xc;
          const dy = y - yc;
          const distSq = dx * dx + dy * dy;

          // Optimization: Skip hexagons completely outside the expanding ripple
          if (distSq > currentRadiusSq) {
            continue;
          }

          const dist = Math.sqrt(distSq);
          
          // Hexagon is inside the expanding ripple
          // Fade out the highlight intensity as progress approaches 1.0
          const intensity = (1.0 - progress) * (1.0 - dist / maxRadius);

          let borderAlpha = 0;
          let fillAlpha = 0;

          if (intensity > 0) {
            const sharpFactor = Math.pow(intensity, 1.4);
            borderAlpha = sharpFactor * 0.55; // sharp outline highlight
            fillAlpha = sharpFactor * 0.15;  // soft fill highlight

            // Add a bright wave front glow at the expanding circle boundary
            const ringWidth = 35;
            if (currentRadius - dist < ringWidth) {
              const edgeFactor = (1 - (currentRadius - dist) / ringWidth) * (1 - progress);
              borderAlpha = Math.min(1.0, borderAlpha + edgeFactor * 0.60);
              fillAlpha = Math.min(0.5, fillAlpha + edgeFactor * 0.12);
            }
          }

          if (borderAlpha > 0 || fillAlpha > 0) {
            // Draw pointy-topped hexagon using precalculated offsets
            ctx.beginPath();
            ctx.moveTo(x + hexOffsets[0].dx, y + hexOffsets[0].dy);
            for (let i = 1; i < 6; i++) {
              ctx.lineTo(x + hexOffsets[i].dx, y + hexOffsets[i].dy);
            }
            ctx.closePath();

            // Apply filled highlight
            if (fillAlpha > 0) {
              ctx.fillStyle = themeColor;
              ctx.globalAlpha = fillAlpha;
              ctx.fill();
            }

            // Apply grid lines stroke
            if (borderAlpha > 0) {
              ctx.strokeStyle = themeColor;
              ctx.lineWidth = 1;
              ctx.globalAlpha = borderAlpha;
              ctx.stroke();
            }
          }
        }
      }

      if (isHovered && progress < 1.0) {
        animationFrameId = requestAnimationFrame(render);
      } else if (progress >= 1.0) {
        // Animation finished, reset state so it can be re-triggered
        setIsHovered(false);
      }
    };

    render();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isHovered, themeColor]);

  return (
    <motion.div
      custom={idx}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      whileHover="hover"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      style={{ backgroundColor: '#ffffff' }}
      className="group relative p-6 hover:bg-[#F9FAFB] transition-all duration-500 min-h-[160px] select-none flex flex-col justify-between"
    >
      {/* 2px Solid Active Border Highlight on Hover */}
      <div 
        className="absolute inset-0 border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30" 
        style={{ borderColor: themeColor }}
      />

      {/* Canvas for real-time honeycomb highlight spotlight */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Inner overflow-hidden element for grid textures & scanlines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* HUD Grid Background Pattern per card (invisible by default, shows on hover) */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 bg-[linear-gradient(rgba(30,107,123,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(30,107,123,0.15)_1px,transparent_1px)] bg-[size:16px_16px]" />

        {/* Micro-glow on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${themeColor}05, transparent 70%)`
          }}
        />

        {/* Radar scanline sweep */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brandTeal/[0.02] to-transparent h-[150%] w-full -translate-y-full group-hover:animate-[scanline_3s_linear_infinite]" />
      </div>

      {/* Paper-Cutout Number at top-right */}
      <div className="absolute top-2 right-2 pointer-events-none select-none z-20 opacity-80">
        <WhyJoinCutoutNumber num={idx} themeColor={themeColor} />
      </div>

      {/* Corner '+' markers positioned exactly on intersections, outside the box boundaries without clipping */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-[12px] font-mono font-bold text-brandTeal/55 pointer-events-none select-none z-30 transition-colors duration-300 group-hover:text-transparent">+</div>
      <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-[12px] font-mono font-bold text-brandTeal/55 pointer-events-none select-none z-30 transition-colors duration-300 group-hover:text-transparent">+</div>
      <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-4 h-4 flex items-center justify-center text-[12px] font-mono font-bold text-brandTeal/55 pointer-events-none select-none z-30 transition-colors duration-300 group-hover:text-transparent">+</div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-4 h-4 flex items-center justify-center text-[12px] font-mono font-bold text-brandTeal/55 pointer-events-none select-none z-30 transition-colors duration-300 group-hover:text-transparent">+</div>

      {/* Card Content (relative to overlay above canvas) */}
      <div className="relative z-20">
        {/* Header Row: Icon & Title */}
        <div className="flex items-center gap-4 mb-4">
          {/* Icon Container */}
          <motion.div 
            variants={iconContainerVariants}
            className={`w-12 h-12 border flex items-center justify-center flex-shrink-0 transition-all duration-300 rounded-none ${themeBgClass}`}
          >
            <motion.div
              variants={{
                hover: benefit.hoverAnim
              }}
              className={themeTextClass}
            >
              <Icon size={22} />
            </motion.div>
          </motion.div>

          {/* Text Title */}
          <motion.h3 
            variants={titleVariants}
            className={`font-display font-bold text-base md:text-lg text-textPrimary tracking-wide transition-colors duration-300 ${isTeal ? 'group-hover:text-brandTeal' : 'group-hover:text-brandAmber'}`}
          >
            {benefit.title}
          </motion.h3>
        </div>

        {/* Description */}
        <motion.p 
          variants={descVariants}
          className="text-textMuted text-xs md:text-sm leading-relaxed font-sans group-hover:text-textPrimary transition-colors duration-300"
        >
          {benefit.desc}
        </motion.p>
      </div>
    </motion.div>
  );
}
