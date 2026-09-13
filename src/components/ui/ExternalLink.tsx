import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface ExternalLinkProps {
	href: string
	children: React.ReactNode
	className?: string
}

export function ExternalLink({ href, children, className }: ExternalLinkProps) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={cn(
				"group inline-flex items-center gap-1.5 text-fg",
				"transition-colors duration-200 ease-out hover:text-accent",
				className
			)}
		>
			<span className="sweep">{children}</span>
			<ArrowUpRight
				aria-hidden="true"
				className="size-3.5 transition-transform duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-px"
			/>
		</a>
	)
}
