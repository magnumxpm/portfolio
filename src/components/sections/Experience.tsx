import { Reveal } from "@/components/motion/Reveal"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { experienceData } from "@/data/experienceData"

export function Experience() {
	return (
		<section id="experience" data-field-preset="experience" className="hairline py-section">
			<div className="shell">
				<SectionHeader index="03" label="Experience" />

				<ol className="mt-12">
					{experienceData.map((item, i) => (
						<li key={item.company}>
							<Reveal delay={i * 0.05}>
								<article className="grid grid-cols-1 gap-4 border-b border-line py-8 sm:grid-cols-[13rem_1fr] sm:gap-10">
									<div>
										<p className="font-mono text-meta text-fg-faint">{item.period}</p>
										{item.current ? (
											<p className="mt-2 inline-flex items-center gap-1.5 font-mono text-label uppercase text-accent">
												<span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
												Current
											</p>
										) : null}
									</div>

									<div>
										<h3 className="text-h3 font-medium text-fg">{item.role}</h3>
										<p className="mt-1 font-mono text-meta text-accent">{item.company}</p>
										<ul className="mt-4 max-w-prose space-y-2">
											{item.points.map((point) => (
												<li key={point} className="flex gap-3 text-fg-dim">
													<span aria-hidden="true" className="mt-2.5 size-1 shrink-0 bg-fg-faint" />
													<span>{point}</span>
												</li>
											))}
										</ul>
									</div>
								</article>
							</Reveal>
						</li>
					))}
				</ol>
			</div>
		</section>
	)
}
