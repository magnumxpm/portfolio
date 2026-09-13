import { iso, screenBounds, U, type Vec3 } from "@/lib/iso"
import { cn } from "@/lib/utils"

interface IsoSceneProps {
	/** World-space AABB in cells. Drives the viewBox. */
	bounds: { min: Vec3; max: Vec3 }
	/** Natural CSS width. The scene never renders wider — only smaller. */
	width?: number
	/** Dotted ground grid extent in cells, [nx, ny]. Omit for no grid. */
	grid?: readonly [number, number]
	brackets?: boolean
	/** Accessible name. Rendered as <title>. */
	title: string
	/** Longer description for screen readers. */
	desc?: string
	/** Stable id fragment for pattern refs — must be unique per scene on a page. */
	uid: string
	className?: string
	children: React.ReactNode
}

/**
 * Coordinate space, dotted ground grid and corner bracket marks.
 *
 * A *server* component, like everything under iso/: every coordinate is derived
 * from integers at render time, hover is CSS, and scroll-in reuses the single
 * document-wide observer in RevealRoot. No client JS is emitted.
 */
export function IsoScene({
	bounds,
	width = 360,
	grid,
	brackets = true,
	title,
	desc,
	uid,
	className,
	children,
}: IsoSceneProps) {
	const box = screenBounds(bounds.min, bounds.max)
	const B = 13 // bracket arm length, screen px

	const bracketPath = brackets
		? [
				`M${box.x} ${box.y + B}V${box.y}H${box.x + B}`,
				`M${box.x + box.width - B} ${box.y}H${box.x + box.width}V${box.y + B}`,
				`M${box.x + box.width} ${box.y + box.height - B}V${box.y + box.height}H${box.x + box.width - B}`,
				`M${box.x + B} ${box.y + box.height}H${box.x}V${box.y + box.height - B}`,
			].join(" ")
		: null

	// The ground lattice projects to an exact 2U x U tile holding two points, so
	// the whole grid is one <pattern> instead of hundreds of <circle>s.
	const gridRect = grid
		? {
				x: iso(0, grid[1], 0).sx,
				y: iso(0, 0, 0).sy,
				width: iso(grid[0], 0, 0).sx - iso(0, grid[1], 0).sx,
				height: iso(grid[0], grid[1], 0).sy,
			}
		: null

	return (
		<svg
			role="img"
			viewBox={`${box.x} ${box.y} ${box.width} ${box.height}`}
			style={{ "--iso-w": `${width}px` } as React.CSSProperties}
			className={cn("iso-scene", className)}
		>
			<title>{title}</title>
			{desc ? <desc>{desc}</desc> : null}

			{grid ? (
				<defs>
					<pattern
						id={`${uid}-dots`}
						width={2 * U}
						height={U}
						patternUnits="userSpaceOnUse"
					>
						<circle cx={0} cy={0} r={0.7} className="iso-dot" />
						<circle cx={U} cy={U / 2} r={0.7} className="iso-dot" />
					</pattern>
				</defs>
			) : null}

			{/* World coords are integers, so a half-pixel shift lands vertical
			    edges on pixel boundaries instead of straddling them. */}
			<g transform="translate(.5 .5)">
				{gridRect ? <rect {...gridRect} fill={`url(#${uid}-dots)`} /> : null}
				{bracketPath ? (
					<path d={bracketPath} className="iso-bracket" vectorEffect="non-scaling-stroke" />
				) : null}
				{children}
			</g>
		</svg>
	)
}
