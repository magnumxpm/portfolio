import { elbow } from "@/lib/iso"
import { ragStack } from "@/data/isoDiagrams"

import { IsoLink } from "../IsoLink"
import { IsoScene } from "../IsoScene"
import { IsoSlab } from "../IsoBox"

const W = 13
const D = 9
const GAP = 5

/** Exploded assembly: raw documents at the base, retrieval on top. */
export function RagStack() {
	const top = (ragStack.length - 1) * GAP

	return (
		<IsoScene
			uid="rag-stack"
			width={360}
			grid={[W, D]}
			bounds={{ min: [0, 0, 0], max: [W, D, top + 1] }}
			title="Retrieval pipeline"
			desc={`Four layers, bottom to top: ${ragStack.map((l) => l.label).join(", ")}.`}
		>
			{ragStack.map((layer, i) => {
				const z = i * GAP
				return (
					<g key={layer.label}>
						{i > 0 ? (
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
							tone={layer.tone}
							label={layer.label}
							sub={layer.sub}
							step={i}
						/>
					</g>
				)
			})}
		</IsoScene>
	)
}
