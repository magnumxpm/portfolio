export interface HeroData {
	name: string
	role: string
	roleAccent: string
	status: string
	statusHref?: string
	lede: string
	tags: string[]
	resumeUrl: string
	email: string
}

export interface FocusItem {
	/** Also the key that selects the card's isometric diagram. */
	id: string
	title: string
	description: string
	keywords: string[]
	/** Blueprint-style caption for the diagram well, e.g. "01 — ROUTING". */
	fig: string
}

/**
 * A layer's role in the system, not free text — this is what lets one component
 * colour six different projects coherently, so "Go API" reads the same in
 * every diagram.
 */
export type StackKind = "client" | "edge" | "service" | "queue" | "store" | "external"

export interface StackLayer {
	label: string
	kind: StackKind
}

/**
 * The shape of a project's isometric figure. Topology, not decoration: a
 * toolkit is a hub, a fleet of auditing agents is a fleet, a marketplace with
 * delivery is a routed grid. Each reads differently at thumbnail size without
 * needing a single word of label.
 */
export type ProjectFigureKind = "hub" | "fleet" | "chain" | "mesh" | "grid" | "stack"

export interface ProjectItem {
	title: string
	description: string
	imageSrc: string
	role: string
	technologies: string[]
	url: string
	/** Architecture layers, client-most first. Drives the legend and the figure. */
	stack: StackLayer[]
	figure: ProjectFigureKind
}

export interface ExperienceItem {
	company: string
	role: string
	period: string
	current?: boolean
	points: string[]
}

export interface EducationItem {
	institution: string
	qualification: string
	period: string
	logo: string
}

export interface AwardItem {
	title: string
	year: string
	description: string
}

export interface CertificationItem {
	title: string
	issuer: string
	year: string
	logo: string
	url: string
}

export interface SocialItem {
	label: string
	href: string
	handle: string
}
