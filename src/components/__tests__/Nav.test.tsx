import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Nav } from "@/components/Nav"
import { heroData } from "@/data/heroData"

describe("Nav", () => {
	it("exposes the panel as a real disclosure", () => {
		render(<Nav />)
		const trigger = screen.getByRole("button", { name: /open navigation/i })
		expect(trigger).toHaveAttribute("aria-expanded", "false")
		expect(trigger).toHaveAttribute("aria-controls", "nav-panel")
	})

	it("opens and closes on click", async () => {
		const user = userEvent.setup()
		render(<Nav />)
		const trigger = screen.getByRole("button", { name: /open navigation/i })

		await user.click(trigger)
		expect(screen.getByRole("button", { name: /close navigation/i })).toHaveAttribute(
			"aria-expanded",
			"true"
		)

		await user.click(screen.getByRole("button", { name: /close navigation/i }))
		expect(screen.getByRole("button", { name: /open navigation/i })).toHaveAttribute(
			"aria-expanded",
			"false"
		)
	})

	it("closes on Escape and returns focus to the trigger", async () => {
		const user = userEvent.setup()
		render(<Nav />)
		const trigger = screen.getByRole("button", { name: /open navigation/i })

		await user.click(trigger)
		await user.keyboard("{Escape}")

		const reopened = screen.getByRole("button", { name: /open navigation/i })
		expect(reopened).toHaveAttribute("aria-expanded", "false")
		expect(reopened).toHaveFocus()
	})

	it("keeps the section links reachable without opening anything", () => {
		render(<Nav />)
		// The inline list is the no-JS and top-of-page nav; it is always in the DOM.
		expect(screen.getAllByRole("link", { name: "Work" }).length).toBeGreaterThan(0)
		expect(screen.getAllByRole("link", { name: "Focus" }).length).toBeGreaterThan(0)
	})

	it("offers the mailto in both the bar and the panel", () => {
		render(<Nav />)
		const ctas = screen.getAllByRole("link", { name: "Get in touch" })
		expect(ctas.length).toBe(2)
		for (const cta of ctas) {
			expect(cta).toHaveAttribute("href", `mailto:${heroData.email}`)
		}
	})
})
