import React from 'react';
import { partnersData } from '../../../data/portalData';
import { CONTAINER, H2, LEAD } from '../ui';

// V2's "approved insurers" section, redesigned: the heading on the left, and the five insurers in
// one ruled row (shared hairlines, no floating cards), each with the cover it offers.
// Keeps the #providers anchor the nav and footer link to.
export const V3Insurers: React.FC = () => (
  <section id="providers" className="scroll-mt-24 bg-white py-20 font-secondary lg:py-24">
    <div className={`${CONTAINER} grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-16`}>
      <div className="lg:col-span-5">
        <h2 className={H2}>Compare cover from Australia&rsquo;s approved insurers</h2>
      </div>
      <p className={`${LEAD} lg:col-span-6 lg:col-start-7`}>
        Every insurer here is an official signatory to the Australian Government&rsquo;s OSHC deed, so any policy you
        buy meets your visa condition.
      </p>
    </div>

    <div className={`${CONTAINER} mt-12`}>
      {/* Hairlines are the 1px gaps over the grey ground: exact at every column count */}
      <ul className="m-0 grid list-none grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-slate-200 bg-slate-200 p-0 sm:grid-cols-6 lg:grid-cols-5">
        {partnersData.map((p, i) => (
          <li
            key={p.name}
            // phones: 2 + 2 + 1 (the last spans the row); tablets: 3 + 2 on a 6-column grid; desktop: 5 in a row
            className={`flex flex-col items-center justify-center gap-4 bg-white px-4 py-9 lg:col-span-1 ${
              i < 3 ? 'sm:col-span-2' : 'sm:col-span-3'
            } ${i === partnersData.length - 1 ? 'col-span-2' : ''}`}
          >
            <span className="flex h-10 items-center">
              <img src={p.logo} alt={p.name} className="max-h-full w-auto max-w-[128px] object-contain" />
            </span>
            <span className="text-[13px] font-medium text-[#64748B]">{p.type}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
