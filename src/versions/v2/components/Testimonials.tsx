import React from 'react';
import { BrandMark } from './BrandMark';
import { EYEBROW, EYEBROW_ON_DARK, SECTION_HEADING } from '../styles';
import { V2_RATING, V2_TESTIMONIALS } from '../v2Data';
import './testimonials.css';

// "Loved by students" two-way marquee wall, built from the testimonials design reference.
const THEMES = [
  { bg: '#FFFFFF', fg: '#0F172A', sub: '#64748B', avBg: '#00B074', avFg: '#FFFFFF' },
  { bg: '#047857', fg: '#FFFFFF', sub: '#DCF5E5', avBg: '#FFFFFF', avFg: '#047857' },
  { bg: '#123826', fg: '#FFFFFF', sub: '#B7CCBF', avBg: '#00B074', avFg: '#0B2A1C' }
];

// One half of a row: cards cycle through the quotes and the three colour themes. The row's
// offset shifts which quote gets which colour, so the two rows don't mirror each other.
const HALF = 6;
const makeRow = (offset: number) =>
  Array.from({ length: HALF }, (_, k) => ({
    ...V2_TESTIMONIALS[(k + offset) % V2_TESTIMONIALS.length],
    ...THEMES[k % THEMES.length]
  }));

const ROW_A = makeRow(0);
const ROW_B = makeRow(1);

type Card = (typeof ROW_A)[number];

const Star: React.FC = () => (
  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.5l2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.2 1.3-6.6L2.5 9.3l6.6-.8z" />
  </svg>
);

const QuoteCard: React.FC<{ q: Card; hidden?: boolean }> = ({ q, hidden }) => (
  <figure
    aria-hidden={hidden || undefined}
    className="m-0 box-border flex w-[380px] shrink-0 flex-col gap-[18px] rounded-3xl px-7 py-[26px]"
    style={{ background: q.bg, color: q.fg }}
  >
    <blockquote className="m-0 text-[17px] font-medium leading-[1.55]">“{q.quote}”</blockquote>
    <figcaption className="flex items-center gap-3">
      <span
        className="flex h-11 w-11 items-center justify-center rounded-full text-[15px] font-extrabold"
        style={{ background: q.avBg, color: q.avFg }}
      >
        {q.initials}
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-[15px] font-bold">{q.name}</span>
        <span className="text-[13px]" style={{ color: q.sub }}>
          {q.university} · {q.country}
        </span>
      </span>
    </figcaption>
  </figure>
);

// Each row renders its cards twice (the second copy hidden from screen readers) for the loop.
const Row: React.FC<{ cards: Card[]; className: string }> = ({ cards, className }) => (
  <div className={`flex w-max gap-5 pr-5 ${className}`}>
    {[...cards, ...cards].map((q, i) => (
      <QuoteCard key={i} q={q} hidden={i >= cards.length} />
    ))}
  </div>
);

export const Testimonials: React.FC = () => (
  <section
    id="reviews"
    className="relative flex scroll-mt-24 flex-col gap-12 overflow-hidden bg-[#0B2A1C] py-[72px] text-white"
  >
    <BrandMark
      fill="#FFFFFF"
      className="pointer-events-none absolute -right-[120px] -top-[140px] h-auto w-[480px] opacity-[0.07]"
    />

    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
      <div className="flex flex-col gap-3">
        <p className={`m-0 ${EYEBROW} ${EYEBROW_ON_DARK}`}>Testimonials</p>
        <h2 className={`m-0 ${SECTION_HEADING}`}>
          Loved by students
          <br />
          around the world
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <span className="flex gap-[3px] text-[#FACC15]">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} />
          ))}
        </span>
        <span className="flex flex-col gap-0.5">
          <span className="text-[22px] font-extrabold">{V2_RATING.score} / 5</span>
          <span className="text-[14px] text-[#B7CCBF]">from {V2_RATING.count} reviews</span>
        </span>
      </div>
    </div>

    <div className="tm-track tm-fade relative flex flex-col gap-5">
      <Row cards={ROW_A} className="tm-left" />
      <Row cards={ROW_B} className="tm-right" />
    </div>
  </section>
);
