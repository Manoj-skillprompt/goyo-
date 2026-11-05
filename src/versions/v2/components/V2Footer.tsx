import React from 'react';
import {
  DeviceMobile,
  EnvelopeSimple,
  FacebookLogo,
  Handshake,
  InstagramLogo,
  LinkedinLogo,
  MapPin,
  Phone
} from '@phosphor-icons/react';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { BrandMark } from './BrandMark';
import { PARTNER_APPLY_HREF, V2_PRODUCTS } from '../v2Data';

const QUICK_LINKS = [
  { label: 'Products', href: '#products' },
  { label: 'Insurance providers', href: '#providers' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Why choose Goyo', href: '#why-goyo' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' }
];

const CONTACT: { Icon: PhosphorIcon; label: string; value: string; href?: string }[] = [
  { Icon: MapPin, label: 'Address', value: 'Suite 109, Level 1, 83 York Street, Sydney NSW 2000' },
  { Icon: DeviceMobile, label: 'Mobile', value: '+61 478 81 82 83', href: 'tel:+61478818283' },
  { Icon: Phone, label: 'Phone', value: '+61 2 7500 5800', href: 'tel:+61275005800' },
  { Icon: EnvelopeSimple, label: 'Email', value: 'support@youroshc.com.au', href: 'mailto:support@youroshc.com.au' }
];

// Same networks as the V1 footer. Placeholder URLs: replace with the real profile links.
const SOCIAL: { Icon: PhosphorIcon; label: string; href: string }[] = [
  { Icon: LinkedinLogo, label: 'LinkedIn', href: 'https://www.linkedin.com' },
  { Icon: FacebookLogo, label: 'Facebook', href: 'https://www.facebook.com' },
  { Icon: InstagramLogo, label: 'Instagram', href: 'https://www.instagram.com' }
];


const ColumnTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white">{children}</h3>
);

export const V2Footer: React.FC = () => (
  // Dark navy like the "Our impact" panel, with emerald accents and a faint brand swoosh.
  <footer className="relative overflow-hidden bg-[#0F172A] text-slate-300">
    <BrandMark
      fill="#00B074"
      // Whole mark inside the footer (no cropping): right-aligned, vertically centred.
      className="pointer-events-none absolute right-4 top-1/2 h-auto w-[70%] max-w-[440px] -translate-y-1/2 opacity-[0.07] sm:right-10"
    />

    <div className="relative mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
      {/* Phones: brand and contact span the width; products and quick links sit side by side. */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-12 lg:gap-10">
        {/* Brand + partner actions */}
        <div className="col-span-2 lg:col-span-4">
          <a href="#" className="flex items-center gap-2" aria-label="goyo home">
            <span className="h-2.5 w-2.5 rounded-full bg-[#00B074]" />
            <span className="text-[24px] font-bold tracking-[-0.04em] text-white">goyo</span>
          </a>
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-slate-400">
            Health cover, university admissions and travel insurance for your journey to Australia and New Zealand.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {/* Small primary button (SKILLS.md → Button) */}
            <a
              href={PARTNER_APPLY_HREF}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#009662] bg-linear-to-b from-[#22C98D] to-[#00A86E] px-4 text-[14px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_1px_2px_rgba(15,23,42,0.12),0_4px_10px_-4px_rgba(0,150,98,0.45)] transition-[filter,transform] hover:brightness-[1.04] active:translate-y-px active:brightness-95"
            >
              <Handshake weight="duotone" className="h-5 w-5" />
              Become our partner
            </a>
          </div>

          {/* Social links */}
          <ul className="mt-7 flex items-center gap-2.5" aria-label="Follow us">
            {SOCIAL.map(({ Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-300 ring-1 ring-white/10 transition-[background-color,color,box-shadow,transform] duration-200 hover:scale-115 hover:bg-[#00B074] hover:text-white hover:ring-[#00B074] motion-reduce:hover:scale-100"
                >
                  <Icon weight="fill" className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div className="lg:col-span-2">
          <ColumnTitle>Products</ColumnTitle>
          <ul className="mt-5 space-y-3">
            {V2_PRODUCTS.map((p) => (
              <li key={p.id}>
                <a href="#products" className="text-[14px] transition-colors hover:text-[#00B074]">
                  <span>
                    {p.prefix}
                    <span className="font-semibold">{p.brand}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <div className="lg:col-span-2">
          <ColumnTitle>Quick links</ColumnTitle>
          <ul className="mt-5 space-y-3">
            {QUICK_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-[14px] transition-colors hover:text-[#00B074]">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        {/* id="contact" is the target of the FAQ's "Contact Support" link */}
        <div id="contact" className="col-span-2 scroll-mt-24 lg:col-span-4">
          <ColumnTitle>Contact us</ColumnTitle>
          <ul className="mt-5 space-y-4">
            {CONTACT.map(({ Icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#00B074] ring-1 ring-white/10">
                  <Icon weight="duotone" className="h-5 w-5" />
                </span>
                <span className="pt-0.5">
                  <span className="block text-[12px] uppercase tracking-[0.1em] text-slate-400">{label}</span>
                  {href ? (
                    <a href={href} className="text-[14px] text-slate-200 transition-colors hover:text-[#00B074]">
                      {value}
                    </a>
                  ) : (
                    <span className="text-[14px] text-slate-200">{value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-14 flex flex-col gap-2 border-t border-white/10 py-6 text-[12px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} yourOSHC is a registered trademark</p>
        <p>ABN: 86 663 711 733</p>
      </div>
    </div>
  </footer>
);
