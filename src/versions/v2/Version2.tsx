import React, { useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import {
  CheckCircleIcon,
  ArrowRightIcon,
  BuildingOffice2Icon,
  DocumentCheckIcon,
  ChevronDownIcon,
  StarIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/20/solid';
import { AgentModal } from '../../components/AgentModal';
import { VersionProps } from '../types';
import { V2Nav } from './components/V2Nav';
import { V2Hero } from './components/V2Hero';
// import { ProviderSection } from './components/ProviderSection';
import { PartnersMetrics } from './components/PartnersMetrics';
import { HowItWorks } from './components/HowItWorks';
import { ImpactPanel } from './components/ImpactPanel';
import { WhyChooseGoyo } from './components/WhyChooseGoyo';
import { V2Footer } from './components/V2Footer';
import { FAQSection } from './components/FAQSection';
import { Testimonials } from './components/Testimonials';
import { SECTION_HEADING } from './styles';
import { V2Product } from './v2Data';

export const Version2: React.FC<VersionProps> = ({ onOpenLogin }) => {
  const [internalLoginOpen, setInternalLoginOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleOpenLogin = () => {
    if (onOpenLogin) {
      onOpenLogin();
    } else {
      setInternalLoginOpen(true);
    }
  };

  // Health cover products jump to the providers; the rest to "How it works".
  const handleSelectProduct = (product: V2Product) => {
    const target = product.id === 'oshc' || product.id === 'ovhc' ? 'providers' : 'how-it-works';
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="bg-slate-50 text-slate-900 font-secondary min-h-screen selection:bg-slate-900 selection:text-white">
      {/* 1. Light navigation */}
      <V2Nav onOpenLogin={handleOpenLogin} />

      {/* 2. Hero: positioning, reviews, trust and the four products */}
      <V2Hero onSelectProduct={handleSelectProduct} />

      {/* 3. Approved insurance providers: V2 copy of the V1 section (V2's earlier version kept below for reference) */}
      <div id="providers" className="scroll-mt-24 text-slate-900">
        <PartnersMetrics />
      </div>
      {/* <ProviderSection /> */}

      {/* How it works: four-step purchase flow with live screenshots */}
      <HowItWorks />

      {/* Why choose Goyo: scrolling reasons with sticky stacking cards */}
      <WhyChooseGoyo />

      {/* Hidden: 4. Features bento and 5. insurer comparison table. Kept in the code (not rendered);
          change `false` to `true` to bring them back. */}
      {false && (
      <>
      {/* 4. Bento Grid Platform Showcase */}
      <section id="bento" className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-blue-400 text-xs font-bold tracking-widest uppercase">
              Engineered for International Visa Lodgement
            </span>
            <h2 className={`${SECTION_HEADING} text-white mt-2`}>
              A Unified Ecosystem for Australian Study &amp; Living
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-3">
              Zero manual paperwork, guaranteed DHA visa condition 8501 compliance, and full partner support.
            </p>
          </div>

          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1: Stamped COI (2 cols wide) */}
            <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-800 rounded-3xl p-8 relative overflow-hidden">
              <div className="relative z-10 max-w-md">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Instant Verification
                </span>
                <h3 className="text-2xl font-bold text-white mt-4">
                  Official Stamped Certificate of Insurance (COI)
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  Generated in under 3 seconds upon checkout. Direct ImmiAccount recognition with unique policy endorsement barcode.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 text-xs text-slate-300 border border-slate-700">
                    <DocumentCheckIcon className="w-4 h-4 text-emerald-400" />
                    <span>Policy #OSH-948210-AU</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 text-xs text-slate-300 border border-slate-700">
                    <CheckCircleIcon className="w-4 h-4 text-blue-400" />
                    <span>DHA Subclass 500 Ready</span>
                  </div>
                </div>
              </div>

              {/* Decorative Mockup Floating Right */}
              <div className="hidden lg:block absolute right-6 top-8 w-64 bg-slate-950/90 rounded-2xl border border-slate-700 p-4 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[11px] text-slate-400">
                  <span>AUSTRALIAN DHA</span>
                  <span className="text-emerald-400 font-bold">VERIFIED</span>
                </div>
                <div className="py-3 space-y-1.5 text-xs">
                  <div className="text-slate-400 text-[10px]">POLICY HOLDER</div>
                  <div className="font-semibold text-white">Aditya Sharma (500)</div>
                  <div className="text-slate-400 text-[10px] pt-1">INSURER / DEED</div>
                  <div className="font-semibold text-white">Allianz Care Australia</div>
                </div>
                <div className="pt-2 border-t border-slate-800 text-center">
                  <span className="text-[10px] text-blue-400 font-mono">CODE: IMMI-8501-PASS</span>
                </div>
              </div>
            </div>

            {/* Bento Card 2: 100% Refund Guarantee */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-800 rounded-3xl p-8 relative">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-5">
                <CurrencyDollarIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">
                100% Visa Refusal Money-Back Guarantee
              </h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                If the Department of Home Affairs refuses your Australian visa, receive a full 100% refund with zero cancellation penalties.
              </p>
              <div className="mt-5 text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <span>Backed by Australian Law</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Bento Card 3: Direct Billing Clinics */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-800 rounded-3xl p-8 relative">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 mb-5">
                <BuildingOffice2Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">
                2,400+ Direct-Billing Clinics Nationwide
              </h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Visit doctors without paying upfront fees. Doctors bill the insurer directly across Sydney, Melbourne, Brisbane &amp; regional hubs.
              </p>
              <div className="mt-5 text-xs text-blue-400 font-semibold flex items-center gap-1">
                <span>Find Near You</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Bento Card 4: University Admissions Free (2 cols wide) */}
            <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-800 rounded-3xl p-8 relative">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                yourADMISSION Hub
              </span>
              <h3 className="text-2xl font-bold text-white mt-4">
                Free University &amp; TAFE Admissions Advisory
              </h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed max-w-xl">
                Certified Qualified Education Agent Counselors (QEAC) guide your course application, university offer acceptance, and Confirmation of Enrolment (CoE) at zero charge.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={handleOpenLogin}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors cursor-pointer"
                >
                  Book Free Counseling
                </button>
                <span className="text-xs text-slate-400">Over 500+ institutional partners</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Side-by-Side Insurer Comparison Matrix */}
      <section id="comparison" className="py-20 bg-slate-900/70 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-blue-400 text-xs font-bold tracking-widest uppercase">
              Feature Matrix
            </span>
            <h2 className={`${SECTION_HEADING} text-white mt-2`}>
              Side-by-Side Insurer Comparison
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              All listed insurers comply with Department of Home Affairs deed standards.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 shadow-xl bg-slate-950">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900 text-xs uppercase font-semibold text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Benefit / Coverage</th>
                  <th className="px-6 py-4 text-center">Allianz Care</th>
                  <th className="px-6 py-4 text-center">Bupa</th>
                  <th className="px-6 py-4 text-center">Medibank</th>
                  <th className="px-6 py-4 text-center">nib</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                <tr>
                  <td className="px-6 py-4 font-medium text-white">General Practitioner (GP) MBS Cover</td>
                  <td className="px-6 py-4 text-center text-emerald-400">100% MBS</td>
                  <td className="px-6 py-4 text-center text-emerald-400">100% MBS</td>
                  <td className="px-6 py-4 text-center text-emerald-400">100% MBS</td>
                  <td className="px-6 py-4 text-center text-emerald-400">100% MBS</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-white">Public Hospital Shared Room</td>
                  <td className="px-6 py-4 text-center text-emerald-400"><CheckIcon className="w-5 h-5 mx-auto text-emerald-400" /></td>
                  <td className="px-6 py-4 text-center text-emerald-400"><CheckIcon className="w-5 h-5 mx-auto text-emerald-400" /></td>
                  <td className="px-6 py-4 text-center text-emerald-400"><CheckIcon className="w-5 h-5 mx-auto text-emerald-400" /></td>
                  <td className="px-6 py-4 text-center text-emerald-400"><CheckIcon className="w-5 h-5 mx-auto text-emerald-400" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-white">Emergency Ambulance Transport</td>
                  <td className="px-6 py-4 text-center text-emerald-400">100% Covered</td>
                  <td className="px-6 py-4 text-center text-emerald-400">100% Covered</td>
                  <td className="px-6 py-4 text-center text-emerald-400">100% Covered</td>
                  <td className="px-6 py-4 text-center text-emerald-400">100% Covered</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-white">Prescription Medicine (PBS)</td>
                  <td className="px-6 py-4 text-center">$50 / item (up to $300)</td>
                  <td className="px-6 py-4 text-center">$50 / item (up to $300)</td>
                  <td className="px-6 py-4 text-center">$50 / item (up to $300)</td>
                  <td className="px-6 py-4 text-center">$50 / item (up to $300)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-white">Pre-existing Condition Waiting Period</td>
                  <td className="px-6 py-4 text-center">12 Months</td>
                  <td className="px-6 py-4 text-center">12 Months</td>
                  <td className="px-6 py-4 text-center">12 Months</td>
                  <td className="px-6 py-4 text-center">12 Months</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-white">Instant Stamped Digital Certificate</td>
                  <td className="px-6 py-4 text-center font-bold text-white">&lt; 3 Seconds</td>
                  <td className="px-6 py-4 text-center font-bold text-white">&lt; 3 Seconds</td>
                  <td className="px-6 py-4 text-center font-bold text-white">&lt; 3 Seconds</td>
                  <td className="px-6 py-4 text-center font-bold text-white">&lt; 3 Seconds</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      </>
      )}

      {/* Our impact: stats panel, placed with the reviews so numbers and voices read as one proof block */}
      <ImpactPanel />

      {/* 6. Testimonials: two-way marquee wall */}
      <Testimonials />

      {/* Previous reviews grid: hidden, kept in the code. Change `false` to `true` to restore. */}
      {false && (
      <section id="reviews-grid" className="scroll-mt-24 py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#009662] text-xs font-bold tracking-widest uppercase">
              Verified Testimonials
            </span>
            <h2 className={`${SECTION_HEADING} text-slate-900 mt-2`}>
              Loved by Students Across 45+ Nations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Kavita Patel',
                country: 'India 🇮🇳',
                university: 'University of Sydney',
                policy: 'Allianz Care OSHC',
                text: 'Got my certificate literally within 20 seconds. Attached it directly to my ImmiAccount and visa was granted 4 days later without any RFI!'
              },
              {
                name: 'Bibek Shrestha',
                country: 'Nepal 🇳🇵',
                university: 'UNSW Sydney',
                policy: 'Bupa OSHC Single',
                text: 'The price comparison showed me I could save $140 compared to buying directly from my university agent. Super smooth and official.'
              },
              {
                name: 'Lucas Silva',
                country: 'Brazil 🇧🇷',
                university: 'Monash University',
                policy: 'Medibank Student 500',
                text: 'Visited a medical clinic in Melbourne and showed my digital card on my phone. Did not pay a single dollar out of pocket. Amazing service.'
              }
            ].map((review, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 relative flex flex-col justify-between shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, idx) => (
                      <StarIcon key={idx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 mt-6 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900 text-xs sm:text-sm">{review.name}</div>
                    <div className="text-[11px] text-slate-500">{review.university}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-600">{review.country}</span>
                    <div className="text-[10px] text-[#009662] font-medium">{review.policy}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* 7. FAQ: V2 copy of V1's FAQ section (split questions / answer layout) */}
      <FAQSection />

      {/* Previous V2 FAQ accordion: hidden, kept in the code. Change `false` to `true` to restore. */}
      {false && (
      <section id="faq-accordion" className="scroll-mt-24 py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#1E40AF] text-xs font-bold tracking-widest uppercase">
              Clear Answers
            </span>
            <h2 className={`${SECTION_HEADING} text-slate-900 mt-2`}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'Is this policy 100% compliant for an Australian Student Visa (Subclass 500)?',
                a: 'Yes. All policies listed are issued exclusively by official signatories to the Australian Government Deed for the Provision of Overseas Student Health Cover (Allianz Care, Bupa, Medibank, nib). They satisfy mandatory Condition 8501 without exceptions.'
              },
              {
                q: 'What if my Australian visa is refused by the Department of Home Affairs?',
                a: 'Under Australian Government regulations, you receive a 100% full refund with zero cancellation fees. Simply upload your official DHA refusal notice to our portal and we process the refund directly back to your payment method.'
              },
              {
                q: 'How quickly is my official Certificate of Insurance issued?',
                a: 'In real time within 3 to 5 seconds. The PDF certificate with your official registered policy number is emailed to you immediately and is ready for ImmiAccount lodgement.'
              },
              {
                q: 'Can I switch insurers after arriving in Australia?',
                a: 'Yes, you can transfer to another provider at any point. The previous insurer will refund your remaining unused months upon presentation of your new policy.'
              }
            ].map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div
                  key={i}
                  className={`rounded-xl border bg-white overflow-hidden transition-colors ${
                    isOpen ? 'border-[#00B074]/40 bg-[#00B074]/[0.03]' : 'border-slate-200'
                  }`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-semibold text-slate-900 hover:text-[#009662] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDownIcon
                      className={`w-5 h-5 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#009662]' : 'text-slate-400'
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* 8. Footer: brand + partner actions, products, quick links, contact */}
      <V2Footer />

      {/* Agent Modal */}
      <AgentModal
        isOpen={internalLoginOpen}
        onClose={() => setInternalLoginOpen(false)}
      />
    </div>
    </MotionConfig>
  );
};
