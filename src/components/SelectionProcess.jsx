import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ClipboardList, Keyboard, Laptop, Compass, Users2, MessageSquare, FileSpreadsheet } from 'lucide-react';
import ScrollAnimateCard from './ScrollAnimateCard';

const dataSteps = [
  {
    title: 'Screening',
    desc: 'Verify academic credentials and initial applications.',
    icon: ClipboardList
  },
  {
    title: 'Typing Test',
    desc: 'Evaluate keyboard accuracy and speed (22+ WPM minimum).',
    icon: Keyboard
  },
  {
    title: 'Computer Skill Eval',
    desc: 'Validate core MS Excel functions and Word formatting skills.',
    icon: Laptop
  },
  {
    title: 'Research Test',
    desc: 'Assessment on Google Search operators and data scraping.',
    icon: Compass
  },
  {
    title: 'Final Interview',
    desc: 'One-on-one dialog with project directors.',
    icon: Users2
  }
];

const projectSteps = [
  {
    title: 'Profile Screening',
    desc: 'Assess communication skills and graduation backgrounds.',
    icon: Compass
  },
  {
    title: 'Client Management Eval',
    desc: 'Excel and scenario-based reporting exercises.',
    icon: FileSpreadsheet
  },
  {
    title: 'Mock Briefing Test',
    desc: 'Roleplay scenario handling team guidance coordinates.',
    icon: MessageSquare
  },
  {
    title: 'Final Interview',
    desc: 'Operational panel review for leadership & coordination fit.',
    icon: Users2
  }
];

export default function SelectionProcess() {
  const [activeTab, setActiveTab] = useState('data'); // 'data' | 'project'
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yOrb = useTransform(scrollYProgress, [0, 1], [-70, 70]);

  return (
    <section ref={containerRef} id="process" className="pt-10 pb-10 px-6 bg-bgDark relative overflow-hidden z-20">
      {/* Decorative Parallax Orb */}
      <motion.div
        style={{ y: yOrb }}
        className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-brandTeal/5 filter blur-[90px] pointer-events-none"
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 25 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8"
        >
          <span className="font-mono text-xs font-bold text-brandTeal tracking-widest uppercase block mb-3">
            ✦ WORKFLOW ROADMAP
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-textPrimary tracking-tight uppercase text-3d">
            SELECTION PROCESS
          </h2>
          <p className="text-textMuted max-w-xl mx-auto mt-4 text-sm font-sans">
            A transparent and structured pathway from candidate submission to client-facing teams.
          </p>
        </motion.div>

        {/* Toggle Tabs */}
        <div className="flex justify-center mt-6 mb-16">
          <div className="p-1 rounded-full bg-[#E4EFF1]/70 backdrop-blur-sm border border-white/80 flex gap-1.5 relative shadow-sm z-10">
            <button
              onClick={() => setActiveTab('data')}
              className={`px-6 py-2.5 rounded-full font-display text-sm font-semibold tracking-wider relative transition-colors duration-300 active:scale-95 ${
                activeTab === 'data' ? 'text-white' : 'text-textMuted hover:text-[#1E6B7B]'
              }`}
            >
              {activeTab === 'data' && (
                <motion.div
                  layoutId="activeStepTabIndicator"
                  className="absolute inset-0 bg-[#1E6B7B] shadow-neon-teal rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">Data Roles</span>
            </button>
            
            <button
              onClick={() => setActiveTab('project')}
              className={`px-6 py-2.5 rounded-full font-display text-sm font-semibold tracking-wider relative transition-colors duration-300 active:scale-95 ${
                activeTab === 'project' ? 'text-white' : 'text-textMuted hover:text-brandAmber'
              }`}
            >
              {activeTab === 'project' && (
                <motion.div
                  layoutId="activeStepTabIndicator"
                  className="absolute inset-0 bg-brandAmber shadow-neon-amber rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">Project Coordinator</span>
            </button>
          </div>
        </div>

        {/* Stepper Content */}
        <ScrollAnimateCard index={1} yOffset={30} className="relative px-2">
          <AnimatePresence mode="wait">
            {activeTab === 'data' ? (
              <motion.div
                key="data-stepper"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="relative flex flex-col md:flex-row justify-between items-start gap-12 md:gap-4 mt-8"
              >
                {/* Horizontal dotted connection line — draws left-to-right on scroll */}
                <svg 
                  className="absolute top-[27px] left-[10%] right-[10%] w-[80%] h-[2px] z-0 hidden md:block overflow-visible cursor-pointer"
                  viewBox="0 0 1000 2"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <mask id="data-line-mask">
                      <motion.path 
                        d="M 0 1 L 1000 1" 
                        fill="none" 
                        stroke="white" 
                        strokeWidth="5" 
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                      />
                    </mask>
                  </defs>
                  {/* Ghost base track */}
                  <path 
                    d="M 0 1 L 1000 1" 
                    fill="none" 
                    stroke="#1E6B7B" 
                    strokeWidth="2.5" 
                    strokeOpacity="0.10" 
                    strokeLinecap="round" 
                  />
                  {/* Animated draw-on dotted line */}
                  <path 
                    d="M 0 1 L 1000 1" 
                    fill="none" 
                    stroke="#1E6B7B" 
                    strokeWidth="2.5" 
                    strokeDasharray="4 5"
                    strokeLinecap="round"
                    strokeOpacity="0.75"
                    mask="url(#data-line-mask)"
                  />
                </svg>
                  {dataSteps.map((step, idx) => {
                  const StepIcon = step.icon;
                  return (
                    <motion.div
                      key={idx}
                      whileHover="hover"
                      whileTap="tap"
                      className="relative z-10 flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-6 md:gap-0 flex-1 w-full md:w-auto cursor-pointer group"
                    >
                      {/* Vertical line segment for mobile (rendered only for items before the last one) */}
                      {idx < dataSteps.length - 1 && (
                        <div 
                          className="absolute left-7 -translate-x-[1px] top-7 w-[2px] pointer-events-none z-0 block md:hidden overflow-visible"
                          style={{ bottom: '-76px' }}
                        >
                          <svg className="w-full h-full overflow-visible">
                            <line 
                              x1="1" 
                              y1="0" 
                              x2="1" 
                              y2="100%" 
                              stroke="#1E6B7B" 
                              strokeWidth="2.5" 
                              strokeDasharray="4 5"
                              strokeLinecap="round"
                              className="animate-line-dash"
                              strokeOpacity="0.75"
                            />
                          </svg>
                        </div>
                      )}
                      {/* Node Circle — scroll reveal: scale + fade in, staggered by idx */}
                      <motion.div
                        className="relative flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-white border border-white/60 z-10 shadow-sm transition-colors duration-300 group-hover:border-brandTeal/60"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: '-20px' }}
                        transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {/* Interactive outer glow ring */}
                        <motion.div 
                          className="absolute -inset-1.5 rounded-full border border-brandTeal/30 opacity-0"
                          variants={{
                            hover: { scale: 1.15, borderColor: "rgba(30,107,123,0.6)", borderWidth: 2, opacity: 1 }
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        />
                        
                        {/* Pulsing subtle ambient glow */}
                        <div className="absolute -inset-0.5 rounded-full border border-brandTeal/15 animate-pulse-slow" />

                        {/* Animated Icon */}
                        <motion.div
                          variants={{
                            hover: { scale: 1.12, rotate: [0, -10, 10, 0] }
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <StepIcon size={20} className="text-brandTeal" />
                        </motion.div>
                        
                        {/* Step index badge */}
                        <motion.div 
                          variants={{
                            hover: { scale: 1.25, rotate: 12, backgroundColor: "#1A3D63" }
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brandTeal border border-bgDark flex items-center justify-center font-mono text-[9px] font-bold text-white shadow-sm"
                        >
                          0{idx + 1}
                        </motion.div>
                      </motion.div>

                      {/* Details — scroll reveal: blur+slide+fade, staggered */}
                      <motion.div
                        className="mt-2 md:mt-4 flex-1 md:flex-initial"
                        initial={{ filter: 'blur(6px)', opacity: 0, y: 12 }}
                        whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-20px' }}
                        transition={{ duration: 0.6, delay: idx * 0.12 + 0.1, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <h4 className="font-display font-bold text-base text-textPrimary uppercase tracking-wider mb-2 group-hover:text-brandTeal transition-colors duration-300">
                          {step.title}
                        </h4>
                        <p className="text-textMuted text-xs max-w-[200px] leading-relaxed font-sans">
                          {step.desc}
                        </p>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="project-stepper"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="relative flex flex-col md:flex-row justify-between items-start gap-12 md:gap-4 mt-8"
              >
                {/* Horizontal dotted connection line — draws left-to-right on scroll */}
                <svg 
                  className="absolute top-[27px] left-[12.5%] right-[12.5%] w-[75%] h-[2px] z-0 hidden md:block overflow-visible cursor-pointer"
                  viewBox="0 0 1000 2"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <mask id="project-line-mask">
                      <motion.path 
                        d="M 0 1 L 1000 1" 
                        fill="none" 
                        stroke="white" 
                        strokeWidth="5" 
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                      />
                    </mask>
                  </defs>
                  {/* Ghost base track */}
                  <path 
                    d="M 0 1 L 1000 1" 
                    fill="none" 
                    stroke="#1A3D63" 
                    strokeWidth="2.5" 
                    strokeOpacity="0.10" 
                    strokeLinecap="round" 
                  />
                  {/* Animated draw-on dotted line */}
                  <path 
                    d="M 0 1 L 1000 1" 
                    fill="none" 
                    stroke="#1A3D63" 
                    strokeWidth="2.5" 
                    strokeDasharray="4 5"
                    strokeLinecap="round"
                    strokeOpacity="0.75"
                    mask="url(#project-line-mask)"
                  />
                </svg>
                {projectSteps.map((step, idx) => {
                  const StepIcon = step.icon;
                  return (
                    <motion.div
                      key={idx}
                      whileHover="hover"
                      whileTap="tap"
                      className="relative z-10 flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-6 md:gap-0 flex-1 w-full md:w-auto cursor-pointer group"
                    >
                      {/* Vertical line segment for mobile (rendered only for items before the last one) */}
                      {idx < projectSteps.length - 1 && (
                        <div 
                          className="absolute left-7 -translate-x-[1px] top-7 w-[2px] pointer-events-none z-0 block md:hidden overflow-visible"
                          style={{ bottom: '-76px' }}
                        >
                          <svg className="w-full h-full overflow-visible">
                            <line 
                              x1="1" 
                              y1="0" 
                              x2="1" 
                              y2="100%" 
                              stroke="#1A3D63" 
                              strokeWidth="2.5" 
                              strokeDasharray="4 5"
                              strokeLinecap="round"
                              className="animate-line-dash-amber"
                              strokeOpacity="0.75"
                            />
                          </svg>
                        </div>
                      )}
                      {/* Node Circle — scroll reveal: scale + fade in, staggered by idx */}
                      <motion.div
                        className="relative flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-white border border-white/60 z-10 shadow-sm transition-colors duration-300 group-hover:border-brandAmber/60"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: '-20px' }}
                        transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {/* Interactive outer glow ring */}
                        <motion.div 
                          className="absolute -inset-1.5 rounded-full border border-brandAmber/30 opacity-0"
                          variants={{
                            hover: { scale: 1.15, borderColor: "rgba(26, 61, 99, 0.6)", borderWidth: 2, opacity: 1 }
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        />
                        
                        {/* Pulsing subtle ambient glow */}
                        <div className="absolute -inset-0.5 rounded-full border border-brandAmber/15 animate-pulse-slow" />

                        {/* Animated Icon */}
                        <motion.div
                          variants={{
                            hover: { scale: 1.12, rotate: [0, -10, 10, 0] }
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <StepIcon size={20} className="text-brandAmber" />
                        </motion.div>
                        
                        {/* Step index badge */}
                        <motion.div 
                          variants={{
                            hover: { scale: 1.25, rotate: 12, backgroundColor: "#1E6B7B" }
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brandAmber border border-bgDark flex items-center justify-center font-mono text-[9px] font-bold text-white shadow-sm"
                        >
                          0{idx + 1}
                        </motion.div>
                      </motion.div>

                      {/* Details — scroll reveal: blur+slide+fade, staggered */}
                      <motion.div
                        className="mt-2 md:mt-4 flex-1 md:flex-initial"
                        initial={{ filter: 'blur(6px)', opacity: 0, y: 12 }}
                        whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-20px' }}
                        transition={{ duration: 0.6, delay: idx * 0.12 + 0.1, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <h4 className="font-display font-bold text-base text-textPrimary uppercase tracking-wider mb-2 group-hover:text-brandAmber transition-colors duration-300">
                          {step.title}
                        </h4>
                        <p className="text-textMuted text-xs max-w-[200px] leading-relaxed font-sans">
                          {step.desc}
                        </p>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollAnimateCard>
      </div>
    </section>
  );
}
