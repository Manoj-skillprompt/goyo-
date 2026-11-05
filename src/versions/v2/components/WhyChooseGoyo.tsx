import React, { useEffect, useRef, useState } from 'react';
import {
  AirplaneTilt,
  ArrowRight,
  ChartBar,
  Check,
  FirstAid,
  Heartbeat,
  House,
  Scales,
  SealCheck,
  ShieldCheck,
  Stethoscope,
  Tag,
  UsersThree
} from '@phosphor-icons/react';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { BrandMark } from './BrandMark';
import { EYEBROW, EYEBROW_ON_LIGHT, SECTION_HEADING, SUBHEADING } from '../styles';
import { V2_PROVIDERS } from '../v2Data';

// "Why choose Goyo": on desktop the reasons scroll on the left while a sticky stack of cards on
// the right slides each new card up over the previous one (which recedes and dims). Timings and
// distances follow the reference design: 240px header, 560px per reason, 392px transition span.
const BLOCK = 560;
const SPAN = 392;
const GREEN = '#00B074';
const GREEN_DARK = '#047857';

const clamp = (v: number) => Math.max(0, Math.min(1, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// Tactile green button for this section (SKILLS.md → Button, in the section's #00B074 green).
const GREEN_BUTTON =
  'inline-flex items-center justify-center border border-[#047857] bg-linear-to-b from-[#22C98D] to-[#00A86E] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_1px_2px_rgba(15,23,42,0.12),0_6px_14px_-6px_rgba(4, 120, 87,0.55)]';

const REASONS: {
  eyebrow: string;
  title: string;
  text: string;
  link: { label: string; href: string };
  Icon: PhosphorIcon;
}[] = [
  {
    eyebrow: 'VISA-READY',
    title: 'Meet visa requirements, stress-free',
    text: 'Every plan is built to satisfy student visa health-cover conditions, so your application moves without delays or extra paperwork.',
    link: { label: 'Learn about visa cover', href: '#products' },
    Icon: ShieldCheck
  },
  {
    eyebrow: 'INSTANT COMPARISON',
    title: 'Compare plans in seconds, no guesswork',
    text: 'See plans side by side with clear prices and benefits, and pick the one that fits your course and budget.',
    link: { label: 'Compare plans', href: '#providers' },
    Icon: ChartBar
  },
  {
    eyebrow: 'MORE CHOICE',
    title: 'A plan for every kind of journey',
    text: 'Studying, working or visiting, alone or with family, there’s an option that covers everyone under one policy.',
    link: { label: 'View cover options', href: '#products' },
    Icon: UsersThree
  },
  {
    eyebrow: 'YOUR HEALTH FIRST',
    title: 'Cover that puts your health first',
    text: 'From doctor visits to hospital stays, we help you choose cover you can rely on while you’re far from home.',
    link: { label: 'Get a quote', href: '#products' },
    Icon: Heartbeat
  }
];

/* ---------- Cards (positions are percentages of the 560×600 reference card) ---------- */

const CertificateCard: React.FC = () => (
  <div className="absolute inset-0" style={{ background: GREEN_DARK }}>
    <BrandMark
      fill="#FFFFFF"
      className="absolute h-auto opacity-[0.14]"
      style={{ right: '-14%', bottom: '-6%', width: '68%' }}
    />
    <div
      className="absolute box-border flex flex-col gap-3.5 rounded-[18px] bg-white p-[30px] shadow-[0_24px_48px_rgba(0,0,0,0.25)]"
      style={{ left: '19.6%', top: '16.7%', width: '53.6%', height: '63.3%', transform: 'rotate(-5deg)' }}
    >
      <div className="flex items-center gap-2.5">
        <BrandMark fill={GREEN} className="h-auto w-[30px]" />
        <span className="text-[16px] font-extrabold text-slate-900">Goyo</span>
      </div>
      <span className="mt-2 text-[18px] font-extrabold text-slate-900">Certificate of Insurance</span>
      {[90, 75, 82, 60, 70].map((w) => (
        <span key={w} className="h-2.5 rounded-[5px] bg-slate-200" style={{ width: `${w}%` }} />
      ))}
    </div>
    <div
      className="absolute box-border flex aspect-square flex-col items-center justify-center gap-0.5 rounded-full border-4 bg-white shadow-[0_16px_32px_rgba(0,0,0,0.2)] sm:gap-1 sm:border-[6px]"
      style={{ left: '58.9%', top: '60%', width: '26.8%', borderColor: GREEN, color: GREEN_DARK, transform: 'rotate(12deg)' }}
    >
      <Check weight="bold" className="h-6 w-6 sm:h-10 sm:w-10" />
      {/* Scales down on phones, where the stamp is under 100px wide. */}
      <span className="text-[9px] font-extrabold tracking-[0.08em] sm:text-[15px]">VISA READY</span>
    </div>
  </div>
);

// Three approved insurers with their "from" prices (placeholder figures from v2Data).
const COMPARE = ['nib', 'Allianz Care', 'Medibank'].map((name) => V2_PROVIDERS.find((p) => p.name === name)!);
const BEST = 'Allianz Care';
const BAR_WIDTHS = ['45%', '75%', '95%'];

const CompareCard: React.FC = () => (
  <div className="absolute inset-0 box-border flex flex-col gap-4 bg-[#0F172A] px-12 py-14 text-white">
    <span className="text-[26px] font-extrabold">Compare plans</span>
    <span className="mb-3 text-[15px] text-slate-400">3 plans match your visa and course</span>
    {COMPARE.map((p, i) =>
      p.name === BEST ? (
        <div
          key={p.name}
          className="relative flex items-center gap-4 rounded-[20px] bg-white px-[22px] py-5 text-slate-900"
          style={{ boxShadow: `0 0 0 4px ${GREEN}` }}
        >
          <span
            className="absolute right-[18px] -top-[13px] rounded-full px-3 py-1 text-[12px] font-extrabold text-white"
            style={{ background: GREEN }}
          >
            BEST MATCH
          </span>
          <span className="flex flex-1 flex-col gap-2.5">
            <span className="text-[17px] font-bold">{p.name}</span>
            <span className="h-2 rounded" style={{ width: BAR_WIDTHS[i], background: GREEN }} />
          </span>
          <span className="text-[20px] font-extrabold">${p.monthlyFrom}/mo</span>
        </div>
      ) : (
        <div key={p.name} className="flex items-center gap-4 rounded-[20px] bg-[#1E293B] px-[22px] py-5">
          <span className="flex flex-1 flex-col gap-2.5">
            <span className="text-[17px] font-bold">{p.name}</span>
            <span className="h-2 rounded bg-slate-600" style={{ width: BAR_WIDTHS[i] }} />
          </span>
          <span className="text-[20px] font-extrabold">${p.monthlyFrom}/mo</span>
        </div>
      )
    )}
    <span className={`${GREEN_BUTTON} mt-auto h-[54px] rounded-2xl text-[16px] font-semibold`}>Buy {BEST}</span>
  </div>
);

const JourneyCard: React.FC = () => (
  <div className="absolute inset-0 bg-[#0B2A1C]">
    <img
      src="/hero-family-sky.jpg"
      alt="A smiling family together under an open evening sky"
      className="absolute inset-0 h-full w-full object-cover object-[50%_85%]"
    />
    <span
      aria-hidden="true"
      className="absolute inset-0"
      style={{ background: 'linear-gradient(180deg, rgba(11,42,28,0) 40%, rgba(11,42,28,0.85) 100%)' }}
    />
    <div className="absolute bottom-9 left-9 right-9 flex flex-wrap gap-2.5">
      {['Students', 'Workers', 'Visitors'].map((c) => (
        <span key={c} className="rounded-full bg-white px-[18px] py-2.5 text-[15px] font-bold text-slate-900">
          {c}
        </span>
      ))}
      <span className="rounded-full px-[18px] py-2.5 text-[15px] font-bold text-white" style={{ background: GREEN }}>
        Families
      </span>
    </div>
  </div>
);

const HealthCard: React.FC = () => (
  <div className="absolute inset-0 bg-[#E3F5EA]">
    <BrandMark
      fill={GREEN}
      className="absolute h-auto opacity-[0.12]"
      style={{ left: '-21%', top: '-6%', width: '75%' }}
    />
    <div
      className="absolute left-1/2 top-[20%] flex h-[200px] w-[200px] -translate-x-1/2 items-center justify-center rounded-full text-white"
      style={{ background: GREEN, boxShadow: '0 0 0 22px rgba(0, 176, 116,0.15), 0 0 0 44px rgba(0, 176, 116,0.08)' }}
    >
      <Heartbeat weight="duotone" className="h-[96px] w-[96px]" />
    </div>
    <div className="absolute bottom-12 left-10 right-10 grid grid-cols-3 gap-3">
      {['Doctor visits', 'Hospital', 'Ambulance'].map((c) => (
        <span key={c} className="rounded-[18px] bg-white px-3 py-4 text-center text-[15px] font-bold text-slate-900">
          {c}
        </span>
      ))}
    </div>
  </div>
);

// Previous illustrated cards (certificate, compare, journey, health), kept for reference.
export const ILLUSTRATED_CARDS = [CertificateCard, CompareCard, JourneyCard, HealthCard];

/* ---------- Photo cards: portrait photo with two tags overlapping its edges ---------- */

// Unsplash photos, downloaded into public/why/ (cropped around faces at 2× card size).
// Sources (unsplash.com, Unsplash License): photo-<id> as noted on each card below.
const local = (name: string) => `/why/${name}.jpg`;

interface PhotoTag {
  Icon: PhosphorIcon;
  lead: string;
  punch: string;
}

const PHOTO_CARDS: { src: string; alt: string; tags: [PhotoTag, PhotoTag] }[] = [
  {
    src: local('visa'), // photo-1494790108377-be9c29b29330
    alt: 'Young woman laughing',
    tags: [
      { Icon: SealCheck, lead: 'Visa requirements?', punch: 'Consider them done!' },
      { Icon: AirplaneTilt, lead: 'Australia-bound with', punch: 'Zero paperwork stress!' }
    ]
  },
  {
    src: local('compare'), // photo-1522202176988-66273c2fd55f
    alt: 'Students smiling while comparing options on their laptops',
    tags: [
      { Icon: Scales, lead: '5 approved insurers', punch: 'Side by side' },
      { Icon: Tag, lead: 'The official price,', punch: 'Zero markup!' }
    ]
  },
  {
    src: local('family'), // photo-1609220136736-443140cffec6
    alt: 'Smiling father carrying his two young children',
    tags: [
      { Icon: UsersThree, lead: 'Studying, working or visiting?', punch: 'We’ve got you' },
      { Icon: House, lead: 'The whole family,', punch: 'One policy!' }
    ]
  },
  {
    src: local('doctor'), // photo-1559839734-2b71ea197ec2
    alt: 'Smiling doctor in a white coat',
    tags: [
      { Icon: Stethoscope, lead: 'Doctor visits', punch: 'Covered!' },
      { Icon: FirstAid, lead: 'Hospital & ambulance', punch: 'Included!' }
    ]
  }
];

const TagPill: React.FC<{ tag: PhotoTag; className: string; style?: React.CSSProperties }> = ({ tag, className, style }) => (
  <div
    className={`absolute z-10 flex items-center gap-3 rounded-2xl border border-[#00B074]/35 bg-white/95 py-3 pl-3 pr-5 shadow-[0_16px_36px_-12px_rgba(15,23,42,0.35)] backdrop-blur transition-opacity duration-200 ${className}`}
    style={style}
  >
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#00B074] to-[#009662] text-white">
      <tag.Icon weight="duotone" className="h-6 w-6" />
    </span>
    <span className="leading-tight">
      <span className="block text-[15px] text-slate-600">{tag.lead}</span>
      <span className="block text-[16px] font-extrabold uppercase tracking-[0.01em] text-[#047857]">{tag.punch}</span>
    </span>
  </div>
);

// `overhang` lets the tags hang past the card edges (desktop); inset keeps them inside (phones).
const PhotoCard: React.FC<{ index: number; overhang?: boolean; tagOpacity?: number }> = ({
  index,
  overhang = false,
  tagOpacity = 1
}) => {
  const card = PHOTO_CARDS[index];
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 overflow-hidden rounded-[36px] bg-slate-200">
        {/* Loaded eagerly: cards slide in mid-scroll, so lazy loading would flash an empty card. */}
        <img src={card.src} alt={card.alt} decoding="async" className="h-full w-full object-cover" />
      </div>
      <TagPill
        tag={card.tags[0]}
        className={overhang ? 'left-0 top-[18%] -translate-x-[18%]' : 'left-3 top-4 scale-90 origin-top-left'}
        style={{ opacity: tagOpacity }}
      />
      <TagPill
        tag={card.tags[1]}
        className={overhang ? 'right-0 bottom-[14%] translate-x-[18%]' : 'right-3 bottom-4 scale-90 origin-bottom-right'}
        style={{ opacity: tagOpacity }}
      />
    </div>
  );
};

/* ---------- Section ---------- */

const ReasonText: React.FC<{ r: (typeof REASONS)[number]; active: boolean; desktop?: boolean }> = ({ r, active, desktop }) => (
  <div
    className={`flex flex-col justify-center gap-[18px] transition-[opacity,transform] duration-[450ms] ease-out motion-reduce:transition-none ${
      desktop ? 'h-1/4' : ''
    }`}
    style={desktop ? { opacity: active ? 1 : 0.25, transform: active ? 'none' : 'translateY(12px)' } : undefined}
  >
    <span className="flex items-center gap-3.5 text-[14px] font-bold tracking-[0.1em]" style={{ color: GREEN_DARK }}>
      {/* Icon tile: soft tinted badge (deliberately unlike the solid green buttons) */}
      <span className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-[#00B074]/12 text-[#047857] ring-1 ring-[#00B074]/25">
        <r.Icon weight="duotone" className="h-7 w-7" />
      </span>
      {r.eyebrow}
    </span>
    <h3 className={`${SUBHEADING} text-slate-900`}>{r.title}</h3>
    <p className="max-w-[480px] text-[17px] leading-[1.6] text-slate-600 sm:text-[18px]">{r.text}</p>
    <a
      href={r.link.href}
      className={`${GREEN_BUTTON} group h-12 w-fit gap-2 rounded-xl px-6 text-[15px] transition-[filter,transform] hover:brightness-[1.05] active:translate-y-px active:brightness-95`}
    >
      {r.link.label}
      <ArrowRight weight="bold" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </a>
  </div>
);

const SectionHeader: React.FC<{ className?: string }> = ({ className = '' }) => (
  <header className={`flex flex-col gap-3 ${className}`}>
    <p className={`${EYEBROW} ${EYEBROW_ON_LIGHT}`}>
      Why choose Goyo
    </p>
    <h2 className={`${SECTION_HEADING} max-w-[760px] text-slate-900`}>
      Why students choose Goyo for their cover abroad
    </h2>
  </header>
);

// How many pixels of page scroll the section stays pinned for: enough for the last card to
// finish stacking (at s = 1800) plus a short pause before the page moves on.
const PIN = 1960;

export const WhyChooseGoyo: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(0);

  // s = how far into the pinned stretch we are (0…PIN). The section is pinned in place while
  // s moves through that range; scrolling back up runs everything in reverse.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (ref.current) setS(Math.max(0, Math.min(PIN, -ref.current.getBoundingClientRect().top)));
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  // Card progress: card 0 is always in place; cards 1–3 slide up as their reason scrolls in.
  const t = [1, ...[1, 2, 3].map((i) => easeOut(clamp((s - (120 + BLOCK * i - SPAN)) / SPAN)))];
  const active = Math.max(0, Math.min(3, Math.floor((s - 120 + BLOCK / 2 + 20) / BLOCK)));
  // Reason list position: reason i is centred in its window exactly when card i finishes stacking.
  const pos = clamp((s - 120) / BLOCK / 3) * 3;

  // How far a card has been pushed back by the cards stacked on top of it (0 = front).
  const depthOf = (i: number) => {
    let depth = 0;
    for (let k = i + 1; k < 4; k++) depth += t[k];
    return depth;
  };

  const cardStyle = (i: number): React.CSSProperties => {
    const depth = depthOf(i);
    const y = (1 - t[i]) * 680 - depth * 26;
    return {
      transform: `translateY(${y.toFixed(1)}px) scale(${(1 - depth * 0.06).toFixed(3)})`,
      filter: `brightness(${(1 - depth * 0.12).toFixed(3)})`,
      opacity: i === 0 ? 1 : Math.min(1, t[i] * 4),
      boxShadow: i === 0 ? '0 30px 60px rgba(15,23,42,0.18)' : '0 -20px 60px rgba(15,23,42,0.25)'
    };
  };

  return (
    <section id="why-goyo" className="scroll-mt-24 bg-white">
      {/* Desktop: the tall wrapper provides the scroll distance; its sticky child stays pinned
          to the viewport while the reasons move through their window and the cards stack. */}
      <div ref={ref} className="relative hidden lg:block" style={{ height: `calc(100vh + ${PIN}px)` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="mx-auto grid h-full max-w-7xl grid-cols-[minmax(0,1fr)_480px] gap-x-16 px-8 pb-10 pt-24 xl:grid-cols-[minmax(0,1fr)_560px] xl:gap-x-24">
            <div className="flex min-h-0 flex-col">
              <SectionHeader />
              {/* Reason window: shows one reason at a time, soft-faded at top and bottom */}
              <div
                className="relative mt-6 min-h-0 flex-1 overflow-hidden"
                style={{
                  maskImage: 'linear-gradient(to bottom, transparent, #000 6%, #000 94%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent, #000 6%, #000 94%, transparent)'
                }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-[400%] will-change-transform"
                  style={{ transform: `translateY(${(-pos * 25).toFixed(3)}%)` }}
                >
                  {REASONS.map((r, i) => (
                    <ReasonText key={r.title} r={r} active={i === active} desktop />
                  ))}
                </div>
              </div>
            </div>

            {/* Anchored to the bottom so the receding cards behind (which peek ~80px above)
                stay clear of the fixed nav. */}
            <div className="relative self-end" style={{ height: 'min(600px, calc(100vh - 230px))' }}>
              {PHOTO_CARDS.map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 origin-top rounded-[36px] will-change-transform"
                  style={cardStyle(i)}
                >
                  {/* Tags hang past the card edges; they fade out once a card is covered so
                      the cards behind don't show stray tags beside the front card. */}
                  <PhotoCard index={i} overhang tagOpacity={clamp(1 - depthOf(i) * 1.5)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Phones and tablets: each reason followed by its card, no scroll effect */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:hidden">
        <SectionHeader className="pb-12 pt-20" />
        <div className="space-y-16 pb-20">
          {REASONS.map((r, i) => (
            <div key={r.title} className="space-y-8">
              <ReasonText r={r} active />
              <div className="relative mx-auto aspect-[560/600] w-full max-w-[560px] rounded-[36px] shadow-[0_30px_60px_rgba(15,23,42,0.18)]">
                <PhotoCard index={i} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
