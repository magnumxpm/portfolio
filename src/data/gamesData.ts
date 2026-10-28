import type { GameItem } from "@/types"

export const gamesData: GameItem[] = [
	{
		slug: "metroway",
		title: "Metroway",
		tagline: "Intergalactic transit lines",
		description:
			"A transit puzzle for phones. Moons orbit a planet, and you thread shuttle lines between them while eclipses cut routes off and new moons keep arriving. Short runs, one thumb, one more try.",
		platforms: ["iOS", "Android"],
		status: "In development",
		privacyUpdated: "2026-10-29",
	},
]

/** The one inbox for every game: support, privacy requests, store review. */
export const GAMES_CONTACT = "me@pmukherjee.dev"
