import { FIELD_BAND_OUTER } from "../ascii-config"
import { alphaRamp, bayer, field, hash01, isGutterCell } from "../ascii-engine"

describe("bayer", () => {
	it("produces an n x n matrix", () => {
		expect(bayer(8)).toHaveLength(64)
		expect(bayer(4)).toHaveLength(16)
	})

	it("is centred on zero, so density changes do not bias the field", () => {
		const m = bayer(8)
		const sum = m.reduce((a, b) => a + b, 0)
		expect(Math.abs(sum)).toBeLessThan(1e-5)
	})

	it("spans symmetrically inside (-0.5, 0.5)", () => {
		const m = bayer(8)
		expect(Math.min(...m)).toBeCloseTo(-0.5 + 0.5 / 64, 6)
		expect(Math.max(...m)).toBeCloseTo(0.5 - 0.5 / 64, 6)
	})

	it("contains every threshold exactly once", () => {
		const m = bayer(4)
		expect(new Set(Array.from(m))).toHaveProperty("size", 16)
	})
})

describe("field", () => {
	it("stays within [0, 1] across the grid and over time", () => {
		for (let t = 0; t < 20; t += 0.37) {
			for (let x = 0; x < 40; x++) {
				for (let y = 0; y < 40; y++) {
					const v = field(x, y, t)
					expect(v).toBeGreaterThanOrEqual(0)
					expect(v).toBeLessThanOrEqual(1)
				}
			}
		}
	})

	it("is deterministic for a given (x, y, t)", () => {
		expect(field(7, 11, 1.5)).toBe(field(7, 11, 1.5))
	})

	it("actually varies over time", () => {
		expect(field(7, 11, 0)).not.toBeCloseTo(field(7, 11, 3), 3)
	})

	it("holds its mean steady over time, so the page never pulses light and dark", () => {
		const means: number[] = []
		for (let t = 0; t < 12; t += 0.5) {
			let sum = 0
			let n = 0
			for (let y = 0; y < 64; y++) {
				for (let x = 0; x < 180; x++) {
					sum += field(x, y, t)
					n++
				}
			}
			means.push(sum / n)
		}
		// The naive axis-aligned version swings ~0.09 here, which reads as the
		// whole background breathing.
		expect(Math.max(...means) - Math.min(...means)).toBeLessThan(0.02)
	})

	it("does not band along rows", () => {
		const rowMeans: number[] = []
		for (let y = 0; y < 64; y++) {
			let sum = 0
			for (let x = 0; x < 180; x++) sum += field(x, y, 3)
			rowMeans.push(sum / 180)
		}
		let delta = 0
		for (let i = 1; i < rowMeans.length; i++) delta += Math.abs(rowMeans[i] - rowMeans[i - 1])
		expect(delta / (rowMeans.length - 1)).toBeLessThan(0.05)
	})
})

describe("alphaRamp", () => {
	it("runs from fully transparent to fully opaque", () => {
		const a = alphaRamp(6)
		expect(a[0]).toBe(0)
		expect(a[5]).toBe(1)
	})

	it("increases monotonically", () => {
		const a = alphaRamp(6)
		for (let i = 1; i < a.length; i++) expect(a[i]).toBeGreaterThan(a[i - 1])
	})
})

describe("hash01", () => {
	it("is stable per cell", () => {
		expect(hash01(12, 34)).toBe(hash01(12, 34))
	})

	it("scatters rather than laying accents on a lattice", () => {
		// A cheap `(x * 7 + y * 13) & 63` hash puts every selected cell on a
		// regular diagonal, which reads as a pattern rather than as sparkle.
		const rate = 0.02
		const picks: Array<[number, number]> = []
		for (let y = 0; y < 64; y++) {
			for (let x = 0; x < 180; x++) if (hash01(x, y) < rate) picks.push([x, y])
		}
		// Hits roughly the requested fraction...
		expect(picks.length / (64 * 180)).toBeGreaterThan(rate * 0.7)
		expect(picks.length / (64 * 180)).toBeLessThan(rate * 1.3)
		// ...and no single (x + y) diagonal collects a disproportionate share.
		const byDiagonal = new Map<number, number>()
		for (const [x, y] of picks) byDiagonal.set(x + y, (byDiagonal.get(x + y) ?? 0) + 1)
		expect(Math.max(...byDiagonal.values())).toBeLessThan(picks.length / 4)
	})

	it("stays in [0, 1)", () => {
		for (let x = 0; x < 200; x++) {
			for (let y = 0; y < 50; y++) {
				const v = hash01(x, y)
				expect(v).toBeGreaterThanOrEqual(0)
				expect(v).toBeLessThan(1)
			}
		}
	})
})


describe("isGutterCell — the two-tier field's accessibility contract", () => {
	const cellW = 13
	const viewportW = 1920
	const centre = viewportW / 2

	it("never allows the bright tier inside the content band", () => {
		const cols = Math.ceil(viewportW / cellW)
		for (let x = 0; x < cols; x++) {
			if (!isGutterCell(x, cellW, viewportW)) continue
			// Every cell it *does* allow must lie wholly outside the band.
			const left = x * cellW
			const right = left + cellW
			const outside =
				right <= centre - FIELD_BAND_OUTER || left >= centre + FIELD_BAND_OUTER
			expect(outside).toBe(true)
		}
	})

	it("keeps a cell straddling the band edge on the dim tier", () => {
		// The cell containing the exact boundary must not be promoted.
		const boundary = centre - FIELD_BAND_OUTER
		const straddling = Math.floor(boundary / cellW)
		expect(isGutterCell(straddling, cellW, viewportW)).toBe(false)
	})

	it("does light up the far gutters on a wide viewport", () => {
		expect(isGutterCell(0, cellW, viewportW)).toBe(true)
		expect(isGutterCell(Math.ceil(viewportW / cellW) - 1, cellW, viewportW)).toBe(true)
	})

	it("promotes nothing at all when there are no gutters", () => {
		// 1120px shell on a 1200px viewport: the band covers the whole width.
		const narrow = 1200
		const cols = Math.ceil(narrow / cellW)
		for (let x = 0; x < cols; x++) {
			expect(isGutterCell(x, cellW, narrow)).toBe(false)
		}
	})
})
