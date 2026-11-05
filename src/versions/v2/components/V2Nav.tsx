import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CaretDown, List, X } from '@phosphor-icons/react';
import { BrandMark } from './BrandMark';
import { V2_PRODUCTS, V2_VISAS } from '../v2Data';
import { partnersData } from '../../../data/portalData';

interface V2NavProps {
  onOpenLogin: () => void;
}

type MenuId = 'products' | 'providers' | 'visa';

const LINKS: { label: string; href: string; menu?: MenuId }[] = [
  { label: 'Products', href: '#products', menu: 'products' },
  { label: 'Providers', href: '#providers', menu: 'providers' },
  { label: 'Visa subclass', href: '#providers', menu: 'visa' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' }
];

const COVER_STYLE: Record<'OSHC' | 'OVHC', string> = {
  OSHC: 'bg-[#00B074]/10 text-[#047857]',
  OVHC: 'bg-[#1E40AF]/10 text-[#1E40AF]'
};

const ProductsMenu: React.FC<{ onPick: () => void }> = ({ onPick }) => (
  <div className="grid w-[520px] grid-cols-2 gap-1">
    {V2_PRODUCTS.map((p) => (
      <a
        key={p.id}
        href="#products"
        onClick={onPick}
        className="group/item flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-slate-50"
      >
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          style={{
            background: `linear-gradient(140deg, ${p.panelFrom}, ${p.panelTo})`,
            color: p.panelInk
          }}
        >
          {p.prefix === 'your' ? (
            <BrandMark className="h-3.5 w-auto" />
          ) : (
            <span className="h-3.5 w-3.5 rounded-full border-[2.5px] border-current" />
          )}
        </span>
        <span className="min-w-0">
          <span className="block text-[14px] font-semibold text-slate-900 transition-colors group-hover/item:text-[#00B074]">
            {p.prefix}
            {p.brand}
          </span>
          <span className="block truncate text-[12.5px] text-slate-500">{p.category}</span>
        </span>
      </a>
    ))}
  </div>
);

const ProvidersMenu: React.FC<{ onPick: () => void }> = ({ onPick }) => (
  <div className="grid w-[440px] grid-cols-2 gap-1">
    {partnersData.map((p) => (
      <a
        key={p.name}
        href="#providers"
        onClick={onPick}
        className="group/item flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-slate-50"
      >
        <span className="flex h-10 w-16 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white px-1.5">
          <img src={p.logo} alt="" className="max-h-6 w-auto max-w-full object-contain" />
        </span>
        <span className="min-w-0">
          <span className="block text-[14px] font-semibold text-slate-900 transition-colors group-hover/item:text-[#00B074]">
            {p.name}
          </span>
          <span className="block text-[12.5px] text-slate-500">{p.type}</span>
        </span>
      </a>
    ))}
  </div>
);

const VisaMenu: React.FC<{ onPick: () => void }> = ({ onPick }) => (
  <div className="w-[460px]">
    <div className="grid grid-cols-2 gap-1">
      {V2_VISAS.map((v) => (
        <a
          key={v.subclass}
          href="#providers"
          onClick={onPick}
          className="group/item flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-slate-50"
        >
          <span className="flex h-10 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[14px] font-bold tracking-tight text-slate-900">
            {v.subclass}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[14px] font-semibold text-slate-900 transition-colors group-hover/item:text-[#00B074]">
              {v.name}
            </span>
            <span className={`mt-0.5 inline-block rounded px-1.5 py-px text-[12px] font-semibold ${COVER_STYLE[v.cover]}`}>
              {v.cover}
            </span>
          </span>
        </a>
      ))}
    </div>
    <p className="mt-2 border-t border-slate-200 px-2.5 pt-3 text-[12.5px] text-slate-500">
      Not sure which cover you need? Students take OSHC; most other visas take OVHC.
    </p>
  </div>
);

const MENUS: Record<MenuId, React.FC<{ onPick: () => void }>> = {
  products: ProductsMenu,
  providers: ProvidersMenu,
  visa: VisaMenu
};

/* ---------- Mobile menu (below md): a panel under the pill with collapsible groups ---------- */

const MOBILE_GROUPS: Record<MenuId, { label: string; sub?: string; href: string }[]> = {
  products: V2_PRODUCTS.map((p) => ({ label: `${p.prefix}${p.brand}`, sub: p.category, href: '#products' })),
  providers: partnersData.map((p) => ({ label: p.name, sub: p.type, href: '#providers' })),
  visa: V2_VISAS.map((v) => ({ label: `${v.subclass} · ${v.name}`, sub: v.cover, href: '#providers' }))
};

const MobileMenu: React.FC<{ onClose: () => void; onOpenLogin: () => void }> = ({ onClose, onOpenLogin }) => {
  const [group, setGroup] = useState<MenuId | null>(null);

  return (
    <motion.div
      id="v2-mobile-menu"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-auto mx-auto mt-2 max-h-[calc(100vh-96px)] max-w-6xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-2 shadow-[0_24px_48px_-16px_rgba(15,23,42,0.25)] md:hidden"
    >
      <ul>
        {LINKS.map((link) => {
          const menu = link.menu;
          if (!menu) {
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={onClose}
                  className="block rounded-2xl px-4 py-3.5 text-[16px] font-medium text-slate-900 transition-colors hover:bg-slate-50 hover:text-[#00B074]"
                >
                  {link.label}
                </a>
              </li>
            );
          }
          const isOpen = group === menu;
          return (
            <li key={link.label}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setGroup(isOpen ? null : menu)}
                className={`flex w-full cursor-pointer items-center justify-between rounded-2xl px-4 py-3.5 text-[16px] font-medium transition-colors hover:bg-slate-50 ${
                  isOpen ? 'text-[#00B074]' : 'text-slate-900'
                }`}
              >
                {link.label}
                <CaretDown weight="bold" className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    {MOBILE_GROUPS[menu].map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          onClick={onClose}
                          className="flex items-center justify-between gap-3 rounded-xl py-2.5 pl-8 pr-4 text-[14px] text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#00B074]"
                        >
                          <span className="font-medium">{item.label}</span>
                          {item.sub && <span className="text-[12px] text-slate-500">{item.sub}</span>}
                        </a>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
      <div className="mt-1 border-t border-slate-200 p-2 pt-3">
        <button
          type="button"
          onClick={() => {
            onClose();
            onOpenLogin();
          }}
          className="w-full cursor-pointer rounded-xl border border-slate-200 py-3 text-[15px] font-semibold text-slate-900 transition-colors hover:border-[#00B074] hover:text-[#009662]"
        >
          Agent login
        </button>
      </div>
    </motion.div>
  );
};

export const V2Nav: React.FC<V2NavProps> = ({ onOpenLogin }) => {
  const [open, setOpen] = useState<MenuId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close the mobile menu with Escape, or when the viewport grows to the desktop layout.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileOpen(false);
    const onResize = () => window.innerWidth >= 768 && setMobileOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [mobileOpen]);

  return (
    // Floating pill: fixed over the page, frosted so content shows through without hurting legibility.
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="pointer-events-auto mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full bg-white/70 pl-5 pr-2 ring-1 ring-slate-200 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.18)] backdrop-blur-xl backdrop-saturate-150 sm:pl-6">
        <a href="#" className="flex items-center gap-2" aria-label="goyo home">
          <span className="h-2.5 w-2.5 rounded-full bg-[#00B074]" />
          <span className="text-[21px] font-bold tracking-[-0.04em] text-slate-900">goyo</span>
        </a>

        <nav className="hidden h-full items-center gap-1 text-[14px] font-medium text-slate-600 md:flex">
          {LINKS.map((link) => {
            if (!link.menu) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-full px-3 py-2 transition-colors hover:text-[#00B074]"
                >
                  {link.label}
                </a>
              );
            }

            const menu = link.menu;
            const isOpen = open === menu;
            const Menu = MENUS[menu];

            return (
              <div
                key={link.label}
                className="relative flex h-full items-center"
                onMouseEnter={() => setOpen(menu)}
                onMouseLeave={() => setOpen(null)}
                onFocus={() => setOpen(menu)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setOpen(null);
                }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={() => setOpen(isOpen ? null : menu)}
                  className={`flex items-center gap-1 rounded-full px-3 py-2 transition-colors cursor-pointer hover:text-[#00B074] ${
                    isOpen ? 'text-[#00B074]' : ''
                  }`}
                >
                  {link.label}
                  <CaretDown
                    weight="bold"
                    className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    // Sits flush under the nav and unfolds downward out of the link: a top-down
                    // clip reveal plus a slight drop, then the items fade in. The clip's negative
                    // side/bottom insets leave room for the shadow.
                    <motion.div
                      initial={{ clipPath: 'inset(0px -48px 100% -48px)', y: -6 }}
                      animate={{ clipPath: 'inset(0px -48px -72px -48px)', y: 0 }}
                      exit={{
                        clipPath: 'inset(0px -48px 100% -48px)',
                        y: -4,
                        transition: { duration: 0.16, ease: [0.4, 0, 1, 1] }
                      }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-1/2 top-full -translate-x-1/2"
                    >
                      {/* Square top, no top border: reads as an extension of the nav. */}
                      <div className="rounded-b-2xl rounded-t-none border border-t-0 border-slate-200 bg-white p-2 shadow-[0_24px_48px_-16px_rgba(15,23,42,0.25)]">
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.24, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <Menu onPick={() => setOpen(null)} />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenLogin}
            className="hidden rounded-full px-3.5 py-2 text-[14px] font-medium text-slate-600 transition-colors hover:text-[#00B074] sm:block cursor-pointer"
          >
            Agent login
          </button>
          <a
            href="#products"
            // Small primary button (see SKILLS.md → Button)
            className="inline-flex h-10 items-center justify-center rounded-lg border border-[#009662] bg-linear-to-b from-[#22C98D] to-[#00A86E] px-4 text-[14px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_1px_2px_rgba(15,23,42,0.12),0_4px_10px_-4px_rgba(0,150,98,0.45)] transition-[filter,transform] hover:brightness-[1.04] active:translate-y-px active:brightness-95"
          >
            Get a quote
          </a>
          {/* Menu button: phones and tablets only */}
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="v2-mobile-menu"
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
          >
            {mobileOpen ? <X weight="bold" className="h-5 w-5" /> : <List weight="bold" className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} onOpenLogin={onOpenLogin} />}
      </AnimatePresence>
    </header>
  );
};
