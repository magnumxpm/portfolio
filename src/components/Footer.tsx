import { heroData } from "@/data/heroData"

export function Footer() {
	return (
		<footer className="hairline">
			<div className="shell flex flex-col gap-2 py-10 sm:flex-row sm:items-center sm:justify-between">
				<p className="font-mono text-meta text-fg-faint">
					© {new Date().getFullYear()} {heroData.name}
				</p>
				<p className="font-mono text-meta text-fg-faint">
					{heroData.role} <span className="text-fg-faint">/</span>{" "}
					<span className="text-accent">{heroData.roleAccent}</span>
				</p>
			</div>
		</footer>
	)
}
