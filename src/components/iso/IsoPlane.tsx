import { poly, type Vec3 } from "@/lib/iso"
import { cn } from "@/lib/utils"

interface IsoPlaneProps {
	origin?: Vec3
	/** [w, d] in cells. */
	size: readonly [number, number]
	/** Hairline outline only, no fill. */
	ghost?: boolean
	step?: number
	className?: string
}

/** A flat quad on the ground — the base a scene's objects stand on. */
export function IsoPlane({
	origin = [0, 0, 0],
	size: [w, d],
	ghost = true,
	step = 0,
	className,
}: IsoPlaneProps) {
	const [x, y, z] = origin
	const points = poly([x, y, z], [x + w, y, z], [x + w, y + d, z], [x, y + d, z])

	return (
		<g
			className={cn("iso-obj", className)}
			style={{ "--iso-step": step } as React.CSSProperties}
		>
			<polygon
				points={points}
				className={ghost ? "iso-edge iso-plane-ghost" : "iso-face-top"}
				vectorEffect="non-scaling-stroke"
			/>
		</g>
	)
}
