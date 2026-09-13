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
	id: string
	title: string
	description: string
	keywords: string[]
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

export interface ProjectItem {
	title: string
	description: string
	imageSrc: string
	role: string
	technologies: string[]
	url: string
	/** Architecture layers, client-most first. 3-5; each becomes one slab. */
	stack: StackLayer[]
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
