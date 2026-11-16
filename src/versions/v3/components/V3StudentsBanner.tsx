import React from 'react';
import { motion } from 'framer-motion';
import { BTN_PRIMARY, CONTAINER, scrollToId } from '../ui';

// V2's full-width students photo, redesigned: a contained photo with one line that gives the break
// a reason to be there, instead of a photo that says nothing. Uses a different photo from the hero.
export const V3StudentsBanner: React.FC = () => (
  <section aria-label="Studying in Australia" className="bg-white pb-20 font-secondary lg:pb-24">
    <div className={CONTAINER}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative overflow-hidden rounded-[32px] bg-[#0B2A1C]"
      >
        <img
          src="/product-admissions.jpg"
          alt="International student smiling on an Australian university campus, holding her welcome pack and offer letter"
          className="absolute inset-0 h-full w-full object-cover object-[58%_18%] sm:object-[70%_30%]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 hidden sm:block"
          style={{ background: 'linear-gradient(90deg, rgba(6,30,20,0.9) 0%, rgba(6,30,20,0.7) 40%, rgba(6,30,20,0) 72%)' }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 sm:hidden"
          style={{ background: 'linear-gradient(0deg, rgba(6,30,20,0.95) 0%, rgba(6,30,20,0.8) 42%, rgba(6,30,20,0) 68%)' }}
        />
        <div className="relative flex min-h-[600px] max-w-[520px] flex-col justify-end p-7 sm:min-h-[480px] sm:justify-center sm:p-12 lg:p-16">
          <p className="m-0 text-[28px] font-extrabold leading-[1.15] tracking-[-0.025em] text-white sm:text-[38px]">
            Your first day on campus starts before you fly.
          </p>
          <p className="m-0 mt-4 text-[17px] leading-[1.6] text-[#D5E6DC]">
            Health cover for your visa, a place at university and travel cover, all sorted from home.
          </p>
          <div className="mt-8">
            <button type="button" onClick={() => scrollToId('products')} className={BTN_PRIMARY}>
              Find my cover
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
