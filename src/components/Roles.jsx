import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, Search, GitBranch, ShieldCheck, ArrowUpRight } from 'lucide-react';
import ScrollAnimateCard from './ScrollAnimateCard';

const rolesData = [
  {
    id: 'data-operator',
    title: 'Data Operator',
    badge: 'Fresher Friendly',
    badgeColor: 'border-brandAmber/40 text-brandAmber bg-white shadow-sm',
    image: '/assets/data_operator.png',
    icon: Database,
    description: 'Responsible for organizing, entry, and validation of structural datasets supporting client business pipelines.',
    skills: ['MS Word & Excel', 'Typing 22+ WPM', 'Data Accuracy', 'Detail Oriented'],
    responsibilities: [
      'Data Entry & Processing',
      'Data Verification & Formatting',
      'Excel Operations & Reporting',
      'Database Maintenance'
    ],
    note: 'Freshers are fully welcome to apply. Paid onboarding.'
  },
  {
    id: 'data-miner',
    title: 'Data Miner',
    badge: 'Research Role',
    badgeColor: 'border-brandTeal/40 text-brandTeal bg-white shadow-sm',
    image: '/assets/data_miner.png',
    icon: Search,
    description: 'Conducts online research and leads target generation pipelines across multi-industry web databases.',
    skills: ['Web Research', 'Lead Generation', 'Information Gathering', 'English Basics'],
    responsibilities: [
      'Online Research & Data Collection',
      'Lead Generation Pipelines',
      'Information Aggregation',
      'Market Data Validation'
    ],
    note: 'Structured research workflow. Training is provided.'
  },
  {
    id: 'project-coordinator',
    title: 'Project Coordinator',
    badge: 'Leadership Track',
    badgeColor: 'border-brandAmber/40 text-brandAmber bg-white shadow-sm',
    image: '/assets/project_coordinator.png',
    icon: GitBranch,
    description: 'Maintains timeline accountability, tracks milestones, scheduling, and aligns communication across client operations.',
    skills: ['Project Planning', 'Client Coordination', 'Report Preparation', 'Team Management'],
    responsibilities: [
      'Project Planning & Coordination',
      'Progress Tracking & Status Reports',
      'Meeting Scheduling & Follow-ups',
      'Internal & External Communication'
    ],
    note: 'Compensation shall be evaluated monthly based on project allocation, complexity, and delivery standards.'
  }
];

export default function Roles() {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yOrb = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  const yCard0 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yCard1 = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const yCard2 = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const getParallaxY = (idx) => {
    if (idx % 3 === 0) return yCard0;
    if (idx % 3 === 2) return yCard2;
    return yCard1;
  };

  return (
    <section ref={containerRef} id="roles" className="pt-10 pb-10 px-6 bg-bgDark relative overflow-hidden z-20">
      {/* Grid Pattern and Orbs */}
      <motion.div
        style={{ y: yOrb }}
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-brandTeal/5 filter blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 25 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs font-bold text-brandTeal tracking-widest uppercase block mb-3">
            ✦ OPEN OPPORTUNITIES
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-textPrimary tracking-tight uppercase text-3d">
            CHOOSE YOUR PATHWAY
          </h2>
          <p className="text-textMuted max-w-xl mx-auto mt-4 text-sm font-sans">
            We are hiring motivated fresh graduates and technical students. Real project work, mentorship, and clear promotions from day one.
          </p>
        </motion.div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {rolesData.map((role, idx) => (
            <RoleCard
              key={role.id}
              role={role}
              idx={idx}
              parallaxY={getParallaxY(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}function RoleCard({ role, idx, parallaxY }) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <ScrollAnimateCard
      index={idx}
      className="group relative w-full h-[340px] bg-transparent border-0 cursor-pointer"
    >
      <motion.div
        style={{ y: parallaxY, perspective: 1200 }}
        className="w-full h-full"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div 
          className="w-full h-full transition-transform duration-300 hover:-translate-y-1.5 rounded-[5px]"
          style={{
            boxShadow: role.id === 'project-coordinator'
              ? '0px 8px 20px rgba(26, 61, 99, 0.07)'
              : '0px 8px 20px rgba(30, 107, 123, 0.07)'
          }}
        >
          <motion.div
            className="w-full h-full relative"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ 
              rotateY: isFlipped ? 180 : 0,
              rotateZ: isFlipped ? [0, -3, 0] : [0, 3, 0], // subtle dynamic swing during flip
              z: isFlipped ? [0, 60, 0] : [0, 60, 0]     // pulls card closer to screen during rotation
            }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* FRONT FACE */}
            <div
              className="absolute inset-0 w-full h-full transition-all duration-300"
              style={{ 
                backfaceVisibility: 'hidden', 
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              {/* Beveled Top-Left Card Shape with 1px solid theme-colored border wrapper & rounded cut-edge transition */}
              <div
                className={`w-full h-full p-[1px] rounded-[5px] transition-colors duration-300 ${
                  role.id === 'project-coordinator' 
                    ? 'bg-brandAmber/30 group-hover:bg-brandAmber/70' 
                    : 'bg-brandTeal/30 group-hover:bg-brandTeal/70'
                }`}
                style={{ clipPath: 'polygon(32px 0, 100% 0, 100% 100%, 0 100%, 0 32px, 2px 28px, 6px 24px, 24px 6px, 28px 2px)' }}
              >
                {/* Card Body */}
                <div 
                  className="w-full h-full bg-white flex flex-col overflow-hidden rounded-[5px]"
                  style={{ 
                    clipPath: 'polygon(31.5px 0, 100% 0, 100% 100%, 0 100%, 0 31.5px, 2px 27.5px, 5.5px 23.5px, 23.5px 5.5px, 27.5px 2px)',
                    transform: 'translateZ(0)' // Fixes safari clip-path solid block glitch
                  }}
                >
                  {/* Scanline texture on hover */}
                  <div className="absolute inset-0 scanline-texture opacity-0 group-hover:opacity-[0.03] pointer-events-none transition-opacity duration-300" />
                  
                  {/* Image Container (top 40%) */}
                  <div className="relative w-full h-[40%] overflow-hidden border-b border-brandTeal/10">
                    <motion.img 
                      src={role.image} 
                      alt={role.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      initial={{ opacity: 0, scale: 1.12 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.08 + 0.1, ease: 'easeOut' }}
                    />
                    {/* Soft gradient overlay to blend image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
                    
                    {/* Badges above the image (overlayed at the top right) */}
                    <motion.div 
                      className="absolute top-3 right-3 z-10"
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.08 + 0.2, ease: 'easeOut' }}
                    >
                      <span className={`px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold uppercase border tracking-wider transition-transform duration-300 group-hover:scale-105 backdrop-blur-md ${role.badgeColor}`}>
                        {role.badge}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content Container (bottom 60%) */}
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      {/* Title */}
                      <motion.h3 
                        className="font-display font-bold text-base text-textPrimary group-hover:text-brandTeal transition-colors duration-300 mb-1"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.08 + 0.15, ease: 'easeOut' }}
                      >
                        {role.title}
                      </motion.h3>

                      {/* Description */}
                      <motion.p 
                        className="text-textMuted text-[11px] leading-relaxed mb-2 font-sans line-clamp-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.08 + 0.2, ease: 'easeOut' }}
                      >
                        {role.description}
                      </motion.p>

                      {/* Divider */}
                      <div className="w-full h-[1px] bg-brandTeal/10 mb-2" />

                      {/* Skills dynamic inline listing */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.08 + 0.25, ease: 'easeOut' }}
                      >
                        <h4 className="font-display text-[9px] font-bold text-brandAmber tracking-wider uppercase mb-1">
                          Required Skills
                        </h4>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-textMuted font-sans font-normal">
                          {role.skills.map((skill, sIdx) => (
                            <React.Fragment key={sIdx}>
                              <span className={`transition-colors duration-200 cursor-default ${
                                role.id === 'project-coordinator' ? 'hover:text-brandAmber' : 'hover:text-brandTeal'
                              }`}>
                                {skill}
                              </span>
                              {sIdx < role.skills.length - 1 && (
                                <span className="text-textMuted/30 select-none pointer-events-none">|</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Flip Trigger Button */}
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFlipped(true);
                      }}
                      initial={{ opacity: 0, y: 12, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.08 + 0.3, ease: 'easeOut' }}
                      className={`w-full py-2 text-white border-0 rounded-[4px] font-display font-semibold text-xs transition-all duration-300 flex items-center justify-center gap-1.5 active:scale-95 ${
                        role.id === 'project-coordinator'
                          ? 'bg-brandAmber hover:bg-brandAmber/90'
                          : 'bg-brandTeal hover:bg-brandTeal/90'
                      }`}
                    >
                      View Details & Apply
                      <ArrowUpRight size={14} className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* BACK FACE */}
            <div
              className="absolute inset-0 w-full h-full transition-all duration-300"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              {/* Beveled Top-Left Card Shape with 1px solid theme-colored border wrapper & rounded cut-edge transition */}
              <div
                className={`w-full h-full p-[1px] rounded-[5px] transition-colors duration-300 ${
                  role.id === 'project-coordinator' 
                    ? 'bg-brandAmber/30 group-hover:bg-brandAmber/70' 
                    : 'bg-brandTeal/30 group-hover:bg-brandTeal/70'
                }`}
                style={{ clipPath: 'polygon(32px 0, 100% 0, 100% 100%, 0 100%, 0 32px, 2px 28px, 6px 24px, 24px 6px, 28px 2px)' }}
              >
                {/* Card Body */}
                <div 
                  className="w-full h-full p-5 bg-white flex flex-col justify-between overflow-hidden rounded-[5px]"
                  style={{ 
                    clipPath: 'polygon(31.5px 0, 100% 0, 100% 100%, 0 100%, 0 31.5px, 2px 27.5px, 5.5px 23.5px, 23.5px 5.5px, 27.5px 2px)',
                    transform: 'translateZ(0)' // Fixes safari clip-path solid block glitch
                  }}
                >
                  {/* Scanline texture on hover */}
                  <div className="absolute inset-0 scanline-texture opacity-0 group-hover:opacity-[0.03] pointer-events-none transition-opacity duration-300" />
                  
                  <div>
                    {/* Header: Title + Flip Back Button */}
                    <div className="flex items-center justify-between mb-2.5 pb-1.5 border-b border-brandTeal/10">
                      <h3 className="font-display font-bold text-xs text-textPrimary uppercase tracking-wider">
                        {role.title} Info
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsFlipped(false);
                        }}
                        className="text-[10px] font-mono font-bold text-brandTeal hover:text-brandAmber border border-brandTeal/20 px-2 py-0.5 rounded-[4px] bg-white/40 transition-all duration-300 active:scale-95"
                      >
                        ← Back
                      </button>
                    </div>

                    {/* Responsibilities list */}
                    <div className="mb-3">
                      <h4 className="font-mono text-[9px] font-bold text-textPrimary tracking-wider uppercase mb-1.5">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-1">
                        {role.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2 text-[11px] text-textMuted">
                            <ShieldCheck size={13} className="text-brandTeal mt-0.5 flex-shrink-0" />
                            <span className="leading-snug">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-[9.5px] text-textMuted italic leading-normal border-t border-brandTeal/10 pt-2 mt-2">
                      * {role.note}
                    </p>
                  </div>

                  {/* Action button */}
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSf2urYgREjCCoBM_jHaKPhgvEnQU4IkJ0M9_0Ez_Jlw9kNOwQ/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`w-full py-2 text-white border-0 rounded-[4px] font-display font-semibold text-xs transition-all duration-300 flex items-center justify-center gap-1.5 active:scale-95 ${
                      role.id === 'project-coordinator'
                        ? 'bg-brandAmber hover:bg-brandAmber/90'
                        : 'bg-brandTeal hover:bg-brandTeal/90'
                    }`}
                  >
                    Apply for Role
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </ScrollAnimateCard>
  );
}

