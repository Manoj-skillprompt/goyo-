import React, { useId, useState } from 'react';
import { faqsData } from '../../../data/portalData';
import { CONTAINER, H2, LEAD } from '../ui';

// A plain accordion: every question once, the first open. Answers open with their height
// (grid rows 0fr → 1fr), so the questions below move with them instead of jumping.
export const V3Faq: React.FC = () => {
  const [open, setOpen] = useState<number | null>(faqsData[0]?.id ?? null);
  const base = useId();

  return (
    <section id="faq" className="scroll-mt-24 bg-white py-20 font-secondary lg:py-28">
      <div className={`${CONTAINER} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-4">
          <h2 className={H2}>Questions, answered</h2>
          <p className={`${LEAD} mt-4`}>
            Visa conditions, refunds and switching insurers. Can&rsquo;t find yours? Email{' '}
            <a href="mailto:support@youroshc.com.au" className="font-semibold text-[#15803D] underline-offset-4 hover:underline">
              support@youroshc.com.au
            </a>
            .
          </p>
        </div>

        <ul className="m-0 list-none border-t border-slate-200 p-0 lg:col-span-8">
          {faqsData.map((faq) => {
            const isOpen = open === faq.id;
            const panel = `${base}-a-${faq.id}`;
            return (
              <li key={faq.id} className="border-b border-slate-200">
                <h3 className="m-0">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => setOpen(isOpen ? null : faq.id)}
                    className="flex w-full cursor-pointer items-start justify-between gap-6 bg-transparent py-6 text-left text-[17px] font-semibold leading-[1.45] text-[#0F172A]"
                  >
                    {faq.question}
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color,color] duration-300 ${
                        isOpen ? 'rotate-45 border-[#22B25C] bg-[#22B25C] text-white' : 'border-slate-300 text-[#475569]'
                      }`}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <path d="M6 1v10M1 6h10" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  id={panel}
                  role="region"
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <div className={`flex max-w-[680px] flex-col gap-3 pb-7 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                      {faq.answer.split('\n\n').map((p, i) => (
                        <p key={i} className="m-0 text-[16px] leading-[1.65] text-[#475569]">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
