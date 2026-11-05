import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GlobeHemisphereEast } from '@phosphor-icons/react';
import { metricsData, supportedOriginCountries } from '../../../data/portalData';
import { EYEBROW, EYEBROW_ON_DARK, SECTION_HEADING } from '../styles';
import { BrandMark } from './BrandMark';

// "Our impact": dark navy stats panel with count-up numbers. Sits just before the student reviews
// so the numbers (scale) and the testimonials (real voices) read as one block of proof.
export const ImpactPanel: React.FC = () => {
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
    <section id="impact" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div ref={containerRef} id="platform-metrics">
          {/* Impact panel: dark navy, faint brand swoosh behind the stats, photo with a curved edge on the right */}
          <div className="relative overflow-hidden rounded-3xl bg-[#0F172A]">
            <BrandMark
              fill="#00B074"
              className="pointer-events-none absolute -left-[12%] top-1/2 h-auto w-[78%] -translate-y-1/2 opacity-[0.14] lg:w-[58%]"
            />

            <div className="relative px-8 py-12 sm:px-12 sm:py-14 lg:w-[64%] lg:px-16">
              <p className={`${EYEBROW} ${EYEBROW_ON_DARK}`}>Our impact</p>
              <h2 className={`${SECTION_HEADING} mt-2 text-white`}>Trusted by students and partners worldwide</h2>

              <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
                {metricsData.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: item.delay / 1000, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="text-[32px] font-bold leading-none tracking-tight text-white sm:text-[40px]">
                      {counts[i].toLocaleString()}
                      {item.suffix}
                    </div>
                    <div className="mt-2 text-[14px] text-slate-300">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Photo: desktop only, left edge curved by an ellipse centred on the right edge */}
            <img
              src="/students-group.jpg"
              alt="Students smiling together in a lecture hall"
              className="absolute inset-y-0 right-0 hidden h-full w-[36%] object-cover object-[60%_50%] lg:block"
              style={{ clipPath: 'ellipse(100% 125% at 100% 50%)' }}
            />
          </div>

          {/* Global Origin Countries Ribbon */}
          {/* <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 sm:mt-10 pt-6 border-t border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800 shrink-0">
              <span className="w-7 h-7 rounded-full bg-teal-100/90 text-teal-700 flex items-center justify-center shadow-xs">
                <GlobeHemisphereEast weight="duotone" className="w-4 h-4" />
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
          </motion.div> */}
        </div>
      </div>
    </section>
  );
};
