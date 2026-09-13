import { elbow, fitAspect, handle, iso, longestMidpoint, poly, screenBounds, U } from "../iso"

describe("iso projection", () => {
	it("puts the origin at the origin", () => {
		expect(iso(0, 0, 0)).toEqual({ sx: 0, sy: 0 })
	})

	it("returns integers for integer input — the whole reason for 2:1 over 30°", () => {
		for (let x = -8; x <= 8; x++) {
			for (let y = -8; y <= 8; y++) {
				for (let z = -4; z <= 4; z++) {
					const { sx, sy } = iso(x, y, z)
					expect(Number.isInteger(sx)).toBe(true)
					expect(Number.isInteger(sy)).toBe(true)
				}
			}
		}
	})

	it("is affine: iso(a + b) === iso(a) + iso(b) − iso(0)", () => {
		const a = iso(3, 5, 2)
		const b = iso(7, -1, 4)
		const sum = iso(10, 4, 6)
		expect(sum.sx).toBe(a.sx + b.sx)
		expect(sum.sy).toBe(a.sy + b.sy)
	})

	it("projects the basis vectors to (U,H), (−U,H) and (0,−U)", () => {
		expect(iso(1, 0, 0)).toEqual({ sx: U, sy: U / 2 })
		expect(iso(0, 1, 0)).toEqual({ sx: -U, sy: U / 2 })
		expect(iso(0, 0, 1)).toEqual({ sx: 0, sy: -U })
	})

	it("tiles the ground lattice at exactly 2U × U, so the dot grid is one pattern", () => {
		// (1,1) and (1,-1) generate the ground lattice; their images must span a
		// rectangle of 2U × U containing exactly two lattice points.
		const a = iso(1, 1, 0) // (0, U)
		const b = iso(1, -1, 0) // (2U, 0)
		expect(a).toEqual({ sx: 0, sy: U })
		expect(b).toEqual({ sx: 2 * U, sy: 0 })
	})

	it("keeps the z axis exactly vertical", () => {
		expect(iso(2, 3, 0).sx).toBe(iso(2, 3, 9).sx)
	})
})

describe("screenBounds", () => {
	it("uses all eight corners, not just min and max", () => {
		// A flat square on the ground: min and max alone would give zero width.
		const b = screenBounds([0, 0, 0], [4, 4, 0], 0)
		expect(b.width).toBe(8 * U) // (4,0) to (0,4) spans 8U
		expect(b.height).toBe(4 * U / 2 * 2 - 0) // (0,0) to (4,4)
	})

	it("applies padding on every side", () => {
		const bare = screenBounds([0, 0, 0], [2, 2, 2], 0)
		const padded = screenBounds([0, 0, 0], [2, 2, 2], 10)
		expect(padded.width).toBe(bare.width + 20)
		expect(padded.height).toBe(bare.height + 20)
		expect(padded.x).toBe(bare.x - 10)
	})
})

describe("elbow", () => {
	it("never emits a diagonal segment — every leg moves along one axis", () => {
		const route = elbow([0, 0, 0], [5, 3, 2])
		for (let i = 1; i < route.length; i++) {
			const moved = route[i].filter((v, k) => v !== route[i - 1][k])
			expect(moved).toHaveLength(1)
		}
	})

	it("collapses to two points for a straight run", () => {
		expect(elbow([0, 0, 0], [5, 0, 0])).toEqual([
			[0, 0, 0],
			[5, 0, 0],
		])
	})

	it("starts at the source and ends at the target", () => {
		const route = elbow([1, 2, 3], [7, 8, 9])
		expect(route[0]).toEqual([1, 2, 3])
		expect(route[route.length - 1]).toEqual([7, 8, 9])
	})
})

describe("longestMidpoint", () => {
	it("lands on a segment, never on the corner of an elbow", () => {
		// Long run along x, short hop along y. The middle *waypoint* is the
		// corner; the answer must be halfway down the long leg instead.
		const route = elbow([0, 0, 0], [20, 2, 0])
		const mid = longestMidpoint(route)
		const corner = iso(20, 0, 0)
		expect(mid).not.toEqual({ sx: corner.sx, sy: corner.sy })
		expect(mid).toEqual({ sx: iso(10, 0, 0).sx, sy: iso(10, 0, 0).sy })
	})
})

describe("handle", () => {
	const origin = [0, 0, 0] as const
	const size = [4, 4, 2] as const

	it("puts the top handle on the lid", () => {
		expect(handle(origin, size, "top")).toEqual([2, 2, 2])
	})

	it("puts the left handle on the max-y face and the right on the max-x face", () => {
		// sx = (x − y) * U, so max-y lands lower-LEFT and max-x lower-RIGHT.
		const left = handle(origin, size, "left")
		const right = handle(origin, size, "right")
		expect(left[1]).toBe(4)
		expect(right[0]).toBe(4)
		expect(iso(...left).sx).toBeLessThan(iso(...right).sx)
	})
})

describe("poly", () => {
	it("serialises a face as an SVG points list", () => {
		expect(poly([0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0])).toBe(
			"0,0 16,8 0,16 -16,8"
		)
	})
})

describe("fitAspect", () => {
	const box = { x: -100, y: -50, width: 200, height: 100 }

	it("leaves a box that already matches alone", () => {
		expect(fitAspect(box, 2)).toEqual(box)
	})

	it("only ever grows, and keeps the centre fixed", () => {
		for (const target of [0.5, 1, 1.5, 3]) {
			const out = fitAspect(box, target)
			expect(out.width).toBeGreaterThanOrEqual(box.width - 1e-9)
			expect(out.height).toBeGreaterThanOrEqual(box.height - 1e-9)
			expect(out.x + out.width / 2).toBeCloseTo(box.x + box.width / 2)
			expect(out.y + out.height / 2).toBeCloseTo(box.y + box.height / 2)
			expect(out.width / out.height).toBeCloseTo(target)
		}
	})
})
