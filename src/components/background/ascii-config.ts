/**
 * Tuning constants for the background field.
 *
 * The single biggest "tasteful vs. gimmicky" lever is the glyph ramp. The
 * classic " .:-=+*#%@" ramp has a bright `*#%@` tail that reads as a screensaver;
 * these ramps stop at `+` so the field averages dark and stays texture, not art.
 */
export const RAMP_SPARSE = " .:-=+"
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
 * Speeds are tuned against measured dirty-cell churn: at 15fps the hero redraws
 * ~1.5% of cells per frame (~176 drawImage calls) and the quieter sections ~0.2%.
 * Raising speed is cheap; raising density is not.
 */
export const PRESETS: Record<string, FieldPreset> = {
	hero: { speed: 0.55, density: 0.55, ramp: RAMP_SPARSE, accent: 0.02 },
	focus: { speed: 0.32, density: 0.35, ramp: RAMP_DOTS, accent: 0.01 },
	work: { speed: 0.25, density: 0.3, ramp: RAMP_DOTS, accent: 0 },
	experience: { speed: 0.22, density: 0.26, ramp: RAMP_DOTS, accent: 0 },
	credentials: { speed: 0.2, density: 0.24, ramp: RAMP_DOTS, accent: 0 },
	contact: { speed: 0.4, density: 0.4, ramp: RAMP_SPARSE, accent: 0.01 },
}

export const DESKTOP = {
	cellW: 9,
	cellH: 15,
	maxCells: 14_000,
	fps: 15,
	dprCap: 1.5,
} as const

export const MOBILE = {
	cellW: 15,
	cellH: 24,
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
export const FIELD_ACCENT = "#f2a65a"

/**
 * The atlas is rasterised exactly once, so a fallback-metrics atlas would never
 * self-correct — worse than ordinary FOUT. System monospace is always available
 * at atlas-build time, which is why the field uses it even though the UI is
 * set in Geist Mono.
 */
export const ATLAS_FONT = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
