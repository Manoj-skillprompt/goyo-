import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BrandMark } from '../../v2/components/BrandMark';
import './howPath.css';

// V3 "How it works": four steps along an animated journey path.
// Design reference: "How 1 — Animated journey path" (HowPath.dc.html).
// From xl up it's the design's 1200px curve; below that the steps stack as a vertical timeline.

const PATH =
  'M0 170 C50 170 100 155 150 130 S250 90 300 90 S400 105 450 130 S550 170 600 170 S700 155 750 130 S850 90 900 90 S1000 105 1050 130 S1150 170 1200 170';

const ICONS: React.ReactNode[] = [
  <>
    <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z" />
    <path d="M9 12l2 2 4-4" />
  </>,
  <>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 7h6M9 11h6M9 15h3" />
  </>,
  <>
    <rect x="3" y="6" width="18" height="13" rx="2" />
    <path d="M3 10h18M7 15h3" />
  </>,
  <>
    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <path d="M14 3v6h6" />
    <path d="M9 15l2 2 4-4" />
  </>
];

// x is the node's position on the 1200px path; delay is when the travelling dot reaches it.
const STEPS = [
  { title: 'Choose your cover', body: 'Compare plans that fit your visa and course length.', x: 150, delay: 0.75 },
  { title: 'Get an instant quote', body: 'Enter a few details and see your price straight away.', x: 450, delay: 2.25 },
  { title: 'Pay securely', body: 'Check out online in a couple of minutes.', x: 750, delay: 3.75 },
  { title: 'Receive your certificate', body: 'Documents land in your inbox, ready for your visa application.', x: 1050, delay: 5.25 }
];

const Icon: React.FC<{ i: number }> = ({ i }) => (
  <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {ICONS[i]}
  </svg>
);

const stepLabel = (i: number) => `STEP 0${i + 1}`;

export const V3HowItWorks: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { once: true, amount: 0.4 });

  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 overflow-hidden border-t border-slate-200 bg-white py-16 font-secondary text-[#0F172A] lg:py-[72px]"
    >
      <BrandMark
        fill="#22B25C"
        className="pointer-events-none absolute -right-[140px] -top-[120px] h-[460px] w-[460px] opacity-[0.06]"
      />

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 xl:px-0">
        {/* Heading */}
        <div className="mx-auto flex max-w-[640px] flex-col items-center gap-3 text-center">
          <p className="m-0 text-[13px] font-bold uppercase tracking-[0.14em] text-[#15803D]">How it works</p>
          <h2 className="m-0 text-[30px] font-extrabold leading-[1.15] tracking-[-0.02em] sm:text-[36px] lg:text-[40px]">
            Get covered in four simple steps
          </h2>
          <p className="m-0 max-w-[560px] text-[17px] leading-[1.5] text-[#475569]">
            From choosing a plan to holding your certificate — the whole journey takes minutes.
          </p>
        </div>

        {/* Wide screens: the design's journey path */}
        <div
          ref={stageRef}
          className={`relative mx-auto mt-12 hidden h-[380px] w-[1200px] xl:block ${inView ? 'hp-run' : ''}`}
        >
          <svg aria-hidden="true" width="1200" height="200" viewBox="0 0 1200 200" className="absolute left-0 top-0 overflow-visible">
            <path d={PATH} fill="none" stroke="#E2E8F0" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />
            <path className="hp-line" pathLength={1} d={PATH} fill="none" stroke="#22B25C" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <div
            aria-hidden="true"
            className="hp-dot absolute left-0 top-0 h-[18px] w-[18px] rounded-full border-4 border-[#22B25C] bg-white shadow-[0_4px_14px_rgba(34,178,92,0.45)]"
          />

          <ol className="m-0 list-none p-0">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <div
                  className="hp-node absolute top-[130px] flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#CBD5E1] bg-white text-[#64748B]"
                  style={{ left: s.x, animationDelay: `${s.delay}s` }}
                >
                  <Icon i={i} />
                </div>
                <div
                  className="hp-text absolute top-[196px] flex w-[240px] flex-col items-center gap-2 text-center"
                  style={{ left: s.x - 120, animationDelay: `${s.delay}s` }}
                >
                  <span className="text-[12px] font-bold tracking-[0.12em] text-[#15803D]">{stepLabel(i)}</span>
                  <h3 className="m-0 text-[20px] font-bold">{s.title}</h3>
                  <p className="m-0 text-[15px] leading-[1.5] text-[#475569]">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Smaller screens: vertical timeline */}
        <ol className="relative mx-auto mt-10 max-w-[520px] list-none p-0 xl:hidden">
          <span aria-hidden="true" className="absolute bottom-8 left-[27px] top-8 w-[3px] rounded-full bg-[#E2E8F0]" />
          {STEPS.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative flex gap-5 pb-8 last:pb-0"
            >
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#22B25C] text-white shadow-[0_0_0_8px_rgba(34,178,92,0.12)]">
                <Icon i={i} />
              </span>
              <div className="flex flex-col gap-1.5 pt-1">
                <span className="text-[12px] font-bold tracking-[0.12em] text-[#15803D]">{stepLabel(i)}</span>
                <h3 className="m-0 text-[19px] font-bold">{s.title}</h3>
                <p className="m-0 text-[15px] leading-[1.5] text-[#475569]">{s.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};
