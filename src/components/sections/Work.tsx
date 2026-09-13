import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { ProjectFigure } from "@/components/iso/diagrams/ProjectFigure"
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
			className="iso-frame group grid grid-cols-1 items-center gap-8 border-b border-line py-14 transition-colors duration-300 ease-out hover:border-line-hi md:grid-cols-[1fr_20rem] md:gap-16"
		>
			<div className="order-2 md:order-none">
				{/* A fixed-width index column, so the titles line up down the section
				   and the number sits on the title's optical centre instead of its
				   baseline. */}
				<div className="grid grid-cols-[2.25rem_1fr] items-center gap-x-1">
					<span className="self-center font-mono text-meta tabular-nums text-fg-faint">
						{String(index + 1).padStart(2, "0")}
					</span>
					<div className="flex items-center gap-3">
						<h3 className="text-title font-medium text-fg transition-colors duration-200 ease-out group-hover:text-accent">
							{project.title}
						</h3>
						{/* Flattened to a white silhouette: the marks are wildly different
						    artwork and shouldn't read as five different things. */}
						<Image
							src={project.imageSrc}
							alt=""
							width={20}
							height={20}
							sizes="20px"
							className="size-5 shrink-0 opacity-40 brightness-0 invert transition-opacity duration-300 ease-out group-hover:opacity-80"
						/>
					</div>

					<p className="col-start-2 mt-1 font-mono text-label uppercase text-fg-faint">
						{project.role}
					</p>
				</div>

				<p className="mt-6 max-w-[46ch] text-lede leading-relaxed text-fg-dim">
					{project.description}
				</p>

				{/* One list, not two. The technologies array said the same thing as
				    the stack labels, in the same visual weight, right above it. */}
				<ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2.5">
					{project.stack.map((layer) => (
						<li
							key={layer.label}
							className="flex items-center gap-2 font-mono text-meta text-fg-dim"
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
					<p className="mt-8">
						<span className="inline-flex items-center gap-1.5 font-mono text-meta text-fg-faint transition-colors duration-200 ease-out group-hover:text-accent">
							{host}
							<ArrowUpRight
								aria-hidden="true"
								className="size-3.5 transition-transform duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-px"
							/>
						</span>
					</p>
				) : null}
			</div>

			<div className="order-1 mx-auto aspect-square w-full max-w-[20rem] md:order-none md:mx-0">
				<ProjectFigure kind={project.figure} layers={project.stack} project={project.title} />
			</div>
		</Wrapper>
	)
}

export function Work() {
	return (
		<section id="work" data-field-preset="work" className="hairline py-section">
			<div className="shell">
				<SectionHeader index="02" label="Selected work" />
				<div className="mt-4">
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
