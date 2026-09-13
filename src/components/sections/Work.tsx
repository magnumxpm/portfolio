import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { Reveal } from "@/components/motion/Reveal"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { projectsData } from "@/data/projectsData"
import type { ProjectItem } from "@/types"

function ProjectRow({ project, index }: { project: ProjectItem; index: number }) {
	const linked = Boolean(project.url)
	const Wrapper = linked ? "a" : "div"

	return (
		<Wrapper
			{...(linked
				? { href: project.url, target: "_blank", rel: "noopener noreferrer" }
				: {})}
			className="group grid grid-cols-1 items-center gap-6 border-b border-line py-8 transition-colors duration-300 ease-out hover:border-line-hi sm:grid-cols-[9rem_1fr_auto] sm:gap-8"
		>
			<div className="relative aspect-[16/10] w-36 overflow-hidden rounded-[3px] border border-line bg-surface">
				<Image
					src={project.imageSrc}
					alt=""
					fill
					sizes="144px"
					className="object-cover opacity-70 transition-opacity duration-300 ease-out group-hover:opacity-100"
				/>
			</div>

			<div>
				<div className="flex items-baseline gap-3">
					<span className="font-mono text-label text-fg-faint">
						{String(index + 1).padStart(2, "0")}
					</span>
					<h3 className="text-h3 font-medium text-fg transition-colors duration-200 ease-out group-hover:text-accent">
						{project.title}
					</h3>
					<span className="font-mono text-label uppercase text-fg-faint">{project.role}</span>
				</div>
				<p className="mt-2 max-w-prose text-fg-dim">{project.description}</p>
				<ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
					{project.technologies.map((tech) => (
						<li key={tech} className="font-mono text-label uppercase text-fg-faint">
							{tech}
						</li>
					))}
				</ul>
			</div>

			{linked ? (
				<ArrowUpRight
					aria-hidden="true"
					className="hidden size-5 text-fg-faint transition-all duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-accent sm:block"
				/>
			) : (
				<span className="hidden font-mono text-label uppercase text-fg-faint sm:block">
					Private
				</span>
			)}
		</Wrapper>
	)
}

export function Work() {
	return (
		<section id="work" data-field-preset="work" className="hairline py-section">
			<div className="shell">
				<SectionHeader index="02" label="Selected work" />
				<div className="mt-8">
					{projectsData.map((project, i) => (
						<Reveal key={project.title} delay={Math.min(i, 3) * 0.04}>
							<ProjectRow project={project} index={i} />
						</Reveal>
					))}
				</div>
			</div>
		</section>
	)
}
