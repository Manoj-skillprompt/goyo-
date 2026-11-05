import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GlobeAsiaAustraliaIcon } from '@heroicons/react/24/outline';
import { metricsData, partnersData, supportedOriginCountries } from '../data/portalData';

export const PartnersMetrics: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2, once: true });
  const [counts, setCounts] = useState<number[]>(metricsData.map(() => 0));

  useEffect(() => {
    if (isInView) {
      metricsData.forEach((item, index) => {
        const target = item.target;
        const duration = 1600;
        const startTime = performance.now() + item.delay;

        const update = (now: number) => {
          if (now < startTime) {
            requestAnimationFrame(update);
            return;
          }
          const elapsed = now - startTime;
          const progress = Math.min(1, elapsed / duration);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.floor(easeOut * target);

          setCounts((prev) => {
            const next = [...prev];
            next[index] = currentVal;
            return next;
          });

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            setCounts((prev) => {
              const next = [...prev];
              next[index] = target;
              return next;
            });
          }
        };

        requestAnimationFrame(update);
      });
    }
  }, [isInView]);

  return (
    <section id="partners" className="pt-10 sm:pt-14 lg:pt-16 pb-24 sm:pb-32 lg:pb-36 bg-slate-50 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Trust & Scale Metrics */}
        <div ref={containerRef} id="platform-metrics" className="mb-12 sm:mb-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
            {metricsData.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: item.delay / 1000, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col items-center text-center justify-start ${
                  idx === 4 ? 'col-span-2 md:col-span-1' : ''
                }`}
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-none">
                  <span>{counts[idx].toLocaleString()}</span>
                  <span className={item.colorClass}>{item.suffix}</span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-2.5">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Global Origin Countries Ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 sm:mt-10 pt-6 border-t border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800 shrink-0">
              <span className="w-7 h-7 rounded-full bg-teal-100/90 text-teal-700 flex items-center justify-center shadow-xs">
                <GlobeAsiaAustraliaIcon className="w-4 h-4" />
              </span>
              <span>Available to applicants from 45+ origin countries</span>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-end gap-1.5 sm:gap-2">
              {supportedOriginCountries.map((country) => (
                <span
                  key={country.name}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200/80 text-xs font-medium text-slate-700 shadow-xs hover:border-slate-300 transition-colors"
                >
                  <span className="text-sm leading-none">{country.flag}</span>
                  <span>{country.name}</span>
                </span>
              ))}
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs">
                +35 more
              </span>
            </div>
          </motion.div>
        </div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
            Meet Our Cover Providers
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            We partner directly with Australia's leading registered health cover providers to deliver 100% Department of Home Affairs visa-compliant policies.
          </p>
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
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 min-h-[150px] sm:min-h-[170px] flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md hover:border-slate-300 transition-all group ${
                idx === 4 ? 'col-span-2 sm:col-span-1' : ''
              }`}
            >
              <div className="h-12 w-full flex items-center justify-center mb-3">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className={`${partner.height} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
                />
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5">{partner.type}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
