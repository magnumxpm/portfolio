import Link from "next/link"
import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"

import { Footer } from "@/components/Footer"
import { SubpageHeader } from "@/components/SubpageHeader"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { GAMES_CONTACT, gamesData } from "@/data/gamesData"

export const metadata: Metadata = {
	title: "Games — Pritam Mukherjee",
	description: "Small, focused games for phones, and the policies that go with them.",
	alternates: { canonical: "/games" },
}

export default function GamesPage() {
	return (
		<div className="relative z-10">
			<SubpageHeader crumbs={[{ href: "/games", label: "Games" }]} />
			<main className="shell pb-section pt-16 md:pt-24">
				<SectionHeader index="00" label="Games" />
				<h1 className="mt-14 max-w-[18ch] text-h1 font-medium tracking-tight text-fg">
					Small games for phones, built one at a time.
				</h1>
				<p className="mt-6 max-w-prose text-lede text-fg-dim">
					Short sessions, one thumb, no accounts. Each game has its own privacy policy below.
				</p>

				<ul className="mt-16 border-t border-line">
					{gamesData.map((game, i) => (
						<li
							key={game.slug}
							className="grid grid-cols-[2.75rem_1fr] gap-x-4 border-b border-line py-12 sm:grid-cols-[4rem_1fr] sm:gap-x-6"
						>
							<span className="font-mono text-h2 tabular-nums text-fg-faint">
								{String(i + 1).padStart(2, "0")}
							</span>
							<div>
								<p className="font-mono text-label uppercase tracking-[0.2em] text-fg-faint">
									{game.tagline}
								</p>
								<h2 className="mt-2.5 text-h2 font-medium tracking-tight text-fg">{game.title}</h2>
								<p className="mt-6 max-w-[52ch] text-lede leading-relaxed text-fg-dim">
									{game.description}
								</p>
								<ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-meta text-fg-dim">
									{game.platforms.map((p) => (
										<li key={p}>{p}</li>
									))}
									<li className="text-accent">{game.status}</li>
								</ul>
								<p className="mt-8">
									<Link
										href={`/games/${game.slug}/privacy`}
										className="group inline-flex items-center gap-1.5 font-mono text-meta text-fg transition-colors duration-200 ease-out hover:text-accent"
									>
										<span className="sweep">Privacy policy</span>
										<ArrowUpRight
											aria-hidden="true"
											className="size-3.5 transition-transform duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-px"
										/>
									</Link>
								</p>
							</div>
						</li>
					))}
				</ul>

				<p className="mt-12 font-mono text-meta text-fg-faint">
					Support and privacy questions:{" "}
					<a href={`mailto:${GAMES_CONTACT}`} className="sweep text-accent">
						{GAMES_CONTACT}
					</a>
				</p>
			</main>
			<Footer />
		</div>
	)
}
