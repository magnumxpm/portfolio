import { elbow, handle, type Vec3 } from "@/lib/iso"
import type { ProjectFigureKind, StackLayer } from "@/types"

import { IsoBox } from "../IsoBox"
import { IsoLink } from "../IsoLink"
import { IsoPlane } from "../IsoPlane"
import { IsoScene } from "../IsoScene"
import { STACK_TONE } from "../stackTones"

/**
 * One figure per project, differing by *topology* rather than by decoration.
 *
 * Six projects sharing one slab-stack glyph told you nothing about any of them.
 * A toolkit is a hub; a fleet of auditing agents reporting to a service is a
 * fleet; a marketplace with last-mile delivery is a routed grid. Each of these
 * reads differently at 200px with no labels at all — which matters, because at
 * that size a label would render at 6px.
 *
 * All six compose from the same primitives and share one scene, so they read as
 * a set rather than as six drawings.
 */

const SPAN = 24 // world extent every figure is composed inside, keeps scale even
const BOX = [5, 5, 3] as const
const SMALL = [3, 3, 2] as const

interface FigureProps {
	kind: ProjectFigureKind
	layers: StackLayer[]
	project: string
}

export function ProjectFigure({ kind, layers, project }: FigureProps) {
	return (
		<IsoScene
			fit
			uid={`fig-${project.toLowerCase()}`}
			grid={[SPAN, SPAN]}
			brackets={false}
			bounds={{ min: [0, 0, 0], max: [SPAN, SPAN, 9] }}
			title={`${project} architecture`}
			desc={`${layers.map((l) => l.label).join(", ")}.`}
		>
			<IsoPlane size={[SPAN, SPAN]} />
			{renderFigure(kind, layers)}
		</IsoScene>
	)
}

function tone(layers: StackLayer[], i: number) {
	return STACK_TONE[layers[Math.min(i, layers.length - 1)].kind]
}

function renderFigure(kind: ProjectFigureKind, layers: StackLayer[]) {
	switch (kind) {
		case "hub":
			return <Hub layers={layers} />
		case "fleet":
			return <Fleet layers={layers} />
		case "chain":
			return <Chain layers={layers} />
		case "mesh":
			return <Mesh layers={layers} />
		case "grid":
			return <Grid layers={layers} />
	}
}

/** A platform in the middle, tools arranged around it. */
function Hub({ layers }: { layers: StackLayer[] }) {
	const c: Vec3 = [SPAN / 2 - 3.5, SPAN / 2 - 3.5, 0]
	const core = [7, 7, 2] as const
	const ring: Vec3[] = [
		[2, SPAN / 2 - 1.5, 0],
		[SPAN / 2 - 1.5, 2, 0],
		[SPAN - 5, SPAN / 2 - 1.5, 0],
		[SPAN / 2 - 1.5, SPAN - 5, 0],
	]

	return (
		<>
			{ring.map((o, i) => (
				<IsoLink
					key={`l${i}`}
					route={elbow(handle(o, SMALL, "top"), handle(c, core, "top"))}
					variant={i === 0 ? "solid" : "dashed"}
					active={i === 0}
					arrow={false}
					step={i}
				/>
			))}
			{ring.map((o, i) => (
				<IsoBox key={`n${i}`} origin={o} size={SMALL} tone={tone(layers, i + 1)} step={i + 1} />
			))}
			<IsoBox origin={c} size={core} tone={tone(layers, 0)} step={0} />
		</>
	)
}

/** Many small agents on the ground reporting up to one taller service. */
function Fleet({ layers }: { layers: StackLayer[] }) {
	const hub: Vec3 = [SPAN - 9, SPAN / 2 - 3, 0]
	const hubSize = [6, 6, 6] as const
	const agents: Vec3[] = [
		[2, 3, 0],
		[2, 11, 0],
		[2, 19, 0],
		[9, 7, 0],
		[9, 15, 0],
	]

	return (
		<>
			{agents.map((o, i) => (
				<IsoLink
					key={`l${i}`}
					route={elbow(handle(o, SMALL, "top"), handle(hub, hubSize, "top"))}
					variant={i === 2 ? "solid" : "dashed"}
					active={i === 2}
					arrow={false}
					step={i}
				/>
			))}
			{agents.map((o, i) => (
				<IsoBox key={`a${i}`} origin={o} size={SMALL} tone="muted" step={i} />
			))}
			<IsoBox origin={hub} size={hubSize} tone={tone(layers, layers.length - 2)} step={2} />
		</>
	)
}

/** A straight pipeline: client to service to store. */
function Chain({ layers }: { layers: StackLayer[] }) {
	const n = Math.min(layers.length, 3)
	const step = SPAN / (n + 0.5)
	const nodes: Vec3[] = Array.from({ length: n }, (_, i) => [
		1.5 + i * step,
		SPAN / 2 - 2.5,
		0,
	])
	// The client end stands taller — it reads as the device rather than a peer.
	const sizeAt = (i: number): readonly [number, number, number] =>
		i === 0 ? [4, 5, 6] : BOX

	return (
		<>
			{nodes.slice(0, -1).map((o, i) => (
				<IsoLink
					key={`l${i}`}
					route={elbow(handle(o, sizeAt(i), "right"), handle(nodes[i + 1], sizeAt(i + 1), "left"))}
					active
					step={i}
				/>
			))}
			{nodes.map((o, i) => (
				<IsoBox key={`n${i}`} origin={o} size={sizeAt(i)} tone={tone(layers, i)} step={i} />
			))}
		</>
	)
}

/** Peers, all connected to each other — the conferencing topology. */
function Mesh({ layers }: { layers: StackLayer[] }) {
	const r = 8
	const c = SPAN / 2 - 2
	const peers: Vec3[] = [0, 1, 2, 3].map((i) => {
		const a = (i / 4) * Math.PI * 2 + Math.PI / 4
		return [
			Math.round(c + Math.cos(a) * r),
			Math.round(c + Math.sin(a) * r),
			0,
		]
	})
	const size = [4, 4, 3] as const
	const pairs: Array<[number, number]> = [
		[0, 1],
		[1, 2],
		[2, 3],
		[3, 0],
		[0, 2],
	]

	return (
		<>
			{pairs.map(([a, b], i) => (
				<IsoLink
					key={`l${i}`}
					route={elbow(handle(peers[a], size, "top"), handle(peers[b], size, "top"))}
					variant={i === 4 ? "solid" : "dashed"}
					active={i === 4}
					arrow={false}
					step={i}
				/>
			))}
			{peers.map((o, i) => (
				<IsoBox key={`p${i}`} origin={o} size={size} tone={tone(layers, i)} step={i} />
			))}
		</>
	)
}

/** A neighbourhood of cells with a delivery route threaded through it. */
function Grid({ layers }: { layers: StackLayer[] }) {
	const cells: Array<[number, number]> = []
	for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) cells.push([i, j])
	const at = (i: number, j: number): Vec3 => [2 + i * 5.5, 2 + j * 5.5, 0]
	const stops: Array<[number, number]> = [
		[0, 3],
		[1, 1],
		[3, 2],
	]
	const size = [3.5, 3.5, 1.5] as const

	return (
		<>
			{cells.map(([i, j]) => (
				<IsoBox
					key={`c${i}-${j}`}
					origin={at(i, j)}
					size={size}
					tone="muted"
					seam={false}
					step={i + j}
				/>
			))}
			{stops.slice(0, -1).map(([i, j], k) => (
				<IsoLink
					key={`r${k}`}
					route={elbow(
						handle(at(i, j), size, "top"),
						handle(at(stops[k + 1][0], stops[k + 1][1]), size, "top")
					)}
					active
					step={k}
				/>
			))}
			{stops.map(([i, j], k) => (
				<IsoBox
					key={`s${k}`}
					origin={at(i, j)}
					size={[3.5, 3.5, 4]}
					tone={tone(layers, k)}
					step={k}
				/>
			))}
		</>
	)
}
