import type { ExperienceItem } from "@/types"

export const experienceData: ExperienceItem[] = [
	{
		company: "EPAM Systems",
		role: "Software Engineer",
		period: "Nov 2025 — Present",
		current: true,
		points: [
			"Agent engineering: multi-step agent pipelines built with LangGraph.",
			"RAG and knowledge-engineering workflows over domain corpora.",
			"Evaluation harnesses and the AgentOps tooling around deployment and observability.",
		],
	},
	{
		company: "LeadGPT",
		role: "Backend Development Engineer",
		period: "2024 — 2025",
		points: [
			"Fixed critical failures in the email delivery pipeline — a mission-critical path for the business.",
			"Architected an email reply-detection system and the data-backed analytics around it.",
			"Split the monolith toward microservices with RabbitMQ, and set up CI/CD on Docker Swarm.",
		],
	},
	{
		company: "AICTE",
		role: "Frontend Developer, Internship",
		period: "2023",
		points: [
			"Built a full-spec desktop application end-to-end in React and Electron.",
			"Designed and shipped the reusable UI component set.",
			"Deployed as a Docker monorepo alongside the backend with continuous delivery.",
			"Awarded the internship for winning Smart India Hackathon 2023.",
		],
	},
]
