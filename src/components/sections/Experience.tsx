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
						<li key={item.company}>
							<Reveal delay={i * 0.05}>
								<article className="iso-frame grid grid-cols-1 gap-4 border-b border-line px-1 py-12 transition-colors duration-300 ease-out hover:border-line-hi sm:grid-cols-[14rem_1fr] sm:gap-14">
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
										<h3 className="text-h2 font-medium tracking-tight text-fg">{item.role}</h3>
										<p className="mt-2 font-mono text-meta text-accent">{item.company}</p>
										<ul className="mt-6 max-w-[52ch] space-y-3">
											{item.points.map((point) => (
												<li key={point} className="flex gap-3 text-body text-fg-dim">
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
