import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// Smooth clay-white 3D isometric pillar — soft lighting, specular highlight, ambient occlusion


export default function Hero() {
  const { scrollY } = useScroll();
  const yVortex       = useTransform(scrollY, [0, 800], [0, 150]);
  const yHeroText     = useTransform(scrollY, [0, 800], [0, -60]);


  const handleScrollTo = (id) => {
    const target = document.querySelector(id);
    if (target) {
      const offset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-bgDark pt-28 pb-16 px-4"
    >
      {/* 1. Ambient Background Orbs */}
      <motion.div
        className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-brandTeal/5 filter blur-[100px] pointer-events-none"
        animate={{ x: [0, 30, -30, 0], y: [0, -30, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] rounded-full bg-brandAmber/5 filter blur-[120px] pointer-events-none"
        animate={{ x: [0, -40, 40, 0], y: [0, 40, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* 2. Concentric Vortex */}
      <motion.div style={{ y: yVortex, willChange: 'transform' }} className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <div className="relative w-[340px] h-[340px] md:w-[650px] md:h-[650px] flex items-center justify-center">
          {/* Inner soft blur core orb */}
          <div className="absolute w-[200px] h-[200px] md:w-[380px] md:h-[380px] rounded-full bg-brandTeal/12 filter blur-3xl" />

          {/* Ring 1 */}
          <motion.div
            className="absolute inset-0 rounded-full border border-white/30 bg-white/[0.01] backdrop-blur-[2px] shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 80, ease: 'linear' }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white/40 backdrop-blur-sm border border-white/60 shadow-lg" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white/40 backdrop-blur-sm border border-white/60 shadow-lg" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white/40 backdrop-blur-sm border border-white/60 shadow-lg" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white/40 backdrop-blur-sm border border-white/60 shadow-lg" />
          </motion.div>

          {/* Ring 2 */}
          <motion.div
            className="absolute w-[80%] h-[80%] rounded-full border border-white/25 bg-white/[0.02] backdrop-blur-[4px] shadow-[inset_0_4px_16px_rgba(255,255,255,0.1),0_12px_40px_rgba(30,107,123,0.05)]"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
          >
            <div className="absolute inset-0 rounded-full border-t-2 border-brandTeal/30 pointer-events-none" />
          </motion.div>

          {/* Ring 3 */}
          <motion.div
            className="absolute w-[60%] h-[60%] rounded-full border border-white/35 bg-white/[0.04] backdrop-blur-[6px] shadow-[inset_0_4px_12px_rgba(255,255,255,0.15),0_8px_32px_rgba(30,107,123,0.08)]"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
          >
            <div className="absolute inset-0 rounded-full border-b-2 border-brandAmber/20 pointer-events-none" />
          </motion.div>

          {/* Ring 4 */}
          <motion.div
            className="absolute w-[38%] h-[38%] rounded-full bg-gradient-to-tr from-brandTeal/20 via-white/5 to-brandAmber/5 border border-white/40 backdrop-blur-[8px] shadow-[inset_0_8px_20px_rgba(255,255,255,0.25),0_16px_48px_rgba(30,107,123,0.12)]"
            animate={{ scale: [1, 1.04, 1], rotate: -180 }}
            transition={{
              scale:  { repeat: Infinity, duration: 10, ease: 'easeInOut' },
              rotate: { repeat: Infinity, duration: 30, ease: 'linear' },
            }}
          />
        </div>
      </motion.div>

      {/* 3-Column Layout: Left Buildings | Center Content | Right Buildings */}
      <motion.div
        style={{ y: yHeroText }}
        className="relative z-10 w-full flex items-end justify-center"
      >


        {/* 5. Center Main Content */}
        <div className="flex-1 min-w-0 text-center flex flex-col items-center px-4">

          {/* Recruitment Badge */}
          <motion.div
            initial={{ filter: 'blur(8px)', opacity: 0, y: 15 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.03, borderColor: 'rgba(30, 107, 123, 0.4)' }}
            className="px-4 py-1.5 rounded-full border border-brandTeal/25 bg-white/75 backdrop-blur-md shadow-[0_4px_16px_rgba(30,107,123,0.04),inset_0_1px_1px_rgba(255,255,255,0.8)] mb-8 flex items-center gap-2.5 transition-all duration-300 pointer-events-auto cursor-default"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandTeal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brandTeal shadow-[0_0_8px_rgba(30,107,123,0.6)]"></span>
            </span>
            <span className="font-mono text-[9.5px] font-bold text-brandTeal tracking-[0.2em] uppercase">
              RECRUITMENT DRIVE 2026
            </span>
            <span className="h-3 w-[1px] bg-brandTeal/20 mx-0.5" />
            <span className="font-mono text-[9px] font-semibold text-brandAmber/85 uppercase tracking-[0.1em]">
              Sophitorium
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.4
                }
              }
            }}
            className="font-display font-extrabold text-3xl md:text-5xl lg:text-[4.75rem] text-textPrimary tracking-[0.02em] leading-[1.1] mb-8 max-w-4xl"
          >
            <motion.span
              variants={{
                hidden: { filter: 'blur(12px)', opacity: 0, y: 20 },
                visible: { filter: 'blur(0px)', opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="block text-textPrimary uppercase mb-2"
            >
              <motion.span
                className="inline-block origin-center"
                animate={{ rotateY: [0, 360] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1.5,
                  delay: 0
                }}
              >
                T
              </motion.span>
              echnology, support,
            </motion.span>
            <motion.span
              variants={{
                hidden: { filter: 'blur(12px)', opacity: 0, y: 20 },
                visible: { filter: 'blur(0px)', opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="block text-brandTeal uppercase py-0.5 mb-2"
              >
                growth
              </motion.span>
            <motion.span
              variants={{
                hidden: { filter: 'blur(12px)', opacity: 0, y: 20 },
                visible: { filter: 'blur(0px)', opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="block text-brandAmber/85 font-semibold text-xl md:text-3xl lg:text-[2.75rem] tracking-[0.05em] uppercase"
            >
              all in one{" "}
              <motion.span
                className="inline-block origin-center"
                animate={{ rotateY: [0, 360] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1.5,
                  delay: 0.4
                }}
              >
                w
              </motion.span>
              indo
              <motion.span
                className="inline-block origin-center"
                animate={{ rotateY: [0, 360] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1.5,
                  delay: 0.8
                }}
              >
                w
              </motion.span>
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.015,
                  delayChildren: 0.8
                }
              }
            }}
            initial="hidden"
            animate="visible"
            className="text-textMuted text-xs md:text-sm font-sans tracking-wide max-w-sm mx-auto mb-12 leading-relaxed"
          >
            {"We help graduates build technical skills, secure placements, and launch high-performance careers within our specialized IT services teams.".split("").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ filter: 'blur(8px)', opacity: 0, y: 15 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-12 flex items-center justify-center"
          >
            {/* SVG Gooey Filter */}
            <svg className="absolute w-0 h-0" width="0" height="0" style={{ pointerEvents: 'none' }}>
              <defs>
                <filter id="hero-gooey">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                  <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>
              </defs>
            </svg>

            <div className="relative flex items-center gap-4 cursor-pointer">
              {/* Fluid Backing Layer */}
              <div className="absolute inset-0 flex items-center gap-4 pointer-events-none" style={{ filter: 'url(#hero-gooey)' }}>
                <div className="h-12 w-[160px] bg-brandTeal rounded-full shadow-[0_4px_12px_rgba(30,107,123,0.15)]" />
                <motion.div
                  animate={{
                    x: [0, 0, -16, -16, 0, 0],
                    backgroundColor: [
                      'rgba(30,107,123,0)',
                      'rgba(30,107,123,0)',
                      'rgba(30,107,123,1)',
                      'rgba(30,107,123,1)',
                      'rgba(30,107,123,0)',
                      'rgba(30,107,123,0)',
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 4.0, ease: 'easeInOut', times: [0, 0.5, 0.62, 0.75, 0.87, 1.0] }}
                  className="w-12 h-12 rounded-full"
                />
              </div>

              {/* Sharp Content Layer */}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSf2urYgREjCCoBM_jHaKPhgvEnQU4IkJ0M9_0Ez_Jlw9kNOwQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 h-12 w-[160px] flex items-center justify-center font-display font-semibold text-xs text-white tracking-[0.15em] uppercase select-none bg-transparent rounded-full"
              >
                Apply Now
              </a>

              <motion.a
                href="https://docs.google.com/forms/d/e/1FAIpQLSf2urYgREjCCoBM_jHaKPhgvEnQU4IkJ0M9_0Ez_Jlw9kNOwQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                animate={{
                  x: [0, 0, -16, -16, 0, 0],
                  borderColor: [
                    'rgba(30,107,123,1)',
                    'rgba(30,107,123,1)',
                    'rgba(30,107,123,0)',
                    'rgba(30,107,123,0)',
                    'rgba(30,107,123,1)',
                    'rgba(30,107,123,1)',
                  ],
                  color: [
                    'rgba(30,107,123,1)',
                    'rgba(30,107,123,1)',
                    'rgba(255,255,255,1)',
                    'rgba(255,255,255,1)',
                    'rgba(30,107,123,1)',
                    'rgba(30,107,123,1)',
                  ],
                }}
                transition={{ repeat: Infinity, duration: 4.0, ease: 'easeInOut', times: [0, 0.5, 0.62, 0.75, 0.87, 1.0] }}
                className="relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold"
                aria-label="Submit Form"
              >
                <ArrowUpRight size={18} />
              </motion.a>
            </div>
          </motion.div>
        </div>


      </motion.div>
    </section>
  );
}
