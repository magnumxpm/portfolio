# pmukherjee.com

Personal site for Pritam Mukherjee — software engineer working on agent systems.

## Stack

- **Next.js 15** (App Router) / **React 19** / **TypeScript**
- **Tailwind CSS 3.4** with CSS-variable design tokens
- **Geist Sans / Geist Mono**, self-hosted via `next/font`
- **Jest** + Testing Library
- No animation library — see below

## Design notes

**Everything renders without JavaScript.** The page is server-rendered end to end;
the only client islands are the mobile nav sheet, the scroll-reveal observer, and
the background canvas. Reveal animations are CSS scoped to `html[data-js]`, which
an inline script sets before first paint — with JS off, all content is simply
visible. This is deliberate: the previous version left the hero blank until a
typing animation's `onComplete` fired.

**The background is a hand-written ASCII/dither field** — a 2D canvas glyph grid,
no dependencies, ~3KB. It is capped hard rather than tuned loosely:

| | Desktop | Mobile |
|---|---|---|
| Cell size | 9 × 15 px | 15 × 24 px |
| Max cells | 14,000 | 4,000 |
| Frame rate | 15 fps | 12 fps |
| DPR cap | 1.5 | 1.0 |

A glyph atlas is rasterised once and blitted with `drawImage`; a dirty-cell diff
means only ~1.5% of cells are redrawn per frame. It never re-renders React after
mount, pauses on `visibilitychange`, starts only after `requestIdleCallback`, and
never runs at all under `prefers-reduced-motion` or on low-power devices — where
a static Bayer texture (always present under the canvas) carries the look instead.

Two properties of the field function are load-bearing and documented at the call
site in `src/components/background/ascii-engine.ts`: the waves are directional
(axis-aligned ones band into scanlines) and mutually non-commensurate (otherwise
the whole page pulses light and dark). Both are covered by tests.

**Contrast is computed against `--field-max`**, the brightest possible pixel
behind body text, not against the page background.

## Structure

```
src/
├─ app/                 layout, page, globals.css, generated OG image
├─ components/
│  ├─ background/       ASCII field: config, engine, client island
│  ├─ motion/           Reveal (server) + RevealRoot (one observer)
│  ├─ sections/         Hero, Focus, Work, Experience, Credentials, Contact
│  └─ ui/               Tag, SectionHeader, ExternalLink, sheet
├─ data/                all copy lives here, not in components
├─ lib/
└─ types/
```

## Development

```bash
npm install
npm run dev
npm run build
npm test
npm run lint
```

## Verifying the background

Chrome DevTools → Performance, 4× CPU throttle, 5s scroll trace. Budget: ≤3ms
per rendered frame on desktop, zero long tasks, ≤4.5% main-thread share. Lighthouse
is the wrong instrument — its trace window ends before the deferred loop starts.
