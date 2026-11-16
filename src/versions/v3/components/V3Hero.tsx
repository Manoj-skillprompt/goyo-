import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle, HandCoins, SealCheck, Star } from '@phosphor-icons/react';
import { ProductCard } from '../../v2/components/ProductCard';
import { BrandMark } from '../../v2/components/BrandMark';
import { BUTTON_PRIMARY, DISPLAY, SECTION_HEADING } from '../../v2/styles';
import { V2_AVATARS, V2_PRODUCTS, V2_RATING, V2Product } from '../../v2/v2Data';
import { partnersData } from '../../../data/portalData';

// V3 hero: built to convert. One decision ("What do you need?") drives a personalised primary
// button and a live preview card on the photo, with reassurance and proof right under the action.
const ease = [0.16, 1, 0.3, 1] as const;

// Short labels for the chooser tiles, keyed by product id.
const CHOICE_LABEL: Record<string, { title: string; sub: string }> = {
  oshc: { title: 'Student visa cover', sub: 'OSHC · subclass 500' },
  ovhc: { title: 'Work or visitor cover', sub: 'OVHC · 485, 482, 600…' },
  admission: { title: 'University admission', sub: 'Free counselling' },
  orbit: { title: 'NZ travel cover', sub: 'OrbitProtect' }
};

// Primary-button wording per product, and where it leads on this page.
const CTA: Record<string, { label: string; target: string }> = {
  oshc: { label: 'Compare OSHC plans', target: 'providers' },
  ovhc: { label: 'Compare OVHC plans', target: 'providers' },
  admission: { label: 'Book free counselling', target: 'how-it-works' },
  orbit: { label: 'Get my NZ quote', target: 'how-it-works' }
};

const REASSURANCE = ['No agent fees', 'Certificate in seconds', 'Full refund if visa refused'];

const priceLine = (p: V2Product) => `${p.priceLabel} ${p.priceValue}${p.priceSuffix ?? ''}`;

interface V3HeroProps {
  onSelectProduct: (product: V2Product) => void;
}

export const V3Hero: React.FC<V3HeroProps> = ({ onSelectProduct }) => {
  const [selectedId, setSelectedId] = useState(V2_PRODUCTS[0].id);
  const selected = V2_PRODUCTS.find((p) => p.id === selectedId) ?? V2_PRODUCTS[0];
  const cta = CTA[selected.id];

  const go = () => document.getElementById(cta.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section className="relative overflow-hidden bg-slate-50 pb-20 pt-28 sm:pt-32 lg:pb-24">
      {/* Soft emerald glow behind the photo side */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-[640px] w-[640px] rounded-full opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(0,176,116,0.16), transparent 65%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left: message + decision + proof */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="lg:col-span-7"
          >
            {/* Rating pill: proof before the pitch */}
            <a
              href="#reviews"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1.5 pl-2 pr-3.5 text-[13px] text-slate-600 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-colors hover:border-slate-300"
            >
              <span className="flex items-center gap-0.5 text-[#F5A524]" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} weight="fill" className="h-3.5 w-3.5" />
                ))}
              </span>
              <span>
                <span className="font-semibold text-slate-900">{V2_RATING.score}</span> from {V2_RATING.count} student
                reviews
              </span>
            </a>

            <h1 className={`${DISPLAY} mt-6 max-w-[15ch] text-slate-900`}>
              Your Australian visa cover, <span className="text-[#00B074]">sorted in minutes.</span>
            </h1>

            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-slate-600">
              Compare official prices from Australia&rsquo;s approved insurers and get a visa-ready certificate
              instantly. No agent fees, ever.
            </p>

            {/* The one decision */}
            <fieldset className="mt-8">
              <legend className="text-[14px] font-semibold text-slate-900">What do you need?</legend>
              <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {V2_PRODUCTS.map((p) => {
                  const active = p.id === selectedId;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSelectedId(p.id)}
                      className={`relative cursor-pointer rounded-2xl border bg-white px-3.5 py-3 text-left transition-[border-color,box-shadow] ${
                        active
                          ? 'border-[#00B074] shadow-[0_0_0_3px_rgba(0,176,116,0.15)]'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span
                        className="mb-2 block h-1.5 w-6 rounded-full"
                        style={{ backgroundColor: p.color }}
                        aria-hidden="true"
                      />
                      <span className="block text-[14px] font-semibold leading-snug text-slate-900">
                        {CHOICE_LABEL[p.id].title}
                      </span>
                      <span className="mt-0.5 block text-[12px] text-slate-500">{CHOICE_LABEL[p.id].sub}</span>
                      {active && (
                        <CheckCircle
                          weight="fill"
                          className="absolute right-2.5 top-2.5 h-4 w-4 text-[#00B074]"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Personalised primary action */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <button type="button" onClick={go} className={`${BUTTON_PRIMARY} gap-2`}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={cta.label}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                  >
                    {cta.label}
                  </motion.span>
                </AnimatePresence>
              </button>
              <span className="text-[14px] text-slate-500">
                <span className="font-semibold text-slate-900">{priceLine(selected)}</span>
                {selected.id === 'oshc' || selected.id === 'ovhc' ? ' · single cover' : ''}
              </span>
            </div>

            {/* Reassurance right under the action */}
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {REASSURANCE.map((r) => (
                <li key={r} className="flex items-center gap-1.5 text-[14px] text-slate-600">
                  <CheckCircle weight="fill" className="h-4 w-4 text-[#00B074]" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>

            {/* Proof: people + official insurers */}
            <div className="mt-9 flex flex-col gap-5 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:gap-8">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5" aria-hidden="true">
                  {V2_AVATARS.slice(0, 5).map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt=""
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full bg-slate-200 object-cover ring-2 ring-slate-50"
                    />
                  ))}
                </div>
                <p className="text-[13px] leading-snug text-slate-600">
                  <span className="font-semibold text-slate-900">120,000+</span>
                  <br />
                  students covered
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-slate-500">
                  Official insurers
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
                  {partnersData.map((p) => (
                    <img
                      key={p.name}
                      src={p.logo}
                      alt={p.name}
                      className="h-5 w-auto max-w-[84px] object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: photo + live preview card for the chosen product */}
          <motion.figure
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="relative lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-[32px]">
              <img
                src="/product-oshc.jpg"
                alt="International student smiling on an Australian university campus"
                className="h-[420px] w-full object-cover object-[50%_25%] sm:h-[520px] lg:h-[600px]"
              />
              {/* Brand corner, matching the banners: emerald glow + white swoosh */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(70% 60% at 100% 0%, rgba(0,176,116,0.75) 0%, rgba(0,176,116,0.3) 22%, rgba(0,176,116,0) 45%)'
                }}
              />
              <BrandMark fill="#FFFFFF" className="absolute right-6 top-6 h-auto w-16 opacity-90 sm:w-20" />
            </div>

            {/* Preview card: changes with the choice */}
            <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease }}
                  className="rounded-2xl border border-white/70 bg-white/95 p-4 shadow-[0_20px_40px_-16px_rgba(15,23,42,0.4)] backdrop-blur sm:p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      {selected.logo ? (
                        <img
                          src={selected.logo}
                          alt={`${selected.prefix}${selected.brand}`}
                          className="h-6 w-auto max-w-[180px] object-contain object-left"
                        />
                      ) : (
                        <span className="text-[18px] tracking-tight text-slate-900">
                          {selected.prefix}
                          <span className="font-bold">{selected.brand}</span>
                        </span>
                      )}
                      <p className="mt-2 text-[14px] font-semibold text-slate-900">{selected.title}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-[12px] text-slate-500">{selected.priceLabel}</p>
                      <p className="text-[22px] font-bold leading-none tracking-tight text-slate-900">
                        {selected.priceValue}
                        <span className="text-[13px] font-medium text-slate-500">{selected.priceSuffix}</span>
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-slate-200 pt-3">
                    {selected.perks.map((perk) => (
                      <span key={perk} className="flex items-center gap-1.5 text-[13px] text-slate-600">
                        <SealCheck weight="duotone" className="h-4 w-4 text-[#009662]" aria-hidden="true" />
                        {perk}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* One floating guarantee, top-left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
              className="absolute left-4 top-6 hidden items-center gap-2.5 rounded-2xl border border-[#00B074]/30 bg-white/95 py-2 pl-2 pr-4 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.35)] backdrop-blur sm:flex lg:-left-8"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00B074]/10 text-[#009662]">
                <HandCoins weight="duotone" className="h-5 w-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-[13px] font-semibold text-slate-900">Visa refused?</span>
                <span className="block text-[12px] text-slate-600">Full refund</span>
              </span>
            </motion.div>
          </motion.figure>
        </div>

        {/* Products */}
        <div id="products" className="scroll-mt-28 pt-20 lg:pt-24">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <h2 className={`${SECTION_HEADING} text-slate-900`}>
              Four products. <span className="text-slate-500">One account.</span>
            </h2>
            <p className="text-[13px] text-slate-500">Prices in AUD, single cover</p>
          </div>
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 scroll-px-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
            {V2_PRODUCTS.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} onSelect={onSelectProduct} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
