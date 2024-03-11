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
			thumbnail: "/vercel.svg",
		},
		{
			title: "Samklaang",
			description:
				"Efficient collaboration platform with advanced conferencing features",
			technologies: ["Next.js", "Tailwind", "Electron", "UI/UX"],
			role: "Front-end",
			url: "#",
			thumbnail: "/vercel.svg",
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
			thumbnail: "/vercel.svg",
		},
	]

	return (
		<section id="projects">
			<p className="text-lg text-blue-100 sm:text-3xl font-semibold font-code">
				Projects
			</p>
			<div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 w-full gap-5">
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
