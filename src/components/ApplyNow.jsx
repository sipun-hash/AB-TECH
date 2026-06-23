import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';

export default function ApplyNow() {
  const [qrLoaded, setQrLoaded] = useState(false);
  const qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&color=1e6b7b&bgcolor=ffffff&data=https://docs.google.com/forms/d/e/1FAIpQLSf2urYgREjCCoBM_jHaKPhgvEnQU4IkJ0M9_0Ez_Jlw9kNOwQ/viewform';

  return (
    <section id="apply" className="pt-10 pb-20 px-6 bg-bgDark relative overflow-hidden z-20 border-y border-brandTeal/10">
      {/* Radial Light Teal Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,107,123,0.08)_0%,rgba(240,246,248,0)_70%)] pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-bg opacity-[0.05] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
        
        {/* Left Column: Animated Content */}
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 35 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-7 text-center md:text-left flex flex-col items-center md:items-start"
        >
          {/* Subtitle Badge */}
          <span className="font-mono text-xs font-bold text-brandAmber tracking-widest uppercase block mb-4">
            ✦ START YOUR APPLICATION
          </span>

          {/* Headline */}
          <h2 className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl text-textPrimary tracking-tight uppercase mb-4 leading-none text-3d">
            YOUR CAREER <br />
            <span className="text-brandTeal text-3d-teal">
              STARTS HERE.
            </span>
          </h2>

          {/* Description */}
          <p className="text-textMuted text-sm md:text-base leading-relaxed mb-8 font-sans max-w-lg">
            Fill out the application form. Our recruitment operations team will reach out and schedule assessments within 48 hours.
          </p>

          {/* Shimmer button to Google Form */}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSf2urYgREjCCoBM_jHaKPhgvEnQU4IkJ0M9_0Ez_Jlw9kNOwQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="shimmer-btn px-8 py-4 bg-brandTeal text-white rounded-full font-display font-bold text-sm md:text-base tracking-wider shadow-neon-teal hover:shadow-neon-teal hover:bg-brandTeal/90 transition-all duration-300 flex items-center gap-3 border border-brandTeal/30"
          >
            Open Application Form
            <ArrowUpRight size={18} />
          </a>
        </motion.div>

        {/* Right Column: QR Code & Mobile App CTA */}
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 35 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5 flex flex-col items-center justify-center gap-5"
        >
          <div className="glass-card p-6 rounded-2xl border border-white/60 flex flex-col items-center gap-3 shadow-lg w-[238px]">
            <div className="w-[190px] h-[190px] rounded-xl bg-white border border-white/60 flex items-center justify-center p-2.5 shadow-inner relative overflow-hidden">
              
              {/* Skeleton Loader */}
              {!qrLoaded && (
                <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center p-4">
                  <div className="w-full h-full bg-neutral-200/50 rounded-lg animate-pulse flex items-center justify-center">
                    <div className="w-24 h-24 border-4 border-dashed border-brandTeal/10 rounded-md flex items-center justify-center">
                      <div className="w-8 h-8 bg-brandTeal/5 rounded-sm" />
                    </div>
                  </div>
                </div>
              )}

              <img
                src={qrCodeUrl}
                alt="Apply on Mobile QR Code"
                width="170"
                height="170"
                loading="lazy"
                className={`rounded-lg transition-opacity duration-300 ${qrLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setQrLoaded(true)}
              />
            </div>
            
            <span className="font-mono text-[10px] text-textMuted tracking-wider uppercase text-center block">
              Scan to apply on mobile
            </span>
          </div>

          {/* Resume direct email CTA */}
          <div className="flex flex-col items-center gap-1.5 pt-4 border-t border-brandTeal/10 w-[238px]">
            <span className="text-xs text-textMuted font-sans text-center">
              Have a custom CV ready?
            </span>
            <a
              href="mailto:deo.abits.p1@gmail.com"
              className="flex items-center gap-1.5 text-xs font-sans font-bold text-brandTeal hover:text-brandAmber transition-colors duration-300 justify-center tracking-wide"
            >
              <Mail size={13} />
              deo.abits.p1@gmail.com
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
