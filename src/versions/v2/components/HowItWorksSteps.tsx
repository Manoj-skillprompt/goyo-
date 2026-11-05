import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calculator, IdentificationCard, Scales, SealCheck } from '@phosphor-icons/react';
import { V2_STEPS } from '../v2Data';
import { SECTION_HEADING } from '../styles';

const STEP_MS = 6000;
const ease = [0.16, 1, 0.3, 1] as const;

const ICONS = {
  quote: Calculator,
  compare: Scales,
  details: IdentificationCard,
  certificate: SealCheck
};

export const HowItWorksSteps: React.FC = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance through the steps; pointing at the section pauses it.
  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % V2_STEPS.length), STEP_MS);
    return () => window.clearTimeout(id);
  }, [active, paused]);

  const step = V2_STEPS[active];

  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 border-t border-slate-200 bg-white py-20 lg:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Steps */}
        <div className="lg:col-span-5">
          <p className="text-[13px] font-semibold text-[#00B074]">How it works</p>
          <h2 className={`${SECTION_HEADING} mt-2 text-slate-900`}>
            Covered in four simple steps.
          </h2>
          <p className="mt-4 max-w-md text-[16px] leading-relaxed text-slate-600">
            From quote to visa-ready certificate in about five minutes, with no paperwork and no agent fees.
          </p>

          <ol className="mt-10 space-y-2">
            {V2_STEPS.map((s, i) => {
              const Icon = ICONS[s.icon];
              const isActive = i === active;
              return (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-current={isActive ? 'step' : undefined}
                    className={`relative flex w-full gap-4 overflow-hidden rounded-2xl border p-4 text-left transition-colors cursor-pointer ${
                      isActive ? 'border-slate-200 bg-slate-50' : 'border-transparent hover:bg-slate-50/60'
                    }`}
                  >
                    {/* Progress rail: fills while this step is showing */}
                    <span className="absolute inset-y-4 left-0 w-[3px] rounded-full bg-slate-200/0">
                      {isActive && (
                        <motion.span
                          key={`${active}-${paused}`}
                          className="absolute inset-x-0 top-0 rounded-full bg-[#00B074]"
                          initial={{ height: paused ? '100%' : '0%' }}
                          animate={{ height: '100%' }}
                          transition={{ duration: paused ? 0 : STEP_MS / 1000, ease: 'linear' }}
                        />
                      )}
                    </span>

                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        isActive ? 'bg-[#00B074]/10 text-[#009662]' : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      <Icon weight="duotone" className="h-6 w-6" />
                    </span>

                    <span className="min-w-0">
                      <span className="flex items-baseline gap-2">
                        <span className={`text-[12px] font-semibold ${isActive ? 'text-[#009662]' : 'text-slate-400'}`}>
                          0{i + 1}
                        </span>
                        <span className={`text-[16px] font-semibold ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                          {s.title}
                        </span>
                      </span>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.span
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease }}
                            className="block overflow-hidden"
                          >
                            <span className="block pt-1.5 text-[14px] leading-relaxed text-slate-600">{s.description}</span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <a
            href="#products"
            // Primary button (see SKILLS.md → Button)
            className="mt-8 inline-flex h-14 min-w-[200px] items-center justify-center rounded-xl border border-[#009662] bg-linear-to-b from-[#22C98D] to-[#00A86E] px-8 text-[16px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_1px_2px_rgba(15,23,42,0.12),0_4px_10px_-4px_rgba(0,150,98,0.45)] transition-[filter,transform] hover:brightness-[1.04] active:translate-y-px active:brightness-95"
          >
            Find my cover
          </a>
        </div>

        {/* Preview: real screenshot of the active step in a browser frame */}
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_60px_-30px_rgba(15,23,42,0.3)]">
            <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-4 py-3" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              <span className="ml-3 text-[12px] font-medium text-slate-400">
                Step {active + 1} of {V2_STEPS.length} · {step.title}
              </span>
            </div>
            <div className="relative aspect-[1024/541] bg-slate-50">
              <AnimatePresence mode="sync">
                <motion.img
                  key={step.image}
                  src={step.image}
                  alt={step.imageAlt}
                  initial={{ opacity: 0, scale: 1.015 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
