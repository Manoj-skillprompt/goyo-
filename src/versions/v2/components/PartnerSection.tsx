import React, { useEffect, useRef } from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import { EYEBROW, EYEBROW_ON_DARK, SECTION_HEADING } from '../styles';
import { PARTNER_APPLY_HREF } from '../v2Data';

// Background media. The photo always shows (and is the video's poster). To switch to video, put
// a short muted loop in public/partner/ (≈8–15s, < 3MB, ideally .webm + .mp4) and set its path
// here. The video only plays on tablet/desktop, only while on screen, and never when the visitor
// prefers reduced motion; phones keep the photo.
const PARTNER_PHOTO = '/partner/partner.jpg';
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
  <section id="partner" className="scroll-mt-24 bg-white py-16 sm:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative isolate overflow-hidden rounded-3xl bg-[#0F172A]">
        {/* Background: photo (always), video on top when configured */}
        <img
          src={PARTNER_PHOTO}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[70%_50%]"
        />
        {PARTNER_VIDEO && <BackgroundVideo src={PARTNER_VIDEO} />}

        {/* Navy overlay, strongest behind the text so it stays readable over any frame */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.86) 40%, rgba(15,23,42,0.45) 75%, rgba(15,23,42,0.25) 100%)'
          }}
        />

        <div className="relative max-w-2xl px-6 py-14 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
          <p className={`${EYEBROW} ${EYEBROW_ON_DARK}`}>For partners</p>
          <h2 className={`${SECTION_HEADING} mt-2 text-white`}>Become our partner</h2>
          <p className="mt-5 text-[16px] leading-relaxed text-slate-200 sm:text-[18px]">
            We’ve reimagined the traditional, transactional world of OSHC with huge benefits for students and
            our partners. Discover how becoming a Your OSHC partner can accelerate your business.
          </p>
          <a
            href={PARTNER_APPLY_HREF}
            // Primary button (see SKILLS.md → Button)
            className="group mt-8 inline-flex h-14 min-w-[200px] items-center justify-center gap-2 rounded-xl border border-[#009662] bg-linear-to-b from-[#22C98D] to-[#00A86E] px-8 text-[16px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_1px_2px_rgba(15,23,42,0.12),0_4px_10px_-4px_rgba(0,150,98,0.45)] transition-[filter,transform] hover:brightness-[1.04] active:translate-y-px active:brightness-95"
          >
            Apply now
            <ArrowRight weight="bold" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </div>
  </section>
);
