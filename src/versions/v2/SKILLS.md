# V2 Design Skills

Reusable UI patterns for the V2 landing page. Each skill gives the exact classes to copy so new
sections stay consistent with the hero. Font is Inter (`font-secondary`, set on the V2 root).

## Colour tokens

| Role | Hex | Use |
| --- | --- | --- |
| Primary | `#00B074` | Primary CTAs, success states, accents on dark backgrounds |
| Primary hover / border | `#009662` | Hover, press, primary button border, icons |
| Primary dark | `#047857` | Green **text** on light backgrounds (labels, small links), dark green surfaces |
| Secondary accent | `#1E40AF` | Secondary links, comparison highlights |
| Heading | `#0F172A` (`slate-900`) | Headlines, titles, dark panels |
| Body | `#475569` (`slate-600`) | Paragraphs, helper text |
| Muted text | `#64748B` (`slate-500`) | Captions, price labels, secondary text on light backgrounds |
| Muted (non-text) | `#94A3B8` (`slate-400`) | Inactive icons, placeholders; text only on dark backgrounds |
| Surface | `#FFFFFF` | Cards, nav |
| Canvas | `#F8FAFC` (`slate-50`) | Page background |
| Border | `#E2E8F0` (`slate-200`) | Card borders, dividers |

These are the only greens. Product brand colours (yourOSHC, yourOVHC, yourADMISSION, OrbitProtect)
stay on their own product cards.

### Accessibility rules

- Text on white must reach 4.5:1. That's why small green text uses `#047857`, not `#00B074` or
  `#009662`, and grey text uses `slate-500` or darker, never `slate-400`.
- No text smaller than 12px.

---

## Skill: Typography

One type scale, defined in [styles.ts](styles.ts). Use these for every heading; add only colour
and margin classes, and never override size, weight or tracking.

| Token | Use | Size (phone → desktop) | Weight |
| --- | --- | --- | --- |
| `DISPLAY` | Hero `h1` only | 44 → 56 → 68px | Bold |
| `SECTION_HEADING` | Every section `h2` | 30 → 36 → 40px | Bold |
| `SUBHEADING` | Large sub-heading inside a section (e.g. each reason) | 24 → 28px | Bold |
| `CARD_TITLE` | Card and step titles (`h3`) | 18 → 20px | Semibold |
| `EYEBROW` + `EYEBROW_ON_LIGHT` / `EYEBROW_ON_DARK` | Small uppercase label above a heading | 13px | Semibold |

```tsx
import { EYEBROW, EYEBROW_ON_LIGHT, SECTION_HEADING } from '../styles';

<p className={`${EYEBROW} ${EYEBROW_ON_LIGHT}`}>How it works</p>
<h2 className={`${SECTION_HEADING} text-slate-900`}>Everything revolves around you</h2>
```

- Write headings in sentence case.
- Body text is 15–17px, captions 12–14px.

---

## Skill: Button

Tactile buttons: a soft vertical gradient, a 1px border, a 1px inner highlight along the top
edge and a small drop shadow. Rounded rectangle (`rounded-xl`), not a pill. Reference:
the hero CTAs in [components/V2Hero.tsx](components/V2Hero.tsx).

### Primary

For the single most important action in a section (for example "Find my cover").

```tsx
<a
  href="#products"
  className="inline-flex h-14 min-w-[200px] items-center justify-center rounded-xl border border-[#009662] bg-linear-to-b from-[#22C98D] to-[#00A86E] px-8 text-[16px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_1px_2px_rgba(15,23,42,0.12),0_4px_10px_-4px_rgba(0,150,98,0.45)] transition-[filter,transform] hover:brightness-[1.04] active:translate-y-px active:brightness-95"
>
  Find my cover
</a>
```

### Secondary

For the alternative action next to a primary (for example "Compare providers").

```tsx
<a
  href="#providers"
  className="inline-flex h-14 min-w-[200px] items-center justify-center rounded-xl border border-zinc-300 bg-linear-to-b from-white to-zinc-100 px-8 text-[16px] font-semibold text-slate-900 shadow-[inset_0_1px_0_#ffffff,0_1px_2px_rgba(15,23,42,0.08)] transition-[filter,transform] hover:brightness-[0.99] active:translate-y-px active:to-zinc-200"
>
  Compare providers
</a>
```

### Anatomy

| Part | Primary | Secondary |
| --- | --- | --- |
| Height / min width | `h-14` (56px) / `min-w-[200px]` | same |
| Padding / radius | `px-8` / `rounded-xl` | same |
| Fill | gradient `#22C98D` → `#00A86E` | gradient `white` → `zinc-100` |
| Border | 1px `#009662` | 1px `zinc-300` |
| Text | 16px, `font-medium`, white | 16px, `font-semibold`, `slate-900` |
| Top highlight | `inset 0 1px 0 rgba(255,255,255,0.28)` | `inset 0 1px 0 #fff` |
| Shadow | 1px contact + soft emerald glow | 1px contact only |

### States

- **Hover:** a slight brightness shift (`hover:brightness-[1.04]` primary, `[0.99]` secondary). No colour swap, no scale.
- **Press:** move down 1px (`active:translate-y-px`) and darken slightly.
- **Focus:** keep the browser focus ring. If you add a custom one, use `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B074]`.
- **Disabled:** add `pointer-events-none opacity-50` and `aria-disabled="true"` on links, or `disabled` on `<button>`.

### Rules

- Use one primary per group; pair it with at most one secondary, primary first.
- Labels are short verb phrases in sentence case ("Find my cover", not "FIND MY COVER").
- No icons inside these buttons; the gradient and border carry the affordance.
- Place pairs in `flex flex-wrap items-center gap-4` so they stack cleanly on phones.
- Use `<a>` for navigation (anchors, routes) and `<button type="button">` for actions.
- Use emerald only for primary. Don't recolour the secondary button with brand colours.

### Small variant

For dense areas such as cards or the nav, keep the same fill, border and shadow, and change
only the size: `h-10 min-w-0 px-4 text-[14px] rounded-lg`. Used by "Get a quote" in
[components/V2Nav.tsx](components/V2Nav.tsx).

### Brand variant

For product-specific actions (the product card buttons), use the product's own colour instead
of emerald, with the same tactile treatment. The colour comes from `product.colorDeep` in
[v2Data.ts](v2Data.ts), so this is set with inline styles. Reference:
[components/ProductCard.tsx](components/ProductCard.tsx).

```tsx
<button
  type="button"
  className="inline-flex h-10 items-center justify-center rounded-lg border px-4 text-[13px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_1px_2px_rgba(15,23,42,0.12)] transition-[filter,transform] hover:brightness-[1.06] active:translate-y-px active:brightness-95"
  style={{
    // White sheen over the brand colour gives the lighter-top gradient.
    background: `linear-gradient(to bottom, rgba(255,255,255,0.16), rgba(255,255,255,0)), ${product.colorDeep}`,
    // Border is the brand colour mixed 20% toward black.
    borderColor: `color-mix(in srgb, ${product.colorDeep} 80%, black)`
  }}
>
  {product.cta}
</button>
```

The brand colour must be dark enough for white text (at least 4.5:1). That's why the cards use
`colorDeep`, not `color`: yourOVHC's bright yellow `#FFCC00` would fail.
