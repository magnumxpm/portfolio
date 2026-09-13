import { Reveal } from "@/components/motion/Reveal"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { focusData } from "@/data/focusData"

export function Focus() {
	return (
		<section id="focus" data-field-preset="focus" className="hairline py-section">
			<div className="shell">
				<SectionHeader index="01" label="What I'm building now" />

				<div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2">
					{focusData.map((item, i) => (
						<Reveal key={item.id} delay={i * 0.05} className="bg-bg">
							<article className="group h-full bg-surface/40 p-7 transition-colors duration-300 ease-out hover:bg-surface-hi/60">
								<span className="font-mono text-label text-fg-faint">
									{String(i + 1).padStart(2, "0")}
								</span>
								<h3 className="mt-4 text-h3 font-medium text-fg">{item.title}</h3>
								<p className="mt-3 max-w-prose text-fg-dim">{item.description}</p>
								<ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1">
									{item.keywords.map((kw) => (
										<li key={kw} className="font-mono text-label uppercase text-fg-faint">
											{kw}
										</li>
									))}
								</ul>
							</article>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	)
}
