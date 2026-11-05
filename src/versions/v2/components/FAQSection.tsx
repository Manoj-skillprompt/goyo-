import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CaretDown } from '@phosphor-icons/react';
import { faqsData as allFaqs } from '../../../data/portalData';

// V2 shows five questions so both panels fit without scrolling. Dropped: "How quickly will I
// receive my digital insurance certificate?" (id 6), already covered by the hero and How it works.
// The shared list itself is unchanged, so V1 still shows all six.
const faqsData = allFaqs.filter((f) => f.id !== 6);
import { CARD_TITLE, SECTION_HEADING } from '../styles';
import { BrandMark } from './BrandMark';

// V2 copy of V1's FAQ section, restyled to the V2 palette: navy (#0F172A) questions panel like the
// impact panel and footer, emerald (#00B074 / #009662) accents, slate-200 borders.
export const FAQSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(faqsData[0]?.id ?? 1);
  // Phones use an accordion; the first answer starts open, like the desktop panel.
  const [mobileOpenId, setMobileOpenId] = useState<number | null>(faqsData[0]?.id ?? null);

  const selectedFaq = faqsData.find((item) => item.id === selectedId) || faqsData[0];

  return (
    <section id="faq" className="scroll-mt-24 py-20 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
        >
          <h2 className={`${SECTION_HEADING} text-slate-900`}>
            Frequently asked <span className="text-[#00B074]">questions</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about OSHC &amp; OVHC compliance, visa conditions, refunds, and university counselling.
          </p>
        </motion.div>

        {/* Phones and tablets: accordion, so each answer opens right under its question */}
        <ul className="space-y-3 lg:hidden">
          {faqsData.map((faq) => {
            const isOpen = mobileOpenId === faq.id;
            return (
              <li
                key={faq.id}
                className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
                  isOpen ? 'border-[#00B074]/50' : 'border-slate-200'
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setMobileOpenId(isOpen ? null : faq.id)}
                  className="flex w-full cursor-pointer items-start justify-between gap-4 p-4 text-left text-[15px] font-semibold leading-snug text-slate-900"
                >
                  <span>{faq.question}</span>
                  <CaretDown
                    weight="bold"
                    className={`mt-0.5 h-4 w-4 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#047857]' : 'text-slate-500'
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="space-y-3 border-t border-slate-200 px-4 pb-4 pt-3">
                        {faq.answer.split('\n\n').map((paragraph, index) => (
                          <p key={index} className="text-[14px] leading-relaxed text-slate-600">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
          <li className="flex flex-wrap items-center justify-between gap-2 px-1 pt-2 text-[13px] text-slate-500">
            <span>Have questions about your visa condition?</span>
            <a href="#contact" className="font-semibold text-[#047857] hover:text-[#009662]">
              Contact support →
            </a>
          </li>
        </ul>

        {/* Desktop: outer split card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="hidden bg-slate-50 rounded-3xl sm:rounded-[2rem] p-3 sm:p-5 lg:block lg:p-6 border border-slate-200"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
            {/* Left panel: questions (navy, like the impact panel and footer) */}
            <div className="lg:col-span-5 bg-[#0F172A] rounded-2xl sm:rounded-[1.5rem] p-5 sm:p-6 lg:p-7 flex flex-col justify-start relative text-white overflow-hidden">
              <BrandMark
                fill="#00B074"
                className="pointer-events-none absolute -right-16 -bottom-10 h-auto w-[300px] opacity-[0.07]"
              />
              <div className="relative flex items-center justify-between mb-5">
                <h3 className={`${CARD_TITLE} text-white`}>Questions</h3>
                <span className="text-[12px] font-semibold text-[#00B074] bg-[#00B074]/15 border border-[#00B074]/30 px-2.5 py-0.5 rounded-full">
                  {faqsData.length} topics
                </span>
              </div>

              <div className="relative space-y-2">
                {faqsData.map((faq) => {
                  const isActive = selectedId === faq.id;
                  return (
                    <button
                      key={faq.id}
                      onClick={() => setSelectedId(faq.id)}
                      aria-pressed={isActive}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl text-xs sm:text-[13px] leading-relaxed transition-all duration-200 cursor-pointer flex items-start gap-2.5 border ${
                        isActive
                          ? 'bg-[#00B074]/15 text-white font-semibold border-[#00B074]/40'
                          : 'text-slate-300 hover:text-white hover:bg-white/5 border-transparent'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 transition-colors ${
                          isActive ? 'bg-[#00B074] ring-2 ring-[#00B074]/30' : 'bg-slate-600'
                        }`}
                      />
                      <span>{faq.question}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right panel: answer */}
            <div className="lg:col-span-7 flex flex-col justify-start p-2 sm:p-4 lg:p-5">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-3 px-1 gap-1.5 sm:gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 shrink-0">Answer</span>
                <span className="text-xs sm:text-sm font-medium text-slate-600 text-left sm:text-right leading-snug">
                  {selectedFaq.question}
                </span>
              </div>

              <div className="bg-white rounded-2xl sm:rounded-[1.5rem] p-6 sm:p-8 lg:p-9 shadow-[0_1px_2px_rgba(15,23,42,0.04)] border border-slate-200 flex-1 flex flex-col justify-between min-h-[360px] sm:min-h-[400px] relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedFaq.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
                  >
                    <h4 className="text-base sm:text-lg font-semibold text-slate-900 tracking-tight leading-snug pb-3 border-b border-slate-200">
                      {selectedFaq.question}
                    </h4>

                    {selectedFaq.answer.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-xs sm:text-sm lg:text-[14.5px] text-slate-600 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Contact footer inside the card */}
                <div className="pt-4 mt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 shrink-0">
                  <span>Have questions regarding your specific visa condition?</span>
                  <a
                    href="#contact"
                    className="group font-semibold text-[#047857] hover:text-[#009662] transition-colors inline-flex items-center gap-1"
                  >
                    Contact support
                    <ArrowRight weight="bold" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
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
