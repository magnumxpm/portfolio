import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { ProjectStack } from "@/components/iso/diagrams/ProjectStack"
import { STACK_TONE } from "@/components/iso/stackTones"
import { Reveal } from "@/components/motion/Reveal"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { projectsData } from "@/data/projectsData"
import type { ProjectItem } from "@/types"

function ProjectRow({ project, index }: { project: ProjectItem; index: number }) {
	const linked = Boolean(project.url)
	const Wrapper = linked ? "a" : "div"
	const host = linked ? project.url.replace(/^https?:\/\//, "").replace(/\/$/, "") : null

	return (
		<Wrapper
			{...(linked ? { href: project.url, target: "_blank", rel: "noopener noreferrer" } : {})}
			className="iso-frame group grid grid-cols-1 items-start gap-6 border-b border-line py-10 transition-colors duration-300 ease-out hover:border-line-hi sm:grid-cols-[1fr_12rem] sm:gap-10"
		>
			<div>
				<div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
					<span className="font-mono text-label text-fg-faint">
						{String(index + 1).padStart(2, "0")}
					</span>
					<h3 className="text-h3 font-medium text-fg transition-colors duration-200 ease-out group-hover:text-accent">
						{project.title}
					</h3>
					{/* Demoted to a chip: the isometric stack is the visual now, so the
					    logo no longer has to carry the row or match six other logos. */}
					<Image
						src={project.imageSrc}
						alt=""
						width={18}
						height={18}
						sizes="18px"
						className="size-[18px] opacity-40 grayscale transition-all duration-300 ease-out group-hover:opacity-90 group-hover:grayscale-0"
					/>
					<span className="font-mono text-label uppercase text-fg-faint">{project.role}</span>
				</div>

				<p className="mt-3 max-w-prose text-fg-dim">{project.description}</p>

				<ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
					{project.technologies.map((tech) => (
						<li key={tech} className="font-mono text-label uppercase text-fg-faint">
							{tech}
						</li>
					))}
				</ul>

				{/* The diagram's legend. Real text, so the layers are readable,
				    selectable and searchable while the SVG stays glyph-only. */}
				<ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5">
					{project.stack.map((layer) => (
						<li
							key={layer.label}
							className="flex items-center gap-2 font-mono text-label text-fg-dim"
						>
							<span
								aria-hidden="true"
								data-tone={STACK_TONE[layer.kind]}
								className="iso-obj size-2 shrink-0 rounded-[1px] bg-[var(--iso-top)] ring-1 ring-inset ring-[var(--iso-line)]"
							/>
							{layer.label}
						</li>
					))}
				</ul>

				{linked ? (
					<span className="mt-5 inline-flex items-center gap-1.5 font-mono text-meta text-fg-faint transition-colors duration-200 ease-out group-hover:text-accent">
						{host}
						<ArrowUpRight
							aria-hidden="true"
							className="size-3.5 transition-transform duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-px"
						/>
					</span>
				) : (
					<span className="mt-5 inline-block font-mono text-meta text-fg-faint">Private</span>
				)}
			</div>

			<div className="justify-self-start sm:justify-self-end">
				<ProjectStack
					layers={project.stack}
					project={project.title}
					uid={`stack-${project.title.toLowerCase()}`}
				/>
			</div>
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
