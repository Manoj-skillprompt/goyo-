import React from 'react';
import { BrandMark } from './BrandMark';
import { CARD_TITLE, EYEBROW, EYEBROW_ON_LIGHT, SECTION_HEADING } from '../styles';
import './howItWorks.css';

// Orbit layout is drawn on a 1200×560 canvas; positions below are percentages of that canvas
// so the whole diagram scales with the container width on desktop.
const pct = (px: number, of: number) => `${(px / of) * 100}%`;
const W = 1200;
const H = 560;

const STEPS = [
  {
    n: 1,
    title: 'Choose your cover',
    text: 'Compare plans that fit your visa type and course length.',
    node: { x: 755, y: 125 },
    copy: { x: 830, y: 80, align: 'left' as const }
  },
  {
    n: 2,
    title: 'Get an instant quote',
    text: 'Enter a few details and see your price straight away.',
    node: { x: 755, y: 435 },
    copy: { x: 830, y: 390, align: 'left' as const }
  },
  {
    n: 3,
    title: 'Pay securely',
    text: 'Check out online in a couple of minutes.',
    node: { x: 445, y: 435 },
    copy: { x: 40, y: 390, align: 'right' as const }
  },
  {
    n: 4,
    title: 'Receive your certificate',
    text: 'Documents land in your inbox, ready for your visa application.',
    node: { x: 445, y: 125 },
    copy: { x: 40, y: 80, align: 'right' as const }
  }
];

// Each step has its own keyframes in howItWorks.css (ob-node-1…4, ob-title-1…4), timed so its
// node and heading turn green exactly when the progress ring reaches it and reset at loop end.

const PHOTO = {
  src: '/product-admissions.jpg',
  alt: 'International student smiling while holding her university acceptance letter',
  position: '46% 50%'
};

// Matches the reference design for this section.
const GREEN = '#00B074';

const nodeBase =
  'flex items-center justify-center rounded-full border-2 border-slate-300 bg-white font-extrabold text-slate-500 box-border';

export const HowItWorks: React.FC = () => (
  <section id="how-it-works" className="scroll-mt-24 overflow-hidden border-t border-slate-200 bg-white py-16 lg:py-16">
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-0">
      <div className="flex flex-col items-center gap-3 text-center">
        <p className={`${EYEBROW} ${EYEBROW_ON_LIGHT}`}>How it works</p>
        <h2 className={`${SECTION_HEADING} text-slate-900`}>Everything revolves around you</h2>
      </div>

      {/* Desktop: orbit diagram */}
      <div className="relative mt-7 hidden aspect-[1200/560] w-full lg:block">
        <div
          aria-hidden="true"
          className="ob-spin absolute box-border aspect-square rounded-full border-[1.5px] border-dashed border-[#D7E9DD]"
          style={{ left: pct(330, W), top: pct(10, H), width: pct(540, W) }}
        />

        <svg
          aria-hidden="true"
          viewBox="0 0 440 440"
          className="absolute aspect-square overflow-visible"
          style={{ left: pct(380, W), top: pct(60, H), width: pct(440, W), transform: 'rotate(-90deg)' }}
        >
          <circle cx="220" cy="220" r="219" fill="none" stroke="#E2E8F0" strokeWidth="3" />
          <circle
            className="ob-ring"
            pathLength={1}
            cx="220"
            cy="220"
            r="219"
            fill="none"
            stroke={GREEN}
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>

        <div
          className="absolute aspect-square overflow-hidden rounded-full shadow-[0_24px_60px_rgba(15,23,42,0.18)]"
          style={{ left: pct(450, W), top: pct(130, H), width: pct(300, W) }}
        >
          <img
            src={PHOTO.src}
            alt={PHOTO.alt}
            className="ob-zoom block h-full w-full object-cover"
            style={{ objectPosition: PHOTO.position }}
          />
        </div>

        <span
          aria-hidden="true"
          className="absolute flex aspect-square items-center justify-center rounded-full bg-white shadow-[0_8px_20px_rgba(15,23,42,0.15)]"
          style={{ left: pct(668, W), top: pct(350, H), width: pct(76, W) }}
        >
          <BrandMark fill={GREEN} className="h-auto w-[62%]" />
        </span>

        {STEPS.map((s) => (
          <div
            key={s.n}
            className={`ob-node-${s.n} absolute h-[60px] w-[60px] text-[20px] ${nodeBase}`}
            style={{
              left: pct(s.node.x, W),
              top: pct(s.node.y, H),
              transform: 'translate(-50%, -50%)'
            }}
          >
            {s.n}
          </div>
        ))}

        {STEPS.map((s) => (
          <div
            key={s.title}
            className={`absolute flex flex-col gap-2 ${s.copy.align === 'right' ? 'items-end text-right' : ''}`}
            style={{ left: pct(s.copy.x, W), top: pct(s.copy.y, H), width: pct(330, W) }}
          >
            <h3 className={`ob-title-${s.n} ${CARD_TITLE} text-slate-900`}>{s.title}</h3>
            <p className="text-[16px] leading-[1.55] text-slate-600">{s.text}</p>
          </div>
        ))}
      </div>

      {/* Phones and tablets: photo, then the steps as a list with the same timing */}
      <div className="mt-10 lg:hidden">
        <div className="relative mx-auto aspect-square w-[240px]">
          <div
            aria-hidden="true"
            className="ob-spin absolute -inset-5 rounded-full border-[1.5px] border-dashed border-[#D7E9DD]"
          />
          <div className="absolute inset-0 overflow-hidden rounded-full shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
            <img
              src={PHOTO.src}
              alt={PHOTO.alt}
              className="ob-zoom block h-full w-full object-cover"
              style={{ objectPosition: PHOTO.position }}
            />
          </div>
          <span
            aria-hidden="true"
            className="absolute bottom-1 right-1 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_8px_20px_rgba(15,23,42,0.15)]"
          >
            <BrandMark fill={GREEN} className="h-auto w-10" />
          </span>
        </div>

        <ol className="mx-auto mt-12 max-w-md space-y-6">
          {STEPS.map((s) => (
            <li key={s.n} className="flex items-start gap-4">
              <span className={`ob-node-inline-${s.n} h-12 w-12 shrink-0 text-[17px] ${nodeBase}`}>
                {s.n}
              </span>
              <div className="pt-1">
                <h3 className={`ob-title-${s.n} ${CARD_TITLE} text-slate-900`}>{s.title}</h3>
                <p className="mt-1 text-[15px] leading-[1.55] text-slate-600">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);
