"use client"

import { useEffect, useRef } from "react"

import { PRESETS, type FieldPreset } from "./ascii-config"
import { createEngine, type EngineParams } from "./ascii-engine"

/**
 * The animated ASCII/dither field behind the whole page.
 *
 * This component renders exactly once and never again — there is deliberately no
 * `useState` anywhere in it. Everything mutable (the active section preset, grid
 * metrics, the rAF handle) lives in refs that the imperative engine reads, so a
 * 15fps animation costs React nothing.
 */
export default function AsciiField() {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const paramsRef = useRef<EngineParams>({
		current: { ...PRESETS.hero },
		target: { ...PRESETS.hero },
	})

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const engine = createEngine(canvas, paramsRef)

		// Section variation runs through one observer that writes a target preset
		// into the ref. The existing loop eases toward it — no second driver.
		const sections = document.querySelectorAll<HTMLElement>("[data-field-preset]")
		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue
					const key = entry.target.getAttribute("data-field-preset")
					const preset: FieldPreset | undefined = key ? PRESETS[key] : undefined
					if (preset) paramsRef.current.target = { ...preset }
				}
			},
			{ threshold: 0.5 }
		)
		sections.forEach((s) => io.observe(s))

		return () => {
			io.disconnect()
			engine.destroy()
		}
	}, [])

	return (
		<div className="ascii-field-wrap" aria-hidden="true">
			<canvas ref={canvasRef} className="ascii-field-canvas" />
		</div>
	)
}
