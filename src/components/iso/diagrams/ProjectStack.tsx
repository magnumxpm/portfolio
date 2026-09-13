import { elbow } from "@/lib/iso"
import type { StackLayer } from "@/types"

import { IsoLink } from "../IsoLink"
import { IsoScene } from "../IsoScene"
import { IsoSlab } from "../IsoBox"
import { STACK_TONE } from "../stackTones"

const W = 9
const D = 6
const GAP = 3

interface ProjectStackProps {
	layers: StackLayer[]
	/** Project title, for the accessible name. */
	project: string
	uid: string
}

/**
 * The architecture glyph for one project — the same component for all six.
 *
 * Deliberately renders no text: at the ~180px this occupies, any label would
 * land at 6-8px. The layer names live in a real HTML legend beside it, which is
 * selectable, searchable, and keeps strings out of the SVG that would otherwise
 * collide with the section tests.
 */
export function ProjectStack({ layers, project, uid }: ProjectStackProps) {
	const top = (layers.length - 1) * GAP

	return (
		<IsoScene
			uid={uid}
			width={188}
			bounds={{ min: [0, 0, 0], max: [W, D, top + 1] }}
			brackets={false}
			title={`${project} architecture`}
			desc={`${layers.length} layers, top to bottom: ${layers.map((l) => l.label).join(", ")}.`}
		>
			{/* Bottom-up so nearer slabs paint over farther ones. */}
			{layers
				.map((layer, i) => ({ layer, i, z: (layers.length - 1 - i) * GAP }))
				.sort((a, b) => a.z - b.z)
				.map(({ layer, i, z }) => (
					<g key={layer.label}>
						{z > 0 ? (
							<IsoLink
								route={elbow([W / 2, D / 2, z - GAP + 1], [W / 2, D / 2, z])}
								variant="dashed"
								step={i}
								arrow={false}
							/>
						) : null}
						<IsoSlab
							origin={[0, 0, z]}
							size={[W, D]}
							tone={STACK_TONE[layer.kind]}
							step={layers.length - 1 - i}
						/>
					</g>
				))}
		</IsoScene>
	)
}
