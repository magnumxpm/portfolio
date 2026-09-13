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
				{/* Eyebrow, then title, then copy. The role sat under the title before,
				   which put a small mono line between two things it should be
				   introducing. The index is display-scale but baseline-aligned to the
				   title rather than centred on the block, so it reads as part of the
				   same line instead of floating beside it. */}
				<div className="grid grid-cols-[2.75rem_1fr] items-baseline gap-x-4 sm:grid-cols-[4rem_1fr] sm:gap-x-6">
					<p className="col-start-2 row-start-1 mb-2.5 font-mono text-label uppercase tracking-[0.2em] text-fg-faint">
						{project.role}
					</p>

					<span className="col-start-1 row-start-2 font-mono text-h2 font-normal tabular-nums text-fg-faint transition-colors duration-300 ease-out group-hover:text-accent">
						{String(index + 1).padStart(2, "0")}
					</span>

					<div className="col-start-2 row-start-2 flex items-center gap-3">
						<h3 className="text-h2 font-medium tracking-tight text-fg transition-colors duration-200 ease-out group-hover:text-accent">
							{project.title}
						</h3>
						{/* Flattened to a white silhouette: the marks are wildly different
						    artwork and shouldn't read as five different things. */}
						<Image
							src={project.imageSrc}
							alt=""
							width={24}
							height={24}
							sizes="24px"
							className="size-6 shrink-0 opacity-40 brightness-0 invert transition-opacity duration-300 ease-out group-hover:opacity-80"
						/>
					</div>
				</div>

				<p className="mt-8 max-w-[46ch] text-lede leading-relaxed text-fg-dim">
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

			{/* Out of flow for the same reason as the Focus wells: an in-flow scene
			    sizes the well from its own viewBox instead of the other way round. */}
			<div className="relative order-1 mx-auto aspect-square w-full max-w-[20rem] md:order-none md:mx-0">
				<div className="absolute inset-0">
					<ProjectFigure kind={project.figure} layers={project.stack} project={project.title} />
				</div>
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
