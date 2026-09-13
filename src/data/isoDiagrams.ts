import type { Vec3 } from "@/lib/iso"
import type { IsoFace } from "@/lib/iso"

export interface NodeSpec {
	id: string
	origin: Vec3
	size?: readonly [number, number]
	title: string
	sub?: string
	handles?: readonly IsoFace[]
	active?: boolean
	tone?: "base" | "muted"
}

export interface LinkSpec {
	from: string
	fromFace: IsoFace
	to: string
	toFace: IsoFace
	label?: string
	active?: boolean
	step?: number
}

/** Agent orchestration: a router branching on tool choice, with a loop back. */
export const agentGraph: { nodes: NodeSpec[]; links: LinkSpec[] } = {
	nodes: [
		{ id: "in", origin: [0, 6, 0], title: "Input", sub: "state", handles: ["right"] },
		{
			id: "router",
			origin: [10, 6, 0],
			title: "Router",
			sub: "tool_choice",
			handles: ["left", "right", "top"],
			active: true,
		},
		{
			id: "tool",
			origin: [21, 0, 0],
			title: "Tool call",
			sub: "retrieve()",
			handles: ["left", "top"],
			active: true,
		},
		{
			id: "reply",
			origin: [21, 12, 0],
			title: "Direct",
			sub: "respond()",
			handles: ["left"],
			tone: "muted",
		},
	],
	links: [
		{ from: "in", fromFace: "right", to: "router", toFace: "left", active: true, step: 0 },
		{
			from: "router",
			fromFace: "right",
			to: "tool",
			toFace: "left",
			label: "true",
			active: true,
			step: 1,
		},
		{ from: "router", fromFace: "right", to: "reply", toFace: "left", label: "false", step: 1 },
		{ from: "tool", fromFace: "top", to: "router", toFace: "top", label: "loop", step: 2 },
	],
}

export interface LayerSpec {
	label: string
	sub?: string
	tone?: "base" | "accent" | "muted" | "deep"
}

/** RAG: an exploded assembly from raw documents up to retrieval. */
export const ragStack: LayerSpec[] = [
	{ label: "Documents", sub: "pdf · md · html", tone: "muted" },
	{ label: "Chunks", sub: "split · overlap", tone: "base" },
	{ label: "Vector index", sub: "embeddings", tone: "deep" },
	{ label: "Retrieval", sub: "top-k · rerank", tone: "accent" },
]

/** AgentOps: services on a runtime, with a trace threading through them. */
export const serviceStack = {
	base: { label: "Runtime", sub: "containers" },
	services: [
		{ id: "api", origin: [1, 1, 1] as Vec3, title: "API", sub: "ingress" },
		{ id: "worker", origin: [1, 8, 1] as Vec3, title: "Worker", sub: "agent loop" },
		{ id: "store", origin: [10, 8, 1] as Vec3, title: "Store", sub: "traces" },
	],
}

/**
 * Harness: a grid of eval cells. `true` is a low tile, `false` a tall accent
 * column — reads instantly at thumbnail size with no glyphs at all.
 */
export const evalGrid: boolean[][] = [
	[true, true, true, true, true, true],
	[true, true, false, true, true, true],
	[true, true, true, true, true, true],
	[true, false, true, true, true, true],
]
