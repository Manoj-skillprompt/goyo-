import React from 'react';
import { PARTNER_APPLY_HREF } from '../../v2/v2Data';
import { BTN_PRIMARY, CONTAINER, H2, LEAD } from '../ui';

// V2's "Become our partner", redesigned: what agents get and one action beside V2's partner photo,
// instead of copy in a card laid over the photo.

const POINTS = [
  'Every approved insurer for your students, in one place',
  'Free university counselling through yourADMISSION',
  'Certificates issued the moment your student pays'
];

export const V3Partner: React.FC = () => (
  <section id="partner" className="scroll-mt-24 bg-[#F8FAFC] py-20 font-secondary lg:py-28">
    <div className={`${CONTAINER} grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16`}>
      <div className="lg:col-span-5">
        <p className="m-0 text-[15px] font-semibold text-[#15803D]">For education agents</p>
        <h2 className={`${H2} mt-3`}>Partner with yourOSHC</h2>
        <p className={`${LEAD} mt-4`}>
          Help your students get visa-ready cover without the paperwork, and keep track of every policy from your agent
          account.
        </p>
        <ul className="m-0 mt-6 flex list-none flex-col gap-3 p-0">
          {POINTS.map((p) => (
            <li key={p} className="flex items-start gap-3 text-[15px] leading-[1.5] text-[#334155]">
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" className="mt-px shrink-0 text-[#22B25C]" fill="currentColor">
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.6 7.2-5.3 6a1 1 0 0 1-1.46.04l-2.5-2.5a1 1 0 1 1 1.42-1.42l1.74 1.75 4.6-5.2a1 1 0 0 1 1.5 1.33Z" />
              </svg>
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href={PARTNER_APPLY_HREF} className={BTN_PRIMARY}>
            Become a partner
          </a>
          <span className="text-[14px] text-[#475569]">
            or email <span className="font-semibold text-[#0F172A]">support@youroshc.com.au</span>
          </span>
        </div>
      </div>
      <div className="min-w-0 lg:col-span-7">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] bg-[#E8F6EE] lg:aspect-[7/6]">
          <img
            src="/partner/partner-wide.jpg"
            alt="Two business partners celebrating a deal with a high five in a bright office"
            loading="lazy"
            className="h-full w-full object-cover object-[40%_center]"
          />
        </div>
      </div>
    </div>
  </section>
);
