/**
 * Tuning constants for the background field.
 *
 * The single biggest "tasteful vs. gimmicky" lever is the glyph ramp. The
 * classic " .:-=+*#%@" ramp has a bright `*#%@` tail that reads as a screensaver;
 * these ramps stop at `+` so the field averages dark and stays texture, not art.
 */
export const RAMP_SPARSE = " .:-=+"
/** Kept for reference; presets deliberately all use one ramp now. */
export const RAMP_DOTS = " ·∙•"

export interface FieldPreset {
	/** Time multiplier. Lower drifts slower. */
	speed: number
	/** Scales field magnitude before quantising to a glyph index. */
	density: number
	ramp: string
	/** Fraction of the brightest cells tinted with the accent colour. 0–0.02. */
	accent: number
}

/**
 * Section presets.
 *
 * Two deliberate constraints after seeing this in motion:
 *
 *  - Every preset uses the SAME ramp. A ramp swap is discrete, so crossing a
 *    section boundary made the whole field's character snap rather than drift.
 *  - The speed range is narrow and slow. The field is ambient texture, not an
 *    animation to watch; anything faster competes with the act of reading and
 *    reads as noise while scrolling.
 */
export const PRESETS: Record<string, FieldPreset> = {
	hero: { speed: 0.16, density: 0.7, ramp: RAMP_SPARSE, accent: 0.02 },
	focus: { speed: 0.11, density: 0.5, ramp: RAMP_SPARSE, accent: 0.01 },
	work: { speed: 0.09, density: 0.44, ramp: RAMP_SPARSE, accent: 0 },
	experience: { speed: 0.09, density: 0.4, ramp: RAMP_SPARSE, accent: 0 },
	credentials: { speed: 0.08, density: 0.38, ramp: RAMP_SPARSE, accent: 0 },
	contact: { speed: 0.13, density: 0.52, ramp: RAMP_SPARSE, accent: 0.01 },
}

/**
 * How far the drift is slowed while the page is actually being scrolled, and
 * how long after the last scroll event it takes to come back. A background that
 * keeps drifting under moving content is what reads as "moving too much".
 */
export const SCROLL_DAMP = 0.12
export const SCROLL_SETTLE_MS = 260

export const DESKTOP = {
	cellW: 13,
	cellH: 21,
	maxCells: 14_000,
	fps: 15,
	dprCap: 1.5,
} as const

export const MOBILE = {
	cellW: 18,
	cellH: 28,
	maxCells: 4_000,
	fps: 12,
	dprCap: 1,
} as const

/**
 * Hard luminance cap on the brightest glyph — mirrors `--field-max` in
 * globals.css. Body text contrast is computed against this value, so it must
 * not drift from the CSS token.
 */
export const FIELD_MAX = "#2c2c32"

/**
 * The gutter tier. Roughly 3x the luminance of FIELD_MAX, which is what makes
 * the field actually visible — but it is only ever painted outside the content
 * band (see isGutterCell), so it sits behind no text and is exempt from the
 * contrast math. Mirrors --field-max-edge.
 */
export const FIELD_MAX_EDGE = "#4a4a54"

/**
 * Half-width of the text column, px. Mirrors --field-band-outer, deliberately
 * the mask's OUTER edge rather than its inner one: between the two the mask is
 * mid-fade, so a bright cell there would be partly visible behind content that
 * runs close to the shell edge.
 */
export const FIELD_BAND_OUTER = 610
export const FIELD_ACCENT = "#f2a65a"

/**
 * The atlas is rasterised exactly once, so a fallback-metrics atlas would never
 * self-correct — worse than ordinary FOUT. System monospace is always available
 * at atlas-build time, which is why the field uses it even though the UI is
 * set in Geist Mono.
 */
export const ATLAS_FONT = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
