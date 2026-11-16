// Shared V2 type scale. Use these for every heading so sizes and weights stay consistent across
// the page; add only colour/margin classes alongside them. See SKILLS.md → Typography.

/** Page headline (the hero h1). */
export const DISPLAY = 'text-[44px] sm:text-[56px] lg:text-[68px] font-bold leading-[1.04] tracking-[-0.04em]';

/** Every section heading (h2). */
export const SECTION_HEADING = 'text-[30px] sm:text-[36px] lg:text-[40px] font-bold leading-[1.1] tracking-[-0.03em]';

/** Large sub-heading inside a section (e.g. each "Why choose Goyo" reason). */
export const SUBHEADING = 'text-[24px] sm:text-[28px] font-bold leading-[1.15] tracking-[-0.02em]';

/** Card and step titles (h3). */
export const CARD_TITLE = 'text-[18px] sm:text-[20px] font-semibold leading-snug tracking-[-0.01em]';

/** Primary button (SKILLS.md → Button). Use for the main action in a section. No icons inside. */
export const BUTTON_PRIMARY =
  'inline-flex h-14 min-w-[200px] items-center justify-center rounded-xl border border-[#009662] bg-linear-to-b from-[#22C98D] to-[#00A86E] px-8 text-[16px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_1px_2px_rgba(15,23,42,0.12),0_4px_10px_-4px_rgba(0,150,98,0.45)] transition-[filter,transform] hover:brightness-[1.04] active:translate-y-px active:brightness-95 cursor-pointer';

/** Secondary button (SKILLS.md → Button). Use for the alternative action next to a primary. */
export const BUTTON_SECONDARY =
  'inline-flex h-14 min-w-[200px] items-center justify-center rounded-xl border border-zinc-300 bg-linear-to-b from-white to-zinc-100 px-8 text-[16px] font-semibold text-slate-900 shadow-[inset_0_1px_0_#ffffff,0_1px_2px_rgba(15,23,42,0.08)] transition-[filter,transform] hover:brightness-[0.99] active:translate-y-px active:to-zinc-200 cursor-pointer';

/**
 * Compact size for the floating nav only, where a 56px button would fill the whole bar.
 * Same look as the primary/secondary; append after BUTTON_PRIMARY to override the size.
 */
export const BUTTON_COMPACT = '!h-10 !min-w-0 !px-4 !text-[14px]';

/** Small uppercase label above a section heading. Pair with EYEBROW_ON_LIGHT / EYEBROW_ON_DARK. */
export const EYEBROW = 'text-[13px] font-semibold uppercase tracking-[0.12em]';
export const EYEBROW_ON_LIGHT = 'text-[#047857]';
export const EYEBROW_ON_DARK = 'text-[#00B074]';
