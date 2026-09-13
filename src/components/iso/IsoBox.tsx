import { iso, poly, type Vec3 } from "@/lib/iso"
import { cn } from "@/lib/utils"

export type IsoTone = "base" | "accent" | "muted" | "deep"

export interface IsoBoxProps {
	/** Near-bottom corner. */
	origin: Vec3
	/** [w, d, h] in cells. */
	size: readonly [number, number, number]
	tone?: IsoTone
	/** Hairline around the top face — reads as a lid seam. */
	seam?: boolean
	label?: string
	sub?: string
	/** Stagger index for the reveal. */
	step?: number
	className?: string
}

/**
 * One axis-aligned volume: the lid plus the two faces the camera can see.
 *
 * Face colour is never set here. Three classes read --iso-top/--iso-right/
 * --iso-left, all derived from a single --iso-base, so a whole diagram is
 * re-themed by one custom property.
 *
 * Do not be tempted to write fill="var(--iso-top)": as an SVG *presentation
 * attribute* that does not resolve — attributes are not CSS. Hence the classes.
 */
export function IsoBox({
	origin: [x, y, z],
	size: [w, d, h],
	tone = "base",
	seam = true,
	label,
	sub,
	step = 0,
	className,
}: IsoBoxProps) {
	const t = z + h
	const top = poly([x, y, t], [x + w, y, t], [x + w, y + d, t], [x, y + d, t])
	// Face at max y lands lower-LEFT on screen; face at max x lands lower-RIGHT.
	const left = poly([x, y + d, t], [x + w, y + d, t], [x + w, y + d, z], [x, y + d, z])
	const right = poly([x + w, y, t], [x + w, y + d, t], [x + w, y + d, z], [x + w, y, z])

	const cap = iso(x + w / 2, y + d / 2, t)

	return (
		<g
			className={cn("iso-obj", className)}
			data-tone={tone}
			style={{ "--iso-step": step } as React.CSSProperties}
		>
			<polygon points={left} className="iso-face-left" />
			<polygon points={right} className="iso-face-right" />
			<polygon points={top} className="iso-face-top" />
			{seam ? (
				<polygon points={top} className="iso-edge" vectorEffect="non-scaling-stroke" />
			) : null}

			{label ? (
				<text x={cap.sx} y={cap.sy - 12} className="iso-title" textAnchor="middle">
					{label}
				</text>
			) : null}
			{sub ? (
				<text x={cap.sx} y={cap.sy + 1} className="iso-sub" textAnchor="middle">
					{sub}
				</text>
			) : null}
		</g>
	)
}

/** A box one cell tall: the layer used by the RAG and project stacks. */
export function IsoSlab(props: Omit<IsoBoxProps, "size"> & { size: readonly [number, number] }) {
	const { size, ...rest } = props
	return <IsoBox {...rest} size={[size[0], size[1], 1]} className={cn("iso-slab", rest.className)} />
}
