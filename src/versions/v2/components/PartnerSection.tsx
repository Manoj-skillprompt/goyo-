import React, { useEffect, useRef } from 'react';
import { BUTTON_PRIMARY, EYEBROW, EYEBROW_ON_LIGHT, SECTION_HEADING } from '../styles';
import { PARTNER_APPLY_HREF } from '../v2Data';
import { BrandMark } from './BrandMark';

// "Become our partner": a full-width, edge-to-edge photo kept clear (no text over the people), with
// a white card overlapping its bottom edge. Deliberately light so it reads differently from the
// FAQ's navy panel and the navy footer right below.
//
// Background media: the photo always shows (and is the video's poster). To switch to video, put a
// short muted loop in public/partner/ (≈8–15s, < 3MB) and set PARTNER_VIDEO. It plays only on
// tablet/desktop, only while on screen, and never for visitors who prefer reduced motion.
// Photo: Unsplash photo-1600880292203-757bb62b4baf, stored in public/partner/.
const PARTNER_PHOTO = '/partner/partner-wide.jpg';
const PARTNER_VIDEO: string | null = null;

const BackgroundVideo: React.FC<{ src: string }> = ({ src }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduce.matches) {
          video.play().catch(() => {
            /* autoplay blocked: the poster photo stays */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={PARTNER_PHOTO}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      className="absolute inset-0 hidden h-full w-full object-cover md:block"
    />
  );
};

export const PartnerSection: React.FC = () => (
  <section id="partner" className="relative scroll-mt-24 bg-white pb-10 sm:pb-12">
    {/* Full-width photo, kept clear: no text sits over the people */}
    <div className="relative h-[440px] w-full overflow-hidden sm:h-[580px] lg:h-[760px]">
      <img
        src={PARTNER_PHOTO}
        alt="Two business partners celebrating a deal with a high five in a bright office"
        className="absolute inset-0 h-full w-full object-cover object-[50%_22%]"
      />
      {PARTNER_VIDEO && <BackgroundVideo src={PARTNER_VIDEO} />}
      {/* Soft fade into the page at the bottom, under where the card overlaps */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-white/60 to-transparent" />
      {/* Brand corner, matching the students banner: emerald glow + white swoosh bottom-right */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 90% at 100% 100%, rgba(0,176,116,0.9) 0%, rgba(0,176,116,0.5) 20%, rgba(0,176,116,0) 42%)'
        }}
      />
      <BrandMark
        fill="#FFFFFF"
        className="pointer-events-none absolute bottom-5 right-6 h-auto w-20 opacity-90 sm:bottom-8 sm:right-10 sm:w-28 lg:bottom-10 lg:right-14 lg:w-36"
      />
    </div>

    {/* Card overlapping the photo's bottom edge */}
    <div className="relative mx-auto -mt-40 max-w-7xl px-4 sm:-mt-56 sm:px-6 lg:-mt-72 lg:px-8">
      <div className="relative w-full max-w-[600px] overflow-hidden rounded-[28px] bg-white p-8 ring-1 ring-slate-900/[0.06] shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_24px_-12px_rgba(15,23,42,0.12),0_40px_80px_-32px_rgba(15,23,42,0.28)] sm:p-11 lg:p-12">
        <div className="relative">
          <p className={`${EYEBROW} ${EYEBROW_ON_LIGHT}`}>For partners</p>
          <h2 className={`${SECTION_HEADING} mt-3 text-slate-900`}>
            Become our <span className="text-[#00B074]">partner</span>
          </h2>
          <p className="mt-5 max-w-[48ch] text-[16px] leading-[1.7] text-slate-600 sm:text-[17px]">
            We’ve reimagined the traditional, transactional world of OSHC with huge benefits for students and
            our partners. Discover how becoming a Your OSHC partner can accelerate your business.
          </p>

          <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:gap-6">
            <a href={PARTNER_APPLY_HREF} className={`${BUTTON_PRIMARY} shrink-0`}>
              Apply now
            </a>
            <p className="text-[14px] leading-snug text-slate-500">
              Prefer to talk first?
              <br />
              <a
                href="mailto:support@youroshc.com.au"
                className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-[#047857] hover:decoration-[#00B074]"
              >
                support@youroshc.com.au
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
