import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import ScrollAnimateCard from './ScrollAnimateCard';

const faqData = [
  {
    question: 'Do I need prior experience?',
    answer: 'No, prior industry experience is not required. We welcome motivated freshers. Extensive workflow onboarding and technical training are provided from day one.'
  },
  {
    question: 'What is the salary/compensation?',
    answer: 'Compensation is performance-based, evaluated monthly on project deliverable output, accuracy thresholds, and volume. Higher quality standards lead to increased earning brackets.'
  },
  {
    question: 'Is this a remote or on-site role?',
    answer: 'This is an on-site role located at the Sophitorium Engineering College campus in Baniatangi, Khordha. Workspaces are configured locally.'
  },
  {
    question: 'How long does the selection process take?',
    answer: 'The complete process (Screening, Assessments, and Interview) typically spans 5 to 7 working days. Feedback is sent out at each phase.'
  },
  {
    question: 'Can students from other colleges apply?',
    answer: 'This specific recruitment drive is exclusive to students and graduates from the Sophitorium Group of Institutions.'
  },
  {
    question: 'What documents do I need to apply?',
    answer: 'You will need a soft copy of your resume, your Sophitorium College ID, and to complete the online Google Registration Form.'
  },
  {
    question: 'When will I hear back after applying?',
    answer: 'Our recruitment team reviews submissions continuously. You should expect an initial response or scheduling invite within 48 hours of form submission.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null); // No items open by default
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yOrb = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={containerRef} id="faq" className="pt-10 pb-10 px-6 bg-bgDark relative overflow-hidden z-20">
      {/* Background visual orb */}
      <motion.div
        style={{ y: yOrb }}
        className="absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full bg-brandTeal/5 filter blur-[100px] pointer-events-none"
      />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 25 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs font-bold text-brandTeal tracking-widest uppercase block mb-3">
            ✦ INFORMATION PORTAL
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-textPrimary tracking-tight uppercase text-3d">
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ScrollAnimateCard key={idx} index={idx} yOffset={20}>
                <div
                  className={`rounded-none border border-white/60 bg-white/40 transition-all duration-300 ${
                    isOpen ? 'border-l-4 border-l-brandTeal bg-white/70 shadow-sm' : 'shadow-sm'
                  }`}
                >
                  {/* Trigger Header */}
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full py-3.5 px-5 flex items-center justify-between text-left gap-4"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5">
                      <HelpCircle size={18} className={`flex-shrink-0 ${isOpen ? 'text-brandTeal' : 'text-textMuted'}`} />
                      <span className="font-display font-semibold text-sm md:text-base text-textPrimary tracking-wide">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-textMuted flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-brandTeal' : ''
                      }`}
                    />
                  </button>

                  {/* Content Panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4 pl-12 text-textMuted text-xs md:text-sm font-sans leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollAnimateCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
