import { MoveUpRight } from "lucide-react"
import Link from "next/link"

export default function ExternalLink({
	href,
	className,
	variant,
	children,
}: {
	href: string
	className?: string
	variant?: string
	children: any
}) {
	return (
		<Link
			href={href}
			className={`${className} flex items-center gap-1 w-fit group outline-none ${
				variant == "big"
					? "font-semibold text-base sm:text-md"
					: "text-base_mobile sm:text-base"
			}`}
		>
			<div className="border-b-2 border-black group-hover:text-theme group-hover:border-theme group-focus:text-theme group-focus:border-theme">
				{children}
			</div>

			<MoveUpRight
				className={
					variant == "big"
						? "group-hover:text-theme_light group-focus:text-theme_light"
						: "group-hover:text-theme group-focus:text-theme"
				}
			/>
		</Link>
	)
}
