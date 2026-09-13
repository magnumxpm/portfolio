import { readFileSync } from "node:fs"
import { join } from "node:path"

import { FIELD_ACCENT, FIELD_MAX } from "@/components/background/ascii-config"

/**
 * The background field paints text-coloured glyphs behind real copy, so the
 * usual "check the text against the page background" is not good enough: the
 * worst case is text over the brightest glyph the field can produce. These
 * tests lock that worst case, so nobody can nudge a token lighter (or the field
 * brighter) without the failure showing up here rather than in an audit.
 */

const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8")

function token(name: string): string {
	const match = css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`))
	if (!match) throw new Error(`token --${name} not found in globals.css`)
	return match[1]
}

function relativeLuminance(hex: string): number {
	const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
	const [r, g, b] = channels.map((v) =>
		v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
	)
	return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a: string, b: string): number {
	const la = relativeLuminance(a)
	const lb = relativeLuminance(b)
	return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

const AA = 4.5

describe("contrast over the background field", () => {
	it("keeps the engine's brightest glyph in sync with the --field-max token", () => {
		expect(FIELD_MAX.toLowerCase()).toBe(token("field-max").toLowerCase())
	})

	it.each(["text", "text-dim", "text-faint"])(
		"--%s clears WCAG AA over the brightest possible field pixel",
		(name) => {
			expect(contrast(token(name), token("field-max"))).toBeGreaterThanOrEqual(AA)
		}
	)

	it.each(["text", "text-dim", "text-faint", "accent"])(
		"--%s clears WCAG AA over the page background",
		(name) => {
			expect(contrast(token(name), token("bg"))).toBeGreaterThanOrEqual(AA)
		}
	)

	it("keeps dark text on the accent button legible", () => {
		expect(contrast(token("accent"), token("bg"))).toBeGreaterThanOrEqual(AA)
	})

	it("keeps the accent glyph colour in sync with the --accent token", () => {
		expect(FIELD_ACCENT.toLowerCase()).toBe(token("accent").toLowerCase())
	})
})
