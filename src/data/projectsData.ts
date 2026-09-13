import type { ProjectItem } from "@/types"

/**
 * NOTE: the `stack` layers are derived from each project's technology list and
 * the layering is partly inferred, not documented. They render as architecture
 * claims about real systems — confirm them before this goes live.
 */

/** Ordered so the AI and infrastructure work leads. */
export const projectsData: ProjectItem[] = [
	{
		title: "Jarnkit",
		description: "Consolidated AI toolkit platform for developers.",
		imageSrc: "/jarnkit2.png",
		role: "Full-stack",
		technologies: ["Golang", "AI Models", "DevOps", "Next.js"],
		url: "https://jarnkit.com",
		figure: "hub",
		stack: [
			{ label: "Next.js client", kind: "client" },
			{ label: "Go API", kind: "service" },
			{ label: "AI models", kind: "external" },
			{ label: "Docker / CI", kind: "edge" },
		],
	},
	{
		title: "Helmdall",
		description: "High-performance, network-enabled system security auditing service.",
		imageSrc: "/helmdall.png",
		role: "Backend",
		technologies: ["Golang", "Postgres", "gRPC", "WebSockets", "AWS"],
		url: "https://helmdall.com",
		figure: "fleet",
		stack: [
			{ label: "Go agent", kind: "client" },
			{ label: "gRPC + WebSockets", kind: "edge" },
			{ label: "Go API", kind: "service" },
			{ label: "Postgres", kind: "store" },
			{ label: "AWS", kind: "external" },
		],
	},
	{
		title: "Confention",
		description: "Event and conference discovery and ticketing platform.",
		imageSrc: "/confention.png",
		role: "Backend & Android",
		technologies: ["Golang", "Postgres", "Kotlin", "Android SDK"],
		url: "",
		figure: "chain",
		stack: [
			{ label: "Android (Kotlin)", kind: "client" },
			{ label: "Go API", kind: "service" },
			{ label: "Postgres", kind: "store" },
		],
	},
	{
		title: "Samklaang",
		description: "Collaboration platform with advanced conferencing features.",
		imageSrc: "/Samklaang.svg",
		role: "Frontend",
		technologies: ["Next.js", "Tailwind", "Electron", "UI/UX"],
		url: "",
		figure: "mesh",
		stack: [
			{ label: "Electron shell", kind: "client" },
			{ label: "Next.js + Tailwind UI", kind: "client" },
			{ label: "Conferencing layer", kind: "service" },
		],
	},
	{
		title: "Shopydoo",
		description: "Hyper-local marketplace with a last-mile delivery service.",
		imageSrc: "/shopydoo.png",
		role: "Frontend",
		technologies: ["Kotlin", "Next.js", "Tailwind", "UI/UX"],
		url: "https://shopydoo.in",
		figure: "grid",
		stack: [
			{ label: "Android (Kotlin)", kind: "client" },
			{ label: "Next.js storefront", kind: "client" },
			{ label: "Delivery service", kind: "service" },
		],
	},
]
