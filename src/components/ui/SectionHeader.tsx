import { cn } from "@/lib/utils"

interface SectionHeaderProps {
	index: string
	label: string
	className?: string
}

/** `01 ── SELECTED WORK ─────────────┤` — the structural motif of the page. */
export function SectionHeader({ index, label, className }: SectionHeaderProps) {
	return (
		<div className={cn("flex items-center gap-4", className)}>
			<span className="font-mono text-label text-accent">{index}</span>
			<h2 className="font-mono text-label uppercase text-fg-dim">{label}</h2>
			<span aria-hidden="true" className="rule-ticked flex-1" />
		</div>
	)
}
