import ProjectCard from "./ProjectCard"

export default function ProjectsSection() {
	const data = [
		{
			title: "Confention",
			description:
				"Advanced Event/Conference searching and ticketing platform",
			technologies: ["Golang", "Postgres", "Kotlin", "Android SDK"],
			role: "Backend & Android App",
			url: "#",
			thumbnail: "/confention.png",
		},
		{
			title: "Samklaang",
			description:
				"Efficient collaboration platform with advanced conferencing features",
			technologies: ["Next.js", "Tailwind", "Electron", "UI/UX"],
			role: "Front-end",
			url: "#",
			thumbnail: "/Samklaang.svg",
		},
		{
			title: "Helmdall",
			description:
				"High-performance network enabled System security auditing service.",
			technologies: ["Golang", "Postgres", "gRPC", "WebSockets", "AWS"],
			role: "Backend",
			url: "https://helmdall.com",
			thumbnail: "/vercel.svg",
		},
		{
			title: "Shopydoo",
			description:
				"Hyper-local marketplace with last-mile delivery service.",
			technologies: ["Kotlin", "Next.js", "Tailwind", "UI/UX"],
			role: "Front-end",
			url: "https://shopydoo.in",
			thumbnail: "/shopydoo.png",
		},
		{
			title: "Jarnkit",
			description: "Consolidated AI Toolkit platform for Developers",
			technologies: ["Golang", "AI Models", "DevOps", "Next.js"],
			role: "Full-Stack",
			url: "https://jarnkit.com",
			thumbnail: "/jarnkit2.png",
		},
		{
			title: "ResearchBook",
			description:
				"Social Media platform for Scholars. Goldmine of Research papers",
			technologies: ["Next.js", "Tailwind", "Firebase", "DevOps"],
			role: "Full-Stack",
			url: "https://researchbook.vercel.app",
			thumbnail: "/researchbook.png",
		},
	]

	return (
		<section id="projects">
			<p className="text-xl text-blue-100 sm:text-2xl font-medium font-code">
				Projects
			</p>
			<div className="mt-6 md:mt-9 grid md:grid-cols-2 lg:grid-cols-3 w-full gap-5">
				{/* Project tiles */}
				{data.map((val, idx) => (
					<ProjectCard
						title={val.title}
						description={val.description}
						imageSrc={val.thumbnail}
						role={val.role}
						technologies={val.technologies}
						url={val.url}
					/>
				))}
			</div>
		</section>
	)
}
