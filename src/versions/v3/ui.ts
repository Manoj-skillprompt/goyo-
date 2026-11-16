// Shared type and layout for V3's own sections, matching the hero and "How it works" designs:
// Inter, ink #0F172A, slate copy, brand green #22B25C with #15803D for text on light grounds.

export const CONTAINER = 'mx-auto max-w-[1200px] px-4 sm:px-6 xl:px-0';

export const H2 = 'm-0 text-[30px] font-extrabold leading-[1.12] tracking-[-0.025em] text-[#0F172A] sm:text-[36px] lg:text-[42px]';

export const LEAD = 'm-0 text-[17px] leading-[1.6] text-[#475569]';

export const BTN_PRIMARY =
  'inline-flex h-[52px] cursor-pointer items-center gap-2.5 rounded-2xl bg-[#22B25C] px-7 text-[16px] font-bold text-white no-underline shadow-[0_12px_28px_rgba(34,178,92,0.35)] transition-transform duration-200 hover:-translate-y-0.5 hover:text-white';

export const scrollToId = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
