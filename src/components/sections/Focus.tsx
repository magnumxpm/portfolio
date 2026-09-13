import { AgentGraph } from "@/components/iso/diagrams/AgentGraph"
import { EvalGrid } from "@/components/iso/diagrams/EvalGrid"
import { RagStack } from "@/components/iso/diagrams/RagStack"
import { ServiceStack } from "@/components/iso/diagrams/ServiceStack"
import { PointerSpotlight } from "@/components/motion/PointerSpotlight"
import { Reveal } from "@/components/motion/Reveal"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { focusData } from "@/data/focusData"

const DIAGRAMS: Record<string, () => React.JSX.Element> = {
	orchestration: AgentGraph,
	rag: RagStack,
	agentops: ServiceStack,
	harness: EvalGrid,
}

export function Focus() {
	return (
		<section id="focus" data-field-preset="focus" className="hairline py-section">
			<div className="shell">
				<SectionHeader index="01" label="What I'm building now" />

				<PointerSpotlight className="spotlight mt-14 grid gap-px border border-line bg-line sm:grid-cols-2">
					{focusData.map((item, i) => {
						const Diagram = DIAGRAMS[item.id]
						return (
							<Reveal key={item.id} delay={i * 0.05} className="bg-bg">
								<article className="iso-frame group flex h-full flex-col bg-surface/40 transition-colors duration-300 ease-out hover:bg-surface-hi/50">
									{/* The scene is taken out of flow. As an in-flow child its
									    `height: 100%` was cyclic against a height the well was
									    still deriving from *it*, so each diagram fell back to its
									    own viewBox ratio and every card's well came out a
									    different height. Absolute positioning gives the scene a
									    definite containing block and stops it feeding the flex
									    column's min-height. */}
									<div className="relative aspect-[3/2] w-full">
										<div className="absolute inset-x-5 bottom-2 top-6">
											{Diagram ? <Diagram /> : null}
										</div>
									</div>

									<div className="flex items-center gap-3 px-7">
										<span className="font-mono text-label text-fg-faint">{item.fig}</span>
										<span aria-hidden="true" className="h-px flex-1 bg-line" />
									</div>

									<div className="flex flex-1 flex-col p-7 pt-5">
										<h3 className="text-h3 font-medium text-fg">{item.title}</h3>
										<p className="mt-4 max-w-[42ch] text-body text-fg-dim">{item.description}</p>
										<ul className="mt-auto flex flex-wrap gap-x-5 gap-y-1.5 pt-8">
											{item.keywords.map((kw) => (
												<li key={kw} className="font-mono text-label uppercase text-fg-faint">
													{kw}
												</li>
											))}
										</ul>
									</div>
								</article>
							</Reveal>
						)
					})}
				</PointerSpotlight>
			</div>
		</section>
	)
}
