import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, Info } from '@phosphor-icons/react';
import { V2_PROVIDERS, V2_VISAS } from '../v2Data';
import { SECTION_HEADING } from '../styles';

type Tier = 'single' | 'couple' | 'family';

// Estimate multipliers (carried over from the original V2 quoter). Placeholder pricing:
// replace with real rates per insurer before launch.
const TIER_MULTIPLIER: Record<Tier, number> = { single: 1, couple: 2.65, family: 4.3 };
const OVHC_MULTIPLIER = 1.45;

const QUOTE_EVENT = 'v2:open-quote';

/** Scroll to the quote section, optionally pre-selecting a visa subclass. */
export const openQuote = (preset?: { subclass?: string }) => {
  window.dispatchEvent(new CustomEvent(QUOTE_EVENT, { detail: preset ?? {} }));
  document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const toInput = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

const monthsBetween = (start: string, end: string) => {
  const a = new Date(start);
  const b = new Date(end);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime()) || b <= a) return 0;
  return Math.max(1, Math.ceil((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24 * 30.44)));
};

const Segmented = <T extends string>({
  value,
  options,
  onChange,
  label
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  label: string;
}) => (
  <div role="radiogroup" aria-label={label} className="grid gap-1 rounded-xl bg-slate-100 p-1" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
    {options.map((o) => {
      const active = o.value === value;
      return (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={active}
          onClick={() => onChange(o.value)}
          className={`cursor-pointer rounded-lg py-2 text-[14px] font-medium transition-all ${
            active ? 'bg-white text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.12)]' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          {o.label}
        </button>
      );
    })}
  </div>
);

const FieldLabel: React.FC<{ htmlFor?: string; children: React.ReactNode }> = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="mb-2 block text-[13px] font-semibold text-slate-700">
    {children}
  </label>
);

export const QuickQuote: React.FC = () => {
  const today = new Date();
  const [subclass, setSubclass] = useState('500');
  const [tier, setTier] = useState<Tier>('single');
  const [start, setStart] = useState(toInput(addDays(today, 30)));
  const [end, setEnd] = useState(toInput(addDays(today, 30 + 365)));
  const [selected, setSelected] = useState<string | null>(null);

  // Other parts of the page (nav visa menu, product cards) can open the quote pre-filled.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const sc = (e as CustomEvent<{ subclass?: string }>).detail?.subclass;
      if (sc && V2_VISAS.some((v) => v.subclass === sc)) setSubclass(sc);
    };
    window.addEventListener(QUOTE_EVENT, onOpen);
    return () => window.removeEventListener(QUOTE_EVENT, onOpen);
  }, []);

  const visa = V2_VISAS.find((v) => v.subclass === subclass)!;
  const months = monthsBetween(start, end);

  const quotes = useMemo(() => {
    const factor = TIER_MULTIPLIER[tier] * (visa.cover === 'OVHC' ? OVHC_MULTIPLIER : 1);
    return V2_PROVIDERS.filter((p) => p.covers.includes(visa.cover))
      .map((p) => ({ ...p, monthly: Math.round(p.monthlyFrom * factor), total: Math.round(p.monthlyFrom * factor * months) }))
      .sort((a, b) => a.total - b.total);
  }, [tier, visa.cover, months]);

  const chosen = quotes.find((q) => q.name === selected) ?? quotes[0];

  const mailto = useMemo(() => {
    if (!chosen || months === 0) return undefined;
    const body = [
      'Hi, I would like this quote:',
      '',
      `Visa: Subclass ${visa.subclass} (${visa.name})`,
      `Cover: ${visa.cover}, ${tier}`,
      `Dates: ${start} to ${end} (${months} months)`,
      `Insurer: ${chosen.name}`,
      `Estimate: $${chosen.total.toLocaleString()} AUD`
    ].join('\n');
    return `mailto:support@youroshc.com.au?subject=${encodeURIComponent(`${visa.cover} quote request`)}&body=${encodeURIComponent(body)}`;
  }, [chosen, months, visa, tier, start, end]);

  return (
    <section id="quote" className="scroll-mt-24 border-t border-slate-200 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <h2 className={`${SECTION_HEADING} text-slate-900`}>Get a quote in seconds</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
            Pick your visa, who you’re covering and your dates. We’ll show estimated prices from every approved insurer.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Form */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6 lg:col-span-5">
            <FieldLabel>Your visa subclass</FieldLabel>
            <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Visa subclass">
              {V2_VISAS.map((v) => {
                const active = v.subclass === subclass;
                return (
                  <button
                    key={v.subclass}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setSubclass(v.subclass)}
                    className={`cursor-pointer rounded-xl border px-2 py-2.5 text-left transition-colors ${
                      active ? 'border-[#00B074] bg-white ring-1 ring-[#00B074]' : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <span className="block text-[15px] font-bold text-slate-900">{v.subclass}</span>
                    <span className="block truncate text-[11.5px] text-slate-500">{v.name}</span>
                  </button>
                );
              })}
            </div>
            <p className="mt-2.5 flex items-center gap-1.5 text-[12.5px] text-slate-500">
              <Info weight="duotone" className="h-4 w-4 text-[#1E40AF]" />
              Subclass {visa.subclass} needs <span className="font-semibold text-slate-700">{visa.cover}</span>
            </p>

            <div className="mt-6">
              <FieldLabel>Who are you covering?</FieldLabel>
              <Segmented
                label="Cover type"
                value={tier}
                onChange={setTier}
                options={[
                  { value: 'single', label: 'Just me' },
                  { value: 'couple', label: 'Couple' },
                  { value: 'family', label: 'Family' }
                ]}
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <FieldLabel htmlFor="quote-start">Cover starts</FieldLabel>
                <input
                  id="quote-start"
                  type="date"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-[14px] text-slate-900 outline-none transition-colors focus:border-[#00B074] focus:ring-2 focus:ring-[#00B074]/20"
                />
              </div>
              <div>
                <FieldLabel htmlFor="quote-end">Cover ends</FieldLabel>
                <input
                  id="quote-end"
                  type="date"
                  value={end}
                  min={start}
                  onChange={(e) => setEnd(e.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-[14px] text-slate-900 outline-none transition-colors focus:border-[#00B074] focus:ring-2 focus:ring-[#00B074]/20"
                />
              </div>
            </div>
            <p className="mt-2.5 text-[12.5px] text-slate-500">
              {months > 0 ? `${months} month${months === 1 ? '' : 's'} of cover` : 'Choose an end date after the start date.'}
            </p>
          </div>

          {/* Results */}
          <div className="lg:col-span-7">
            <div className="mb-3 flex items-baseline justify-between px-1">
              <span className="text-[13px] font-semibold text-slate-700">
                {quotes.length} insurers offer {visa.cover}
              </span>
              <span className="text-[12px] text-slate-400">Estimated total, AUD</span>
            </div>

            <ul className="space-y-2.5">
              <AnimatePresence initial={false}>
                {quotes.map((q, i) => {
                  const active = chosen?.name === q.name;
                  return (
                    <motion.li key={q.name} layout transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
                      <button
                        type="button"
                        onClick={() => setSelected(q.name)}
                        aria-pressed={active}
                        className={`flex w-full cursor-pointer items-center gap-4 rounded-2xl border bg-white p-3.5 text-left transition-colors sm:p-4 ${
                          active ? 'border-[#00B074] ring-1 ring-[#00B074]' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="flex h-11 w-20 shrink-0 items-center justify-center rounded-lg border border-slate-200 px-2">
                          <img src={q.logo} alt="" className="max-h-7 w-auto max-w-full object-contain" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="text-[15px] font-semibold text-slate-900">{q.name}</span>
                            {i === 0 && (
                              <span className="rounded-full bg-[#00B074]/10 px-2 py-0.5 text-[11px] font-semibold text-[#009662]">
                                Lowest estimate
                              </span>
                            )}
                          </span>
                          <span className="mt-0.5 block truncate text-[12.5px] text-slate-500">{q.features[0]}</span>
                        </span>
                        <span className="text-right">
                          <span className="block text-[19px] font-bold tracking-tight text-slate-900">
                            {months > 0 ? `$${q.total.toLocaleString()}` : '—'}
                          </span>
                          <span className="block text-[12px] text-slate-500">${q.monthly}/mo</span>
                        </span>
                        {active ? (
                          <CheckCircle weight="fill" className="hidden h-6 w-6 shrink-0 text-[#00B074] sm:block" />
                        ) : (
                          <span className="hidden h-6 w-6 shrink-0 rounded-full border-2 border-slate-200 sm:block" />
                        )}
                      </button>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[12px] text-slate-500">
                Estimates only. Your final price is confirmed by the insurer before you pay.
              </p>
              <a
                href={mailto}
                aria-disabled={!mailto}
                // Primary button (see SKILLS.md → Button)
                className={`inline-flex h-12 shrink-0 items-center justify-center rounded-xl border border-[#009662] bg-linear-to-b from-[#22C98D] to-[#00A86E] px-6 text-[15px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_1px_2px_rgba(15,23,42,0.12),0_4px_10px_-4px_rgba(0,150,98,0.45)] transition-[filter,transform] hover:brightness-[1.04] active:translate-y-px active:brightness-95 ${
                  mailto ? '' : 'pointer-events-none opacity-50'
                }`}
              >
                Request {chosen ? `${chosen.name} ` : ''}quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
