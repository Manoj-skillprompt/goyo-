import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CurrencyDollarIcon,
  ShieldCheckIcon,
  DocumentDuplicateIcon,
  LifebuoyIcon
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

interface BenefitsCardProps {
  onOpenLogin: () => void;
}

export const BenefitsCard: React.FC<BenefitsCardProps> = ({ onOpenLogin }) => {
  const [view, setView] = useState<'students' | 'partners'>('students');
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const content = {
    students: {
      hero: 'Every policy we list is guaranteed to meet Department of Home Affairs requirements for student and visitor visas. Issued directly by authorized deed signatories.',
      price: 'Wholesale rates negotiated directly with major Australian insurers. Zero markups, zero hidden fees.',
      support: 'Putting people over policies with real Sydney-based counselors available via live chat and phone.'
    },
    partners: {
      hero: 'Issue instant visa-compliant certificates for your student cohorts. Zero manual underwriting paperwork and direct ImmiAccount integration.',
      price: 'Direct wholesale agent commissions and automated monthly payouts with full audit-ready reporting.',
      support: 'Dedicated agency account manager with priority SLA turnaround for urgent visa lodgement deadlines.'
    }
  }[view];

  // Water Expanding Card Animation on Scroll
  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;
    if (!card) return;

    let currentProgress = 0;
    let targetProgress = 0;
    let isTicking = false;
    const waterViscosity = 0.082;

    const waterEase = (t: number) => t * t * (3 - 2 * t);

    const applyCardStyles = (p: number) => {
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;

      if (p >= 0.97) {
        card.style.width = '100%';
        card.style.minHeight = '100vh';
        card.style.height = isMobile ? 'auto' : '100vh';
        card.style.borderRadius = '0px';
        card.style.transform = 'scale(1) translateZ(0)';
        card.style.boxShadow = 'none';
        if (container) {
          container.style.paddingTop = '0px';
          container.style.paddingBottom = '0px';
        }
        return;
      }

      const startScale = isMobile ? 0.95 : isTablet ? 0.93 : 0.9;
      const currentScale = startScale + (1.0 - startScale) * p;
      const startRadius = isMobile ? 24 : 44;
      const currentRadius = (startRadius * (1 - p)).toFixed(1);
      const startWidth = isMobile ? 92 : 88;
      const currentWidth = startWidth + (100 - startWidth) * p;
      const startPaddingY = isMobile ? 24 : 40;
      const currentPaddingY = (startPaddingY * (1 - p)).toFixed(1);
      const shadowAlpha = (0.95 * (1 - p)).toFixed(3);
      const emeraldGlow = (0.16 * (1 - p)).toFixed(3);

      card.style.transform = `scale(${currentScale.toFixed(4)}) translateZ(0)`;
      card.style.borderRadius = `${currentRadius}px`;
      card.style.width = `${currentWidth.toFixed(2)}%`;
      card.style.minHeight = `calc(80vh + ${20 * p}vh)`;
      card.style.height = isMobile ? 'auto' : `calc(80vh + ${20 * p}vh)`;
      card.style.boxShadow = `0 30px 100px -20px rgba(0, 0, 0, ${shadowAlpha}), 0 0 50px -10px rgba(16, 185, 129, ${emeraldGlow})`;

      if (container) {
        container.style.paddingTop = `${currentPaddingY}px`;
        container.style.paddingBottom = `${currentPaddingY}px`;
      }
    };

    const renderLoop = () => {
      const delta = targetProgress - currentProgress;
      if (Math.abs(delta) < 0.0005) {
        currentProgress = targetProgress;
      } else {
        currentProgress += delta * waterViscosity;
      }

      const p = waterEase(currentProgress);
      applyCardStyles(p);

      if (Math.abs(targetProgress - currentProgress) >= 0.0005) {
        requestAnimationFrame(renderLoop);
      } else {
        isTicking = false;
      }
    };

    const updateTarget = () => {
      const rect = card.getBoundingClientRect();
      const windowH = window.innerHeight || 800;
      const startY = windowH * 0.9;
      const endY = windowH * 0.05;
      const totalDistance = startY - endY;
      const scrolledDist = startY - rect.top;
      const rawProgress = scrolledDist / totalDistance;
      targetProgress = Math.max(0, Math.min(1, rawProgress));

      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(renderLoop);
      }
    };

    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', updateTarget, { passive: true });
    updateTarget();

    return () => {
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', updateTarget);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="benefits"
      className="relative z-20 w-full bg-slate-50 overflow-hidden flex justify-center py-6 sm:py-10 transition-colors"
    >
      <section
        ref={cardRef}
        id="benefits-card"
        className="benefits-antigravity-card w-[88%] sm:w-[90%] min-h-[80vh] bg-black text-white rounded-[36px] sm:rounded-[44px] border-0 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.95),0_0_50px_-10px_rgba(16,185,129,0.12)] relative overflow-hidden py-12 sm:py-16 lg:py-20 flex flex-col justify-center origin-top"
      >
        {/* Ambient Auroras */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
          <motion.div
            animate={{
              x: [0, 32, -24, 0],
              y: [0, -24, 20, 0],
              scale: [1, 1.08, 0.95, 1],
              rotate: [0, 3, -2, 0]
            }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-32 left-1/4 w-[750px] h-[450px] bg-gradient-to-tr from-emerald-500/20 via-teal-500/15 to-transparent rounded-full blur-[110px]"
          />
          <motion.div
            animate={{
              x: [0, -28, 20, 0],
              y: [0, 24, -18, 0],
              scale: [1, 0.95, 1.06, 1]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/3 -right-32 w-[600px] h-[550px] bg-gradient-to-br from-amber-500/15 via-yellow-500/10 to-transparent rounded-full blur-[100px]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.18] flex items-center justify-center flex-wrap gap-x-3 gap-y-2.5">
              <span>Everything You Need for</span>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="relative inline-flex items-center px-4.5 py-1 rounded-full bg-gradient-to-r from-teal-500/20 via-cyan-500/15 to-blue-500/20 border border-teal-400/40 text-teal-300 font-bold shadow-[0_0_35px_rgba(20,184,166,0.3)] text-2xl sm:text-4xl tracking-tight backdrop-blur-sm cursor-default"
              >
                Peace of Mind
              </motion.span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 mt-5 leading-relaxed max-w-2xl mx-auto">
              We’ve reimagined the traditional, transactional world of health covers into a fast, transparent ecosystem &mdash; delivering massive benefits for students and accelerating our partners. No more guesswork.
            </p>

            {/* Tab Switcher: Students vs Partners */}
            <div className="mt-8 inline-flex items-center p-1 rounded-full bg-neutral-900 border border-white/10 shadow-inner">
              <button
                onClick={() => setView('students')}
                className={`relative px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  view === 'students' ? 'text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                {view === 'students' && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className="absolute inset-0 bg-white rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">For Students &amp; Visitors</span>
              </button>
              <button
                onClick={() => setView('partners')}
                className={`relative px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  view === 'partners' ? 'text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                {view === 'partners' && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className="absolute inset-0 bg-white rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">For Education Partners &amp; Agents</span>
              </button>
            </div>

            {/* Tab Context Message with Smooth Animation */}
            <AnimatePresence mode="wait">
              <motion.p
                key={view}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="text-xs sm:text-sm text-teal-300/90 mt-4 font-medium max-w-xl mx-auto"
              >
                {content.hero}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* 2x2 Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto">
            {/* Card 1: Best Prices */}
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-gradient-to-b from-neutral-900/90 to-neutral-950/95 rounded-[2rem] border border-white/10 p-6 sm:p-7 shadow-xl hover:shadow-[0_20px_50px_-15px_rgba(20,184,166,0.25)] hover:border-teal-400/40 transition-colors flex flex-col justify-between group backdrop-blur-md"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/30 text-teal-400 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  <CurrencyDollarIcon className="w-6 h-6 text-teal-400 stroke-2" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">Best Prices</h4>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={content.price}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-slate-400 mt-2 leading-relaxed"
                  >
                    {content.price}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Card 2: Trusted Brands */}
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-gradient-to-b from-neutral-900/90 to-neutral-950/95 rounded-[2rem] border border-white/10 p-6 sm:p-7 shadow-xl hover:shadow-[0_20px_50px_-15px_rgba(37,82,206,0.25)] hover:border-blue-400/40 transition-colors flex flex-col justify-between group backdrop-blur-md"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  <ShieldCheckIcon className="w-6 h-6 text-blue-400 stroke-2" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">Trusted Brands</h4>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                  We only partner with top-tier Australian insurers.
                </p>
              </div>
            </motion.div>

            {/* Card 3: Easy Comparison */}
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-gradient-to-b from-neutral-900/90 to-neutral-950/95 rounded-[2rem] border border-white/10 p-6 sm:p-7 shadow-xl hover:shadow-[0_20px_50px_-15px_rgba(99,102,241,0.25)] hover:border-indigo-400/40 transition-colors flex flex-col justify-between group backdrop-blur-md"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  <DocumentDuplicateIcon className="w-6 h-6 text-indigo-400 stroke-2" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">Easy Comparison</h4>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                  Side-by-side comparison of benefits, limits, and costs.
                </p>
              </div>
            </motion.div>

            {/* Card 4: 24/7 Expert Support */}
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-gradient-to-b from-neutral-900/90 to-neutral-950/95 rounded-[2rem] border border-white/10 p-6 sm:p-7 shadow-xl hover:shadow-[0_20px_50px_-15px_rgba(6,182,212,0.25)] hover:border-cyan-400/40 transition-colors flex flex-col justify-between group backdrop-blur-md"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  <LifebuoyIcon className="w-6 h-6 text-cyan-400 stroke-2" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">24/7 Expert Support</h4>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={content.support}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-slate-400 mt-2 leading-relaxed"
                  >
                    {content.support}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Optional Partner Action */}
          <AnimatePresence>
            {view === 'partners' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-10 text-center"
              >
                <button
                  onClick={onOpenLogin}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg hover:scale-105 transition-all cursor-pointer"
                >
                  <span>Become an Agent Partner</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};
