import { handle, iso, poly, type IsoFace, type Vec3 } from "@/lib/iso"
import type { IsoTone } from "./IsoBox"

export interface IsoNodeProps {
	origin: Vec3
	/** [w, d] footprint in cells. Height is fixed so all nodes read alike. */
	size?: readonly [number, number]
	title?: string
	sub?: string
	tone?: IsoTone
	/** Faces exposing a small square connector handle. */
	handles?: readonly IsoFace[]
	active?: boolean
	step?: number
}

export const NODE_H = 1

/**
 * A card standing on the ground plane, with the small square connector handles
 * that make these read as a wiring diagram rather than as blocks.
 */
export function IsoNode({
	origin,
	size = [7, 4],
	title,
	sub,
	tone = "base",
	handles = [],
	active,
	step = 0,
}: IsoNodeProps) {
	const [x, y, z] = origin
	const [w, d] = size
	const t = z + NODE_H
	const box: readonly [number, number, number] = [w, d, NODE_H]

	const top = poly([x, y, t], [x + w, y, t], [x + w, y + d, t], [x, y + d, t])
	const left = poly([x, y + d, t], [x + w, y + d, t], [x + w, y + d, z], [x, y + d, z])
	const right = poly([x + w, y, t], [x + w, y + d, t], [x + w, y + d, z], [x + w, y, z])

	const cap = iso(x + w / 2, y + d / 2, t)

	return (
		<g
			className="iso-obj iso-node"
			data-tone={active ? "accent" : tone}
			data-active={active ? "" : undefined}
			style={{ "--iso-step": step } as React.CSSProperties}
		>
			<polygon points={left} className="iso-face-left" />
			<polygon points={right} className="iso-face-right" />
			<polygon points={top} className="iso-face-top" />
			<polygon points={top} className="iso-edge" vectorEffect="non-scaling-stroke" />

			{handles.map((face) => {
				const h = iso(...handle(origin, box, face))
				return (
					<rect
						key={face}
						x={h.sx - 2.5}
						y={h.sy - 2.5}
						width={5}
						height={5}
						className="iso-handle"
						vectorEffect="non-scaling-stroke"
					/>
				)
			})}

			{title ? (
				<text x={cap.sx} y={cap.sy - 3} className="iso-title" textAnchor="middle">
					{title}
				</text>
			) : null}
			{sub ? (
				<text x={cap.sx} y={cap.sy + 10} className="iso-sub" textAnchor="middle">
					{sub}
				</text>
			) : null}
		</g>
	)
}
