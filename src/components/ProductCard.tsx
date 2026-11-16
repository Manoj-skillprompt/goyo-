import React from 'react';
import { BrandMark } from '../versions/v2/components/BrandMark';
import type { V1Product } from './v1Products';

// A product's member card, drawn in code (it replaces the blurred product-card-*.png images):
// a deep brand gradient (the logos are white plus a coloured half, which needs a dark ground),
// the logo top-left, who it's for bottom-left, and the brand swoosh top-right, clear of both.
// A hairline edge keeps it apart from a panel of the same hue. Proportions of a payment card.
export const ProductCard: React.FC<{ product: V1Product; className?: string }> = ({ product, className = '' }) => (
  <div
    className={`relative aspect-[1.586/1] w-full overflow-hidden rounded-[22px] text-white ring-1 ring-inset ring-white/15 ${className}`}
    style={{ background: `linear-gradient(135deg, ${product.cardFrom} 0%, ${product.cardTo} 100%)` }}
  >
    {product.id === 'orbit' ? (
      <span
        aria-hidden="true"
        className="absolute -right-[12%] -top-[22%] aspect-square w-[50%] rounded-full border-[26px] opacity-40"
        style={{ borderColor: product.accent }}
      />
    ) : (
      <BrandMark fill={product.accent} className="absolute -right-[10%] -top-[8%] h-auto w-[56%] opacity-40" />
    )}

    <div className="relative flex h-full flex-col justify-between p-[7%]">
      {product.logo ? (
        <img src={product.logo} alt={product.name} className="h-auto w-[44%] max-w-[200px] object-contain object-left" />
      ) : (
        <span className="flex items-center gap-[0.4em] text-[clamp(20px,4.2vw,30px)] leading-none tracking-[-0.02em]">
          <span aria-hidden="true" className="h-[0.8em] w-[0.8em] rounded-full border-[0.17em]" style={{ borderColor: product.accent }} />
          <span>
            Orbit<span className="font-extrabold">Protect</span>
          </span>
        </span>
      )}
      <span className="text-[clamp(12px,1.6vw,15px)] font-semibold tracking-[0.01em] text-white/90">{product.tag}</span>
    </div>
  </div>
);
