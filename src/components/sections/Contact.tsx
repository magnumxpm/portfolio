import { Github, Instagram, Linkedin } from "lucide-react"

import { PointerSpotlight } from "@/components/motion/PointerSpotlight"
import { Reveal } from "@/components/motion/Reveal"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { heroData, socialLinks } from "@/data/heroData"

/** Lucide still ships the old bird for Twitter, so the X mark is drawn here. */
function XMark(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
			<path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.66l7.73-8.84L1.24 2.25h6.83l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.11l11.97 15.64Z" />
		</svg>
	)
}

const ICONS = {
	github: Github,
	linkedin: Linkedin,
	instagram: Instagram,
	x: XMark,
} as const

export function Contact() {
	return (
		<section id="contact" data-field-preset="contact" className="hairline py-section">
			<div className="shell">
				<SectionHeader index="05" label="Contact" />

				<Reveal>
					<p className="mt-14 max-w-[24ch] text-h1 font-medium tracking-tight text-fg">
						Open to conversations about agent systems, retrieval, and the infrastructure
						underneath them.
					</p>
				</Reveal>

				<Reveal delay={0.05}>
					<a
						href={`mailto:${heroData.email}`}
						className="sweep mt-10 inline-block font-mono text-h3 text-accent"
					>
						{heroData.email}
					</a>
				</Reveal>

				<Reveal delay={0.1}>
					<PointerSpotlight className="spotlight mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
						{socialLinks.map((social) => {
							const Icon = ICONS[social.icon]
							return (
								<div key={social.label}>
									<a
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										className="group flex h-full items-center gap-4 bg-surface/40 p-6 transition-colors duration-300 ease-out hover:bg-surface-hi/60"
									>
										<span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-fg-dim transition-colors duration-300 ease-out group-hover:border-accent group-hover:text-accent">
											<Icon className="size-4" />
										</span>
										<span className="min-w-0">
											<span className="block font-mono text-label uppercase text-fg-faint">
												{social.label}
											</span>
											<span className="mt-1 block truncate font-mono text-meta text-fg">
												{social.handle}
											</span>
										</span>
									</a>
								</div>
							)
						})}
					</PointerSpotlight>
				</Reveal>
			</div>
		</section>
	)
}
