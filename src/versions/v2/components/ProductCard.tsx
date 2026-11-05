import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from '@phosphor-icons/react';
import { V2Product } from '../v2Data';
import { BrandMark } from './BrandMark';

// OrbitProtect is a separate brand, so it gets its own ring-and-dot mark instead of the swoosh.
const OrbitDot: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="15.5" cy="4.5" r="3" fill="#3FA52A" />
  </svg>
);

const OrbitRings: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
    {[40, 66, 92].map((r) => (
      <circle key={r} cx="100" cy="100" r={r} stroke="currentColor" strokeWidth="10" />
    ))}
  </svg>
);

interface ProductCardProps {
  product: V2Product;
  index: number;
  onSelect: (product: V2Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index, onSelect }) => {
  const isYourBrand = product.prefix === 'your';

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex w-[84%] shrink-0 snap-start flex-col sm:w-auto rounded-[26px] bg-white p-2.5 ring-1 ring-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
    >
      {/* Member card */}
      <div
        className="relative h-[168px] w-full overflow-hidden rounded-[18px] p-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        style={{
          background: `linear-gradient(140deg, ${product.panelFrom} 0%, ${product.panelTo} 100%)`,
          color: product.panelInk,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)'
        }}
      >
        {/* Watermark: brand swoosh for the "your" family, orbit rings for OrbitProtect */}
        {isYourBrand ? (
          <BrandMark
            className="absolute -right-[4%] top-[70%] h-auto w-[44%] -translate-y-1/2 opacity-[0.14] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1.5"
          />
        ) : (
          <OrbitRings className="absolute -right-[3%] top-[70%] w-[34%] -translate-y-1/2 opacity-[0.14] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-12" />
        )}

        <div className="relative flex h-full flex-col justify-between">
          {product.logo ? (
            <img
              src={product.logo}
              alt={`${product.prefix}${product.brand}`}
              className={`${product.logoClass ?? 'h-6'} w-auto max-w-[85%] self-start object-contain object-left`}
            />
          ) : (
            <span className="flex items-center gap-2 text-[17px] leading-none tracking-tight">
              {isYourBrand ? (
                <BrandMark className="h-5 w-auto shrink-0" />
              ) : (
                <OrbitDot className="h-5 w-5 shrink-0" />
              )}
              <span>
                <span className="font-normal opacity-90">{product.prefix}</span>
                <span className="font-bold">{product.brand}</span>
              </span>
            </span>
          )}

          <div>
            <div className="text-[12px] font-medium uppercase tracking-[0.1em] opacity-70">Cover for</div>
            <div className="font-secondary text-[12.5px] font-semibold tracking-wide">{product.audience}</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-3 pb-2 pt-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[12px] font-semibold" style={{ color: product.colorDeep }}>
            {product.category}
          </span>
          {product.tag && (
            <span
              className="font-secondary rounded-full px-2 py-0.5 text-[12px] font-semibold"
              style={{ backgroundColor: product.tint, color: product.colorDeep }}
            >
              {product.tag}
            </span>
          )}
        </div>
        <h3 className="mt-1 text-[18px] font-semibold leading-snug tracking-[-0.01em] text-slate-900">
          {product.title}
        </h3>
        <p className="font-secondary mt-1.5 text-[13px] leading-relaxed text-slate-600">
          {product.description}
        </p>

        <ul className="font-secondary mt-3 mb-5 space-y-1.5">
          {product.perks.map((perk) => (
            <li key={perk} className="flex items-center gap-2 text-[12.5px] text-slate-600">
              <CheckCircle weight="duotone" className="h-[18px] w-[18px] shrink-0" style={{ color: product.colorDeep }} />
              {perk}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between border-t border-slate-200 pt-4">
          <div>
            <div className="font-secondary text-[12px] text-slate-500">{product.priceLabel}</div>
            <div className="text-[22px] font-bold leading-none tracking-tight text-slate-900">
              {product.priceValue}
              {product.priceSuffix && (
                <span className="text-[13px] font-medium text-slate-500">{product.priceSuffix}</span>
              )}
            </div>
          </div>

          {/* Small brand button (see SKILLS.md → Button → Brand variant) */}
          <button
            type="button"
            onClick={() => onSelect(product)}
            className="inline-flex h-10 items-center justify-center rounded-lg border px-4 text-[13px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_1px_2px_rgba(15,23,42,0.12)] transition-[filter,transform] hover:brightness-[1.06] active:translate-y-px active:brightness-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              background: `linear-gradient(to bottom, rgba(255,255,255,0.16), rgba(255,255,255,0)), ${product.colorDeep}`,
              borderColor: `color-mix(in srgb, ${product.colorDeep} 80%, black)`,
              outlineColor: product.color
            }}
          >
            {product.cta}
          </button>
        </div>
      </div>
    </motion.article>
  );
};
