import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqsData } from '../data/portalData';

export const FAQSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(faqsData[0]?.id ?? 1);

  const selectedFaq = faqsData.find((item) => item.id === selectedId) || faqsData[0];

  return (
    <section id="faq" className="py-20 sm:py-28 bg-white border-b border-slate-200/90">
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Portal Theme Typography */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
         
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 sm:mt-4 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about OSHC &amp; OVHC compliance, visa conditions, refunds, and university counseling.
          </p>
        </motion.div>

        {/* Outer Split Card Container (Portal Theme: Slate-50 frame with crisp border & subtle shadow) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-slate-50/90 rounded-3xl sm:rounded-[2.5rem] p-3 sm:p-5 lg:p-7 border border-slate-200/90 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
            {/* Left Panel: Questions List (Portal Theme: Deep Slate-950 Brand Navy Container) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-2xl sm:rounded-[1.75rem] p-5 sm:p-6 lg:p-7 flex flex-col justify-start relative text-white shadow-inner border border-slate-800/80 overflow-hidden">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Questions
                </h3>
                <span className="text-[11px] font-semibold text-teal-300 bg-teal-500/15 border border-teal-500/25 px-2.5 py-0.5 rounded-full">
                  {faqsData.length} Topics
                </span>
              </div>

              <div className="faq-dark-scrollbar overflow-y-auto space-y-2 pr-1.5 max-h-[380px] sm:max-h-[440px]">
                {faqsData.map((faq) => {
                  const isActive = selectedId === faq.id;
                  return (
                    <button
                      key={faq.id}
                      onClick={() => setSelectedId(faq.id)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl text-xs sm:text-[13px] leading-relaxed transition-all duration-200 cursor-pointer flex items-start gap-2.5 ${
                        isActive
                          ? 'bg-teal-500/20 text-white font-semibold shadow-sm border border-teal-500/35 backdrop-blur-sm'
                          : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 transition-colors ${
                          isActive ? 'bg-teal-400 ring-2 ring-teal-400/30' : 'bg-slate-600'
                        }`}
                      />
                      <span>{faq.question}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Panel: Answer Display */}
            <div className="lg:col-span-7 flex flex-col justify-start p-2 sm:p-4 lg:p-5">
              {/* Header row with Answer label and active question title (full question visible, no truncation) */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-3 px-1 gap-1.5 sm:gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 shrink-0">
                  Answer
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-700 text-left sm:text-right leading-snug">
                  {selectedFaq.question}
                </span>
              </div>

              {/* White Answer Bubble Card (Portal Theme: Crisp White with Slate Border) */}
              <div className="faq-light-scrollbar bg-white rounded-2xl sm:rounded-[1.75rem] p-6 sm:p-8 lg:p-9 shadow-sm border border-slate-200/90 flex-1 flex flex-col justify-between min-h-[360px] sm:min-h-[400px] max-h-[520px] overflow-y-auto relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedFaq.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
                  >
                    {/* Full question title prominently displayed at top of answer card */}
                    <h4 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight leading-snug pb-3 border-b border-slate-100">
                      {selectedFaq.question}
                    </h4>

                    {selectedFaq.answer.split('\n\n').map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-xs sm:text-sm lg:text-[14.5px] text-slate-600 leading-relaxed font-normal"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Helpful Contact Footer inside Card */}
                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 shrink-0">
                  <span>Have questions regarding your specific visa condition?</span>
                  <a
                    href="#contact"
                    className="font-semibold text-teal-600 hover:text-teal-700 transition-colors inline-flex items-center gap-1"
                  >
                    Contact Support &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
