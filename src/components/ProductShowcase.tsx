import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { CheckIcon, ArrowRightIcon } from '@heroicons/react/20/solid';

export const ProductShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll listener for sticky overlapping animation
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const vh = window.innerHeight || 800;
      const rect = section.getBoundingClientRect();
      const maxScroll = Math.max(1, rect.height - vh);
      const scrolled = -rect.top;
      const p = Math.min(1, Math.max(0, scrolled / maxScroll));

      setScrollProgress(p);

      let idx = 0;
      if (p > 0.82) idx = 3;
      else if (p > 0.49) idx = 2;
      else if (p > 0.16) idx = 1;
      setActiveIndex(idx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPanel = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const vh = window.innerHeight || 800;
    const targetTop = window.scrollY + section.getBoundingClientRect().top + index * vh;
    window.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    });
  };

  const nextProduct = () => {
    scrollToPanel(Math.min(3, activeIndex + 1));
  };

  const prevProduct = () => {
    scrollToPanel(Math.max(0, activeIndex - 1));
  };

  // Overlap transforms:
  const t0 = scrollProgress <= 0.333 ? scrollProgress / 0.333 : 1;
  const p1Transform = `translate3d(${-16 * t0}%, 0, 0)`;
  const p1Opacity = (1 - 0.25 * t0).toFixed(3);

  let p2X = 100;
  let p2Opacity = 1;
  if (scrollProgress > 0 && scrollProgress <= 0.333) {
    const t = scrollProgress / 0.333;
    p2X = (1 - t) * 100;
  } else if (scrollProgress > 0.333) {
    const t = Math.min(1, (scrollProgress - 0.333) / 0.333);
    p2X = -16 * t;
    p2Opacity = 1 - 0.25 * t;
  }
  const p2Transform = `translate3d(${p2X}%, 0, 0)`;

  let p3X = 100;
  let p3Opacity = 1;
  if (scrollProgress > 0.333 && scrollProgress <= 0.666) {
    const t = (scrollProgress - 0.333) / 0.333;
    p3X = (1 - t) * 100;
  } else if (scrollProgress > 0.666) {
    const t = Math.min(1, (scrollProgress - 0.666) / 0.334);
    p3X = -16 * t;
    p3Opacity = 1 - 0.25 * t;
  }
  const p3Transform = `translate3d(${p3X}%, 0, 0)`;

  let p4X = 100;
  if (scrollProgress > 0.666) {
    const t = Math.min(1, (scrollProgress - 0.666) / 0.334);
    p4X = (1 - t) * 100;
  }
  const p4Transform = `translate3d(${p4X}%, 0, 0)`;

  const dotColors = ['bg-emerald-400', 'bg-[#FF5B4F]', 'bg-emerald-400', 'bg-[#00A3E0]'];

  return (
    <section ref={sectionRef} id="products" className="relative z-20 bg-slate-950" style={{ height: '400vh' }}>
      {/* Sticky Full-Screen Viewport Container */}
      <div id="product-scroll-viewport" className="sticky top-0 h-screen w-full overflow-hidden select-none">
        {/* Top Floating Controls */}
        <div className="absolute top-4 sm:top-6 inset-x-0 z-50 flex items-center justify-between px-6 sm:px-10 max-w-7xl mx-auto pointer-events-none">
          {/* Status Pill */}
          <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/90 text-xs font-semibold shadow-lg">
            <span className={`w-2 h-2 rounded-full ${dotColors[activeIndex]} transition-colors duration-300`} />
            <span>Product 0{activeIndex + 1} of 04</span>
          </div>

          {/* Product Navigation Pills */}
          <div className="pointer-events-auto hidden sm:flex items-center gap-1.5 p-1 rounded-full bg-black/45 backdrop-blur-md border border-white/20 shadow-lg">
            {['yourOSHC', 'yourOVHC', 'yourADMISSION', 'OrbitProtect'].map((name, i) => (
              <button
                key={name}
                onClick={() => scrollToPanel(i)}
                className={`prod-nav-pill px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeIndex === i
                    ? 'bg-white text-slate-950 shadow-sm font-bold'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Arrow Buttons */}
          <div className="pointer-events-auto flex items-center gap-2">
            <button
              onClick={prevProduct}
              aria-label="Previous product"
              className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white flex items-center justify-center transition-all backdrop-blur-md active:scale-95 shadow-md cursor-pointer"
            >
              <ChevronLeftIcon className="w-4 h-4 stroke-2" />
            </button>
            <button
              onClick={nextProduct}
              aria-label="Next product"
              className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white flex items-center justify-center transition-all backdrop-blur-md active:scale-95 shadow-md cursor-pointer"
            >
              <ChevronRightIcon className="w-4 h-4 stroke-2" />
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* PRODUCT 1: yourOSHC (Emerald Green, z-10)                   */}
        {/* ============================================================ */}
        <div
          id="product-panel-1"
          className="product-panel-h is-inview z-10"
          style={{ backgroundColor: '#073826', transform: p1Transform, opacity: p1Opacity }}
        >
          <div className="h-full w-full flex items-center justify-center py-14 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-14 overflow-y-auto lg:overflow-visible">
            <div className="max-w-7xl mx-auto w-full pt-12 sm:pt-14 lg:pt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Left Text */}
                <div className="flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-5">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-white/15 backdrop-blur-md border border-white/20">
                      For Visa Sub-Class 500
                    </span>
                  </div>

                  <div className="mb-5 sm:mb-6">
                    <img
                      src="/youroshc_retina.png"
                      alt="yourOSHC health in a click"
                      className="h-9 sm:h-11 w-auto object-contain"
                    />
                  </div>

                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                    Australia's Most Trusted Student Health Cover (OSHC)
                  </h2>

                  <p className="text-sm sm:text-base lg:text-lg text-emerald-100/90 mt-3 sm:mt-4 leading-relaxed max-w-xl">
                    100% compliant with Australian Department of Home Affairs student visa requirements. Compare approved government deed signatories including Allianz Care, Bupa, Medibank, nib, and ahm.
                  </p>

                  <div className="mt-5 sm:mt-6 space-y-2 text-xs sm:text-sm text-white">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-400/25 text-emerald-200 flex items-center justify-center border border-emerald-400/40">
                        <CheckIcon className="w-3.5 h-3.5" />
                      </span>
                      <span>100% Visa Subclass 500 immigration condition compliant</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-400/25 text-emerald-200 flex items-center justify-center border border-emerald-400/40">
                        <CheckIcon className="w-3.5 h-3.5" />
                      </span>
                      <span>Instant electronic certificate download for ImmiAccount</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-400/25 text-emerald-200 flex items-center justify-center border border-emerald-400/40">
                        <CheckIcon className="w-3.5 h-3.5" />
                      </span>
                      <span>Direct-billing network at 1,200+ medical clinics Australia-wide</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-400/25 text-emerald-200 flex items-center justify-center border border-emerald-400/40">
                        <CheckIcon className="w-3.5 h-3.5" />
                      </span>
                      <span>No medical waiting periods for emergency hospital treatments</span>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-5">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-emerald-200/80 font-medium block">Starting Price</span>
                      <span className="text-2xl font-bold text-white">$54.00 <span className="text-xs text-emerald-200/80 font-normal">/ month</span></span>
                    </div>
                    <a
                      href="https://youroshc.com.au"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all group/btn"
                    >
                      <span>Buy OSHC</span>
                      <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </a>
                  </div>
                </div>

                {/* Right Image */}
                <div className="flex justify-center items-center">
                  <div className="relative w-full max-w-[580px] group">
                    <div className="relative w-full rounded-[38px] sm:rounded-[44px] overflow-hidden border border-white/20 bg-black/45 backdrop-blur-md shadow-2xl p-4 sm:p-5">
                      <div className="relative w-full rounded-[22px] sm:rounded-[24px] overflow-hidden aspect-[1.42/1]">
                        <img
                          src="/product-oshc.jpg"
                          alt="yourOSHC Student Life"
                          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
                          <img
                            src="/product-card-oshc.png"
                            alt="yourOSHC Card"
                            className="w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[400px] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.65)] border border-white/40 transform group-hover:scale-[1.02] transition-transform duration-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* PRODUCT 2: yourOVHC (Coral Wine, z-20)                      */}
        {/* ============================================================ */}
        <div
          id="product-panel-2"
          className="product-panel-h z-20 border-l border-white/20 shadow-[-30px_0_80px_rgba(0,0,0,0.55)] rounded-l-[28px] sm:rounded-l-[44px]"
          style={{ backgroundColor: '#601B17', transform: p2Transform, opacity: p2Opacity }}
        >
          <div className="h-full w-full flex items-center justify-center py-14 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-14 overflow-y-auto lg:overflow-visible">
            <div className="max-w-7xl mx-auto w-full pt-12 sm:pt-14 lg:pt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Left Image (Alternate) */}
                <div className="flex justify-center items-center order-2 lg:order-1">
                  <div className="relative w-full max-w-[580px] group">
                    <div className="relative w-full rounded-[38px] sm:rounded-[44px] overflow-hidden border border-white/20 bg-black/45 backdrop-blur-md shadow-2xl p-4 sm:p-5">
                      <div className="relative w-full rounded-[22px] sm:rounded-[24px] overflow-hidden aspect-[1.42/1]">
                        <img
                          src="/product-ovhc.jpg"
                          alt="yourOVHC Visitor and Graduate Cover"
                          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
                          <img
                            src="/product-card-ovhc.png"
                            alt="yourOVHC Card"
                            className="w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[400px] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.65)] border border-white/40 transform group-hover:scale-[1.02] transition-transform duration-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Text */}
                <div className="flex flex-col justify-center order-1 lg:order-2">
                  <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-5">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-white/15 backdrop-blur-md border border-white/20">
                      Visa 485, 482, 491, 600
                    </span>
                  </div>

                  <div className="mb-5 sm:mb-6">
                    <img
                      src="/yourovhc_retina.png"
                      alt="yourOVHC health in a click"
                      className="h-9 sm:h-11 w-auto object-contain"
                    />
                  </div>

                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                    Buy OVHC &mdash; Comprehensive Health Insurance for Visitors &amp; Graduates
                  </h2>

                  <p className="text-sm sm:text-base lg:text-lg text-red-100/90 mt-3 sm:mt-4 leading-relaxed max-w-xl">
                    Hospital and medical insurance fulfilling Visa Condition 8501 for Subclass 485 Temporary Graduate, 600 Visitor, 482 Employer Sponsored, and Working Holiday visa holders across Australia.
                  </p>

                  <div className="mt-5 sm:mt-6 space-y-2 text-xs sm:text-sm text-white">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-red-400/25 text-red-200 flex items-center justify-center border border-red-400/40">
                        <CheckIcon className="w-3.5 h-3.5" />
                      </span>
                      <span>Meets Australian Visa Condition 8501 immigration requirements</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-red-400/25 text-red-200 flex items-center justify-center border border-red-400/40">
                        <CheckIcon className="w-3.5 h-3.5" />
                      </span>
                      <span>Monthly recurring payments with zero lock-in contracts</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-red-400/25 text-red-200 flex items-center justify-center border border-red-400/40">
                        <CheckIcon className="w-3.5 h-3.5" />
                      </span>
                      <span>Immediate visa verification letter download for lodgement</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-red-400/25 text-red-200 flex items-center justify-center border border-red-400/40">
                        <CheckIcon className="w-3.5 h-3.5" />
                      </span>
                      <span>Optional extras available: dental, optical, and physiotherapy</span>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-5">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-red-200/80 font-medium block">Starting Price</span>
                      <span className="text-2xl font-bold text-white">$75.00 <span className="text-xs text-red-200/80 font-normal">/ month</span></span>
                    </div>
                    <a
                      href="https://yourovhc.com.au"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-[#FF5B4F] hover:bg-[#ff7268] text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all group/btn"
                    >
                      <span>Buy OVHC</span>
                      <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* PRODUCT 3: yourADMISSION (Jade Teal, z-30)                  */}
        {/* ============================================================ */}
        <div
          id="product-panel-3"
          className="product-panel-h z-30 border-l border-white/20 shadow-[-30px_0_80px_rgba(0,0,0,0.55)] rounded-l-[28px] sm:rounded-l-[44px]"
          style={{ backgroundColor: '#083630', transform: p3Transform, opacity: p3Opacity }}
        >
          <div className="h-full w-full flex items-center justify-center py-14 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-14 overflow-y-auto lg:overflow-visible">
            <div className="max-w-7xl mx-auto w-full pt-12 sm:pt-14 lg:pt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Left Text */}
                <div className="flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-5">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-white/15 backdrop-blur-md border border-white/20">
                      45+ Australian Institutions
                    </span>
                  </div>

                  <div className="mb-5 sm:mb-6">
                    <img
                      src="/youradmission_retina.png"
                      alt="yourADMISSION gateway to universities"
                      className="h-9 sm:h-11 w-auto object-contain"
                    />
                  </div>

                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                    Direct Australian University &amp; College Admissions
                  </h2>

                  <p className="text-sm sm:text-base lg:text-lg text-teal-100/90 mt-3 sm:mt-4 leading-relaxed max-w-xl">
                    Free end-to-end guidance from QEAC-certified educational counselors. Secure your Confirmation of Enrolment (CoE) and exclusive international merit scholarships across Australia.
                  </p>

                  <div className="mt-5 sm:mt-6 space-y-2 text-xs sm:text-sm text-white">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-teal-400/25 text-teal-200 flex items-center justify-center border border-teal-400/40">
                        <CheckIcon className="w-3.5 h-3.5" />
                      </span>
                      <span>Group of Eight (Go8) &amp; top-tier Australian university partner pathways</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-teal-400/25 text-teal-200 flex items-center justify-center border border-teal-400/40">
                        <CheckIcon className="w-3.5 h-3.5" />
                      </span>
                      <span>Fast-tracked Offer Letters and priority CoE issuance within 5 business days</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-teal-400/25 text-teal-200 flex items-center justify-center border border-teal-400/40">
                        <CheckIcon className="w-3.5 h-3.5" />
                      </span>
                      <span>Full guidance on Genuine Student (GS) visa requirement criteria</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-teal-400/25 text-teal-200 flex items-center justify-center border border-teal-400/40">
                        <CheckIcon className="w-3.5 h-3.5" />
                      </span>
                      <span>Access to exclusive international scholarships up to $15,000 AUD</span>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-5">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-teal-200/80 font-medium block">Service Fee</span>
                      <span className="text-2xl font-bold text-white">100% Free Service</span>
                    </div>
                    <a
                      href="https://youradmission.com.au"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all group/btn"
                    >
                      <span>Apply Now</span>
                      <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </a>
                  </div>
                </div>

                {/* Right Image */}
                <div className="flex justify-center items-center">
                  <div className="relative w-full max-w-[580px] group">
                    <div className="relative w-full rounded-[38px] sm:rounded-[44px] overflow-hidden border border-white/20 bg-black/45 backdrop-blur-md shadow-2xl p-4 sm:p-5">
                      <div className="relative w-full rounded-[22px] sm:rounded-[24px] overflow-hidden aspect-[1.42/1]">
                        <img
                          src="/product-admissions.jpg"
                          alt="yourADMISSION University Campus"
                          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
                          <img
                            src="/product-card-admission.png"
                            alt="yourADMISSION Card"
                            className="w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[400px] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.65)] border border-white/40 transform group-hover:scale-[1.02] transition-transform duration-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* PRODUCT 4: OrbitProtect (Midnight Slate, z-40)              */}
        {/* ============================================================ */}
        <div
          id="product-panel-4"
          className="product-panel-h z-40 border-l border-white/20 shadow-[-30px_0_80px_rgba(0,0,0,0.55)] rounded-l-[28px] sm:rounded-l-[44px]"
          style={{ backgroundColor: '#0A3F5E', transform: p4Transform }}
        >
          <div className="h-full w-full flex items-center justify-center py-14 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-14 overflow-y-auto lg:overflow-visible">
            <div className="max-w-7xl mx-auto w-full pt-12 sm:pt-14 lg:pt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Left Image (Alternate) */}
                <div className="flex justify-center items-center order-2 lg:order-1">
                  <div className="relative w-full max-w-[580px] group">
                    <div className="relative w-full rounded-[38px] sm:rounded-[44px] overflow-hidden border border-white/20 bg-black/45 backdrop-blur-md shadow-2xl p-4 sm:p-5">
                      <div className="relative w-full rounded-[22px] sm:rounded-[24px] overflow-hidden aspect-[1.42/1]">
                        <img
                          src="/hero-family-sky.jpg"
                          alt="OrbitProtect New Zealand Travel"
                          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
                          <img
                            src="/product-card-orbitprotect.png"
                            alt="OrbitProtect Card"
                            className="w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[400px] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.65)] border border-white/40 transform group-hover:scale-[1.02] transition-transform duration-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Text */}
                <div className="flex flex-col justify-center order-1 lg:order-2">
                  <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-5">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-white/15 backdrop-blur-md border border-white/20">
                      Destination: New Zealand
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-4 sm:mb-5">
                    <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center text-white shadow-md">
                      <GlobeAltIcon className="w-6 h-6 text-sky-300 stroke-2" />
                    </div>
                    <div className="leading-none">
                      <span className="text-white font-black text-2xl tracking-tight">OrbitProtect</span>
                      <span className="text-[11px] text-sky-200/90 font-medium block mt-0.5">Travel Insurance while in New Zealand</span>
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                    Travelling to New Zealand? Peace of Mind Knowing You're Covered
                  </h2>

                  <p className="text-sm sm:text-base lg:text-lg text-sky-100/90 mt-3 sm:mt-4 leading-relaxed max-w-xl">
                    OrbitProtect gives international students, working holidaymakers, seasonal workers, and tourists full confidence knowing that medical emergencies, unexpected hospital stays, and travel disruptions are fully covered.
                  </p>

                  <div className="mt-5 sm:mt-6 space-y-2 text-xs sm:text-sm text-white">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-sky-400/25 text-sky-200 flex items-center justify-center border border-sky-400/40">
                        <CheckIcon className="w-3.5 h-3.5" />
                      </span>
                      <span>Immigration New Zealand compliant insurance for Student &amp; Working Holiday visas</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-sky-400/25 text-sky-200 flex items-center justify-center border border-sky-400/40">
                        <CheckIcon className="w-3.5 h-3.5" />
                      </span>
                      <span>Unlimited medical expenses including doctors, hospital, and emergency evacuation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-sky-400/25 text-sky-200 flex items-center justify-center border border-sky-400/40">
                        <CheckIcon className="w-3.5 h-3.5" />
                      </span>
                      <span>24/7 multilingual emergency assistance with direct hospital settlement</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-sky-400/25 text-sky-200 flex items-center justify-center border border-sky-400/40">
                        <CheckIcon className="w-3.5 h-3.5" />
                      </span>
                      <span>Baggage, personal property, travel disruption and rental excess protection</span>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-5">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-sky-200/80 font-medium block">Policy Rate</span>
                      <span className="text-2xl font-bold text-white">Instant Quote</span>
                    </div>
                    <a
                      href="https://orbitprotect.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-[#52B755] hover:bg-[#43a146] text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all group/btn"
                    >
                      <span>Get a Quote</span>
                      <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Scroll Progress Line */}
        <div
          id="product-progress-bar"
          className="absolute bottom-0 left-0 h-1 bg-white/80 transition-all duration-100 ease-out z-50 pointer-events-none"
          style={{ width: `${(25 + scrollProgress * 75).toFixed(1)}%` }}
        />
      </div>
    </section>
  );
};
