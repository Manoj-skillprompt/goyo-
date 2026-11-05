import React from 'react';
import { motion } from 'framer-motion';
import { partnersData } from '../../../data/portalData';
import { EYEBROW, EYEBROW_ON_LIGHT, SECTION_HEADING } from '../styles';

// Insurance providers logo grid. (The "Our impact" stats panel that used to sit below this now
// lives in ImpactPanel.tsx, placed just before the student reviews.)
export const PartnersMetrics: React.FC = () => (
  <section id="partners" className="pt-10 sm:pt-14 lg:pt-16 pb-16 sm:pb-20 bg-slate-50 relative z-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-10 sm:mb-12"
      >
        <p className={`${EYEBROW} ${EYEBROW_ON_LIGHT}`}>Insurance providers</p>
        <h2 className={`${SECTION_HEADING} mx-auto mt-2 max-w-[22ch] text-balance text-slate-900`}>
          Compare cover from Australia’s <span className="text-[#00B074]">approved insurers</span>
        </h2>
      </motion.div>

      {/* Partners Logos Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 items-stretch">
        {partnersData.map((partner, idx) => (
          <motion.div
            key={partner.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className={`bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 min-h-[150px] sm:min-h-[170px] flex flex-col items-center justify-center text-center shadow-sm ${
              idx === 4 ? 'col-span-2 sm:col-span-1' : ''
            }`}
          >
            <div className="h-12 w-full flex items-center justify-center mb-3">
              <img src={partner.logo} alt={partner.name} className={`${partner.height} w-auto object-contain`} />
            </div>
            <span className="text-[12px] text-slate-600 mt-0.5">{partner.type}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
