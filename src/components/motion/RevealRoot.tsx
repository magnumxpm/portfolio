"use client"

import { useEffect } from "react"

/**
 * One observer for every `[data-reveal]` on the page. A per-element component
 * would mean one observer and one client bundle entry per section; this is a
 * single ~1KB island instead.
 */
export function RevealRoot() {
	useEffect(() => {
		const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]")
		if (!nodes.length) return

		if (
			!("IntersectionObserver" in window) ||
			matchMedia("(prefers-reduced-motion: reduce)").matches
		) {
			nodes.forEach((n) => n.classList.add("is-visible"))
			return
		}

		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue
					entry.target.classList.add("is-visible")
					io.unobserve(entry.target)
				}
			},
			{ rootMargin: "0px 0px -10% 0px" }
		)
		nodes.forEach((n) => io.observe(n))
		return () => io.disconnect()
	}, [])

	return null
}
