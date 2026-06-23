import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, Briefcase, Calendar } from 'lucide-react';
import ScrollAnimateCard from './ScrollAnimateCard';

// Highly-aesthetic HUD style Tilt Card with sharp edges, corner brackets, grid patterns, and dynamic highlights
function TiltCard({ children, className, borderAccent = 'border-t-brandTeal' }) {
  const cardRef = useRef(null);
  const rectRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  const isAmber = borderAccent.includes('Amber');
  const themeColor = isAmber ? '#E79E3C' : '#1E6B7B';
  const strokeColor = isAmber ? 'rgba(231,158,60,0.15)' : 'rgba(30,107,123,0.15)';
  const accentClass = isAmber ? 'border-brandAmber/40' : 'border-brandTeal/40';
  const borderHighlight = isAmber ? 'border-brandAmber' : 'border-brandTeal';

  const handleMouseEnter = () => {
    setIsHovered(true);
    const card = cardRef.current;
    if (card) {
      rectRef.current = card.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e) => {
    if (!rectRef.current) return;
    const rect = rectRef.current;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = -(y - yc) / 12; // tilt angle X
    const angleY = (x - xc) / 12; // tilt angle Y
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`,
      boxShadow: isAmber 
        ? '0 12px 28px rgba(231, 158, 60, 0.08), 0 0 20px rgba(231, 158, 60, 0.06)'
        : '0 12px 28px rgba(30, 107, 123, 0.08), 0 0 20px rgba(30, 107, 123, 0.06)',
      transition: 'transform 0.05s ease, box-shadow 0.2s ease',
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rectRef.current = null;
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      boxShadow: 'none',
      transition: 'transform 0.4s ease, box-shadow 0.4s ease',
    });
  };

  const uniquePatternId = React.useId();

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className={`glass-card p-6 rounded-none border-t border-r border-b border-l border-white/5 relative overflow-hidden select-none transition-all duration-300 group ${className}`}
    >
      {/* Background Tech Grid Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25 group-hover:opacity-45 transition-opacity duration-500">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id={uniquePatternId} width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M 16 0 L 0 0 0 16" fill="none" stroke={strokeColor} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uniquePatternId})`} />
          {/* Target crosshair detail in bottom right */}
          <circle cx="88%" cy="80%" r="14" fill="none" stroke={strokeColor} strokeWidth="0.75" strokeDasharray="2 2" />
          <line x1="88%" y1="70%" x2="88%" y2="90%" stroke={strokeColor} strokeWidth="0.5" />
          <line x1="78%" y1="80%" x2="98%" y2="80%" stroke={strokeColor} strokeWidth="0.5" />
        </svg>
      </div>

      {/* Tech corner brackets */}
      <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 transition-colors duration-300 ${isHovered ? borderHighlight : accentClass}`} />
      <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 transition-colors duration-300 ${isHovered ? borderHighlight : accentClass}`} />
      <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 transition-colors duration-300 ${isHovered ? borderHighlight : accentClass}`} />
      <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 transition-colors duration-300 ${isHovered ? borderHighlight : accentClass}`} />

      {/* Shimmer overlay effect on hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[linear-gradient(105deg,transparent_30%,rgba(255,255,255,0.02)_40%,rgba(255,255,255,0.05)_50%,rgba(255,255,255,0.02)_60%,transparent_70%)] bg-[size:200%_100%] animate-[shimmer_1.5s_infinite_linear]" />

      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yOrb = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const yLeftCol = useTransform(scrollYProgress, [0, 1], [30, -35]);
  const yRightCol = useTransform(scrollYProgress, [0, 1], [-25, 30]);

  const milestones = [
    { year: '2020', title: 'Company Founded', desc: 'AB IT Solutions was incorporated with a focus on web technologies.' },
    { year: '2022', title: '50+ Placements', desc: 'Empowered local talent, securing software roles in major tech hubs.' },
    { year: '2023', title: 'Expanded Data Services', desc: 'Scaled operations to enterprise data processing and web research pipelines.' },
    { year: '2026', title: 'Recruitment Drive', desc: 'Exclusive drive at Sophitorium Group of Institutions targeting fresh talent.' },
  ];

  return (
    <section ref={containerRef} id="about" className="pt-10 pb-10 px-6 bg-bgDark relative overflow-hidden z-20">
      {/* Decorative Orbs */}
      <motion.div
        style={{ y: yOrb }}
        className="absolute top-1/3 left-0 w-[300px] h-[300px] rounded-full bg-brandAmber/5 filter blur-[100px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 25 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="font-mono text-xs font-bold text-brandTeal tracking-widest uppercase block mb-3">
            ✦ WHO WE ARE
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-textPrimary tracking-tight uppercase text-3d">
            Empowering Tech Careers <br className="hidden md:block" />
            <span className="text-textMuted">In Odisha</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Bento Grid Stats & Company Description */}
          <motion.div style={{ y: yLeftCol, willChange: 'transform' }} className="lg:col-span-7 flex flex-col gap-6">
            {/* Bento Grid Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bento-card-container">
              <ScrollAnimateCard index={0} className="h-full">
                <TiltCard className="min-h-[160px] h-full" borderAccent="border-t-brandTeal">
                  <div className="w-10 h-10 border border-brandTeal/20 flex items-center justify-center bg-brandTeal/5 mb-4">
                    <Calendar className="text-brandTeal" size={20} />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-3xl text-textPrimary tracking-tight">5+ Years</h3>
                    <p className="text-[10px] text-textMuted font-mono mt-1.5 uppercase tracking-widest">In IT Services</p>
                  </div>
                </TiltCard>
              </ScrollAnimateCard>

              <ScrollAnimateCard index={1} className="h-full">
                <TiltCard className="min-h-[160px] h-full" borderAccent="border-t-brandTeal">
                  <div className="w-10 h-10 border border-brandTeal/20 flex items-center justify-center bg-brandTeal/5 mb-4">
                    <Award className="text-brandTeal" size={20} />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-3xl text-textPrimary tracking-tight">100+</h3>
                    <p className="text-[10px] text-textMuted font-mono mt-1.5 uppercase tracking-widest">Placements Secured</p>
                  </div>
                </TiltCard>
              </ScrollAnimateCard>

              <ScrollAnimateCard index={2} className="h-full">
                <TiltCard className="min-h-[160px] h-full" borderAccent="border-t-brandAmber">
                  <div className="w-10 h-10 border border-brandAmber/20 flex items-center justify-center bg-brandAmber/5 mb-4">
                    <Briefcase className="text-brandAmber" size={20} />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-3xl text-brandAmber drop-shadow-[0_0_10px_rgba(26,61,99,0.15)] tracking-tight">3 Roles</h3>
                    <p className="text-[10px] text-textMuted font-mono mt-1.5 uppercase tracking-widest">Open Positions</p>
                  </div>
                </TiltCard>
              </ScrollAnimateCard>
            </div>

            {/* Description Card */}
            <ScrollAnimateCard index={3}>
              <div className="glass-card p-8 rounded-none border border-white/5 card-3d-neutral relative overflow-hidden">
                {/* Tech corner brackets for description */}
                <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-white/10" />
                <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-white/10" />
                <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-white/10" />
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-white/10" />

                <p className="text-textPrimary/80 leading-relaxed text-base mb-4 relative z-10 text-justify">
                  AB Information Technology Solutions Private Limited is a specialized IT and business services firm dedicated to building high-performance operational teams. We partner with academic institutions to source, train, and deploy fresh talent into specialized domains such as data services, technical research, and project coordination.
                </p>
                <p className="text-textMuted leading-relaxed text-sm relative z-10 text-justify">
                  Our collaborative drive at Sophitorium Group of Institutions serves as an incubator, giving candidates exposure to live clients, industry-grade delivery specifications, and structured career ladders from day one.
                </p>
              </div>
            </ScrollAnimateCard>
          </motion.div>

          {/* Right Column: Timeline strip */}
          <ScrollAnimateCard index={4} style={{ y: yRightCol, willChange: 'transform' }} className="lg:col-span-5 glass-card p-8 rounded-none border border-white/5 card-3d-neutral relative">
            {/* Tech corner brackets for timeline */}
            <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-white/10" />
            <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-white/10" />
            <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-white/10" />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-white/10" />            <motion.h3 
              initial={{ filter: 'blur(8px)', opacity: 0, y: 15 }}
              whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-xl text-textPrimary mb-8 uppercase tracking-wide relative z-10"
            >
              Our Milestones
            </motion.h3>

            <div className="flex flex-col gap-8 relative z-10">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="flex gap-6 items-start group relative">
                  {/* Timeline track segment (drawn downwards from current dot to next dot) */}
                  {idx < milestones.length - 1 && (
                    <motion.div 
                      className="absolute left-3 -translate-x-[1px] top-3 w-[2px] pointer-events-none overflow-hidden"
                      style={{ bottom: '-44px', originY: 0 }}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.15 }}
                    >
                      <svg className="w-full h-full overflow-visible">
                        <line 
                          x1="1" 
                          y1="0" 
                          x2="1" 
                          y2="100%" 
                          stroke="#1E6B7B" 
                          strokeWidth="2" 
                          strokeDasharray="4 5"
                          strokeLinecap="round"
                          className="animate-line-dash"
                          strokeOpacity="0.6"
                        />
                      </svg>
                    </motion.div>
                  )}

                  {/* Pulse Dot */}
                  <motion.div 
                    className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-bgDark border border-brandTeal/20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.5, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.div
                      className={`w-2.5 h-2.5 rounded-full ${
                        idx === milestones.length - 1 ? 'bg-brandAmber shadow-neon-amber' : 'bg-brandTeal shadow-neon-teal'
                      }`}
                      initial={{ scale: 0.8 }}
                      animate={{
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        delay: idx * 0.4,
                      }}
                    />
                  </motion.div>

                  {/* Text Details */}
                  <motion.div 
                    className="flex-1"
                    initial={{ filter: 'blur(6px)', opacity: 0, y: 15 }}
                    whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.6, delay: idx * 0.15 + 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="font-mono text-xs font-bold text-brandAmber tracking-wider block mb-1">
                      {milestone.year}
                    </span>
                    <h4 className="font-display font-semibold text-textPrimary text-base group-hover:text-brandTeal transition-colors duration-300">
                      {milestone.title}
                    </h4>
                    <p className="text-textMuted text-xs mt-1 leading-relaxed">
                      {milestone.desc}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </ScrollAnimateCard>
        </div>
      </div>
    </section>
  );
}
