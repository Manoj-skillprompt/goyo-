import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesIcon, CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import { workflowStepsData } from '../data/portalData';

export const WorkflowProcess: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [stepBars, setStepBars] = useState<number[]>([0, 0, 0, 0]);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const vh = window.innerHeight || 800;
      const rect = section.getBoundingClientRect();
      const maxScroll = Math.max(1, section.offsetHeight - vh);
      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / maxScroll));

      // Parallax offset
      setParallaxOffset((progress - 0.5) * 160);

      // Bars:
      const b0 = Math.min(100, Math.max(0, (progress / 0.25) * 100));
      const b1 = Math.min(100, Math.max(0, ((progress - 0.25) / 0.25) * 100));
      const b2 = Math.min(100, Math.max(0, ((progress - 0.5) / 0.25) * 100));
      const b3 = Math.min(100, Math.max(0, ((progress - 0.75) / 0.25) * 100));
      setStepBars([b0, b1, b2, b3]);

      let idx = 0;
      if (progress >= 0.75) idx = 3;
      else if (progress >= 0.5) idx = 2;
      else if (progress >= 0.25) idx = 1;
      setActiveStep(idx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToStep = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const vh = window.innerHeight || 800;
    const maxScroll = Math.max(1, section.offsetHeight - vh);
    const progressTargets = [0.1, 0.35, 0.6, 0.85];
    const targetY = window.scrollY + section.getBoundingClientRect().top + progressTargets[index] * maxScroll;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
    setActiveStep(index);
  };

  return (
    <section ref={sectionRef} id="process" className="relative bg-white border-b border-slate-200/90" style={{ minHeight: '320vh' }}>
      {/* Parallax Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div
          id="workflow-parallax-layer"
          className="absolute -top-36 inset-x-0 h-[calc(100%+24rem)] will-change-transform"
          style={{
            backgroundImage: "url('/hero-family-sky.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            opacity: 0.06,
            filter: 'grayscale(100%) contrast(120%)',
            transform: `translate3d(0, ${parallaxOffset.toFixed(2)}px, 0)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
        <div className="absolute top-1/4 left-1/4 w-[550px] h-[350px] bg-emerald-500/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[350px] bg-sky-500/5 rounded-full blur-[140px]" />
      </div>

      {/* Sticky Viewport Container */}
      <div className="sticky top-0 min-h-screen lg:h-screen w-full flex flex-col justify-center z-10 py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Header */}
          <div className="max-w-3xl mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Streamlined from Quote to{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
                Visa Lodgement
              </span>
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-slate-600 mt-2 leading-relaxed max-w-2xl">
              Scroll down to explore each step of the journey &mdash; instant, transparent, and completed in under 90 seconds.
            </p>
          </div>

          {/* Grid Layout: Left Steps + Right Image Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Steps */}
            <div id="workflow-steps-column" className="lg:col-span-5 flex flex-col space-y-4 sm:space-y-5">
              {workflowStepsData.map((s, idx) => {
                const isActive = activeStep === idx;
                const isCompleted = activeStep > idx;

                return (
                  <div
                    key={s.step}
                    onClick={() => goToStep(idx)}
                    className={`workflow-step flex items-stretch gap-4 sm:gap-5 group cursor-pointer ${
                      isActive ? 'is-active' : isCompleted ? 'is-completed' : ''
                    }`}
                    aria-expanded={isActive}
                  >
                    {/* Vertical Progress Rail */}
                    <div className="relative w-1.5 sm:w-2 bg-slate-200/90 rounded-full shrink-0 overflow-hidden self-stretch my-1">
                      <div
                        className="absolute top-0 left-0 w-full bg-slate-950 rounded-full will-change-[height] transition-[height] duration-75 ease-out shadow-xs"
                        style={{ height: `${stepBars[idx].toFixed(1)}%` }}
                      />
                    </div>

                    <div className="flex-1 min-w-0 pb-1">
                      {/* Badge */}
                      <div className="flex items-center gap-2">
                        <div
                          className={`workflow-step-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                            isActive
                              ? 'bg-slate-950 text-white shadow-xs'
                              : isCompleted
                              ? 'bg-slate-800 text-white'
                              : 'bg-slate-100 border border-slate-200/60 text-slate-500'
                          }`}
                        >
                          <span>{s.step}</span>
                          <span className="text-slate-400 font-normal">&bull;</span>
                          <span>{s.badge}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3
                        className={`workflow-step-title text-xl sm:text-2xl tracking-tight mt-2.5 transition-colors ${
                          isActive
                            ? 'font-bold text-slate-950'
                            : isCompleted
                            ? 'font-semibold text-slate-700'
                            : 'font-medium text-slate-400'
                        }`}
                      >
                        {s.title}
                      </h3>

                      {/* Content Accordion using Framer Motion */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pt-2.5">
                              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                {s.description}
                              </p>

                              {/* Contextual Callout */}
                              <div className="mt-3 bg-slate-50 border border-slate-200/90 rounded-2xl p-3 sm:p-3.5 shadow-xs">
                                <div className="flex items-start gap-2.5">
                                  <SparklesIcon className={`w-4 h-4 shrink-0 mt-0.5 ${s.badgeColor}`} />
                                  <span className="text-xs text-slate-700 font-medium leading-relaxed">
                                    {s.calloutText}
                                  </span>
                                </div>
                                <div className="mt-2.5 bg-white border border-slate-200/80 rounded-xl px-3 py-2 flex items-center justify-between text-xs shadow-xs">
                                  <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${idx < 2 ? 'bg-sky-500' : 'bg-emerald-500'}`} />
                                    <span className="text-slate-800 font-mono text-[11px] font-semibold">
                                      {s.subText}
                                    </span>
                                  </div>
                                  <span
                                    className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                      idx < 2
                                        ? 'text-sky-700 bg-sky-50 border-sky-200'
                                        : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                                    }`}
                                  >
                                    {s.subBadge}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Large Image Showcase */}
            <div className="lg:col-span-7">
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.14)] ring-1 ring-slate-900/5">
                <AnimatePresence mode="sync">
                  <motion.img
                    key={workflowStepsData[activeStep].image}
                    src={workflowStepsData[activeStep].image}
                    alt={workflowStepsData[activeStep].title}
                    initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.01, filter: 'blur(2px)' }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Bottom Trust & Action Strip */}
          <div className="mt-8 sm:mt-10 pt-5 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-5 text-xs sm:text-sm text-slate-600">
              <span className="flex items-center gap-1.5">
                <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
                Instant ImmiAccount PDF
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
                Government Price Parity Guaranteed
              </span>
            </div>
            <a
              href="#products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Products</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
