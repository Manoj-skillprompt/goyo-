import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { BrandMark } from './BrandMark';

// Full-width photo banner: students photo, emerald wash in the bottom-right corner, white brand
// swoosh in that corner, and equal rounded corners all round.
// Photo: supplied by the client, stored in public/banner/students.jpg.
//
// Scroll effects (all tied to scroll position, so they reverse when scrolling back up):
//   • the panel grows from 92% to full width as it enters the viewport
//   • the green wash builds up and the swoosh sweeps in (rotate + slide) as the banner arrives
// Visitors who prefer reduced motion get the static banner.
export const StudentsBanner: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // 0 when the banner's top meets the bottom of the viewport, 1 when its bottom leaves the top.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // Light spring smoothing so wheel/trackpad steps feel fluid rather than jumpy.
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  const panelScale = useTransform(p, [0, 0.4], [0.92, 1]);
  const washOpacity = useTransform(p, [0.15, 0.45], [0, 1]);
  const markRotate = useTransform(p, [0.15, 0.5], [-35, 0]);
  const markX = useTransform(p, [0.15, 0.5], [60, 0]);
  const markOpacity = useTransform(p, [0.15, 0.4], [0, 0.9]);

  return (
    <section aria-label="Students supported by Goyo" className="overflow-hidden bg-white">
      <motion.div
        ref={ref}
        style={reduce ? undefined : { scale: panelScale }}
        className="relative h-[340px] w-full overflow-hidden rounded-3xl will-change-transform sm:h-[500px] sm:rounded-[40px] lg:h-[680px] lg:rounded-[48px]"
      >
        <img
          src="/banner/students.jpg"
          alt="Group of smiling international students looking at a laptop together in a lecture hall"
          className="absolute inset-0 h-full w-full object-cover object-[50%_30%]"
        />

        {/* Emerald wash fading in from the bottom-right corner */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            opacity: reduce ? 1 : washOpacity,
            background:
              'radial-gradient(70% 90% at 100% 100%, rgba(0,176,116,0.9) 0%, rgba(0,176,116,0.5) 20%, rgba(0,176,116,0) 42%)'
          }}
        />

        <motion.div
          aria-hidden="true"
          style={reduce ? { opacity: 0.9 } : { rotate: markRotate, x: markX, opacity: markOpacity }}
          className="absolute bottom-5 right-6 w-20 origin-right sm:bottom-8 sm:right-10 sm:w-28 lg:bottom-10 lg:right-14 lg:w-36"
        >
          <BrandMark fill="#FFFFFF" className="h-auto w-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
