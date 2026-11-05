import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const heroTexts = [
  'Your Complete Journey to Australia.',
  'Health Cover & University Admissions.',
  'OSHC & OVHC Compliance Made Simple.'
];

// Product brand cards shown in the hero window: photo + logo only.
const heroProducts: {
  name: string;
  image: string;
  imagePosition: string;
  color: string;
  logo?: string;
  logoClass?: string;
}[] = [
  {
    name: 'yourOSHC',
    image: '/product-oshc.jpg',
    imagePosition: '50% 25%',
    color: '#1FA855',
    logo: '/logos/youroshc-white.png',
    logoClass: 'h-4 sm:h-8 lg:h-10'
  },
  {
    name: 'yourOVHC',
    image: '/product-ovhc.jpg',
    imagePosition: '66% 25%',
    color: '#FFCC00',
    logo: '/logos/yourovhc-white.svg',
    logoClass: 'h-[18px] sm:h-9 lg:h-11'
  },
  {
    name: 'yourADMISSION',
    image: '/product-admissions.jpg',
    imagePosition: '52% 30%',
    color: '#258CFF',
    logo: '/logos/youradmission-white.png',
    logoClass: 'h-3.5 sm:h-7 lg:h-9'
  },
  {
    // No transparent OrbitProtect logo file yet, so the wordmark is set in type.
    name: 'OrbitProtect',
    image: '/hero-family-sky.jpg',
    imagePosition: '50% 75%',
    color: '#00B4F1'
  }
];

export const Hero: React.FC = () => {
  // Typewriter state
  // const [displayText, setDisplayText] = useState('');
  // const [textIndex, setTextIndex] = useState(0);
  // const [charIndex, setCharIndex] = useState(0);
  // const [isDeleting, setIsDeleting] = useState(false);

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { src: '/card-slide-1.png', alt: 'Our Services Hub - OSHC, OVHC and Travel Cover' },
    { src: '/card-slide-2.png', alt: 'YourOSHC Policy Comparison Platform' },
    { src: '/card-slide-3.png', alt: 'YourOVHC Visa Health Cover Platform' }
  ];

  // Carousel interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Typewriter effect
  // useEffect(() => {
  //   const currentFullText = heroTexts[textIndex];
  //   let timeout: NodeJS.Timeout;

  //   if (!isDeleting && charIndex <= currentFullText.length) {
  //     timeout = setTimeout(() => {
  //       setDisplayText(currentFullText.substring(0, charIndex));
  //       setCharIndex((prev) => prev + 1);
  //     }, 75);
  //   } else if (!isDeleting && charIndex > currentFullText.length) {
  //     timeout = setTimeout(() => {
  //       setIsDeleting(true);
  //     }, 2400);
  //   } else if (isDeleting && charIndex > 0) {
  //     timeout = setTimeout(() => {
  //       setDisplayText(currentFullText.substring(0, charIndex - 1));
  //       setCharIndex((prev) => prev - 1);
  //     }, 38);
  //   } else if (isDeleting && charIndex === 0) {
  //     setIsDeleting(false);
  //     setTextIndex((prev) => (prev + 1) % heroTexts.length);
  //     timeout = setTimeout(() => {}, 450);
  //   }

  //   return () => clearTimeout(timeout);
  // }, [charIndex, isDeleting, textIndex]);

  return (
    <section
      className="relative w-full overflow-hidden portal-stars pt-32 sm:pt-40 pb-10 sm:pb-14 text-center flex flex-col items-center"
      // style={{
      //   background:
      //     'var(--hero-gradient, linear-gradient(180deg, #2A56DE 0%, #4972EE 20%, #798FEF 40%, #AE9DE5 60%, #E1A4D0 75%, #F8B0B4 88%, #FBD3B8 100%))'
      // }}
    >
      {/* Background Families under Blue Twilight Sky */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <img
          src="/hero-families-flanking.jpg"
          alt="Happy smiling families enjoying outdoors under blue twilight sky"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />
        {/* <div
          className="absolute inset-0 pointer-events-none transition-all duration-500"
          style={{
            background:
              'linear-gradient(to bottom, var(--hero-overlay-from, rgba(26, 62, 168, 0.75)), var(--hero-overlay-mid, rgba(37, 82, 206, 0.4)) 35%, rgba(223, 153, 194, 0.15) 75%, var(--hero-overlay-to, rgba(255, 255, 255, 0.45)))'
          }}
        /> */}
      </div>

      {/* Hero Text Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-secondary text-balance text-4xl sm:text-6xl lg:text-[4.25rem] text-white font-semibold tracking-[-0.04em] leading-[1.08]"
          style={{
            textShadow:
              '0 2px 14px rgba(10, 20, 60, 0.6), 0 1px 3px rgba(10, 20, 60, 0.4)'
          }}
        >
          All your covers in one place.
          {/* <br />
          <span className="font-normal text-white/95 mt-2 block">
            From health insurance to university offers
          </span> */}
        </motion.h1>

        {/* Dynamic Typewriter Sub-lead */}
        {/* <div className="mt-4 min-h-[32px] flex items-center justify-center">
          <p className="text-base sm:text-lg text-white/90 font-medium tracking-wide">
            <span>{displayText}</span>
            <span className="typing-cursor" />
          </p>
        </div> */}

        {/* Action Button (hidden: the product cards below are the call to action)
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mt-8"
        >
          <a
            href="#products"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-slate-900 font-semibold text-sm hover:bg-white/95 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
          >
            Explore Products
          </a>
        </motion.div>
        */}
      </div>

      {/* Floating App Preview Window Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-8 mt-10 sm:mt-14"
      >
        {/* Was a white "portal-window" frame; cards now sit directly on the hero background */}
        <div className="relative">
          {/* Previous screenshot carousel, replaced by the product grid below
          <div className="relative rounded-2xl sm:rounded-[1.75rem] overflow-hidden aspect-[16/10] sm:aspect-[16/9] ring-1 ring-black/5">
            <AnimatePresence mode="sync">
              <motion.img
                key={slides[currentSlide].src}
                src={slides[currentSlide].src}
                alt={slides[currentSlide].alt}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 1.0, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </AnimatePresence>
          </div>

          Carousel dots indicator
          <div className="flex items-center justify-center gap-2 mt-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentSlide ? 'w-6 bg-slate-900' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
          */}

          {/* Product brand cards */}
          <p
            className="font-secondary mb-4 sm:mb-6 text-center text-base sm:text-xl font-medium tracking-[-0.01em] text-white"
            style={{ textShadow: '0 1px 10px rgba(10, 20, 60, 0.55)' }}
          >
            Choose a product to get started.
          </p>
          {/* White frame wraps only the product grid, not the label above */}
          <div className="portal-window bg-white/95 backdrop-blur-2xl rounded-3xl sm:rounded-[2.5rem] border border-white/80 p-3 sm:p-5 md:p-6">
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {heroProducts.map((product, i) => (
              <motion.a
                key={product.name}
                href="#products"
                aria-label={product.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative block aspect-[16/10] overflow-hidden rounded-2xl sm:rounded-[1.5rem] ring-1 ring-black/5 shadow-sm"
              >
                <img
                  src={product.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ objectPosition: product.imagePosition }}
                />
                {/* Darken for logo legibility, with a hint of the brand colour at the base */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                <div
                  className="absolute inset-x-0 bottom-0 h-1/2 opacity-70"
                  style={{ background: `linear-gradient(to top, ${product.color}40, transparent)` }}
                />

                <div className="absolute inset-0 flex items-end justify-start p-3 sm:p-6 lg:p-7">
                  {product.logo ? (
                    <img
                      src={product.logo}
                      alt={product.name}
                      className={`${product.logoClass} w-auto max-w-[88%] object-contain object-left drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:-translate-y-1`}
                    />
                  ) : (
                    <span className="flex items-center gap-1.5 sm:gap-2.5 text-white text-base sm:text-3xl lg:text-[2.1rem] leading-none tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:-translate-y-1">
                      <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 sm:h-7 sm:w-7 lg:h-8 lg:w-8" aria-hidden="true">
                        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2.5" />
                        <circle cx="15.5" cy="4.5" r="3" fill="#7BD55A" />
                      </svg>
                      <span>
                        <span className="font-normal">Orbit</span>
                        <span className="font-bold">Protect</span>
                      </span>
                    </span>
                  )}
                </div>

                {/* Brand accent bar */}
                <span
                  className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-[0.18] transition-transform duration-500 ease-out group-hover:scale-x-100"
                  style={{ backgroundColor: product.color }}
                />
              </motion.a>
            ))}
          </div>
          </div>
        </div>
      </motion.div>

      {/* Seamless blend transition */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent via-slate-50/80 to-slate-50 pointer-events-none z-10" />
    </section>
  );
};
