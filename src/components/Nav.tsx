"use client"

import { useEffect, useState } from "react"
import { Menu } from "lucide-react"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { heroData } from "@/data/heroData"
import { cn } from "@/lib/utils"

const links = [
	{ href: "#focus", label: "Focus" },
	{ href: "#work", label: "Work" },
	{ href: "#experience", label: "Experience" },
	{ href: "#credentials", label: "Credentials" },
] as const

export function Nav() {
	const [scrolled, setScrolled] = useState(false)
	const [open, setOpen] = useState(false)

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24)
		onScroll()
		window.addEventListener("scroll", onScroll, { passive: true })
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	return (
		<header
			className={cn(
				"sticky top-0 z-50 w-full transition-colors duration-300 ease-out",
				scrolled ? "border-b border-line bg-bg/70 backdrop-blur-md" : "border-b border-transparent"
			)}
		>
			<nav className="shell flex h-16 items-center justify-between" aria-label="Primary">
				<a
					href="#top"
					className="font-mono text-meta uppercase tracking-[0.14em] text-fg transition-colors duration-200 ease-out hover:text-accent"
				>
					PM
					<span className="text-accent">.</span>
				</a>

				<ul className="hidden items-center gap-8 md:flex">
					{links.map((link) => (
						<li key={link.href}>
							<a
								href={link.href}
								className="font-mono text-meta text-fg-dim transition-colors duration-200 ease-out hover:text-fg"
							>
								{link.label}
							</a>
						</li>
					))}
				</ul>

				<div className="flex items-center gap-3">
					<a
						href={`mailto:${heroData.email}`}
						className={cn(
							"hidden rounded-[3px] border border-line-hi px-3.5 py-1.5 md:inline-flex",
							"font-mono text-meta text-fg",
							"transition-colors duration-200 ease-out hover:border-accent hover:text-accent"
						)}
					>
						Get in touch
					</a>

					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger
							aria-label="Open navigation menu"
							className="inline-flex size-9 items-center justify-center rounded-[3px] border border-line text-fg-dim transition-colors duration-200 ease-out hover:text-fg md:hidden"
						>
							<Menu className="size-4" aria-hidden="true" />
						</SheetTrigger>
						<SheetContent side="right">
							<ul className="mt-10 flex flex-col gap-1">
								{links.map((link) => (
									<li key={link.href}>
										<a
											href={link.href}
											onClick={() => setOpen(false)}
											className="block py-3 font-mono text-h3 text-fg-dim transition-colors duration-200 ease-out hover:text-accent"
										>
											{link.label}
										</a>
									</li>
								))}
								<li>
									<a
										href={`mailto:${heroData.email}`}
										onClick={() => setOpen(false)}
										className="block py-3 font-mono text-h3 text-accent"
									>
										Get in touch
									</a>
								</li>
							</ul>
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</header>
	)
}
