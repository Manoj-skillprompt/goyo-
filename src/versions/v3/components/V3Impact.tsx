import React from 'react';
import { CONTAINER, H2 } from '../ui';

// V2's impact panel, redesigned: the five figures at display size in one ruled row, with nothing
// competing for attention (V2's low-resolution photo is gone).
//
// PLACEHOLDER CONTENT: these figures are samples carried over from V2. Replace them with real,
// verifiable numbers before launch.
const STATS = [
  { value: '150,000+', label: 'Covers issued' },
  { value: '120,000+', label: 'Happy customers' },
  { value: '85,000+', label: 'Students supported' },
  { value: '500+', label: 'Education partners' },
  { value: '45+', label: 'Origin countries' }
];

export const V3Impact: React.FC = () => (
  <section id="impact" className="scroll-mt-24 bg-[#F8FAFC] py-20 font-secondary lg:py-24">
    <div className={CONTAINER}>
      <h2 className={`${H2} max-w-[560px]`}>Trusted by students and partners worldwide</h2>
      <dl className="m-0 mt-12 grid grid-cols-2 gap-y-10 border-t border-slate-200 pt-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-y-0">
        {STATS.map((s, i) => (
          <div key={s.label} className={`pr-4 ${i > 0 ? 'lg:border-l lg:border-slate-200 lg:pl-8' : ''}`}>
            <dt className="sr-only">{s.label}</dt>
            <dd className="m-0 whitespace-nowrap text-[34px] font-extrabold leading-none tracking-[-0.03em] text-[#0F172A] sm:text-[40px]">
              {s.value}
            </dd>
            <dd className="m-0 mt-3 text-[15px] text-[#475569]">{s.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);
