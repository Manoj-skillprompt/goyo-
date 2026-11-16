import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AcademicCapIcon,
  ArrowsRightLeftIcon,
  ArrowUturnLeftIcon,
  DocumentCheckIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

interface BenefitsCardProps {
  onOpenLogin: () => void;
}

// V1's "liquid" benefits card: a dark card that grows to fill the screen as it scrolls in.
// Two audiences, four benefits each. Every claim here is backed by the FAQ (visa condition, full
// refund, certificate in seconds, switching) or by the agent portal (certificates, applications).
const VIEWS = {
  students: {
    label: 'For students and visitors',
    line: 'Every policy meets Department of Home Affairs requirements for student and visitor visas.',
    items: [
      { Icon: ShieldCheckIcon, title: 'Visa-ready cover', text: 'Issued by an approved insurer and built to meet your visa’s health-cover condition.' },
      { Icon: ArrowUturnLeftIcon, title: 'Full refund if your visa is refused', text: 'Your premium comes back in full, with no cancellation fee.' },
      { Icon: DocumentCheckIcon, title: 'Certificate in seconds', text: 'Your certificate of insurance is issued the moment you pay, ready for ImmiAccount.' },
      { Icon: ArrowsRightLeftIcon, title: 'Switch any time', text: 'Change insurer during your stay, without a penalty.' }
    ]
  },
  partners: {
    label: 'For education agents',
    line: 'One agent account for your students’ cover and university applications.',
    items: [
      { Icon: DocumentCheckIcon, title: 'Certificates for every student', text: 'Download each student’s certificate of insurance from your agent account.' },
      { Icon: UserGroupIcon, title: 'Applications in one place', text: 'Keep track of your students’ cover and applications from one login.' },
      { Icon: AcademicCapIcon, title: 'Free counselling for students', text: 'yourADMISSION counselling is free for every student you refer.' },
      { Icon: ScaleIcon, title: 'Every approved insurer', text: 'Compare all five approved insurers for each student, side by side.' }
    ]
  }
} as const;

type View = keyof typeof VIEWS;

export const BenefitsCard: React.FC<BenefitsCardProps> = ({ onOpenLogin }) => {
  const [view, setView] = useState<View>('students');
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const content = VIEWS[view];

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

      card.style.transform = `scale(${currentScale.toFixed(4)}) translateZ(0)`;
      card.style.borderRadius = `${currentRadius}px`;
      card.style.width = `${currentWidth.toFixed(2)}%`;
      card.style.minHeight = `calc(80vh + ${20 * p}vh)`;
      card.style.height = isMobile ? 'auto' : `calc(80vh + ${20 * p}vh)`;
      card.style.boxShadow = `0 30px 100px -20px rgba(0, 0, 0, ${shadowAlpha}), 0 0 0 transparent`;

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
      className="relative z-20 w-full bg-slate-50 overflow-hidden flex justify-center py-6 sm:py-10"
    >
      <section
        ref={cardRef}
        id="benefits-card"
        className="benefits-antigravity-card w-[88%] sm:w-[90%] min-h-[80vh] bg-[#06140E] text-white rounded-[36px] sm:rounded-[44px] relative overflow-hidden py-14 sm:py-16 lg:py-20 flex flex-col justify-center origin-top"
      >
        {/* One quiet light source, top centre */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(60% 50% at 50% 0%, rgba(34,178,92,0.22) 0%, rgba(34,178,92,0) 70%)' }}
        />

        <div className="relative mx-auto w-full max-w-5xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold leading-[1.12] tracking-tight text-balance sm:text-5xl lg:text-[3.25rem]">
              Everything you need before you fly
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#B7CCBF] sm:text-lg">
              Visa health cover, university applications and travel cover, in one place.
            </p>

            {/* Audience switch */}
            <div role="tablist" className="mt-8 inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] p-1">
              {(Object.keys(VIEWS) as View[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={view === key}
                  onClick={() => setView(key)}
                  className={`relative cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    view === key ? 'text-[#06140E]' : 'text-[#B7CCBF] hover:text-white'
                  }`}
                >
                  {view === key && (
                    <motion.span
                      layoutId="benefitsTab"
                      className="absolute inset-0 rounded-full bg-white"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative">{VIEWS[key].label}</span>
                </button>
              ))}
            </div>
            <p className="mx-auto mt-4 max-w-xl text-sm text-[#86D3A3]">{content.line}</p>
          </div>

          {/* Four benefits */}
          <AnimatePresence mode="wait">
            <motion.ul
              key={view}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              className="m-0 mx-auto mt-12 grid max-w-4xl list-none grid-cols-1 gap-4 p-0 md:grid-cols-2"
            >
              {content.items.map(({ Icon, title, text }) => (
                <li key={title} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6 sm:p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#22B25C]/15 text-[#4ADE80]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="m-0 mt-5 text-lg font-bold tracking-tight sm:text-xl">{title}</h3>
                  <p className="m-0 mt-2 text-[15px] leading-relaxed text-[#B7CCBF]">{text}</p>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>

          {view === 'partners' && (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={onOpenLogin}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#22B25C] px-6 py-3 text-sm font-bold text-white transition-[filter] hover:brightness-110"
              >
                Agent login
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
