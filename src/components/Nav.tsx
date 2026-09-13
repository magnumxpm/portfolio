"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { X } from "lucide-react"

import { heroData } from "@/data/heroData"
import { cn } from "@/lib/utils"

const links = [
	{ href: "#focus", label: "Focus" },
	{ href: "#work", label: "Work" },
	{ href: "#experience", label: "Experience" },
	{ href: "#credentials", label: "Credentials" },
	{ href: "#contact", label: "Contact" },
] as const

const COLLAPSE_AT = 80

/**
 * A nav with three states: a full bar at the top of the page, two floating
 * pills once you scroll, and an expanded panel when the right-hand pill is
 * opened.
 *
 * Both pills are `position: fixed` and the panel is absolutely positioned, so
 * none of this animates page layout — the springs run entirely on width,
 * opacity and transform.
 */
export function Nav() {
	const [collapsed, setCollapsed] = useState(false)
	const [open, setOpen] = useState(false)
	const panelRef = useRef<HTMLDivElement>(null)
	const triggerRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		const onScroll = () => setCollapsed(window.scrollY > COLLAPSE_AT)
		onScroll()
		window.addEventListener("scroll", onScroll, { passive: true })
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	const restoreFocus = useRef(false)

	const close = useCallback((returnFocus = true) => {
		restoreFocus.current = returnFocus
		setOpen(false)
	}, [])

	// Focus is restored after the render that closes the panel, not inside the
	// handler: closing marks the panel inert, and moving focus out of a subtree
	// that is about to become inert has to happen on the other side of that.
	useEffect(() => {
		if (open || !restoreFocus.current) return
		restoreFocus.current = false
		triggerRef.current?.focus()
	}, [open])

	// Escape, click-outside, and focus management — this is a disclosure, not
	// just a styled div, so it has to behave like one.
	useEffect(() => {
		if (!open) return

		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") close()
		}
		const onPointer = (e: PointerEvent) => {
			const t = e.target as Node
			if (panelRef.current?.contains(t) || triggerRef.current?.contains(t)) return
			close(false)
		}

		document.addEventListener("keydown", onKey)
		document.addEventListener("pointerdown", onPointer)
		panelRef.current?.querySelector<HTMLElement>("a, button")?.focus()

		return () => {
			document.removeEventListener("keydown", onKey)
			document.removeEventListener("pointerdown", onPointer)
		}
	}, [open, close])

	return (
		<header className="pointer-events-none fixed inset-x-0 top-0 z-50" data-collapsed={collapsed || undefined}>
			<span aria-hidden="true" className="nav-scrim" />
			<nav
				className="shell relative z-10 flex min-h-16 flex-wrap items-center gap-y-2 py-3"
				aria-label="Primary"
			>
				{/* Brand — condenses into a pill on scroll. */}
				<a
					href="#top"
					className={cn(
						"nav-pill pointer-events-auto font-mono text-meta uppercase tracking-[0.14em] text-fg",
						"transition-colors duration-200 ease-out hover:text-accent"
					)}
				>
					PM
					<span className="text-accent">.</span>
				</a>

				{/* The inline links. Present at the top of the page, folded away once
				    the bar collapses — same nodes, so nothing remounts. */}
				<ul className="nav-links nav-inline pointer-events-auto order-3 hidden w-full flex-wrap items-center justify-center gap-x-6 gap-y-2 md:order-none md:flex md:w-auto md:flex-1 md:gap-8">
					{links.slice(0, 4).map((link) => (
						<li key={link.href}>
							<a href={link.href} className="nav-link font-mono text-meta text-fg-dim">
								{link.label}
							</a>
						</li>
					))}
				</ul>

				<div className="pointer-events-auto ml-auto flex items-center gap-2 md:ml-0">
					<a
						href={`mailto:${heroData.email}`}
						className="nav-inline nav-pill hidden font-mono text-meta text-fg md:inline-flex"
					>
						Get in touch
					</a>

					{/* A morph, not a popover: the pill *is* the panel. One surface owns
					    the border, fill and blur and interpolates between the two
					    geometries; a clip box on the same geometry reveals the links as
					    it grows; the trigger stays put and becomes the panel's header.
					    The wrapper keeps the pill's size at all times, so opening never
					    touches the nav's layout. */}
					<div className="nav-morph" data-open={open || undefined}>
						<span aria-hidden="true" className="nav-morph-surface" />

						{/* `inert` on the panel already takes it out of the a11y tree and out of
						    the tab order; an aria-hidden here as well would be redundant and
						    would hide it from a name query even when open. */}
						<div className="nav-morph-clip">
							<div id="nav-panel" ref={panelRef} className="nav-morph-panel" inert={!open}>
								<ul>
									{links.map((link, i) => (
										<li key={link.href} style={{ "--i": i } as React.CSSProperties}>
											<a
												href={link.href}
												onClick={() => close(false)}
												className="nav-morph-item font-mono text-meta text-fg-dim"
											>
												{link.label}
											</a>
										</li>
									))}
									<li style={{ "--i": links.length } as React.CSSProperties}>
										<a
											href={`mailto:${heroData.email}`}
											onClick={() => close(false)}
											className="nav-morph-item font-mono text-meta text-accent"
										>
											Get in touch
										</a>
									</li>
								</ul>
							</div>
						</div>

						<button
							ref={triggerRef}
							type="button"
							onClick={() => setOpen((v) => !v)}
							aria-expanded={open}
							aria-controls="nav-panel"
							className="nav-morph-trigger font-mono text-meta text-fg"
						>
							<span className="sr-only">{open ? "Close navigation" : "Open navigation"}</span>
							{/* Both marks are always present and crossfade in place, so the
							    glyph never jumps as the surface grows around it. */}
							<span aria-hidden="true" className="nav-morph-glyph">
								<span className="nav-bars">
									<span />
									<span />
								</span>
								<X className="nav-morph-x size-4" />
							</span>
							<span aria-hidden="true">Menu</span>
						</button>
					</div>
				</div>

			</nav>
		</header>
	)
}
