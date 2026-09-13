import { elbow, handle, type Vec3 } from "@/lib/iso"
import { agentGraph } from "@/data/isoDiagrams"

import { IsoLink } from "../IsoLink"
import { IsoNode, NODE_H } from "../IsoNode"
import { IsoPlane } from "../IsoPlane"
import { IsoScene } from "../IsoScene"

const DEFAULT_SIZE = [8, 5] as const

export function AgentGraph() {
	const { nodes, links } = agentGraph
	const byId = new Map(nodes.map((n) => [n.id, n]))

	const at = (id: string, face: Parameters<typeof handle>[2]): Vec3 => {
		const n = byId.get(id)!
		const [w, d] = n.size ?? DEFAULT_SIZE
		return handle(n.origin, [w, d, NODE_H], face)
	}

	return (
		<IsoScene
			uid="agent-graph"
			fit
			grid={[30, 18]}
			bounds={{ min: [0, 0, 0], max: [30, 18, 6] }}
			title="Agent orchestration graph"
			desc="An input feeds a router which branches on tool choice: the active path calls a tool and loops back, the inactive path replies directly."
		>
			<IsoPlane size={[30, 18]} />

			{links.map((l) => (
				<IsoLink
					key={`${l.from}-${l.to}`}
					route={elbow(at(l.from, l.fromFace), at(l.to, l.toFace))}
					variant={l.active ? "solid" : "dashed"}
					active={l.active}
					label={l.label}
					step={l.step ?? 0}
				/>
			))}

			{/* Painted after the links so nodes occlude the wires behind them. */}
			{nodes.map((n, i) => (
				<IsoNode key={n.id} {...n} size={n.size ?? DEFAULT_SIZE} step={i} />
			))}
		</IsoScene>
	)
}
