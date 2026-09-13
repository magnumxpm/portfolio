import { cn } from "@/lib/utils"

interface RevealProps {
	children: React.ReactNode
	/** Stagger offset in seconds. Keep small — this is punctuation, not choreography. */
	delay?: number
	className?: string
}

/**
 * The one reveal primitive on the site, and a *server* component.
 *
 * It emits no JavaScript of its own: the hidden state is CSS that only applies
 * under `html[data-js]`, and a single document-wide observer (`RevealRoot`)
 * flips the visible class. With JS off or broken the content is simply visible,
 * which is the behaviour this redesign exists to guarantee.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
	return (
		<div
			data-reveal=""
			style={delay ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties) : undefined}
			className={cn(className)}
		>
			{children}
		</div>
	)
}
