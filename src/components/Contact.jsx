import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, ExternalLink, Layers, CheckCircle } from 'lucide-react';
import ScrollAnimateCard from './ScrollAnimateCard';

function ContactItem({ href, text, value, textClass, onCopy }) {
  const timerRef = React.useRef(null);

  const handleStart = () => {
    // Start long press timer (600ms hold)
    timerRef.current = setTimeout(() => {
      navigator.clipboard.writeText(value).then(() => {
        if (onCopy) onCopy();
      });
    }, 600);
  };

  const handleCancel = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return (
    <a
      href={href}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
      onMouseUp={handleCancel}
      onMouseLeave={handleCancel}
      onTouchEnd={handleCancel}
      className={`hover:text-brandTeal transition-colors duration-200 block py-0.5 select-none ${textClass}`}
    >
      <span className="tracking-wide">{text}</span>
    </a>
  );
}

function OperationalSiteCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasBeenFlipped, setHasBeenFlipped] = useState(false);
  const [zoom, setZoom] = useState(16);
  const [isSatellite, setIsSatellite] = useState(false);

  return (
    <div className="w-full h-[190px] perspective-1000">
      <div className={`w-full h-full relative transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden glass-card p-5 rounded-none border border-white/60 hover:border-brandTeal/30 card-3d-teal transition-all duration-300 flex flex-col justify-between h-full w-full">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded bg-brandTeal/10 border border-brandTeal/20 flex items-center justify-center text-brandTeal">
                <MapPin size={15} />
              </div>
              <h3 className="font-display font-bold text-base text-textPrimary uppercase tracking-wider">
                Operational Site
              </h3>
            </div>
            
            <div className="flex flex-col gap-1 mt-1">
              <p className="text-textMuted text-xs font-sans leading-relaxed">
                Sophitorium Engineering College Campus, Baniatangi, Khordha, Bhubaneswar, Odisha - 752060
              </p>
              <div className="text-[10px] text-brandTeal font-bold font-mono uppercase tracking-wider mt-0.5 flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 bg-brandTeal rounded-full animate-pulse" />
                Main Recruitment Hub
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setIsFlipped(true);
              setHasBeenFlipped(true);
            }}
            className="mt-3 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-white bg-brandTeal hover:bg-brandAmber transition-all duration-300 rounded-none border border-brandTeal/20 hover:border-brandAmber/20 hover:shadow-neon-teal w-full flex items-center justify-center gap-2"
          >
            <span>Click to View Map</span>
            <ExternalLink size={12} />
          </button>
        </div>

        {/* Back Side (Map View) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white border border-white/60 p-2 rounded-none transition-all duration-300 flex flex-col justify-between h-full w-full shadow-lg">
          <div className="relative w-full h-[135px] overflow-hidden rounded-none border border-black/5 bg-gray-50">
            
            {/* Live Map */}
            {hasBeenFlipped && (
              <iframe
                src={`https://maps.google.com/maps?q=Sophitorium%20Engineering%20College%20Baniatangi&t=${isSatellite ? 'h' : 'm'}&z=${zoom}&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full border-0 grayscale-[15%] contrast-[105%] brightness-[95%] opacity-95"
                style={{ touchAction: 'pan-x pan-y pinch-zoom' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sophitorium Engineering College location map"
              />
            )}
            
            {/* Floating Map Controls */}
            <div className="absolute top-2 right-2 flex flex-col gap-1 z-20 select-none">
              {/* Zoom In */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom(prev => Math.min(prev + 1, 20));
                }}
                className="w-7 h-7 bg-white hover:bg-brandTeal hover:text-white border border-black/10 flex items-center justify-center text-textPrimary text-xs font-bold shadow-md transition-all duration-200"
                title="Zoom In"
              >
                +
              </button>
              {/* Zoom Out */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom(prev => Math.max(prev - 1, 10));
                }}
                className="w-7 h-7 bg-white hover:bg-brandTeal hover:text-white border border-black/10 flex items-center justify-center text-textPrimary text-xs font-bold shadow-md transition-all duration-200"
                title="Zoom Out"
              >
                -
              </button>
              {/* Satellite Toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSatellite(prev => !prev);
                }}
                className={`w-7 h-7 border border-black/10 flex items-center justify-center shadow-md transition-all duration-200 ${
                  isSatellite 
                    ? 'bg-brandTeal text-white border-brandTeal' 
                    : 'bg-white hover:bg-brandTeal hover:text-white text-textPrimary'
                }`}
                title="Toggle Satellite View"
              >
                <Layers size={11} />
              </button>
              {/* Reset Zoom */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom(16);
                  setIsSatellite(false);
                }}
                className="w-7 h-7 bg-white hover:bg-brandTeal hover:text-white border border-black/10 flex items-center justify-center text-textPrimary shadow-md transition-all duration-200 text-[10px]"
                title="Reset Map"
              >
                ⊙
              </button>
            </div>

            {/* Google Maps External Link */}
            <a
              href="https://maps.google.com/?q=Sophitorium+Engineering+College+Khordha"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2 left-2 bg-white/95 hover:bg-brandTeal hover:text-white px-2 py-1 rounded border border-white/60 text-[8px] font-mono font-bold text-textPrimary shadow-md flex items-center gap-1 transition-all duration-300 z-10"
            >
              <span>Google Maps</span>
              <ExternalLink size={9} />
            </a>
          </div>

          <button
            onClick={() => setIsFlipped(false)}
            className="w-full py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-textMuted hover:text-brandTeal transition-colors duration-200 flex items-center justify-center gap-1.5"
          >
            <span>Back to Details</span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default function Contact() {
  const [toast, setToast] = useState({ visible: false, message: '' });
  const toastTimerRef = React.useRef(null);

  const triggerToast = (message) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToast({ visible: true, message });
    toastTimerRef.current = setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 2000);
  };

  const handleCopy = () => {
    triggerToast('Copied successfully!');
  };

  return (
    <section id="contact" className="pt-10 pb-10 px-6 bg-bgDark relative overflow-hidden z-20">
      {/* Decorative Orbs */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-brandTeal/5 filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 25 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 md:mb-16"
        >
          <span className="font-mono text-xs font-bold text-brandTeal tracking-widest uppercase block mb-3">
            ✦ COMMUNICATIONS
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-textPrimary tracking-tight uppercase text-3d">
            GET IN TOUCH
          </h2>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          
          {/* Card 1: Phone Call */}
          <ScrollAnimateCard index={0} className="h-full">
            <div className="glass-card p-5 rounded-none border border-white/60 hover:border-brandTeal/30 hover:shadow-neon-teal card-3d-teal transition-all duration-300 flex flex-col justify-between h-[190px]">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded bg-brandTeal/10 border border-brandTeal/20 flex items-center justify-center text-brandTeal">
                    <Phone size={15} />
                  </div>
                  <h3 className="font-display font-bold text-base text-textPrimary uppercase tracking-wider">
                    Call Operations
                  </h3>
                </div>
                <p className="text-textMuted text-xs font-sans leading-relaxed">
                  Contact recruitment coordinators for scheduling and assessment inquiries.
                </p>
              </div>
              <div className="flex flex-col gap-1.5 font-sans text-xs font-semibold text-textPrimary mt-3">
                <div className="flex items-center gap-1.5 text-[12px] font-semibold">
                  <ContactItem
                    href="tel:7782058856"
                    text="+91 77820 58856"
                    value="7782058856"
                    textClass="text-[12px] font-semibold"
                    onCopy={handleCopy}
                  />
                  <span className="text-brandTeal/30 font-normal select-none">|</span>
                  <ContactItem
                    href="tel:8327756269"
                    text="+91 83277 56269"
                    value="8327756269"
                    textClass="text-[12px] font-semibold"
                    onCopy={handleCopy}
                  />
                </div>
                <ContactItem
                  href="tel:9337432850"
                  text="+91 93374 32850"
                  value="9337432850"
                  textClass="text-[12px] font-semibold"
                  onCopy={handleCopy}
                />
              </div>
            </div>
          </ScrollAnimateCard>

          {/* Card 2: Email */}
          <ScrollAnimateCard index={1} className="h-full">
            <div className="glass-card p-5 rounded-none border border-white/60 hover:border-brandTeal/30 hover:shadow-neon-teal card-3d-teal transition-all duration-300 flex flex-col justify-between h-[190px]">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded bg-brandTeal/10 border border-brandTeal/20 flex items-center justify-center text-brandTeal">
                    <Mail size={15} />
                  </div>
                  <h3 className="font-display font-bold text-base text-textPrimary uppercase tracking-wider">
                    Email Queries
                  </h3>
                </div>
                <p className="text-textMuted text-xs font-sans leading-relaxed">
                  Send your resumes or academic certificates directly to our operational inboxes.
                </p>
              </div>
              <div className="flex flex-col gap-1 font-sans text-xs font-semibold text-textPrimary mt-3">
                <ContactItem
                  href="mailto:deo.abits.p1@gmail.com"
                  text="deo.abits.p1@gmail.com"
                  value="deo.abits.p1@gmail.com"
                  textClass="text-[11px] font-semibold"
                  onCopy={handleCopy}
                />
                <ContactItem
                  href="mailto:biswabhusanmangraj68@gmail.com"
                  text="biswabhusanmangraj68@gmail.com"
                  value="biswabhusanmangraj68@gmail.com"
                  textClass="text-[11px] font-semibold"
                  onCopy={handleCopy}
                />
                <ContactItem
                  href="mailto:cpadhy92383@gmail.com"
                  text="cpadhy92383@gmail.com"
                  value="cpadhy92383@gmail.com"
                  textClass="text-[11px] font-semibold"
                  onCopy={handleCopy}
                />
              </div>
            </div>
          </ScrollAnimateCard>

          {/* Card 3: Address & Live Map Flip */}
          <ScrollAnimateCard index={2} className="h-full">
            <OperationalSiteCard />
          </ScrollAnimateCard>

        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%', scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: 20, x: '-50%', scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-8 left-1/2 z-50 flex items-center gap-2 bg-brandTeal text-white px-4 py-2.5 rounded-full border border-brandTeal/30 shadow-2xl backdrop-blur-md"
          >
            <CheckCircle size={14} className="text-white" />
            <span className="font-mono text-xs uppercase tracking-wider font-bold">
              {toast.message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
