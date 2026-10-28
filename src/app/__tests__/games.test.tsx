import { readFileSync } from "node:fs"
import { join } from "node:path"

import { render, screen } from "@testing-library/react"

import GamesPage from "@/app/games/page"
import MetrowayPrivacyPage from "@/app/games/metroway/privacy/page"
import { GAMES_CONTACT, gamesData } from "@/data/gamesData"

describe("Games", () => {
	it("lists every game with a link to its privacy policy", () => {
		render(<GamesPage />)
		for (const game of gamesData) {
			expect(screen.getByRole("heading", { name: game.title })).toBeInTheDocument()
		}
		expect(screen.getAllByRole("link", { name: /privacy policy/i })[0]).toHaveAttribute(
			"href",
			"/games/metroway/privacy"
		)
	})
})

describe("Metroway privacy policy", () => {
	it("names the ad network, the contact address and the date", () => {
		render(<MetrowayPrivacyPage />)
		expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
		expect(screen.getAllByText(/Google AdMob/).length).toBeGreaterThan(0)
		expect(screen.getAllByRole("link", { name: GAMES_CONTACT })[0]).toHaveAttribute(
			"href",
			`mailto:${GAMES_CONTACT}`
		)
		expect(screen.getByText(/Last updated/).querySelector("time")).toHaveAttribute(
			"datetime",
			gamesData[0].privacyUpdated
		)
	})
})

describe("app-ads.txt", () => {
	// AdMob only crawls the domain root; the /games copy is a convenience.
	it.each(["public/app-ads.txt", "public/games/app-ads.txt"])("%s authorises the AdMob account", (file) => {
		const text = readFileSync(join(process.cwd(), file), "utf8")
		expect(text.trim()).toBe("google.com, pub-9748313231567546, DIRECT, f08c47fec0942fa0")
	})
})
