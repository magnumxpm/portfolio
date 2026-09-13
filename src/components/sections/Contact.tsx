import { Reveal } from "@/components/motion/Reveal"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { heroData, socialLinks } from "@/data/heroData"

export function Contact() {
	return (
		<section id="contact" data-field-preset="contact" className="hairline py-section">
			<div className="shell">
				<SectionHeader index="05" label="Contact" />

				<Reveal>
					<p className="mt-12 max-w-prose text-h2 font-medium text-fg">
						Open to conversations about agent systems, retrieval, and the infrastructure
						underneath them.
					</p>
				</Reveal>

				<Reveal delay={0.05}>
					<a
						href={`mailto:${heroData.email}`}
						className="mt-8 inline-block font-mono text-h3 text-accent transition-opacity duration-200 ease-out hover:opacity-80"
					>
						{heroData.email}
					</a>
				</Reveal>

				<Reveal delay={0.1}>
					<ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
						{socialLinks.map((social) => (
							<li key={social.label}>
								<a
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="block bg-surface/40 p-5 transition-colors duration-300 ease-out hover:bg-surface-hi/60"
								>
									<span className="font-mono text-label uppercase text-fg-faint">
										{social.label}
									</span>
									<span className="mt-2 block truncate font-mono text-meta text-fg">
										{social.handle}
									</span>
								</a>
							</li>
						))}
					</ul>
				</Reveal>
			</div>
		</section>
	)
}
