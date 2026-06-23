import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const eligibilityCriteria = [
  'Basic computer operation and folder architecture systems.',
  'Fundamental knowledge of MS Word and MS Excel formatting.',
  'Keyboard typing speed of 22+ WPM with high accuracy.',
  'Sound written and reading comprehension in English.',
  'Disciplined professional conduct and adherence to schedules.',
  'Freshers, final-year CSE/IT, and non-CSE students may apply.'
];

// Unified 3-theme color palette: brandTeal (#1E6B7B), brandAmber (#E79E3C), Indigo (#6366F1)
const softSkills = [
  { name: 'Discipline', lines: ['Discipline'], color: '#1E6B7B' },
  { name: 'Team Collaboration', lines: ['Team', 'Collaboration'], color: '#6366F1' },
  { name: 'Time Management', lines: ['Time', 'Management'], color: '#E79E3C' },
  { name: 'Attention to Detail', lines: ['Attention', 'To Detail'], color: '#1E6B7B' },
  { name: 'Problem-Solving', lines: ['Problem-', 'Solving'], color: '#6366F1' },
  { name: 'Learning Attitude', lines: ['Learning', 'Attitude'], color: '#E79E3C' },
  { name: 'Ownership', lines: ['Ownership'], color: '#1E6B7B' },
  { name: 'Decision Making', lines: ['Decision', 'Making'], color: '#6366F1' },
  { name: 'Leadership potential', lines: ['Leadership', 'Potential'], color: '#E79E3C' }
];

export default function EligibilitySkills() {
  const containerRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [autoIdx, setAutoIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yOrb1 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const yOrb2 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const yLeftCol = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const yRightCol = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  // Center coordinate of the compact HUD Radar Web (widened view coordinates to prevent clipping)
  const cx = 220;
  const cy = 190;

  // Auto cycle active states for glowing highlights
  useEffect(() => {
    if (hoveredIdx !== null) return;
    const interval = setInterval(() => {
      setAutoIdx((prev) => (prev + 1) % softSkills.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [hoveredIdx]);

  const currentIdx = hoveredIdx !== null ? hoveredIdx : autoIdx;

  // Calculate bounding box attributes dynamically for the highlighted label
  const getBoxProps = (idx) => {
    const orbitRadius = 55 + (idx % 3) * 40;
    const angle = (idx * 40 - 20) * Math.PI / 180;
    const x = cx + orbitRadius * Math.cos(angle);
    const y = cy + orbitRadius * Math.sin(angle);
    const cos = Math.cos(angle);
    
    let textAnchor = 'middle';
    let dx = 0;
    let dy = 3;
    if (cos > 0.3) {
      textAnchor = 'start';
      dx = 10;
    } else if (cos < -0.3) {
      textAnchor = 'end';
      dx = -10;
    } else {
      dy = Math.sin(angle) > 0 ? 14 : -10;
    }

    const labelX = x + dx;
    const labelY = y + dy;
    const skill = softSkills[idx];
    
    // Auto-size calculations based on text line lengths
    const maxLineLength = Math.max(...skill.lines.map(l => l.length));
    const textWidth = maxLineLength * 5.2; // 5.2px per character at 9px font size
    const width = textWidth + 10;
    const height = skill.lines.length === 1 ? 14 : 24;

    let rx = 0;
    if (textAnchor === 'start') {
      rx = labelX - 5;
    } else if (textAnchor === 'end') {
      rx = labelX - textWidth - 5;
    } else {
      rx = labelX - textWidth / 2 - 5;
    }
    
    // Position vertically centered relative to baseline dy offset
    const ry = labelY - height / 2 - 1.5;

    return { x: rx, y: ry, width, height };
  };

  const activeBox = getBoxProps(currentIdx);
  const activeColor = softSkills[currentIdx].color;

  return (
    <section ref={containerRef} id="eligibility" className="pt-10 pb-10 px-6 bg-bgDark relative overflow-hidden z-20">
      {/* Decorative Orbs */}
      <motion.div
        style={{ y: yOrb1 }}
        className="absolute top-1/4 right-0 w-[250px] h-[250px] rounded-full bg-brandTeal/5 filter blur-[90px] pointer-events-none"
      />
      <motion.div
        style={{ y: yOrb2 }}
        className="absolute bottom-1/4 left-0 w-[250px] h-[250px] rounded-full bg-brandAmber/5 filter blur-[90px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Eligibility Checklist */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 self-start">
            {/* Header — blur/slide reveal */}
            <motion.div
              initial={{ filter: 'blur(8px)', opacity: 0, y: 18 }}
              whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-mono text-xs font-bold text-brandTeal tracking-widest uppercase block mb-2.5">
                ✦ PREREQUISITES
              </span>
              <h2 className="font-display font-bold text-3xl text-textPrimary tracking-tight uppercase mb-6 text-3d">
                ELIGIBILITY &amp; CHECKLIST
              </h2>
            </motion.div>

            <div className="space-y-5">
              {eligibilityCriteria.map((criterion, idx) => (
                <motion.div
                  key={idx}
                  className="flex gap-3.5 items-start"
                  initial={{ opacity: 0, x: -18, filter: 'blur(5px)' }}
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Tick icon — pops in with scale */}
                  <motion.div
                    className="w-5.5 h-5.5 rounded-full bg-brandTeal/10 border-2 border-brandTeal/80 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[0_0_6px_rgba(30,107,123,0.12)]"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.4, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <svg
                      className="w-3.5 h-3.5 text-brandTeal"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      viewBox="0 0 24 24"
                    >
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: idx * 0.1 + 0.15, ease: 'easeOut' }}
                      />
                    </svg>
                  </motion.div>
                  {/* Text */}
                  <p className="text-textMuted text-xs font-sans leading-relaxed">
                    {criterion}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Soft Skills Interactive HUD Radar Chart */}
          <motion.div
            initial={{ filter: 'blur(10px)', opacity: 0 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: yRightCol }}
            className="lg:col-span-6 flex flex-col items-stretch"
          >
            <span className="font-mono text-xs font-bold text-brandAmber tracking-widest uppercase block mb-2.5">
              ✦ CORE QUALITIES
            </span>
            <h2 className="font-display font-bold text-3xl text-textPrimary tracking-tight uppercase mb-5 text-3d">
              SOFT SKILLS DRIFT
            </h2>
            <p className="text-textMuted text-xs leading-relaxed mb-6 font-sans">
              Beyond hard capabilities, we look for core professional qualities that establish foundational career growth.
            </p>

            {/* SVG HUD Visualization Area - Increased container width aspect ratio */}
            <div className="w-full aspect-[440/380] max-w-[420px] mx-auto bg-white/[0.01] border border-white/5 relative p-2 flex items-center justify-center rounded-[5px]">
              {/* Scanline grid texture inside the HUD box */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(30,107,123,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(30,107,123,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none rounded-[5px]" />
              
              <svg viewBox="0 0 440 380" className="w-full h-full select-none relative z-10">
                
                {/* Orbit grid rings with custom spinning dash offsets */}
                <circle cx={cx} cy={cy} r="135" fill="none" stroke="rgba(30,107,123,0.45)" strokeWidth="1.5" strokeDasharray="3 5">
                  <animate attributeName="stroke-dashoffset" values="40;0" dur="7s" repeatCount="indefinite" />
                </circle>
                <circle cx={cx} cy={cy} r="95" fill="none" stroke="rgba(30,107,123,0.45)" strokeWidth="1.5" strokeDasharray="3 5">
                  <animate attributeName="stroke-dashoffset" values="0;40" dur="6s" repeatCount="indefinite" />
                </circle>
                <circle cx={cx} cy={cy} r="55" fill="none" stroke="rgba(30,107,123,0.45)" strokeWidth="1.5" strokeDasharray="3 5">
                  <animate attributeName="stroke-dashoffset" values="40;0" dur="5s" repeatCount="indefinite" />
                </circle>

                {/* Corner Tick Brackets representing target capture bounds */}
                {/* Top-Left Corner Bracket */}
                <motion.path
                  d={`M ${activeBox.x} ${activeBox.y + 4} L ${activeBox.x} ${activeBox.y} L ${activeBox.x + 4} ${activeBox.y}`}
                  animate={{
                    d: `M ${activeBox.x} ${activeBox.y + 4} L ${activeBox.x} ${activeBox.y} L ${activeBox.x + 4} ${activeBox.y}`,
                    stroke: activeColor
                  }}
                  transition={{ type: "spring", stiffness: 150, damping: 18 }}
                  fill="none"
                  strokeWidth="1.5"
                />
                {/* Top-Right Corner Bracket */}
                <motion.path
                  d={`M ${activeBox.x + activeBox.width - 4} ${activeBox.y} L ${activeBox.x + activeBox.width} ${activeBox.y} L ${activeBox.x + activeBox.width} ${activeBox.y + 4}`}
                  animate={{
                    d: `M ${activeBox.x + activeBox.width - 4} ${activeBox.y} L ${activeBox.x + activeBox.width} ${activeBox.y} L ${activeBox.x + activeBox.width} ${activeBox.y + 4}`,
                    stroke: activeColor
                  }}
                  transition={{ type: "spring", stiffness: 150, damping: 18 }}
                  fill="none"
                  strokeWidth="1.5"
                />
                {/* Bottom-Left Corner Bracket */}
                <motion.path
                  d={`M ${activeBox.x} ${activeBox.y + activeBox.height - 4} L ${activeBox.x} ${activeBox.y + activeBox.height} L ${activeBox.x + 4} ${activeBox.y + activeBox.height}`}
                  animate={{
                    d: `M ${activeBox.x} ${activeBox.y + activeBox.height - 4} L ${activeBox.x} ${activeBox.y + activeBox.height} L ${activeBox.x + 4} ${activeBox.y + activeBox.height}`,
                    stroke: activeColor
                  }}
                  transition={{ type: "spring", stiffness: 150, damping: 18 }}
                  fill="none"
                  strokeWidth="1.5"
                />
                {/* Bottom-Right Corner Bracket */}
                <motion.path
                  d={`M ${activeBox.x + activeBox.width - 4} ${activeBox.y + activeBox.height} L ${activeBox.x + activeBox.width} ${activeBox.y + activeBox.height} L ${activeBox.x + activeBox.width} ${activeBox.y + activeBox.height - 4}`}
                  animate={{
                    d: `M ${activeBox.x + activeBox.width - 4} ${activeBox.y + activeBox.height} L ${activeBox.x + activeBox.width} ${activeBox.y + activeBox.height} L ${activeBox.x + activeBox.width} ${activeBox.y + activeBox.height - 4}`,
                    stroke: activeColor
                  }}
                  transition={{ type: "spring", stiffness: 150, damping: 18 }}
                  fill="none"
                  strokeWidth="1.5"
                />

                {/* Draw connecting lines and telemetry nodes first (so they render behind center white hub) */}
                {softSkills.map((skill, idx) => {
                  const orbitRadius = 55 + (idx % 3) * 40;
                  const angle = (idx * 40 - 20) * Math.PI / 180;
                  const x = cx + orbitRadius * Math.cos(angle);
                  const y = cy + orbitRadius * Math.sin(angle);
                  const color = skill.color;
                  const isHovered = hoveredIdx === idx;
                  const isSelected = currentIdx === idx;

                  // Label alignments
                  const cos = Math.cos(angle);
                  let textAnchor = 'middle';
                  let dx = 0;
                  let dy = 3;
                  if (cos > 0.3) {
                    textAnchor = 'start';
                    dx = 10;
                  } else if (cos < -0.3) {
                    textAnchor = 'end';
                    dx = -10;
                  } else {
                    dy = Math.sin(angle) > 0 ? 14 : -10;
                  }

                  const startDy = -((skill.lines.length - 1) * 5);

                  return (
                    <g 
                      key={idx}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        setHoveredIdx(idx);
                      }}
                    >
                      {/* Active line always visible with dash animation */}
                      <line 
                        x1={cx} 
                        y1={cy} 
                        x2={x} 
                        y2={y} 
                        stroke={color} 
                        strokeWidth={isHovered ? 1.75 : 1.25}
                        strokeDasharray={isHovered ? '4 2' : '2 4'}
                        opacity={isSelected ? 0.95 : 0.5}
                        className="transition-all duration-300"
                      />

                      {/* Traveling highlight dot along line - Only animated if active/selected to save CPU */}
                      {(isSelected || isHovered) && (
                        <circle r={isHovered ? 3.5 : 2} fill={color} opacity={0.95}>
                          <animateMotion 
                            path={`M ${cx} ${cy} L ${x} ${y}`} 
                            dur={`${1.2 + (idx % 3) * 0.4}s`} 
                            repeatCount="indefinite" 
                          />
                        </circle>
                      )}

                      {/* Inner Node Dot */}
                      <circle 
                        cx={x} 
                        cy={y} 
                        r={isHovered ? 5.5 : 3.5} 
                        fill={isSelected ? color : '#FFFFFF'} 
                        stroke={color} 
                        strokeWidth="1.5"
                        className="transition-all duration-300"
                      />

                      {/* Outer pulsing ring - Only animated if active/selected to save CPU */}
                      {(isSelected || isHovered) && (
                        <circle cx={x} cy={y} r="7.5" fill="none" stroke={color} strokeWidth="0.75" opacity={0.8}>
                          <animate attributeName="r" values="3.5;10;3.5" dur={`${1.6 + (idx % 3) * 0.4}s`} repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.8;0;0.8" dur={`${1.6 + (idx % 3) * 0.4}s`} repeatCount="indefinite" />
                        </circle>
                      )}

                      {/* Soft Skill Title Label */}
                      <text
                        x={x}
                        y={y}
                        dx={dx}
                        dy={dy}
                        textAnchor={textAnchor}
                        fill={color}
                        opacity={isSelected ? 1.0 : 0.75}
                        style={{
                          textShadow: isSelected
                            ? '0.5px 0.5px 0px rgba(17,47,53,0.3), 1px 1px 0px rgba(17,47,53,0.2)'
                            : 'none'
                        }}
                        className={`font-display text-[9px] font-bold tracking-wider uppercase transition-all duration-300 ${
                          isSelected ? 'font-extrabold' : ''
                        }`}
                      >
                        {skill.lines.map((line, lineIdx) => (
                          <tspan
                            key={lineIdx}
                            x={x + dx}
                            dy={lineIdx === 0 ? dy + startDy : 10}
                          >
                            {line}
                          </tspan>
                        ))}
                      </text>
                    </g>
                  );
                })}

                {/* Center hub structure - rendered AFTER lines to hide them behind the white circle */}
                <circle cx={cx} cy={cy} r="16" fill="#FFFFFF" stroke="rgba(30,107,123,0.3)" strokeWidth="1.5" className="shadow-sm" />
                <circle cx={cx} cy={cy} r="4" fill={softSkills[currentIdx].color} className="transition-colors duration-300" />

              </svg>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
