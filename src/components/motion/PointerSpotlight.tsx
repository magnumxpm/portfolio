"use client"

import { useEffect, useRef } from "react"

/**
 * A cursor-tracked spotlight for a grid of cards.
 *
 * One listener on the container, not one per card, and rAF-throttled so a fast
 * pointer sweep costs at most one style write per frame. It writes --mx/--my as
 * percentages; the highlight itself is a radial-gradient in CSS, so this ships
 * no styling logic and never triggers a React render.
 */
export function PointerSpotlight({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const el = ref.current
		if (!el) return
		if (matchMedia("(pointer: coarse)").matches) return

		let frame = 0
		let x = 0
		let y = 0

		const write = () => {
			frame = 0
			el.style.setProperty("--mx", `${x}px`)
			el.style.setProperty("--my", `${y}px`)
		}

		const onMove = (e: PointerEvent) => {
			const box = el.getBoundingClientRect()
			x = e.clientX - box.left
			y = e.clientY - box.top
			if (!frame) frame = requestAnimationFrame(write)
		}

		const onLeave = () => el.removeAttribute("data-lit")
		const onEnter = () => el.setAttribute("data-lit", "")

		el.addEventListener("pointermove", onMove)
		el.addEventListener("pointerenter", onEnter)
		el.addEventListener("pointerleave", onLeave)

		return () => {
			if (frame) cancelAnimationFrame(frame)
			el.removeEventListener("pointermove", onMove)
			el.removeEventListener("pointerenter", onEnter)
			el.removeEventListener("pointerleave", onLeave)
		}
	}, [])

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	)
}
