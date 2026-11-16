import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/20/solid';
import { ProductCard } from './ProductCard';
import { V1_PRODUCTS, type V1Product } from './v1Products';

// V1's full-screen product panels. The section is 400vh tall with a sticky viewport: as you scroll,
// each panel slides in from the right over the last one, which drifts left and dims a little.
// All four panels come from one list (v1Products), each in its own brand colour.

const COUNT = V1_PRODUCTS.length;
const SEGMENT = 1 / (COUNT - 1);

// Where panel i sits for scroll progress p (0 → 1 through the section).
const panelMotion = (i: number, p: number) => {
  let x = 0;
  let opacity = 1;
  if (i > 0) {
    const start = (i - 1) * SEGMENT;
    if (p <= start) x = 100;
    else if (p <= start + SEGMENT) x = (1 - (p - start) / SEGMENT) * 100;
  }
  if (i < COUNT - 1 && p > i * SEGMENT) {
    const t = Math.min(1, (p - i * SEGMENT) / SEGMENT);
    x = -16 * t;
    opacity = 1 - 0.25 * t;
  }
  return { transform: `translate3d(${x}%, 0, 0)`, opacity };
};

const Panel: React.FC<{ product: V1Product; index: number; progress: number }> = ({ product, index, progress }) => {
  const flip = index % 2 === 1;
  return (
    <div
      id={`product-panel-${index + 1}`}
      className={`product-panel-h ${index > 0 ? 'rounded-l-[28px] shadow-[-30px_0_80px_rgba(0,0,0,0.45)] sm:rounded-l-[44px]' : ''}`}
      style={{ backgroundColor: product.panel, zIndex: (index + 1) * 10, ...panelMotion(index, progress) }}
    >
      <div className="flex h-full w-full items-center justify-center overflow-y-auto px-6 py-14 sm:px-10 sm:py-16 lg:overflow-visible lg:px-14 lg:py-20">
        <div className="mx-auto w-full max-w-7xl pt-28 sm:pt-28 lg:pt-12">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Copy */}
            <div className={`flex flex-col ${flip ? 'lg:order-2' : ''}`}>
              <span className="self-start rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                {product.tag}
              </span>
              <h2 className="mt-5 text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] text-white sm:text-4xl lg:text-[46px]">
                {product.title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed sm:text-lg" style={{ color: product.soft }}>
                {product.text}
              </p>
              <ul className="m-0 mt-6 flex list-none flex-col gap-2.5 p-0">
                {product.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-white sm:text-[15px]">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: product.accent, color: product.accentInk }}
                    >
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <div>
                  <span className="block text-xs font-medium" style={{ color: product.soft }}>
                    {product.priceLabel}
                  </span>
                  <span className="text-2xl font-bold text-white">
                    {product.price}
                    {product.priceSuffix && (
                      <span className="ml-1 text-sm font-normal" style={{ color: product.soft }}>
                        {product.priceSuffix}
                      </span>
                    )}
                  </span>
                </div>
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2.5 rounded-2xl px-7 py-3.5 text-[15px] font-bold no-underline transition-[filter,transform] hover:brightness-110 active:translate-y-px"
                  style={{ backgroundColor: product.accent, color: product.accentInk }}
                >
                  {product.cta}
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                </a>
              </div>
            </div>

            {/* Photo with the member card straddling its lower corner. Desktop only: on a phone the
                panel's copy already fills the screen. */}
            <div className={`relative mx-auto hidden w-full max-w-[560px] pb-10 lg:block ${flip ? 'lg:order-1' : ''}`}>
              <div className="overflow-hidden rounded-[28px] sm:rounded-[32px]">
                <img
                  src={product.photo}
                  alt={product.photoAlt}
                  className="aspect-[4/3] w-full object-cover"
                  style={{ objectPosition: product.photoPosition }}
                />
              </div>
              <div
                className={`absolute bottom-0 w-[58%] max-w-[300px] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.55)] ${
                  flip ? '-right-3 sm:-right-6' : '-left-3 sm:-left-6'
                } rounded-[22px]`}
              >
                <ProductCard product={product} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const vh = window.innerHeight || 800;
      const rect = section.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height - vh)));
      setProgress(p);
      setActiveIndex(p > 0.82 ? 3 : p > 0.49 ? 2 : p > 0.16 ? 1 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToPanel = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const vh = window.innerHeight || 800;
    window.scrollTo({ top: window.scrollY + section.getBoundingClientRect().top + index * vh, behavior: 'smooth' });
  };

  const active = V1_PRODUCTS[activeIndex];

  return (
    <section ref={sectionRef} id="products" aria-label="Products" className="relative z-20 bg-slate-950" style={{ height: `${COUNT * 100}vh` }}>
      <div id="product-scroll-viewport" className="sticky top-0 h-screen w-full select-none overflow-hidden">
        {/* Controls */}
        {/* Controls sit below the fixed site nav (about 72px tall) */}
        <div className="pointer-events-none absolute inset-x-0 top-[88px] z-50 mx-auto flex max-w-7xl items-center justify-between px-6 sm:top-24 sm:px-10">
          <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full transition-colors duration-300" style={{ backgroundColor: active.accent }} />
            {activeIndex + 1} of {COUNT}
          </div>

          <div className="pointer-events-auto hidden items-center gap-1 rounded-full border border-white/15 bg-black/35 p-1 backdrop-blur-md sm:flex">
            {V1_PRODUCTS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => scrollToPanel(i)}
                aria-current={activeIndex === i ? 'true' : undefined}
                className={`cursor-pointer rounded-full px-3.5 py-1 text-xs font-semibold transition-colors ${
                  activeIndex === i ? 'bg-white text-slate-950' : 'text-white/75 hover:text-white'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            {[
              { label: 'Previous product', Icon: ChevronLeftIcon, to: Math.max(0, activeIndex - 1) },
              { label: 'Next product', Icon: ChevronRightIcon, to: Math.min(COUNT - 1, activeIndex + 1) }
            ].map(({ label, Icon, to }) => (
              <button
                key={label}
                type="button"
                onClick={() => scrollToPanel(to)}
                aria-label={label}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition-colors hover:bg-black/60"
              >
                <Icon className="h-4 w-4 stroke-2" />
              </button>
            ))}
          </div>
        </div>

        {V1_PRODUCTS.map((product, i) => (
          <Panel key={product.id} product={product} index={i} progress={progress} />
        ))}

        {/* Progress through the four products */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 z-50 h-1 bg-white/80"
          style={{ width: `${((1 + progress * (COUNT - 1)) / COUNT) * 100}%` }}
        />
      </div>
    </section>
  );
};
