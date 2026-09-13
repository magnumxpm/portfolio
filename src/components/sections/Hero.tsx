import { Reveal } from "@/components/motion/Reveal"
import { Tag } from "@/components/ui/Tag"
import { heroData, socialLinks } from "@/data/heroData"

export function Hero() {
	return (
		<section
			id="top"
			data-field-preset="hero"
			className="relative flex min-h-[calc(100dvh-4rem)] items-center py-section"
		>
			<div className="shell w-full">
				<Reveal>
					<p className="inline-flex items-center gap-2 font-mono text-meta text-fg-dim">
						<span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
						{heroData.status}
					</p>
				</Reveal>

				<Reveal delay={0.05}>
					<h1 className="mt-6 text-display font-medium text-fg">{heroData.name}</h1>
				</Reveal>

				<Reveal delay={0.1}>
					<p className="mt-4 font-mono text-h3 text-fg-dim">
						{heroData.role} <span className="text-fg-faint">/</span>{" "}
						<span className="text-accent">{heroData.roleAccent}</span>
					</p>
				</Reveal>

				<Reveal delay={0.15}>
					<p className="mt-8 max-w-prose text-lede text-fg">{heroData.lede}</p>
				</Reveal>

				<Reveal delay={0.2}>
					<ul className="mt-8 flex flex-wrap gap-1.5">
						{heroData.tags.map((tag) => (
							<li key={tag}>
								<Tag>{tag}</Tag>
							</li>
						))}
					</ul>
				</Reveal>

				<Reveal delay={0.25}>
					<div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
						<a
							href={`mailto:${heroData.email}`}
							className="rounded-[3px] bg-accent px-4 py-2 font-mono text-meta text-[#0a0a0b] transition-opacity duration-200 ease-out hover:opacity-85"
						>
							{heroData.email}
						</a>
						<a
							href={heroData.resumeUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="rounded-[3px] border border-line-hi px-4 py-2 font-mono text-meta text-fg transition-colors duration-200 ease-out hover:border-accent hover:text-accent"
						>
							Résumé
						</a>
					</div>
				</Reveal>

				<Reveal delay={0.3}>
					<ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
						{socialLinks.map((social) => (
							<li key={social.label}>
								<a
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="font-mono text-meta text-fg-dim transition-colors duration-200 ease-out hover:text-fg"
								>
									{social.label}
								</a>
							</li>
						))}
					</ul>
				</Reveal>
			</div>
		</section>
	)
}
