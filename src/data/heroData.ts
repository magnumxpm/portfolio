import type { HeroData } from "@/types"

export const heroData: HeroData = {
	name: "Pritam Mukherjee",
	role: "Software Engineer",
	roleAccent: "Agent Systems",
	status: "EPAM Systems — since Nov 2025",
	lede: "I build agentic systems — LangGraph orchestration, retrieval and knowledge engineering, and the deployment harnesses that keep them honest in production. Before agents: Go API servers, message-queue pipelines, and two national hackathon wins.",
	tags: [
		"LangGraph",
		"RAG",
		"Knowledge Engineering",
		"AgentOps",
		"Evals",
		"Python",
		"Golang",
		"Next.js",
		"Docker",
		"RabbitMQ",
	],
	resumeUrl: "https://1drv.ms/b/s!Aukoqznc45UmpQTEXFNub-w0_dOI?e=NOfYN4",
	email: "me@pmukherjee.dev",
}

/** `icon` keys into the lucide map in Contact.tsx. */
export const socialLinks = [
	{
		label: "GitHub",
		icon: "github",
		href: "https://github.com/magnumxpm",
		handle: "magnumxpm",
	},
	{
		label: "LinkedIn",
		icon: "linkedin",
		href: "https://www.linkedin.com/in/pritam-mukherjee-52a348225/",
		handle: "pritam-mukherjee",
	},
	{
		label: "X",
		icon: "x",
		href: "https://twitter.com/pmukherjee02",
		handle: "pmukherjee02",
	},
	{
		label: "Instagram",
		icon: "instagram",
		href: "https://instagram.com/mukherjee.anon",
		handle: "mukherjee.anon",
	},
] as const
