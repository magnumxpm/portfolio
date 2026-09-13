import Image from "next/image"

import { Reveal } from "@/components/motion/Reveal"
import { ExternalLink } from "@/components/ui/ExternalLink"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { awardsData, certificationsData, educationData } from "@/data/credentialsData"

function ColumnHeading({ children }: { children: React.ReactNode }) {
	return <h3 className="font-mono text-label uppercase text-fg-faint">{children}</h3>
}

export function Credentials() {
	return (
		<section id="credentials" data-field-preset="credentials" className="hairline py-section">
			<div className="shell">
				<SectionHeader index="04" label="Credentials" />

				<div className="mt-12 grid gap-12 lg:grid-cols-3 lg:gap-10">
					<Reveal>
						<ColumnHeading>Education</ColumnHeading>
						{educationData.map((item) => (
							<div key={item.institution} className="mt-5 flex gap-4">
								<Image
									src={item.logo}
									alt=""
									width={36}
									height={36}
									sizes="36px"
									className="size-9 shrink-0 rounded-[3px] border border-line object-cover"
								/>
								<div>
									<p className="font-medium text-fg">{item.institution}</p>
									<p className="mt-1 text-fg-dim">{item.qualification}</p>
									<p className="mt-1 font-mono text-meta text-fg-faint">{item.period}</p>
								</div>
							</div>
						))}
					</Reveal>

					<Reveal delay={0.05}>
						<ColumnHeading>Awards</ColumnHeading>
						<ul className="mt-5 space-y-6">
							{awardsData.map((item) => (
								<li key={item.title}>
									<p className="font-medium text-fg">{item.title}</p>
									<p className="mt-1 font-mono text-meta text-fg-faint">{item.year}</p>
									<p className="mt-2 text-fg-dim">{item.description}</p>
								</li>
							))}
						</ul>
					</Reveal>

					<Reveal delay={0.1}>
						<ColumnHeading>Certifications</ColumnHeading>
						<ul className="mt-5 space-y-6">
							{certificationsData.map((item) => (
								<li key={item.title} className="flex gap-4">
									<Image
										src={item.logo}
										alt=""
										width={36}
										height={36}
										sizes="36px"
										className="size-9 shrink-0 rounded-[3px] border border-line object-cover"
									/>
									<div>
										<p className="font-medium text-fg">{item.title}</p>
										<p className="mt-1 text-fg-dim">{item.issuer}</p>
										<p className="mt-1 font-mono text-meta text-fg-faint">{item.year}</p>
										<ExternalLink href={item.url} className="mt-2 font-mono text-meta">
											Verify
										</ExternalLink>
									</div>
								</li>
							))}
						</ul>
					</Reveal>
				</div>
			</div>
		</section>
	)
}
