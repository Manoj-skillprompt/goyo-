import React, { useEffect, useState } from 'react';
import { ChartBar, Heartbeat, ShieldCheck, UsersThree, type Icon as PhosphorIcon } from '@phosphor-icons/react';
import { useReducedMotion } from 'framer-motion';
import { CONTAINER, H2 } from '../ui';

// V2's "Why choose Goyo" (same four reasons and photos), redesigned. V2 spread them over a
// 2,861px scroll-driven panel; here they sit in one screen: a list on the left, the active
// reason's photo on the right. It advances on its own every 6s until someone picks a reason,
// then stays put. Phones get each reason stacked with its photo. Reduced motion: no auto-advance.

const REASONS: {
  title: string;
  text: string;
  link: { label: string; href: string };
  Icon: PhosphorIcon;
  photo: string;
  alt: string;
  position: string;
  caption: string;
}[] = [
  {
    title: 'Meet visa requirements, stress-free',
    text: 'Every plan is built to satisfy student visa health-cover conditions, so your application moves without delays or extra paperwork.',
    link: { label: 'Learn about visa cover', href: '#products' },
    Icon: ShieldCheck,
    photo: '/why/visa.jpg',
    alt: 'Smiling young woman in a denim jacket and hoodie against a blue wall',
    position: '50% 30%',
    caption: 'Meets visa condition 8501'
  },
  {
    title: 'Compare plans in seconds, no guesswork',
    text: 'See plans side by side with clear prices and benefits, and pick the one that fits your course and budget.',
    link: { label: 'Compare plans', href: '#providers' },
    Icon: ChartBar,
    photo: '/why/compare.jpg',
    alt: 'Students laughing together while comparing options on a tablet',
    position: '50% 40%',
    caption: 'Five approved insurers, side by side'
  },
  {
    title: 'A plan for every kind of journey',
    text: 'Studying, working or visiting, alone or with family, there’s an option that covers everyone under one policy.',
    link: { label: 'View cover options', href: '#products' },
    Icon: UsersThree,
    photo: '/why/family.jpg',
    alt: 'A group of young travellers with backpacks laughing together in the mountains',
    position: '50% 45%',
    caption: 'Single, couple and family cover'
  },
  {
    title: 'Cover that puts your health first',
    text: 'From doctor visits to hospital stays, we help you choose cover you can rely on while you’re far from home.',
    link: { label: 'Get a quote', href: '#products' },
    Icon: Heartbeat,
    photo: '/why/doctor.jpg',
    alt: 'Smiling healthcare worker in scrubs with a stethoscope',
    position: '50% 25%',
    caption: 'From GP visits to hospital stays'
  }
];

const ADVANCE_MS = 6000;

const Caption: React.FC<{ text: string }> = ({ text }) => (
  <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/95 py-2 pl-2 pr-4 text-[14px] font-semibold text-[#0F172A] shadow-[0_10px_30px_rgba(15,23,42,0.18)]">
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#22B25C] text-white" aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12l5 5L20 7" />
      </svg>
    </span>
    {text}
  </span>
);

const ReasonLink: React.FC<{ link: { label: string; href: string } }> = ({ link }) => (
  <a href={link.href} className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#15803D] no-underline hover:text-[#166534]">
    {link.label}
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  </a>
);

export const V3Why: React.FC = () => {
  const [active, setActive] = useState(0);
  const [picked, setPicked] = useState(false);
  const reduced = useReducedMotion();
  const auto = !picked && !reduced;

  useEffect(() => {
    if (!auto) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % REASONS.length), ADVANCE_MS);
    return () => window.clearTimeout(t);
  }, [active, auto]);

  return (
    <section id="why-goyo" className="scroll-mt-24 bg-white py-20 font-secondary lg:py-28">
      <div className={CONTAINER}>
        <h2 className={`${H2} max-w-[620px]`}>Why students choose Goyo for their cover abroad</h2>

        {/* Desktop: list + photo */}
        <div className="mt-14 hidden grid-cols-12 items-stretch gap-16 lg:grid">
          <ul className="col-span-5 m-0 flex list-none flex-col justify-center p-0" role="tablist" aria-orientation="vertical">
            {REASONS.map((r, i) => {
              const on = i === active;
              return (
                <li key={r.title} className="relative border-b border-slate-200 last:border-b-0">
                  {/* the rule beside each reason; the active one fills while it waits to advance */}
                  <span aria-hidden="true" className="absolute left-0 top-0 h-full w-[3px] rounded-full bg-slate-100" />
                  <span
                    aria-hidden="true"
                    key={`${active}-${auto}`}
                    className="absolute left-0 top-0 w-[3px] origin-top rounded-full bg-[#22B25C]"
                    style={{
                      height: on ? '100%' : 0,
                      animation: on && auto ? `v3why-fill ${ADVANCE_MS}ms linear both` : undefined
                    }}
                  />
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="v3why-panel"
                    onClick={() => {
                      setActive(i);
                      setPicked(true);
                    }}
                    className="flex w-full cursor-pointer items-center gap-4 bg-transparent py-6 pl-8 pr-2 text-left"
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                        on ? 'bg-[#22B25C] text-white' : 'bg-[#F1F5F9] text-[#64748B]'
                      }`}
                    >
                      <r.Icon size={20} weight="bold" />
                    </span>
                    <span
                      className={`text-[19px] font-bold leading-[1.35] tracking-[-0.01em] transition-colors duration-300 ${
                        on ? 'text-[#0F172A]' : 'text-[#64748B]'
                      }`}
                    >
                      {r.title}
                    </span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <div className={`pb-7 pl-[88px] pr-2 transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-0'}`}>
                        <p className="m-0 text-[16px] leading-[1.6] text-[#475569]">{r.text}</p>
                        <ReasonLink link={r.link} />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div id="v3why-panel" role="tabpanel" className="relative col-span-7 min-h-[560px] overflow-hidden rounded-[32px] bg-[#E8F6EE]">
            {REASONS.map((r, i) => (
              <div
                key={r.photo}
                className="absolute inset-0 transition-opacity duration-700 ease-out"
                style={{ opacity: i === active ? 1 : 0 }}
                aria-hidden={i !== active}
              >
                <img src={r.photo} alt={r.alt} className="h-full w-full object-cover" style={{ objectPosition: r.position }} />
                <Caption text={r.caption} />
              </div>
            ))}
          </div>
        </div>

        {/* Phones and tablets: each reason with its photo */}
        <div className="mt-10 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-14 lg:hidden">
          {REASONS.map((r) => (
            <article key={r.title}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-[#E8F6EE]">
                <img src={r.photo} alt={r.alt} loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: r.position }} />
                <Caption text={r.caption} />
              </div>
              <div className="mt-6 flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#22B25C] text-white">
                  <r.Icon size={18} weight="bold" />
                </span>
                <h3 className="m-0 text-[19px] font-bold leading-[1.35] tracking-[-0.01em] text-[#0F172A]">{r.title}</h3>
              </div>
              <p className="m-0 mt-3 text-[16px] leading-[1.6] text-[#475569]">{r.text}</p>
              <ReasonLink link={r.link} />
            </article>
          ))}
        </div>
      </div>
      <style>{`@keyframes v3why-fill { from { transform: scaleY(0) } to { transform: scaleY(1) } }`}</style>
    </section>
  );
};
