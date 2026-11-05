import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface ProductOverviewProps {
  onSelectProduct: (index: number) => void;
}

const cards = [
  {
    title: 'yourOSHC Card - For Visa Sub-Class 500',
    img: '/product-card-oshc.png',
    hoverBorder: 'hover:border-[#00C975]'
  },
  {
    title: 'yourOVHC Card - For Visa Sub-Class 485, 482, 491, 600',
    img: '/product-card-ovhc.png',
    hoverBorder: 'hover:border-[#FF5B4F]'
  },
  {
    title: 'yourADMISSION Card - Foreign universities',
    img: '/product-card-admission.png',
    hoverBorder: 'hover:border-[#10B981]'
  },
  {
    title: 'OrbitProtect Travel Insurance NZ',
    img: '/product-card-orbitprotect.png',
    hoverBorder: 'hover:border-[#00B4F1]'
  }
];

export const ProductOverview: React.FC<ProductOverviewProps> = ({ onSelectProduct }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Triggers when the full card deck is in view (container is 440px, cards are 300px centered)
  const isFullyVisible = useInView(containerRef, {
    amount: 0.85,
    once: false
  });

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const spreadScale = Math.min(1.0, Math.max(0.35, windowWidth / 1360.0));

  // Pure numeric GPU transforms for 60/120fps buttery smooth animation
  const cardVariants: Variants = {
    stacked: (i: number) => {
      const stackedOffsets = [-40, -14, 14, 40];
      return {
        x: stackedOffsets[i] * spreadScale,
        y: 0,
        z: (3 - i) * 16,
        rotateZ: (i - 1.5) * 1.4,
        rotateY: 0,
        scale: 0.96 + i * 0.012,
        zIndex: 40 - i * 10,
        transition: {
          duration: 1.3,
          delay: (3 - i) * 0.06,
          ease: [0.16, 1, 0.3, 1]
        }
      };
    },

    spread: (i: number) => {
      const xOffsets = [-310, -103, 103, 310];
      const yOffsets = [15, -6, -6, 15];
      const rotZ = [-5.5, -1.8, 1.8, 5.5];
      const rotY = [4.5, 1.5, -1.5, -4.5];
      const zDepths = [60, 40, 20, 0];

      return {
        x: xOffsets[i] * spreadScale,
        y: yOffsets[i] * spreadScale,
        z: zDepths[i],
        rotateZ: rotZ[i],
        rotateY: rotY[i],
        scale: 1,
        zIndex: 40 - i * 10,
        transition: {
          duration: 1.6, // Smooth, slow, cinematic glide
          delay: i * 0.09, // Graceful sequential card fanning
          ease: [0.16, 1, 0.3, 1] // Ultra-smooth deceleration curve
        }
      };
    }
  };

  return (
    <section
      id="product-overview"
      className="relative z-20 bg-slate-50 text-slate-900 select-none py-16 sm:py-24 lg:py-28 overflow-hidden border-t border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-700 mb-2">
            Complete Coverage Ecosystem
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Our Comprehensive Product Ecosystem
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 sm:mt-4 leading-relaxed max-w-2xl mx-auto">
            From student visas and admissions to visitor health cover and New Zealand travel &mdash; explore the full suite designed for every step of your overseas journey.
          </p>
        </motion.div>

        {/* 3D Card Deck Arena */}
        <div className="relative w-full overflow-visible py-8 sm:py-12">
          <div
            ref={containerRef}
            id="overview-deck-container"
            className="relative w-full h-[400px] sm:h-[440px] lg:h-[480px] mx-auto"
            style={{ perspective: 1400 }}
          >
            {cards.map((card, idx) => (
              <motion.div
                key={card.title}
                id={`overview-card-${idx}`}
                custom={idx}
                variants={cardVariants}
                initial="stacked"
                animate={isFullyVisible ? 'spread' : 'stacked'}
                whileHover={{
                  scale: 1.04,
                  transition: { duration: 0.25, ease: 'easeOut' }
                }}
                onClick={() => onSelectProduct(idx)}
                className={`overview-deck-card absolute inset-0 m-auto w-[86vw] max-w-[320px] sm:max-w-[400px] lg:max-w-[460px] xl:max-w-[480px] aspect-[1.54/1] rounded-[22px] sm:rounded-[28px] lg:rounded-[32px] overflow-hidden border-[3px] sm:border-[4px] lg:border-[5px] border-white bg-white shadow-[12px_22px_45px_-10px_rgba(15,23,42,0.32),0_8px_20px_-4px_rgba(15,23,42,0.16)] ring-1 ring-slate-900/10 cursor-pointer select-none ${card.hoverBorder}`}
                style={{
                  transformStyle: 'preserve-3d',
                  willChange: 'transform'
                }}
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover object-center rounded-[18px] sm:rounded-[24px] lg:rounded-[27px] pointer-events-none"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
