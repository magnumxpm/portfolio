import type { StackKind } from "@/types"
import type { IsoTone } from "./IsoBox"

/**
 * One map, used by both the diagram and its HTML legend, so a layer's colour
 * means the same thing in every project.
 */
export const STACK_TONE: Record<StackKind, IsoTone> = {
	client: "base",
	edge: "muted",
	service: "accent",
	queue: "accent",
	store: "deep",
	external: "muted",
}
