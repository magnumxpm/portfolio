import type { ProjectItem } from "@/types"

/** Ordered so the AI and infrastructure work leads. */
export const projectsData: ProjectItem[] = [
	{
		title: "Jarnkit",
		description: "Consolidated AI toolkit platform for developers.",
		imageSrc: "/jarnkit2.png",
		role: "Full-stack",
		technologies: ["Golang", "AI Models", "DevOps", "Next.js"],
		url: "https://jarnkit.com",
	},
	{
		title: "Helmdall",
		description: "High-performance, network-enabled system security auditing service.",
		imageSrc: "/helmdall.png",
		role: "Backend",
		technologies: ["Golang", "Postgres", "gRPC", "WebSockets", "AWS"],
		url: "https://helmdall.com",
	},
	{
		title: "Confention",
		description: "Event and conference discovery and ticketing platform.",
		imageSrc: "/confention.png",
		role: "Backend & Android",
		technologies: ["Golang", "Postgres", "Kotlin", "Android SDK"],
		url: "",
	},
	{
		title: "Samklaang",
		description: "Collaboration platform with advanced conferencing features.",
		imageSrc: "/Samklaang.svg",
		role: "Frontend",
		technologies: ["Next.js", "Tailwind", "Electron", "UI/UX"],
		url: "",
	},
	{
		title: "Shopydoo",
		description: "Hyper-local marketplace with a last-mile delivery service.",
		imageSrc: "/shopydoo.png",
		role: "Frontend",
		technologies: ["Kotlin", "Next.js", "Tailwind", "UI/UX"],
		url: "https://shopydoo.in",
	},
	{
		title: "ResearchBook",
		description: "Social platform for scholars, built around a corpus of research papers.",
		imageSrc: "/researchbook.png",
		role: "Full-stack",
		technologies: ["Next.js", "Tailwind", "Firebase", "DevOps"],
		url: "https://researchbook.vercel.app",
	},
]
