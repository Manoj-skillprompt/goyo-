# YourPortal React + TypeScript + Tailwind CSS

A modern, high-performance React application converted from `/home/manoj/work/yo-portal`.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite 6**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Framer Motion** (`framer-motion`)
- **Heroicons** (`@heroicons/react`)
- Custom CSS keyframe animations, 3D perspective decks, and liquid styling

## Framer Motion Animations Implemented

1. **3D Interactive Card Deck (`ProductOverview.tsx`)**:
   - `motion.div` with spring physics (`stiffness: 70, damping: 18`) fanning out 4 layered cards in 3D perspective (`rotateZ`, `rotateY`, `z`, `x`, `y`, `scale`).
   - Natural interactive hover elevation with `whileHover`.
   - Viewport visibility detection with `useInView`.

2. **Liquid Benefits Expanding Card (`BenefitsCard.tsx`)**:
   - Smooth layout pill animations using `layoutId="activeTabBadge"` with spring transitions.
   - Crossfade text transitions between Students and Partners using `AnimatePresence mode="wait"`.
   - Physics-based card lift and tilt with `whileHover={{ y: -6, scale: 1.01 }}`.
   - Looping ambient auroras using `motion.div` with multi-keyframe easing.

3. **Hero Preview Window Carousel (`Hero.tsx`)**:
   - Smooth image transitions using `AnimatePresence` with coordinated scale and opacity easing.
   - Initial entrance animation for header and action elements.

4. **Four-Step Workflow Process (`WorkflowProcess.tsx`)**:
   - `AnimatePresence` image preview switching with subtle blur and scale transitions.
   - Declarative step content accordion expansion with `height: 'auto'` and `height: 0`.

5. **Rate Calculator & Agent Login Modals (`RateCalculatorModal.tsx`, `AgentModal.tsx`)**:
   - Backdrop fade-in / fade-out with `AnimatePresence`.
   - Dialog popup with spring physics (`type: 'spring', damping: 25, stiffness: 300`).
   - Segment tab switching with `layoutId="calcTabPill"`.
   - Staggered plan results entry.

6. **Frequently Asked Questions Accordion (`FAQSection.tsx`)**:
   - Physics-driven height and opacity expand/collapse with `AnimatePresence`.

7. **Trust & Scale Metrics (`PartnersMetrics.tsx`)**:
   - Viewport-triggered staggered card reveal with `whileHover={{ y: -4 }}`.

## Getting Started

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```
