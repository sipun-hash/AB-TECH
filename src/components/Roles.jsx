import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, GitBranch, ShieldCheck, ArrowUpRight, ArrowLeft } from 'lucide-react';
import ScrollAnimateCard from './ScrollAnimateCard';

const rolesData = [
  {
    id: 'data-operator',
    title: 'Data Operator',
    badge: 'Top rated',
    subtitle: 'Full-Time • Freshers welcome',
    description: 'Responsible for organizing, entering, verifying, and validating structured datasets supporting client business pipelines.',
    skills: ['Excel Operations', 'Typing 22+ WPM', 'Detail Oriented'],
    responsibilities: [
      'Data Entry & Processing',
      'Data Verification & Formatting',
      'Excel Operations & Reporting',
      'Database Maintenance'
    ],
    note: 'Freshers are fully welcome. Paid onboarding.',
    stipendLine: 'Paid / Onboarding',
    rating: '4.9',
    image: '/assets/data_operator.png',
    icon: Database,
    number: '01'
  },
  {
    id: 'project-coordinator',
    title: 'Project Coordinator',
    badge: 'Top rated',
    subtitle: 'Leadership Track • Coordinator',
    description: 'Maintains timeline accountability, tracks milestones, schedules meetings, and aligns communication across client operations.',
    skills: ['Project Planning', 'Client Alignment', 'Team Leadership'],
    responsibilities: [
      'Project Planning & Coordination',
      'Progress Tracking & Status Reports',
      'Meeting Scheduling & Follow-ups',
      'Internal & External Communication'
    ],
    note: 'Evaluated monthly based on project complexity.',
    stipendLine: 'Monthly / Evaluated',
    rating: '5.0',
    image: '/assets/_.jpeg',
    icon: GitBranch,
    number: '02'
  }
];

export default function Roles() {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yOrb = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  // Parallax translation for cards
  const yCard0 = useTransform(scrollYProgress, [0, 1], [25, -25]);
  const yCard1 = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section ref={containerRef} id="roles" className="pt-20 pb-28 px-6 bg-[#f2f2f2] relative overflow-hidden z-20">
      {/* Decorative Blur Orbs */}
      <motion.div
        style={{ y: yOrb }}
        className="absolute top-0 right-10 w-[300px] h-[300px] rounded-full bg-brandTeal/5 filter blur-[100px] pointer-events-none"
      />
      <motion.div
        style={{ y: yOrb }}
        className="absolute bottom-10 left-10 w-[300px] h-[300px] rounded-full bg-brandAmber/5 filter blur-[100px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-start">
          
          {/* Column 1: Typography Block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between h-full lg:min-h-[380px] pr-0 lg:pr-6"
          >
            <div>
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-mono text-xs font-bold text-brandTeal tracking-widest uppercase block mb-3"
              >
                ✦ OPEN OPPORTUNITIES
              </motion.span>
              
              {/* Clean Typography Section Title */}
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-display font-bold text-3xl lg:text-4xl text-textPrimary tracking-tight uppercase leading-tight mb-4 text-3d"
              >
                Choose Your Pathway
              </motion.h2>
              
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.32 }}
                style={{ transformOrigin: 'left' }}
                className="w-12 h-[2px] bg-brandTeal/30 mb-6"
              />
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.38 }}
                className="text-textMuted text-sm font-sans leading-relaxed mb-8"
              >
                We are offering specialized career pathways designed to kickstart your professional journey. Review the active roles below, explore details, and submit your application.
              </motion.p>

              {/* High-fidelity SVG Paper-Cutout Metric Block */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex items-center gap-4 border-t border-slate-200/60 pt-8"
              >
                <svg viewBox="0 0 160 110" className="w-[120px] h-[82px] sm:w-[160px] sm:h-[110px] font-display font-extrabold select-none flex-shrink-0">
                  <defs>
                    <linearGradient id="metric-cutout-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="42%" stopColor="#ffffff" />
                      <stop offset="42%" stopColor="#1E6B7B" />
                      <stop offset="100%" stopColor="#1E6B7B" />
                    </linearGradient>

                    <filter id="metric-inset-shadow">
                      <feGaussianBlur stdDeviation="1" result="blur" />
                      <feOffset dx="0" dy="3" />
                      <feComposite operator="out" in="SourceGraphic" result="inverse" />
                      <feFlood floodColor="#000000" floodOpacity="0.45" result="color" />
                      <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                      <feComposite operator="over" in="shadow" in2="SourceGraphic" />
                    </filter>
                  </defs>

                  <text 
                    x="0" 
                    y="90" 
                    fill="url(#metric-cutout-grad)" 
                    filter="url(#metric-inset-shadow)"
                    className="uppercase font-black text-[105px]"
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 900 }}
                  >
                    02
                  </text>
                </svg>
                <div className="flex flex-col justify-center select-none">
                  <span className="font-mono text-[10px] font-bold text-brandTeal tracking-widest uppercase">
                    Active
                  </span>
                  <span className="font-display font-black text-textPrimary text-base uppercase tracking-tight leading-none mt-1">
                    Pathways
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Column 2: Data Operator Card (Text on Top, Image on Bottom) */}
          <div className="lg:mt-4">
            <RoleCard
              role={rolesData[0]}
              idx={0}
              parallaxY={yCard0}
              isImageTop={false}
            />
          </div>

          {/* Column 3: Project Coordinator Card (Image on Top, Text on Bottom - offset by mt-12) */}
          <div className="lg:mt-12">
            <RoleCard
              role={rolesData[1]}
              idx={1}
              parallaxY={yCard1}
              isImageTop={true}
            />
          </div>

        </div>
      </div>
    </section>
  );
}

// ---------- Paper-Cutout Number Block for back face ----------

function CutoutNumberBlock({ number, isSecondary, note, icon }) {
  const brandColor = isSecondary ? '#1A3D63' : '#1E6B7B';
  const gradId   = `num-grad-${number}`;
  const filterId = `num-filter-${number}`;

  // Icon block (left for card1, right for card2)
  const iconBlock = (
    <div className="flex flex-col items-start gap-2 flex-shrink-0 z-10">
      <div style={{
        width: 46, height: 46, borderRadius: 14,
        background: '#ffffff',
        border: `1.5px solid ${brandColor}22`,
        boxShadow: `0 2px 8px ${brandColor}18, inset 0 1px 0 rgba(255,255,255,0.9)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {icon && React.createElement(icon, {
          size: 22,
          style: { color: brandColor, opacity: 0.9 }
        })}
      </div>
      <span
        className="font-display font-extrabold uppercase tracking-wider"
        style={{ fontSize: '8px', color: brandColor, opacity: 0.7, lineHeight: 1.6 }}
      >
        Ab It<br/>Solutions
      </span>
    </div>
  );

  // Cutout SVG number block
  const numberBlock = (
    <svg
      viewBox="0 0 160 120"
      className="w-[148px] h-[118px] select-none flex-shrink-0"
      overflow="visible"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#ffffff" />
          <stop offset="42%" stopColor="#ffffff" />
          <stop offset="42%" stopColor={brandColor} />
          <stop offset="100%" stopColor={brandColor} />
        </linearGradient>
        <filter id={filterId} x="-8%" y="-8%" width="120%" height="125%">
          <feGaussianBlur stdDeviation="1.2" in="SourceGraphic" result="blur" />
          <feOffset dx="0" dy="3" in="blur" result="offset" />
          <feComposite operator="out" in="SourceGraphic" in2="offset" result="inverse" />
          <feFlood floodColor="#000000" floodOpacity="0.42" result="color" />
          <feComposite operator="in" in="color" in2="inverse" result="shadow" />
          <feComposite operator="over" in="shadow" in2="SourceGraphic" />
        </filter>
      </defs>
      <text
        x="50%"
        y="90%"
        textAnchor="middle"
        fill={`url(#${gradId})`}
        filter={`url(#${filterId})`}
        style={{
          fontFamily: 'Outfit, system-ui, sans-serif',
          fontWeight: 900,
          fontSize: '118px',
          letterSpacing: '-3px'
        }}
      >
        {number}
      </text>
    </svg>
  );

  return (
    <div
      className="h-[55%] relative flex flex-col justify-between"
      style={{
        borderRadius: 'inherit',
        overflow: 'hidden',
        background: isSecondary
          ? 'linear-gradient(145deg, #eef3fa 0%, #dde8f4 60%, #c8d8ec 100%)'
          : 'linear-gradient(145deg, #eaf4f6 0%, #d4ecf0 60%, #b8dfe5 100%)'
      }}
    >
      {/* Premium radial glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at ${isSecondary ? '30%' : '70%'} 50%, ${brandColor}20 0%, transparent 65%)`,
        pointerEvents: 'none'
      }} />
      {/* Subtle top shine */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '45%',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, transparent 100%)',
        pointerEvents: 'none'
      }} />

      {/* Horizontal split — card1: icon L / num R | card2: num L / icon R */}
      <div className="flex items-center justify-between h-full px-5">
        {isSecondary ? numberBlock : iconBlock}
        {isSecondary ? iconBlock   : numberBlock}
      </div>

      {/* Role note at bottom */}
      <p
        className="absolute bottom-0 left-0 right-0 text-center text-[8.5px] font-sans italic pb-2.5 px-4 select-none"
        style={{ color: brandColor, opacity: 0.7 }}
      >
        * {note}
      </p>
    </div>
  );
}



function GlossyPillButton({ isSecondary, onClick, label }) {
  const baseColor  = isSecondary ? '#1A3D63' : '#1E6B7B';
  const lightColor = isSecondary ? '#245280' : '#2d8f9e';
  const darkColor  = isSecondary ? '#102540' : '#155461';
  const bg = `linear-gradient(180deg, ${lightColor} 0%, ${baseColor} 55%, ${darkColor} 100%)`;
  return (
    <button
      onClick={onClick}
      className="active:scale-95 transition-all duration-200 flex-shrink-0 group/gpb"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: '3px 3px 3px 14px',
        borderRadius: 9999,
        background: bg,
        boxShadow: `0 1px 0 rgba(255,255,255,0.18) inset, 0 -1px 0 rgba(0,0,0,0.35) inset, 0 4px 14px rgba(0,0,0,0.22), 0 0 0 1.5px rgba(255,255,255,0.13)`,
        border: 'none',
        height: 32,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle top highlight shimmer */}
      <span style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
        borderRadius: 9999, pointerEvents: 'none'
      }} />
      <span style={{
        color: '#ffffff',
        fontFamily: 'Outfit, system-ui, sans-serif',
        fontWeight: 700,
        fontSize: 10.5,
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
        lineHeight: 1
      }}>
        {label}
      </span>
      {/* White circular icon badge */}
      <span style={{
        width: 22, height: 22, borderRadius: '50%',
        background: '#ffffff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 1px 3px rgba(0,0,0,0.25)'
      }}>
        <motion.svg
          width="10" height="10" viewBox="0 0 10 10" fill="none"
          animate={{ x: [0, 2.5, 0], y: [0, -2.5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <path d="M2 8L8 2M8 2H4M8 2V6" stroke={baseColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </span>
    </button>
  );
}

function GlossyPillLinkButton({ isSecondary, href, label }) {
  const baseColor  = isSecondary ? '#1A3D63' : '#1E6B7B';
  const lightColor = isSecondary ? '#245280' : '#2d8f9e';
  const darkColor  = isSecondary ? '#102540' : '#155461';
  const bg = `linear-gradient(180deg, ${lightColor} 0%, ${baseColor} 55%, ${darkColor} 100%)`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="active:scale-[0.98] transition-all duration-200 w-full group/gpbl"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '3px 3px 3px 16px',
        borderRadius: 9999,
        background: bg,
        boxShadow: `0 1px 0 rgba(255,255,255,0.18) inset, 0 -1px 0 rgba(0,0,0,0.35) inset, 0 4px 14px rgba(0,0,0,0.22), 0 0 0 1.5px rgba(255,255,255,0.13)`,
        border: 'none',
        height: 36,
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle top highlight shimmer */}
      <span style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
        borderRadius: 9999, pointerEvents: 'none'
      }} />
      <span style={{
        color: '#ffffff',
        fontFamily: 'Outfit, system-ui, sans-serif',
        fontWeight: 700,
        fontSize: 11,
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
        lineHeight: 1,
        position: 'relative', zIndex: 1
      }}>
        {label}
      </span>
      {/* White circular icon badge */}
      <span style={{
        width: 26, height: 26, borderRadius: '50%',
        background: '#ffffff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
        position: 'relative', zIndex: 1
      }}>
        <motion.svg
          width="11" height="11" viewBox="0 0 10 10" fill="none"
          animate={{ x: [0, 2.5, 0], y: [0, -2.5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <path d="M2 8L8 2M8 2H4M8 2V6" stroke={baseColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </span>
    </a>
  );
}

// ---------------------------------------------------------------

function RoleCard({ role, idx, parallaxY, isImageTop }) {
  const [isFlipped, setIsFlipped] = React.useState(false);
  const isSecondary = role.id === 'project-coordinator';

  // Render the text content block
  const renderTextContent = (onBackFace = false, flipTrigger) => (
    <div className="h-[45%] p-5 flex flex-col justify-between select-none">
      <div>
        {/* Title & Badge */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display font-extrabold text-[15px] lg:text-[16px] text-textPrimary leading-tight tracking-tight">
            {role.title}
          </h3>
          <span className="border border-slate-300 text-slate-700 text-[8px] lg:text-[9px] px-2 py-0.5 rounded-full font-sans font-medium">
            {role.badge}
          </span>
        </div>
        
        {/* Subtitle */}
        <p className="text-textMuted text-[9px] font-medium font-sans mb-1.5">
          {role.subtitle}
        </p>

        {/* Description */}
        <p className="text-textMuted text-[10.5px] leading-relaxed line-clamp-2 lg:line-clamp-3 font-sans font-normal">
          {role.description}
        </p>
      </div>

      {/* Pricing / Stipend Line & Debossed Letterpress Button */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-1">
        <div className="flex flex-col">
          <span className="text-textPrimary font-extrabold text-[12px] lg:text-[13px] font-sans">
            {role.stipendLine.split(' / ')[0]}
          </span>
          <span className="text-textMuted text-[8.5px] font-sans font-medium mt-0.5">
            / {role.stipendLine.split(' / ')[1]}
          </span>
        </div>

        <GlossyPillButton
          isSecondary={isSecondary}
          onClick={flipTrigger}
          label={onBackFace ? 'Apply Now' : 'View Details'}
        />
      </div>
    </div>
  );

  // Render the image block
  const renderImageContent = (isTopSide) => (
    <div className={`relative h-[55%] overflow-hidden ${isTopSide ? 'rounded-t-[18px]' : 'rounded-b-[18px]'}`}>
      <motion.img
        src={role.image}
        alt={role.title}
        className="w-full h-full object-cover"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
      />
      {/* Soft edge-focused gradient shadow overlay for crisp image clarity */}
      <div className={`absolute left-0 right-0 h-12 pointer-events-none ${
        isTopSide 
          ? 'top-0 bg-gradient-to-b from-black/25 to-transparent' 
          : 'bottom-0 bg-gradient-to-t from-black/25 to-transparent'
      }`} />

      {/* Translucent skill badges */}
      <div className={`absolute left-4 flex flex-wrap gap-1.5 z-10 ${
        isTopSide ? 'top-4' : 'bottom-4'
      }`}>
        {role.skills.map((skill, sIdx) => (
          <span 
            key={sIdx} 
            className="bg-black/20 border border-white/20 backdrop-blur-md text-white text-[8.5px] px-2 py-0.5 rounded-full font-medium"
          >
            {skill}
          </span>
        ))}
      </div>

    </div>
  );

  return (
    <ScrollAnimateCard
      index={idx}
      className="group relative w-full h-[450px] bg-transparent border-0"
    >
      <motion.div
        style={{ y: parallaxY, perspective: 1200 }}
        className="w-full h-full cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="w-full h-full bg-transparent">
          <motion.div
            className="w-full h-full relative"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ 
              rotateY: isFlipped ? 180 : 0,
              rotateZ: isFlipped ? [0, -6, 0] : [0, 6, 0],
              scale: isFlipped ? [1, 0.92, 1] : [1, 0.92, 1],
              z: isFlipped ? [0, 40, 0] : [0, 40, 0]
            }}
            transition={{ 
              duration: 0.9, 
              ease: [0.25, 1, 0.5, 1]
            }}
          >
            {/* FRONT FACE */}
            <div
              className="absolute inset-0 w-full h-full rounded-[20px] bg-white overflow-hidden flex flex-col justify-between border border-slate-100"
              style={{ 
                backfaceVisibility: 'hidden', 
                WebkitBackfaceVisibility: 'hidden',
                visibility: isFlipped ? 'hidden' : 'visible',
                pointerEvents: isFlipped ? 'none' : 'auto',
                boxShadow: isSecondary
                  ? '0px 10px 30px rgba(26, 61, 99, 0.03), 0px 1px 3px rgba(26, 61, 99, 0.05)'
                  : '0px 10px 30px rgba(30, 107, 123, 0.03), 0px 1px 3px rgba(30, 107, 123, 0.05)'
              }}
            >
              {isImageTop ? (
                <>
                  {renderImageContent(true)}
                  {renderTextContent(false, (e) => {
                    e.stopPropagation();
                    setIsFlipped(!isFlipped);
                  })}
                </>
              ) : (
                <>
                  {renderTextContent(false, (e) => {
                    e.stopPropagation();
                    setIsFlipped(!isFlipped);
                  })}
                  {renderImageContent(false)}
                </>
              )}
            </div>

            {/* BACK FACE */}
            <div
              className="absolute inset-0 w-full h-full rounded-[20px] bg-white overflow-hidden flex flex-col justify-between border border-slate-100"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                visibility: isFlipped ? 'visible' : 'hidden',
                pointerEvents: isFlipped ? 'auto' : 'none',
                boxShadow: isSecondary
                  ? '0px 10px 30px rgba(26, 61, 99, 0.03), 0px 1px 3px rgba(26, 61, 99, 0.05)'
                  : '0px 10px 30px rgba(30, 107, 123, 0.03), 0px 1px 3px rgba(30, 107, 123, 0.05)'
              }}
            >
              {isImageTop ? (
                <>
                  {/* Top: Cutout Number Block */}
                  <CutoutNumberBlock number={role.number} isSecondary={isSecondary} note={role.note} icon={role.icon} />

                  {/* Bottom: Responsibilities & Debossed Apply Button */}
                  <div className="h-[45%] p-5 flex flex-col justify-between bg-white">
                    <div>
                      <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                        <h4 className="font-display font-extrabold text-[11px] text-textPrimary uppercase tracking-wider">
                          Key Tasks
                        </h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsFlipped(false);
                          }}
                          className="text-[9px] font-mono font-bold text-brandTeal hover:text-brandAmber flex items-center gap-0.5 active:scale-95"
                        >
                          <ArrowLeft size={10} /> Back
                        </button>
                      </div>
                      <ul className="space-y-1 mt-2">
                        {role.responsibilities.slice(0, 3).map((resp, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-1.5 text-[10px] text-textMuted">
                            <ShieldCheck size={12} className="text-brandTeal mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-1">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <GlossyPillLinkButton
                      isSecondary={isSecondary}
                      href="https://docs.google.com/forms/d/e/1FAIpQLSf2urYgREjCCoBM_jHaKPhgvEnQU4IkJ0M9_0Ez_Jlw9kNOwQ/viewform"
                      label="Apply for Role"
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Top: Responsibilities & Back button */}
                  <div className="h-[45%] p-5 flex flex-col justify-between bg-white">
                    <div>
                      <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                        <h4 className="font-display font-extrabold text-[11px] text-textPrimary uppercase tracking-wider">
                          Key Tasks
                        </h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsFlipped(false);
                          }}
                          className="text-[9px] font-mono font-bold text-brandTeal hover:text-brandAmber flex items-center gap-0.5 active:scale-95"
                        >
                          <ArrowLeft size={10} /> Back
                        </button>
                      </div>
                      <ul className="space-y-1 mt-2">
                        {role.responsibilities.slice(0, 3).map((resp, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-1.5 text-[10px] text-textMuted">
                            <ShieldCheck size={12} className="text-brandTeal mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-1">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <GlossyPillLinkButton
                      isSecondary={isSecondary}
                      href="https://docs.google.com/forms/d/e/1FAIpQLSf2urYgREjCCoBM_jHaKPhgvEnQU4IkJ0M9_0Ez_Jlw9kNOwQ/viewform"
                      label="Apply for Role"
                    />
                  </div>

                  {/* Bottom: Cutout Number Block */}
                  <CutoutNumberBlock number={role.number} isSecondary={isSecondary} note={role.note} icon={role.icon} />
                </>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </ScrollAnimateCard>
  );
}
