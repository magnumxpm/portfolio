import { iso, longestMidpoint, path, type Vec3 } from "@/lib/iso"

export interface IsoLinkProps {
	/** World-space waypoints; use elbow() to build orthogonal routes. */
	route: readonly Vec3[]
	variant?: "solid" | "dashed"
	/** On the active path: accent stroke plus a travelling pulse. */
	active?: boolean
	/** Pill label, placed at the midpoint of the longest segment. */
	label?: string
	/** Draw-on order. */
	step?: number
	arrow?: boolean
}

/**
 * A connector between two handles.
 *
 * pathLength="100" normalises the geometry so the draw-on is pure CSS
 * (dasharray 100, dashoffset 100 -> 0) with no getTotalLength() and therefore
 * no client JS. The travelling pulse rides the same `d` via offset-path, so
 * nothing is duplicated and — unlike <animateMotion> — it can be switched off
 * by prefers-reduced-motion.
 */
export function IsoLink({
	route,
	variant = "solid",
	active,
	label,
	step = 0,
	arrow = true,
}: IsoLinkProps) {
	const d = path(route)

	const a = iso(...route[route.length - 2])
	const b = iso(...route[route.length - 1])
	const angle = (Math.atan2(b.sy - a.sy, b.sx - a.sx) * 180) / Math.PI

	const mid = label ? longestMidpoint(route) : null
	const pillW = label ? label.length * 5.4 + 12 : 0

	return (
		<g
			className="iso-link"
			data-variant={variant}
			data-active={active ? "" : undefined}
			style={{ "--iso-step": step } as React.CSSProperties}
		>
			<path d={d} pathLength={100} className="iso-wire" vectorEffect="non-scaling-stroke" />
			{arrow ? (
				<path
					d="M0 0l-5 -3v6z"
					transform={`translate(${b.sx} ${b.sy}) rotate(${angle.toFixed(2)})`}
					className="iso-arrow"
				/>
			) : null}
			{active ? (
				<circle r={2.2} className="iso-pulse" style={{ offsetPath: `path("${d}")` }} />
			) : null}
			{label && mid ? (
				<g className="iso-pill">
					<rect
						x={mid.sx - pillW / 2}
						y={mid.sy - 8}
						width={pillW}
						height={16}
						rx={8}
						vectorEffect="non-scaling-stroke"
					/>
					<text x={mid.sx} y={mid.sy} textAnchor="middle" dominantBaseline="central">
						{label}
					</text>
				</g>
			) : null}
		</g>
	)
}
