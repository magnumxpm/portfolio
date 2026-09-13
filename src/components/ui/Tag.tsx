import { cn } from "@/lib/utils"

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-[3px] border border-line bg-surface/60 px-2 py-1",
				"font-mono text-[11px] uppercase tracking-[0.08em] text-fg-dim",
				className
			)}
		>
			{children}
		</span>
	)
}
