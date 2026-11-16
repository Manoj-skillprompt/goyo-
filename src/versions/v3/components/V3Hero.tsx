import React from 'react';
import { motion } from 'framer-motion';
import { BrandMark } from '../../v2/components/BrandMark';
import { V2_AVATARS, V2_PRODUCTS, V2_RATING, V2Product } from '../../v2/v2Data';

// V3 hero: full-bleed student photo with the pitch on the left, three floating guarantees on the
// right, and a white "product dock" that overlaps the bottom of the photo.
// Design reference: "Hero 1 — Full-bleed photo + product dock" (HeroDock.dc.html).
const ease = [0.2, 0.8, 0.2, 1] as const;

// Entrance used by most hero elements: rise 28px and fade in.
const up = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay }
});

// Pop-in used by the floating chips and product tiles.
const pop = (delay: number) => ({
  initial: { opacity: 0, scale: 0.8, y: 14 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { duration: 0.8, ease, delay }
});

// Per-tile colours and copy from the design, keyed by product id. Prices come from V2_PRODUCTS.
const TILE: Record<
  string,
  { bg: string; mark: string; ink: string; arrowInk: string; markOpacity: number; label: string; blurb: string }
> = {
  oshc: {
    bg: '#E8F6EE',
    mark: '#22B25C',
    ink: '#15803D',
    arrowInk: '#FFFFFF',
    markOpacity: 0.12,
    label: 'Student health cover',
    blurb: 'Visa-compliant Overseas Student Health Cover from approved insurers.'
  },
  ovhc: {
    bg: '#FEF6DC',
    mark: '#F5B301',
    ink: '#B45309',
    arrowInk: '#0F172A',
    markOpacity: 0.16,
    label: 'Visitor health cover',
    blurb: 'Overseas Visitor Health Cover for workers, visitors and families.'
  },
  admission: {
    bg: '#E6EEFE',
    mark: '#2563EB',
    ink: '#1D4ED8',
    arrowInk: '#FFFFFF',
    markOpacity: 0.1,
    label: 'University admissions',
    blurb: 'Apply to Australian universities with free counselling.'
  },
  orbit: {
    bg: '#E0F5FA',
    mark: '#0891B2',
    ink: '#0E7490',
    arrowInk: '#FFFFFF',
    markOpacity: 0.1,
    label: 'Travel cover',
    blurb: 'Travel insurance for your trips to New Zealand.'
  }
};

const Arrow: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg
    aria-hidden="true"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const CHIP_ICONS = {
  refund: (
    <>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
    </>
  ),
  scales: (
    <>
      <path d="M12 3v18M5 21h14M6 7h12" />
      <path d="M6 7l-3 7a3 3 0 0 0 6 0zM18 7l-3 7a3 3 0 0 0 6 0z" />
    </>
  ),
  badge: (
    <>
      <path d="M12 3l2.4 1.8 3-.2.9 2.9 2.4 1.8-1 2.8 1 2.8-2.4 1.8-.9 2.9-3-.2L12 21l-2.4-1.8-3 .2-.9-2.9-2.4-1.8 1-2.8-1-2.8 2.4-1.8.9-2.9 3 .2z" />
      <path d="M9 12l2 2 4-4" />
    </>
  )
};

// Floating guarantee chips. Positions are the design's, measured from the hero's top-left
// inside the 1200px content column (shown from xl up, where that column exists).
const CHIPS: {
  title: string;
  sub: string;
  icon: keyof typeof CHIP_ICONS;
  tint: string;
  ink: string;
  left: number;
  top: number;
  delay: number;
  floatDelay: number;
}[] = [
  { title: 'Visa refused?', sub: 'Full refund', icon: 'refund', tint: '#E8F6EE', ink: '#15803D', left: 810, top: 196, delay: 1, floatDelay: 0 },
  { title: '5 approved insurers', sub: 'Compared side by side', icon: 'scales', tint: '#E6EEFE', ink: '#2563EB', left: 990, top: 366, delay: 1.2, floatDelay: 2 },
  { title: 'Visa-ready certificate', sub: 'Issued in seconds', icon: 'badge', tint: '#E8F6EE', ink: '#15803D', left: 840, top: 526, delay: 1.4, floatDelay: 4 }
];

const AVATAR_RING = ['#22B25C', '#F5B301', '#2563EB', '#0891B2'];

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

interface V3HeroProps {
  onSelectProduct: (product: V2Product) => void;
}

export const V3Hero: React.FC<V3HeroProps> = ({ onSelectProduct }) => (
  <section className="relative overflow-hidden bg-[#F8FAFC] pb-16 font-secondary text-[#0F172A] lg:pb-20">
    {/* Photo band */}
    <div className="relative overflow-hidden bg-[#0B2A1C] pb-[150px] pt-32 sm:pt-36 lg:pb-[140px]">
      <motion.img
        src="/banner/students.jpg"
        alt="International students smiling together in a lecture hall"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease }}
        className="absolute inset-0 h-full w-full object-cover object-[60%_35%]"
      />
      {/* Readability scrims: top-to-bottom on small screens, the design's left-to-right from lg */}
      <span
        aria-hidden="true"
        className="absolute inset-0 lg:hidden"
        style={{ background: 'linear-gradient(180deg, rgba(6,30,20,0.9) 0%, rgba(6,30,20,0.82) 60%, rgba(6,30,20,0.9) 100%)' }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            'linear-gradient(90deg, rgba(6,30,20,0.94) 0%, rgba(6,30,20,0.82) 38%, rgba(6,30,20,0.2) 70%, rgba(6,30,20,0.05) 100%)'
        }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-60"
        style={{ background: 'linear-gradient(180deg, rgba(6,30,20,0) 0%, rgba(6,30,20,0.7) 100%)' }}
      />

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 xl:px-0">
        {/* Floating guarantees */}
        {CHIPS.map((c) => (
          <motion.div
            key={c.title}
            {...pop(c.delay)}
            className="absolute z-10 hidden whitespace-nowrap xl:block"
            style={{ left: c.left, top: c.top - 128 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity, delay: c.floatDelay / 2 }}
              className="flex items-center gap-3 rounded-[18px] bg-white py-3.5 pl-3.5 pr-5 shadow-[0_18px_40px_rgba(0,0,0,0.25)]"
            >
              <span
                className="flex h-[42px] w-[42px] items-center justify-center rounded-xl"
                style={{ background: c.tint, color: c.ink }}
              >
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {CHIP_ICONS[c.icon]}
                </svg>
              </span>
              <span className="flex flex-col">
                <span className="text-[16px] font-bold">{c.title}</span>
                <span className="text-[14px] text-[#475569]">{c.sub}</span>
              </span>
            </motion.div>
          </motion.div>
        ))}

        {/* Pitch */}
        <div className="flex max-w-[680px] flex-col gap-[26px] text-white">
          <motion.span
            {...up(0.05)}
            className="flex items-center gap-2.5 self-start rounded-full border border-white/20 bg-white/[0.12] py-2 pl-2 pr-4 text-[13px] font-semibold sm:text-[14px]"
          >
            <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-white">
              <BrandMark fill="#22B25C" className="h-auto w-[18px]" />
            </span>
            Health cover · Admissions · Travel — one place
          </motion.span>

          <motion.h1
            {...up(0.15)}
            className="m-0 text-[44px] font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-[60px] lg:text-[76px]"
          >
            Land in Australia
            <br />
            <span className="relative inline-block text-[#4ADE80]">
              covered
              <svg
                aria-hidden="true"
                width="100%"
                height="16"
                viewBox="0 0 300 16"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0"
              >
                <motion.path
                  d="M3 11 C80 3, 200 3, 297 9"
                  fill="none"
                  stroke="#4ADE80"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: [0.6, 0, 0.2, 1], delay: 0.9 }}
                />
              </svg>
            </span>
            , enrolled
            <br />
            and ready.
          </motion.h1>

          <motion.p {...up(0.3)} className="m-0 max-w-[600px] text-[17px] leading-[1.6] text-[#D5E6DC] sm:text-[19px]">
            Compare student and visitor health cover from Australia&rsquo;s approved insurers, apply to university
            with free counselling, and get travel cover for New Zealand. One place, no agent fees.
          </motion.p>

          <motion.div {...up(0.45)} className="flex flex-wrap gap-3.5">
            <button
              type="button"
              onClick={() => scrollTo('products')}
              className="flex h-[58px] cursor-pointer items-center gap-2.5 rounded-2xl bg-[#22B25C] px-[30px] text-[17px] font-bold text-white shadow-[0_12px_28px_rgba(34,178,92,0.4)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              Find my cover
              <Arrow />
            </button>
            <button
              type="button"
              onClick={() => scrollTo('providers')}
              className="flex h-[58px] cursor-pointer items-center rounded-2xl border-[1.5px] border-white/40 bg-white/[0.08] px-[30px] text-[17px] font-bold text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              Compare providers
            </button>
          </motion.div>

          <motion.div {...up(0.6)} className="flex flex-wrap items-center gap-4">
            <span className="flex" aria-hidden="true">
              {V2_AVATARS.slice(0, 4).map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  width={40}
                  height={40}
                  className={`h-10 w-10 rounded-full border-2 border-[#0B2A1C] object-cover ${i ? '-ml-2.5' : ''}`}
                  style={{ background: AVATAR_RING[i] }}
                />
              ))}
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="flex flex-wrap items-center gap-1.5 text-[15px]">
                <span className="tracking-[2px] text-[#FACC15]" aria-hidden="true">
                  ★★★★★
                </span>
                <span className="font-extrabold">{V2_RATING.score}</span>
                <span className="text-[#B7CCBF]">({V2_RATING.count} reviews)</span>
              </span>
              <span className="text-[14px] text-[#B7CCBF]">Trusted by 120,000+ students and families</span>
            </span>
          </motion.div>
        </div>

        {/* Dock heading, still on the photo */}
        <div className="mt-16 flex flex-wrap items-end justify-between gap-2 text-white lg:mt-[72px]">
          <motion.h2 {...up(0.7)} className="m-0 text-[26px] font-extrabold tracking-[-0.02em] sm:text-[32px]">
            Four products. <span className="text-[#9ED8B5]">One account.</span>
          </motion.h2>
          <motion.span {...up(0.7)} className="text-[14px] text-[#D5E6DC]">
            Prices in AUD, single cover
          </motion.span>
        </div>
      </div>
    </div>

    {/* Product dock, overlapping the photo */}
    <div id="products" className="relative mx-auto -mt-[118px] max-w-[1200px] scroll-mt-28 px-4 sm:px-6 xl:px-0">
      <div className="grid grid-cols-1 gap-4 rounded-[32px] bg-white p-4 shadow-[0_30px_70px_rgba(15,23,42,0.18)] sm:grid-cols-2 lg:grid-cols-4">
        {V2_PRODUCTS.map((product, i) => {
          const t = TILE[product.id];
          const isOrbit = product.id === 'orbit';
          return (
            <motion.button
              key={product.id}
              type="button"
              {...pop(0.8 + i * 0.1)}
              onClick={() => onSelectProduct(product)}
              className="group relative flex min-h-[268px] cursor-pointer flex-col gap-3 overflow-hidden rounded-[22px] p-6 text-left text-[#0F172A] transition-[transform,box-shadow] duration-[350ms] ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-2 hover:shadow-[0_24px_40px_rgba(15,23,42,0.14)]"
              style={{ background: t.bg }}
            >
              {/* Watermark */}
              {isOrbit ? (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-[50px] -right-[50px] h-[170px] w-[170px] rounded-full border-[22px]"
                  style={{ borderColor: t.mark, opacity: t.markOpacity }}
                />
              ) : (
                <BrandMark
                  fill={t.mark}
                  className="absolute -bottom-10 -right-10 h-[170px] w-[170px]"
                  style={{ opacity: t.markOpacity }}
                />
              )}

              {/* Wordmark */}
              <span className="relative flex items-center gap-2 text-[26px] tracking-[-0.02em]">
                {isOrbit ? (
                  <span
                    aria-hidden="true"
                    className="mr-0.5 h-[26px] w-[26px] rounded-full border-[5px]"
                    style={{ borderColor: t.mark }}
                  />
                ) : (
                  <BrandMark fill={t.mark} className="h-[34px] w-[34px]" />
                )}
                <span className="font-normal" style={isOrbit ? { color: t.ink } : undefined}>
                  {product.prefix}
                </span>
                <span className="-ml-2 font-extrabold" style={{ color: t.ink }}>
                  {product.brand}
                </span>
              </span>

              <span className="relative text-[13px] font-bold uppercase tracking-[0.08em]" style={{ color: t.ink }}>
                {t.label}
              </span>
              <span className="relative text-[15px] leading-[1.5] text-[#334155]">{t.blurb}</span>

              <span className="relative mt-auto flex items-center justify-between">
                <span className="flex flex-col">
                  <span className="text-[12px] text-[#64748B]">{product.priceLabel}</span>
                  <span className="text-[22px] font-extrabold">
                    {product.priceValue}
                    {product.priceSuffix && (
                      <span className="text-[14px] font-semibold text-[#64748B]">{product.priceSuffix}</span>
                    )}
                  </span>
                </span>
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1"
                  style={{ background: t.mark, color: t.arrowInk }}
                >
                  <Arrow />
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  </section>
);
