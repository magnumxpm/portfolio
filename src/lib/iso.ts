/**
 * 2:1 dimetric projection — the "isometric" of pixel art, screen angle
 * atan(0.5) ≈ 26.565°, not true 30° isometric.
 *
 * The 2:1 choice is not cosmetic. At the 176–360px these diagrams render at,
 * true isometric costs three things that matter:
 *
 *  1. The dot grid. Under 2:1 the world lattice projects onto an exact
 *     2U x U rectangular sublattice holding two points, so the entire ground
 *     grid is one <pattern> with two circles. At 30° the tile is 27.712 x 16
 *     and the dots visibly beat against the pixel grid across a 500px span.
 *  2. Hairlines. Slope exactly 1/2 makes a 1px diagonal's antialiasing repeat
 *     every 2 device px — a regular, deliberate stipple. Slope 0.5774 gives an
 *     irrational beat that reads as a wobbly line.
 *  3. Text anchors land on integers, so glyph hinting is identical between
 *     nodes rather than rendering the same word two subtly different ways.
 *
 * Everything here is integer arithmetic on integer inputs, and pure.
 */

/** Half-width of one world cell, in screen px. */
export const U = 16
/** Half-height. */
export const H = U / 2

/** World space: x runs right-and-back, y left-and-back, z straight up. */
export type Vec3 = readonly [number, number, number]
export interface Pt {
	sx: number
	sy: number
}

/** Basis: x̂ = (U, H), ŷ = (−U, H), ẑ = (0, −U). */
export function iso(x: number, y: number, z: number): Pt {
	return { sx: (x - y) * U, sy: (x + y) * H - z * U }
}

export function pt(v: Vec3): string {
	const { sx, sy } = iso(v[0], v[1], v[2])
	return `${sx},${sy}`
}

/** `points` attribute for a <polygon>. */
export function poly(...vs: Vec3[]): string {
	return vs.map(pt).join(" ")
}

/** `d` attribute for a polyline through world-space waypoints. */
export function path(vs: readonly Vec3[]): string {
	return vs
		.map((v, i) => {
			const { sx, sy } = iso(v[0], v[1], v[2])
			return `${i ? "L" : "M"}${sx} ${sy}`
		})
		.join("")
}

/**
 * Screen bounding box of a world-space AABB, padded.
 *
 * Projecting only min and max is wrong — the projection rotates the box, so the
 * screen extent is set by different corners depending on the shape. All eight
 * get projected.
 */
export function screenBounds(min: Vec3, max: Vec3, pad = 12) {
	const xs: number[] = []
	const ys: number[] = []
	for (const x of [min[0], max[0]]) {
		for (const y of [min[1], max[1]]) {
			for (const z of [min[2], max[2]]) {
				const { sx, sy } = iso(x, y, z)
				xs.push(sx)
				ys.push(sy)
			}
		}
	}
	const x0 = Math.min(...xs) - pad
	const y0 = Math.min(...ys) - pad
	return {
		x: x0,
		y: y0,
		width: Math.max(...xs) + pad - x0,
		height: Math.max(...ys) + pad - y0,
	}
}

/**
 * Route between two points as a world-orthogonal path: travel along x, then y,
 * then z. An L in world space projects to the characteristic isometric zig-zag,
 * which is what makes these read as circuit traces rather than as arrows.
 *
 * Collinear waypoints are dropped, so a straight run stays two points.
 */
export function elbow(a: Vec3, b: Vec3): Vec3[] {
	const via: Vec3[] = [a, [b[0], a[1], a[2]], [b[0], b[1], a[2]], b]
	return via.filter((v, i) => i === 0 || !same(v, via[i - 1]))
}

function same(a: Vec3, b: Vec3): boolean {
	return a[0] === b[0] && a[1] === b[1] && a[2] === b[2]
}

/**
 * Midpoint of the longest segment in a route, in screen space.
 *
 * Not the middle *waypoint*: for a 3- or 4-point elbow that lands exactly on a
 * corner, which is the worst possible place to put a pill label.
 */
export function longestMidpoint(route: readonly Vec3[]): Pt {
	let best = 0
	let bestLen = -1
	for (let i = 0; i < route.length - 1; i++) {
		const a = iso(...route[i])
		const b = iso(...route[i + 1])
		const len = Math.hypot(b.sx - a.sx, b.sy - a.sy)
		if (len > bestLen) {
			bestLen = len
			best = i
		}
	}
	const a = iso(...route[best])
	const b = iso(...route[best + 1])
	return { sx: (a.sx + b.sx) / 2, sy: (a.sy + b.sy) / 2 }
}

/** Which face of a box a connector attaches to, named in screen terms. */
export type IsoFace = "top" | "left" | "right"

/**
 * World-space position of the connector handle on one face of a box.
 *
 * Note the naming: because sx = (x − y) * U, the face at **max y** lands
 * lower-**left** on screen and the face at **max x** lands lower-**right**.
 * This is the sign most people get backwards.
 */
export function handle(
	origin: Vec3,
	size: readonly [number, number, number],
	face: IsoFace
): Vec3 {
	const [x, y, z] = origin
	const [w, d, h] = size
	switch (face) {
		case "top":
			return [x + w / 2, y + d / 2, z + h]
		case "left":
			return [x + w / 2, y + d, z + h / 2]
		case "right":
			return [x + w, y + d / 2, z + h / 2]
	}
}

export interface Box {
	x: number
	y: number
	width: number
	height: number
}

/**
 * Grow a screen box about its centre until it matches a target width/height
 * ratio. Only ever adds space — the content is never cropped.
 *
 * This exists because of the corner brackets. `preserveAspectRatio` already
 * letterboxes a scene inside its well, so heights come out equal on their own;
 * but the brackets are drawn at the *viewBox* corners, so four diagrams with
 * four different natural ratios frame themselves at four different widths and
 * the grid reads ragged. Normalising the box first makes every scene fill its
 * well exactly, so the frames line up across the grid.
 */
export function fitAspect(box: Box, aspect: number): Box {
	const current = box.width / box.height
	if (Math.abs(current - aspect) < 1e-6) return box
	if (current < aspect) {
		const width = box.height * aspect
		return { ...box, x: box.x - (width - box.width) / 2, width }
	}
	const height = box.width / aspect
	return { ...box, y: box.y - (height - box.height) / 2, height }
}
