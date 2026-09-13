# pmukherjee.com

Personal site for Pritam Mukherjee — software engineer working on agent systems.

## Stack

- **Next.js 15** (App Router) / **React 19** / **TypeScript**
- **Tailwind CSS 3.4** with CSS-variable design tokens
- **Geist Sans / Geist Mono**, self-hosted via `next/font`
- **Jest** + Testing Library
- No animation library, no UI framework — see below

## Design notes

**Everything renders without JavaScript.** The page is server-rendered end to end;
the only client islands are the mobile nav sheet, the scroll-reveal observer, and
the background canvas. Reveal animations are CSS scoped to `html[data-js]`, which
an inline script sets before first paint — with JS off, all content is simply
visible. This is deliberate: the previous version left the hero blank until a
typing animation's `onComplete` fired.

**The background is a hand-written ASCII field over an engineering dot grid** —
a 2D canvas glyph grid, no dependencies, ~3KB. It is capped hard rather than
tuned loosely:

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

**The field is two-tier, and the split is the accessibility contract.** The mask
punches the field *out* of the content column and shows it in the side gutters —
the opposite of the usual vignette, because text lives in the middle. Inside the
column the brightest glyph is capped at `--field-max`; in the gutters it is ~3×
brighter. The split is a pure `isGutterCell()` keyed off the mask's outer edge,
so no cell inside the text column can ever be promoted, and
`ascii-engine.test.ts` asserts exactly that.

**Contrast is computed against `--field-max`**, the brightest pixel that can
appear behind text, not against the page background — and enforced by rasterising
the glyph atlas in that colour rather than in white and hoping the mask dims it.
`src/app/__tests__/contrast.test.ts` parses the tokens straight out of
`globals.css` and fails if any text token drops below WCAG AA against it.

**Diagrams are isometric SVG, rendered on the server.** `src/lib/iso.ts` is a 2:1
dimetric projection — chosen over true 30° because integer world coordinates give
integer screen coordinates, which is what lets the dot grid be a single
`<pattern>`, keeps 1px diagonals from beating against the pixel grid, and makes
glyph hinting identical between nodes. Every project's architecture stack comes
from one data-driven component; the four Focus diagrams compose from the same
primitives. Zero client JS: face colours derive from one `--iso-base` via
`color-mix`, connectors draw themselves in with `pathLength="100"` and CSS
`stroke-dashoffset` (no `getTotalLength()`), and the accent pulse rides
`offset-path` so `prefers-reduced-motion` can switch it off.

**The nav has three states** — full bar, two floating pills, expanded panel —
spring-eased with CSS `linear()`. The header is fixed and the panel absolutely
positioned, so nothing animates page layout. Without JavaScript the trigger and
panel are hidden and the inline links show at every width, so the nav is never a
dead control.

## Structure

```
src/
├─ app/                 layout, page, globals.css, generated OG image
├─ components/
│  ├─ background/       ASCII field: config, engine, client island
│  ├─ iso/              isometric primitives + the six diagrams
│  ├─ motion/           Reveal (server), RevealRoot, PointerSpotlight
│  ├─ sections/         Hero, Focus, Work, Experience, Credentials, Contact
│  └─ ui/               Tag, SectionHeader, ExternalLink
├─ data/                all copy lives here, not in components
├─ lib/                 cn(), iso projection
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
