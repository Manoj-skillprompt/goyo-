import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HandCoins, Scales, SealCheck, Star } from '@phosphor-icons/react';
import { ProductCard } from './ProductCard';
import { DISPLAY, SECTION_HEADING } from '../styles';
import { V2_AVATARS, V2_PRODUCTS, V2_RATING, V2_REVIEWS, V2_TRUST_STATS, V2Product } from '../v2Data';

const ease = [0.16, 1, 0.3, 1] as const;

const Stars: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <div className="flex items-center gap-0.5 text-[#F5A524]" aria-hidden="true">
    {[0, 1, 2, 3, 4].map((i) => (
      <Star key={i} weight="fill" className={className} />
    ))}
  </div>
);

const TrustPanel: React.FC = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const review = V2_REVIEWS[active];

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % V2_REVIEWS.length), 6000);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <motion.aside
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="rounded-[24px] bg-white p-6 ring-1 ring-slate-900/[0.07] shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
      aria-label="Student reviews"
    >
      {/* Rating summary */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-[40px] font-bold leading-none tracking-tight text-slate-900">{V2_RATING.score}</span>
          <div>
            <Stars />
            <p className="font-secondary mt-1 text-[12.5px] text-slate-500">
              from {V2_RATING.count} student reviews
            </p>
          </div>
        </div>
        <div className="flex -space-x-2" aria-hidden="true">
          {V2_REVIEWS.map((r, i) => (
            <span
              key={r.initials}
              className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold text-white ring-2 ring-white"
              style={{ backgroundColor: ['#13853F', '#8F6A00', '#006EE9'][i % 3] }}
            >
              {r.initials}
            </span>
          ))}
        </div>
      </div>

      {/* Rotating review */}
      <div className="relative mt-5 min-h-[132px] border-t border-slate-100 pt-5">
        <AnimatePresence mode="wait">
          <motion.figure
            key={review.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease }}
          >
            <blockquote className="text-[15.5px] leading-relaxed text-slate-700">
              &ldquo;{review.text}&rdquo;
            </blockquote>
            <figcaption className="font-secondary mt-3 flex flex-wrap items-center gap-x-2 text-[12.5px]">
              <span className="font-semibold text-slate-900">{review.name}</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-500">{review.detail}</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-500">{review.product}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center gap-1.5">
        {V2_REVIEWS.map((r, i) => (
          <button
            key={r.name}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show review from ${r.name}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === active ? 'w-6 bg-slate-900' : 'w-1.5 bg-slate-200 hover:bg-slate-300'
            }`}
          />
        ))}
      </div>

      {/* Trusted by */}
      <div className="mt-6 border-t border-slate-100 pt-5">
        <p className="font-secondary text-[12px] font-medium text-slate-500">Trusted by students and agents</p>
        <dl className="mt-3 grid grid-cols-3 gap-3">
          {V2_TRUST_STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-[20px] font-bold leading-none tracking-tight text-slate-900">{stat.value}</dd>
              <dd className="font-secondary mt-1 text-[12px] text-slate-500">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </motion.aside>
  );
};

// Floating label pinned over the hero photo. The outer span pops it in; the inner one bobs
// gently on its own rhythm (`floatDuration`) so the tags drift out of sync.
const HeroTag: React.FC<{
  className?: string;
  // Border tint, matched to the tag's icon colour.
  borderClass?: string;
  delay: number;
  floatDuration: number;
  children: React.ReactNode;
}> = ({ className = '', borderClass = 'border-slate-200', delay, floatDuration, children }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: 'spring', stiffness: 260, damping: 20, delay }}
    className={`absolute flex ${className}`}
  >
    <motion.span
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.4 }}
      whileHover={{ scale: 1.04 }}
      className={`flex items-center gap-2.5 rounded-2xl border bg-white/95 py-2 pl-2 pr-4 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.35)] backdrop-blur ${borderClass}`}
    >
      {children}
    </motion.span>
  </motion.span>
);

interface V2HeroProps {
  onSelectProduct: (product: V2Product) => void;
}

export const V2Hero: React.FC<V2HeroProps> = ({ onSelectProduct }) => (
  <section className="relative overflow-hidden bg-slate-50 pb-20 pt-28 sm:pt-32 lg:pb-24">
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="lg:col-span-7"
        >
          {/* <p className="font-secondary inline-flex items-center gap-2 text-[13px] font-medium text-slate-600">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1FA855]/12 text-[#13853F]">
              <SealCheck weight="duotone" className="h-3.5 w-3.5" />
            </span>
            Government-approved insurers only. Visa condition 8501 ready.
          </p> */}

          <h1 className={`${DISPLAY} mt-5 max-w-[14ch] text-slate-900`}>
            Land in Australia{' '}
            <span className="relative inline-block text-[#00B074]">
              covered
              {/* Thin hand-drawn underline that draws in once on load */}
              <svg
                aria-hidden="true"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                className="absolute -bottom-[0.12em] left-0 h-[0.18em] w-full overflow-visible"
              >
                <motion.path
                  d="M2 8.5 C 45 3.5, 110 2.5, 198 6"
                  fill="none"
                  stroke="#00B074"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: 0.6, ease: [0.65, 0, 0.35, 1] }}
                />
              </svg>
            </span>
            , enrolled and ready.
          </h1>

          <p className="font-secondary mt-6 max-w-xl text-[16px] leading-relaxed text-slate-600 sm:text-[17px]">
            Compare student and visitor health cover from Australia&rsquo;s approved insurers, apply to
            university with free counselling, and get travel cover for New Zealand. One place, no agent fees.
          </p>

          {/* Tactile buttons: soft vertical gradient, 1px border, inner top highlight */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#products"
              className="inline-flex h-14 min-w-[200px] items-center justify-center rounded-xl border border-[#009662] bg-linear-to-b from-[#22C98D] to-[#00A86E] px-8 text-[16px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_1px_2px_rgba(15,23,42,0.12),0_4px_10px_-4px_rgba(0,150,98,0.45)] transition-[filter,transform] hover:brightness-[1.04] active:translate-y-px active:brightness-95"
            >
              Find my cover
            </a>
            <a
              href="#providers"
              className="inline-flex h-14 min-w-[200px] items-center justify-center rounded-xl border border-zinc-300 bg-linear-to-b from-white to-zinc-100 px-8 text-[16px] font-semibold text-slate-900 shadow-[inset_0_1px_0_#ffffff,0_1px_2px_rgba(15,23,42,0.08)] transition-[filter,transform] hover:brightness-[0.99] active:translate-y-px active:to-zinc-200"
            >
              Compare providers
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-9">
            <p className="text-[15px] text-slate-600">
              Trusted by 120,000+ students and families
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex -space-x-2.5" aria-hidden="true">
                {V2_AVATARS.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full bg-slate-200 object-cover ring-[2.5px] ring-slate-50"
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Stars className="h-[18px] w-[18px]" />
                <span className="text-[14px] font-semibold text-slate-900">{V2_RATING.score}</span>
                <span className="text-[14px] text-slate-500">({V2_RATING.count} reviews)</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reviews & trust (kept for later use, replaced by the hero image)
        <div className="lg:col-span-5">
          <TrustPanel />
        </div>
        */}

        {/* Hero image */}
        <motion.figure
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className="relative lg:col-span-5"
        >
          <img
            src="/product-oshc.jpg"
            alt="International student smiling on an Australian university campus"
            className="h-[320px] w-full rounded-[28px] object-cover object-[50%_30%] sm:h-[420px] lg:h-[480px]"
            // Feather all four edges into the page background.
            style={{
              maskImage:
                'linear-gradient(to right, transparent, #000 3%, #000 97%, transparent), linear-gradient(to bottom, transparent, #000 3%, #000 97%, transparent)',
              maskComposite: 'intersect',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, #000 3%, #000 97%, transparent), linear-gradient(to bottom, transparent, #000 3%, #000 97%, transparent)',
              WebkitMaskComposite: 'source-in'
            }}
          />
          <figcaption>
            {/* Refund guarantee */}
            <HeroTag delay={0.45} floatDuration={4.2} borderClass="border-[#00B074]/30" className="right-4 top-[22%] hidden sm:flex sm:right-5 lg:left-0 lg:right-auto lg:-translate-x-1/2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00B074]/10 text-[#009662]">
                <HandCoins weight="duotone" className="h-5 w-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-[13px] font-semibold text-slate-900">Visa refused?</span>
                <span className="block text-[12px] text-slate-600">Full refund</span>
              </span>
            </HeroTag>

            {/* Certificate */}
            <HeroTag delay={0.55} floatDuration={5} borderClass="border-[#00B074]/30" className="bottom-4 left-4 sm:bottom-5 sm:left-5 lg:bottom-12 lg:left-0 lg:-translate-x-1/2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00B074]/10 text-[#009662]">
                <SealCheck weight="duotone" className="h-5 w-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-[13px] font-semibold text-slate-900">Visa-ready certificate</span>
                <span className="block text-[12px] text-slate-600">Issued in seconds</span>
              </span>
            </HeroTag>

            {/* Approved insurers */}
            <HeroTag delay={0.65} floatDuration={4.6} borderClass="border-[#1E40AF]/25" className="bottom-[88px] right-4 hidden sm:flex sm:right-5 lg:bottom-[38%] lg:-right-6 min-[1440px]:right-0 min-[1440px]:translate-x-1/2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1E40AF]/10 text-[#1E40AF]">
                <Scales weight="duotone" className="h-5 w-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-[13px] font-semibold text-slate-900">5 approved insurers</span>
                <span className="block text-[12px] text-slate-600">Compared side by side</span>
              </span>
            </HeroTag>
          </figcaption>
        </motion.figure>
      </div>

      {/* Products */}
      <div id="products" className="scroll-mt-28pt-16 lg:pt-20">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <h2 className={`${SECTION_HEADING} text-slate-900`}>
            Four products. <span className="text-slate-500">One account.</span>
          </h2>
          <p className="font-secondary text-[13px] text-slate-500">Prices in AUD, single cover</p>
        </div>

        {/* Swipeable row on phones, grid from tablet up */}
        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 scroll-px-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {V2_PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} onSelect={onSelectProduct} />
          ))}
        </div>
      </div>
    </div>
  </section>
);
