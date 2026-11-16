import React from 'react';
import { V2_RATING, V2_TESTIMONIALS } from '../../v2/v2Data';
import { CONTAINER } from '../ui';

// V2's testimonials, redesigned: the rating as the one big number, and the three testimonials
// shown once each (one leads, two support), instead of a marquee that repeated each quote four times.
//
// PLACEHOLDER CONTENT: the rating and the testimonials (V2_TESTIMONIALS) are samples. Replace them
// with real, verifiable reviews before launch.

const Attribution: React.FC<{ t: (typeof V2_TESTIMONIALS)[number] }> = ({ t }) => (
  <figcaption className="mt-5 flex items-center gap-3">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#22B25C] text-[13px] font-bold text-white">
      {t.initials}
    </span>
    <span className="flex flex-col">
      <span className="text-[15px] font-semibold text-white">{t.name}</span>
      <span className="text-[14px] text-[#B7CCBF]">
        {t.university} · from {t.country}
      </span>
    </span>
  </figcaption>
);

export const V3Testimonials: React.FC = () => {
  const [lead, ...rest] = V2_TESTIMONIALS;
  return (
    <section id="reviews" className="scroll-mt-24 bg-[#0B2A1C] py-20 font-secondary text-white lg:py-28">
      <div className={`${CONTAINER} grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16`}>
        {/* The one number */}
        <div className="lg:col-span-4">
          <h2 className="m-0 text-[30px] font-extrabold leading-[1.12] tracking-[-0.025em] sm:text-[36px] lg:text-[42px]">
            Loved by students around the world
          </h2>
          <div className="mt-10 flex items-end gap-4">
            <span className="text-[72px] font-extrabold leading-[0.9] tracking-[-0.04em] text-[#4ADE80]">{V2_RATING.score}</span>
            <span className="flex flex-col gap-1 pb-1">
              <span className="text-[18px] tracking-[2px] text-[#FACC15]" aria-hidden="true">
                ★★★★★
              </span>
              <span className="text-[15px] text-[#D5E6DC]">from {V2_RATING.count} reviews</span>
            </span>
          </div>
        </div>

        {/* The words */}
        <div className="flex flex-col gap-10 lg:col-span-8">
          <figure className="m-0">
            <blockquote className="m-0 text-[22px] font-semibold leading-[1.45] tracking-[-0.01em] sm:text-[26px]">
              &ldquo;{lead.quote}&rdquo;
            </blockquote>
            <Attribution t={lead} />
          </figure>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {rest.map((t) => (
              <figure key={t.name} className="m-0 rounded-[20px] border border-white/10 bg-white/[0.04] p-6">
                <blockquote className="m-0 text-[16px] leading-[1.6] text-[#E2EEE7]">&ldquo;{t.quote}&rdquo;</blockquote>
                <Attribution t={t} />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
