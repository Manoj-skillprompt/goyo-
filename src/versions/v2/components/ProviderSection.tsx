import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/20/solid';
import { V2_PROVIDERS } from '../v2Data';

export const ProviderSection: React.FC = () => (
  <section id="providers" className="scroll-mt-16 border-t border-slate-900/[0.06] bg-white py-20 lg:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="font-secondary text-[13px] font-semibold text-[#13853F]">Providers</p>
          <h2 className="mt-2 text-[32px] font-semibold leading-[1.1] tracking-[-0.04em] text-slate-900 sm:text-[40px]">
            Every approved insurer, side by side.
          </h2>
          <p className="font-secondary mt-4 text-[16px] leading-relaxed text-slate-500">
            We work only with insurers signed to the Australian Government Deed for OSHC. You pay the same
            official price as buying direct, and see every option before you choose.
          </p>
        </div>
        <a
          href="#comparison"
          className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-slate-900"
        >
          See full benefit comparison
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
        </a>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {V2_PROVIDERS.map((provider, i) => (
          <motion.article
            key={provider.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="group flex flex-col rounded-[20px] bg-[#F7F7F4] p-5 ring-1 ring-transparent transition-[box-shadow,background-color] duration-300 hover:bg-white hover:ring-slate-900/[0.08] hover:shadow-[0_20px_40px_-24px_rgba(15,23,42,0.25)]"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex h-11 items-center">
                <img src={provider.logo} alt={provider.name} className={`${provider.logoClass} w-auto object-contain`} />
              </div>
              {provider.highlight && (
                <span className="font-secondary shrink-0 rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-900/[0.06]">
                  {provider.highlight}
                </span>
              )}
            </div>

            <div className="mt-5">
              <div className="font-secondary text-[12px] text-slate-400">{provider.covers} from</div>
              <div className="text-[26px] font-bold leading-tight tracking-tight text-slate-900">
                ${provider.monthlyFrom}
                <span className="text-[14px] font-medium text-slate-400">/mo</span>
              </div>
            </div>

            <ul className="font-secondary mt-4 mb-6 space-y-2">
              {provider.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-[13px] leading-snug text-slate-600">
                  <CheckIcon className="mt-px h-4 w-4 shrink-0 text-[#1FA855]" />
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href="#comparison"
              className="mt-auto inline-flex items-center justify-between rounded-full bg-white px-4 py-2.5 text-[13px] font-semibold text-slate-900 ring-1 ring-slate-900/[0.08] transition-colors group-hover:bg-slate-900 group-hover:text-white group-hover:ring-slate-900"
            >
              View {provider.name} plans
              <ArrowRightIcon className="h-3.5 w-3.5" strokeWidth={2.25} />
            </a>
          </motion.article>
        ))}
      </div>

      <div className="font-secondary mt-8 flex items-start gap-3 rounded-2xl bg-[#ECF8F0] px-5 py-4 text-[13.5px] text-[#0F5F30]">
        <ShieldCheckIcon className="h-5 w-5 shrink-0" />
        <p>
          Policies are issued directly by the insurer, with your certificate ready for ImmiAccount in seconds.
          goyo never adds a markup, and if your visa is refused you get a full refund.
        </p>
      </div>
    </div>
  </section>
);
