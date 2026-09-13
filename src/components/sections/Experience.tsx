import { Reveal } from "@/components/motion/Reveal"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { experienceData } from "@/data/experienceData"

export function Experience() {
	return (
		<section id="experience" data-field-preset="experience" className="hairline py-section">
			<div className="shell">
				<SectionHeader index="03" label="Experience" />

				<ol className="mt-6">
					{experienceData.map((item, i) => (
						<li key={item.company} className="relative">
							<Reveal delay={i * 0.05}>
								<article className="iso-frame group grid grid-cols-1 gap-4 px-1 py-12 sm:grid-cols-[13rem_1fr] sm:gap-0">
									<div className="sm:pr-10">
										<p className="font-mono text-meta text-fg-faint">{item.period}</p>
										{item.current ? (
											<p className="mt-2 font-mono text-label uppercase text-accent">Current</p>
										) : null}
									</div>

									<div className="relative sm:pl-12">
										{/* Rail and node are absolute so they can escape the
										    entry's vertical padding; a border would stop at the
										    content box and leave a gap between entries. */}
										<span
											aria-hidden="true"
											className="tl-rail hidden sm:block"
											data-first={i === 0 ? "" : undefined}
											data-last={i === experienceData.length - 1 ? "" : undefined}
										/>
										<span
											aria-hidden="true"
											className="tl-node hidden sm:block"
											data-current={item.current ? "" : undefined}
										/>

										<h3 className="text-h2 font-medium tracking-tight text-fg">{item.role}</h3>
										<p className="mt-2 font-mono text-meta text-accent">{item.company}</p>

										<ul className="mt-6 max-w-[52ch] space-y-3">
											{item.points.map((point) => (
												<li key={point} className="flex gap-3 text-body text-fg-dim">
													<span
														aria-hidden="true"
														className="mt-2.5 size-1 shrink-0 bg-fg-faint"
													/>
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
