// =====================================================================================
// PREVIOUS V1 HERO (commented out, kept for reference).
// It was 1.3 screens tall: a 2x2 grid of large product photos pushed most of it below the
// fold, the headline relied on heavy text shadows, and there was no supporting line or button.
// To restore it: delete the new hero at the bottom of this file and uncomment this block.
// =====================================================================================
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
//
// const heroTexts = [
//   'Your Complete Journey to Australia.',
//   'Health Cover & University Admissions.',
//   'OSHC & OVHC Compliance Made Simple.'
// ];
//
// // Product brand cards shown in the hero window: photo + logo only.
// const heroProducts: {
//   name: string;
//   image: string;
//   imagePosition: string;
//   color: string;
//   logo?: string;
//   logoClass?: string;
// }[] = [
//   {
//     name: 'yourOSHC',
//     image: '/product-oshc.jpg',
//     imagePosition: '50% 25%',
//     color: '#1FA855',
//     logo: '/logos/youroshc-white.png',
//     logoClass: 'h-4 sm:h-8 lg:h-10'
//   },
//   {
//     name: 'yourOVHC',
//     image: '/product-ovhc.jpg',
//     imagePosition: '66% 25%',
//     color: '#FFCC00',
//     logo: '/logos/yourovhc-white.svg',
//     logoClass: 'h-[18px] sm:h-9 lg:h-11'
//   },
//   {
//     name: 'yourADMISSION',
//     image: '/product-admissions.jpg',
//     imagePosition: '52% 30%',
//     color: '#258CFF',
//     logo: '/logos/youradmission-white.png',
//     logoClass: 'h-3.5 sm:h-7 lg:h-9'
//   },
//   {
//     // No transparent OrbitProtect logo file yet, so the wordmark is set in type.
//     name: 'OrbitProtect',
//     image: '/hero-family-sky.jpg',
//     imagePosition: '50% 75%',
//     color: '#00B4F1'
//   }
// ];
//
// export const Hero: React.FC = () => {
//   // Typewriter state
//   // const [displayText, setDisplayText] = useState('');
//   // const [textIndex, setTextIndex] = useState(0);
//   // const [charIndex, setCharIndex] = useState(0);
//   // const [isDeleting, setIsDeleting] = useState(false);
//
//   // Carousel state
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const slides = [
//     { src: '/card-slide-1.png', alt: 'Our Services Hub - OSHC, OVHC and Travel Cover' },
//     { src: '/card-slide-2.png', alt: 'YourOSHC Policy Comparison Platform' },
//     { src: '/card-slide-3.png', alt: 'YourOVHC Visa Health Cover Platform' }
//   ];
//
//   // Carousel interval
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 7000);
//     return () => clearInterval(timer);
//   }, [slides.length]);
//
//   // Typewriter effect
//   // useEffect(() => {
//   //   const currentFullText = heroTexts[textIndex];
//   //   let timeout: NodeJS.Timeout;
//
//   //   if (!isDeleting && charIndex <= currentFullText.length) {
//   //     timeout = setTimeout(() => {
//   //       setDisplayText(currentFullText.substring(0, charIndex));
//   //       setCharIndex((prev) => prev + 1);
//   //     }, 75);
//   //   } else if (!isDeleting && charIndex > currentFullText.length) {
//   //     timeout = setTimeout(() => {
//   //       setIsDeleting(true);
//   //     }, 2400);
//   //   } else if (isDeleting && charIndex > 0) {
//   //     timeout = setTimeout(() => {
//   //       setDisplayText(currentFullText.substring(0, charIndex - 1));
//   //       setCharIndex((prev) => prev - 1);
//   //     }, 38);
//   //   } else if (isDeleting && charIndex === 0) {
//   //     setIsDeleting(false);
//   //     setTextIndex((prev) => (prev + 1) % heroTexts.length);
//   //     timeout = setTimeout(() => {}, 450);
//   //   }
//
//   //   return () => clearTimeout(timeout);
//   // }, [charIndex, isDeleting, textIndex]);
//
//   return (
//     <section
//       className="relative w-full overflow-hidden portal-stars pt-32 sm:pt-40 pb-10 sm:pb-14 text-center flex flex-col items-center"
//       // style={{
//       //   background:
//       //     'var(--hero-gradient, linear-gradient(180deg, #2A56DE 0%, #4972EE 20%, #798FEF 40%, #AE9DE5 60%, #E1A4D0 75%, #F8B0B4 88%, #FBD3B8 100%))'
//       // }}
//     >
//       {/* Background Families under Blue Twilight Sky */}
//       <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
//         <img
//           src="/hero-families-flanking.jpg"
//           alt="Happy smiling families enjoying outdoors under blue twilight sky"
//           className="w-full h-full object-cover"
//           onError={(e) => {
//             (e.currentTarget as HTMLElement).style.display = 'none';
//           }}
//         />
//         {/* <div
//           className="absolute inset-0 pointer-events-none transition-all duration-500"
//           style={{
//             background:
//               'linear-gradient(to bottom, var(--hero-overlay-from, rgba(26, 62, 168, 0.75)), var(--hero-overlay-mid, rgba(37, 82, 206, 0.4)) 35%, rgba(223, 153, 194, 0.15) 75%, var(--hero-overlay-to, rgba(255, 255, 255, 0.45)))'
//           }}
//         /> */}
//       </div>
//
//       {/* Hero Text Content */}
//       <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8">
//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//           className="font-secondary text-balance text-4xl sm:text-6xl lg:text-[4.25rem] text-white font-semibold tracking-[-0.04em] leading-[1.08]"
//           style={{
//             textShadow:
//               '0 2px 14px rgba(10, 20, 60, 0.6), 0 1px 3px rgba(10, 20, 60, 0.4)'
//           }}
//         >
//           All your covers in one place.
//           {/* <br />
//           <span className="font-normal text-white/95 mt-2 block">
//             From health insurance to university offers
//           </span> */}
//         </motion.h1>
//
//         {/* Dynamic Typewriter Sub-lead */}
//         {/* <div className="mt-4 min-h-[32px] flex items-center justify-center">
//           <p className="text-base sm:text-lg text-white/90 font-medium tracking-wide">
//             <span>{displayText}</span>
//             <span className="typing-cursor" />
//           </p>
//         </div> */}
//
//         {/* Action Button (hidden: the product cards below are the call to action)
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.25, duration: 0.5 }}
//           className="mt-8"
//         >
//           <a
//             href="#products"
//             className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-slate-900 font-semibold text-sm hover:bg-white/95 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
//           >
//             Explore Products
//           </a>
//         </motion.div>
//         */}
//       </div>
//
//       {/* Floating App Preview Window Carousel */}
//       <motion.div
//         initial={{ opacity: 0, y: 35 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
//         className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-8 mt-10 sm:mt-14"
//       >
//         {/* Was a white "portal-window" frame; cards now sit directly on the hero background */}
//         <div className="relative">
//           {/* Previous screenshot carousel, replaced by the product grid below
//           <div className="relative rounded-2xl sm:rounded-[1.75rem] overflow-hidden aspect-[16/10] sm:aspect-[16/9] ring-1 ring-black/5">
//             <AnimatePresence mode="sync">
//               <motion.img
//                 key={slides[currentSlide].src}
//                 src={slides[currentSlide].src}
//                 alt={slides[currentSlide].alt}
//                 initial={{ opacity: 0, scale: 1.02 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 1.01 }}
//                 transition={{ duration: 1.0, ease: 'easeInOut' }}
//                 className="absolute inset-0 w-full h-full object-cover object-top"
//               />
//             </AnimatePresence>
//           </div>
//
//           Carousel dots indicator
//           <div className="flex items-center justify-center gap-2 mt-4">
//             {slides.map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentSlide(i)}
//                 aria-label={`Slide ${i + 1}`}
//                 className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
//                   i === currentSlide ? 'w-6 bg-slate-900' : 'w-2 bg-slate-300 hover:bg-slate-400'
//                 }`}
//               />
//             ))}
//           </div>
//           */}
//
//           {/* Product brand cards */}
//           <p
//             className="font-secondary mb-4 sm:mb-6 text-center text-base sm:text-xl font-medium tracking-[-0.01em] text-white"
//             style={{ textShadow: '0 1px 10px rgba(10, 20, 60, 0.55)' }}
//           >
//             Choose a product to get started.
//           </p>
//           {/* White frame wraps only the product grid, not the label above */}
//           <div className="portal-window bg-white/95 backdrop-blur-2xl rounded-3xl sm:rounded-[2.5rem] border border-white/80 p-3 sm:p-5 md:p-6">
//           <div className="grid grid-cols-2 gap-3 sm:gap-5">
//             {heroProducts.map((product, i) => (
//               <motion.a
//                 key={product.name}
//                 href="#products"
//                 aria-label={product.name}
//                 initial={{ opacity: 0, y: 16 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//                 className="group relative block aspect-[16/10] overflow-hidden rounded-2xl sm:rounded-[1.5rem] ring-1 ring-black/5 shadow-sm"
//               >
//                 <img
//                   src={product.image}
//                   alt=""
//                   className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//                   style={{ objectPosition: product.imagePosition }}
//                 />
//                 {/* Darken for logo legibility, with a hint of the brand colour at the base */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
//                 <div
//                   className="absolute inset-x-0 bottom-0 h-1/2 opacity-70"
//                   style={{ background: `linear-gradient(to top, ${product.color}40, transparent)` }}
//                 />
//
//                 <div className="absolute inset-0 flex items-end justify-start p-3 sm:p-6 lg:p-7">
//                   {product.logo ? (
//                     <img
//                       src={product.logo}
//                       alt={product.name}
//                       className={`${product.logoClass} w-auto max-w-[88%] object-contain object-left drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:-translate-y-1`}
//                     />
//                   ) : (
//                     <span className="flex items-center gap-1.5 sm:gap-2.5 text-white text-base sm:text-3xl lg:text-[2.1rem] leading-none tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:-translate-y-1">
//                       <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 sm:h-7 sm:w-7 lg:h-8 lg:w-8" aria-hidden="true">
//                         <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2.5" />
//                         <circle cx="15.5" cy="4.5" r="3" fill="#7BD55A" />
//                       </svg>
//                       <span>
//                         <span className="font-normal">Orbit</span>
//                         <span className="font-bold">Protect</span>
//                       </span>
//                     </span>
//                   )}
//                 </div>
//
//                 {/* Brand accent bar */}
//                 <span
//                   className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-[0.18] transition-transform duration-500 ease-out group-hover:scale-x-100"
//                   style={{ backgroundColor: product.color }}
//                 />
//               </motion.a>
//             ))}
//           </div>
//           </div>
//         </div>
//       </motion.div>
//
//       {/* Seamless blend transition */}
//       <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent via-slate-50/80 to-slate-50 pointer-events-none z-10" />
//     </section>
//   );
// };

// =====================================================================================
// ENHANCED V1 HERO
// A twilight photo of Sydney Harbour (deep sky up top, still water below) and the same headline,
// now in one screen: headline, one line on what goyo does, two actions, the insurers by name,
// and a row of four compact product cards that each jump to their full-screen product panel.
// Legibility comes from a soft tint behind the text instead of text shadows.
// =====================================================================================

import React from 'react';
import { MotionConfig, motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

const ease = [0.16, 1, 0.3, 1] as const;

// Order matches the product panels in ProductShowcase (panel i sits i screens into #products).
const HERO_PRODUCTS: { name: string; logo?: string; logoClass?: string; line: string; color: string }[] = [
  { name: 'yourOSHC', logo: '/logos/youroshc.png', logoClass: 'h-[22px]', line: 'Student health cover', color: '#1FA855' },
  { name: 'yourOVHC', logo: '/logos/yourovhc.svg', logoClass: 'h-[23px]', line: 'Visitor health cover', color: '#E0A800' },
  { name: 'yourADMISSION', logo: '/logos/youradmission.png', logoClass: 'h-[20px]', line: 'University admissions', color: '#258CFF' },
  { name: 'OrbitProtect', line: 'NZ travel cover', color: '#00B4F1' }
];

const INSURERS = ['Allianz Care', 'Bupa', 'Medibank', 'nib', 'ahm'];

const scrollToId = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

// Jump to product panel i: the panels are pinned, one screen of scroll each.
const scrollToProduct = (i: number) => {
  const section = document.getElementById('products');
  if (!section) return;
  const top = window.scrollY + section.getBoundingClientRect().top + i * (window.innerHeight || 800);
  window.scrollTo({ top, behavior: 'smooth' });
};

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease }
});

export const Hero: React.FC = () => (
  <MotionConfig reducedMotion="user">
    <section className="portal-stars relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#0f1c2b] pt-28 sm:min-h-[max(100svh,880px)] sm:pt-32">
      {/* (On screens under 880px tall the hero keeps 880px, so the skyline never runs into the copy;
          the product cards then sit just below the fold.) */}
      {/* Twilight photo. It starts a quarter of the way down so the headline, line and buttons sit
          on open sky and the Opera House and bridge sit below them; its top edge fades into the
          ground colour, which is sampled from the photo's own sky. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-x-0 bottom-0 top-[40%] sm:top-[26%]"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, #000 22%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, #000 22%)'
          }}
        >
          {/* Sydney Opera House and Harbour Bridge at twilight. Photo by Photoholgic on Unsplash
              (unsplash.com/photos/MvEuQRRRUIo), free under the Unsplash License. */}
          <img src="/hero/sydney-twilight.jpg" alt="" className="h-full w-full object-cover object-[42%_55%]" />
        </div>
        {/* A soft tint behind the copy, for the screens short enough that the skyline reaches it */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(46% 40% at 50% 30%, rgba(15,28,43,0.5) 0%, rgba(15,28,43,0) 100%)' }}
        />
      </div>

      {/* Copy */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center sm:px-8">
        <motion.h1
          {...rise(0)}
          className="m-0 font-secondary text-[44px] font-semibold leading-[1.04] tracking-[-0.045em] text-white text-balance sm:text-[64px] lg:text-[76px]"
        >
          All your covers in one place.
        </motion.h1>

        <motion.p {...rise(0.12)} className="m-0 mt-5 max-w-[600px] text-[17px] leading-[1.6] text-white/90 sm:text-[19px]">
          Visa health cover from Australia&rsquo;s approved insurers, free university admissions, and travel cover
          for New Zealand.
        </motion.p>

        <motion.div {...rise(0.24)} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollToId('products')}
            className="inline-flex h-[52px] cursor-pointer items-center gap-2 rounded-full bg-white px-7 text-[16px] font-semibold text-slate-950 shadow-[0_12px_30px_-10px_rgba(15,23,42,0.45)] transition-transform hover:-translate-y-0.5"
          >
            Find my cover
            <ArrowRightIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollToId('process')}
            className="inline-flex h-[52px] cursor-pointer items-center rounded-full border border-white/45 bg-white/10 px-7 text-[16px] font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
          >
            See how it works
          </button>
        </motion.div>

        <motion.p {...rise(0.34)} className="m-0 mt-7 text-[14px] font-medium text-white">
          Official prices from {INSURERS.slice(0, -1).join(', ')} and {INSURERS[INSURERS.length - 1]}
        </motion.p>
      </div>

      {/* Products */}
      <div className="relative z-10 mx-auto mt-auto w-full max-w-6xl px-4 pb-10 pt-14 sm:px-8 sm:pb-14">
        <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 lg:grid-cols-4 lg:gap-4">
          {HERO_PRODUCTS.map((p, i) => (
            <motion.li key={p.name} {...rise(0.45 + i * 0.07)}>
              <button
                type="button"
                onClick={() => scrollToProduct(i)}
                aria-label={`${p.name}: ${p.line}`}
                className="group flex h-full w-full cursor-pointer flex-col items-start gap-3 rounded-[20px] bg-white/95 p-4 text-left shadow-[0_18px_40px_-18px_rgba(15,23,42,0.45)] ring-1 ring-white/70 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 sm:p-5"
              >
                <span className="flex h-6 items-center">
                  {p.logo ? (
                    <img src={p.logo} alt="" className={`${p.logoClass} w-auto max-w-full object-contain object-left`} />
                  ) : (
                    <span className="flex items-center gap-1.5 text-[19px] leading-none tracking-[-0.02em] text-slate-900">
                      <span aria-hidden="true" className="h-4 w-4 rounded-full border-[3px]" style={{ borderColor: p.color }} />
                      Orbit<span className="-ml-1.5 font-bold">Protect</span>
                    </span>
                  )}
                </span>
                <span className="flex w-full items-center justify-between gap-3">
                  <span className="text-[14px] leading-snug text-slate-600">{p.line}</span>
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:translate-x-0.5"
                    style={{ backgroundColor: p.color }}
                    aria-hidden="true"
                  >
                    <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Blend into the page below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-slate-50" />
    </section>
  </MotionConfig>
);
