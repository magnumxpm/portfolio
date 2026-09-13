import { render, screen } from "@testing-library/react"

import { Contact } from "@/components/sections/Contact"
import { Credentials } from "@/components/sections/Credentials"
import { Experience } from "@/components/sections/Experience"
import { Focus } from "@/components/sections/Focus"
import { Hero } from "@/components/sections/Hero"
import { Work } from "@/components/sections/Work"
import { awardsData, educationData } from "@/data/credentialsData"
import { experienceData } from "@/data/experienceData"
import { focusData } from "@/data/focusData"
import { heroData } from "@/data/heroData"
import { projectsData } from "@/data/projectsData"

describe("Hero", () => {
	it("renders name, role and lede without waiting on any animation", () => {
		render(<Hero />)
		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(heroData.name)
		expect(screen.getByText(heroData.lede)).toBeInTheDocument()
		expect(screen.getByText(heroData.status)).toBeInTheDocument()
	})

	it("exposes the résumé and email calls to action", () => {
		render(<Hero />)
		expect(screen.getByRole("link", { name: "Résumé" })).toHaveAttribute(
			"href",
			heroData.resumeUrl
		)
		expect(screen.getByRole("link", { name: heroData.email })).toHaveAttribute(
			"href",
			`mailto:${heroData.email}`
		)
	})
})

describe("Focus", () => {
	it("renders every capability area", () => {
		render(<Focus />)
		for (const item of focusData) {
			expect(screen.getByRole("heading", { name: item.title })).toBeInTheDocument()
		}
	})

	it("gives every card an isometric diagram with an accessible name", () => {
		render(<Focus />)
		const figures = screen.getAllByRole("img")
		expect(figures).toHaveLength(focusData.length)
		for (const fig of figures) {
			expect(fig).toHaveAccessibleName()
		}
	})

	it("renders the diagrams server-side, with no images to fetch", () => {
		const { container } = render(<Focus />)
		expect(container.querySelectorAll("svg.iso-scene")).toHaveLength(focusData.length)
		expect(container.querySelectorAll("img")).toHaveLength(0)
	})

	it("keeps the diagrams free of rendered text", () => {
		// Labels crowded the geometry at this size. Meaning lives in the card
		// copy; <title>/<desc> still carry it for screen readers.
		const { container } = render(<Focus />)
		expect(container.querySelectorAll(".iso-scene text")).toHaveLength(0)
		for (const scene of container.querySelectorAll("svg.iso-scene")) {
			expect(scene.querySelector("title")?.textContent).toBeTruthy()
			expect(scene.querySelector("desc")?.textContent).toBeTruthy()
		}
	})
})

describe("Work", () => {
	it("renders every project", () => {
		render(<Work />)
		for (const project of projectsData) {
			expect(screen.getByRole("heading", { name: project.title })).toBeInTheDocument()
		}
	})

	it("links only the projects that have a public URL, and labels nothing else", () => {
		render(<Work />)
		const linked = projectsData.filter((p) => p.url)
		expect(screen.getAllByRole("link")).toHaveLength(linked.length)
		// No "Private" badge — the absence of a link already says it.
		expect(screen.queryByText("Private")).not.toBeInTheDocument()
	})

	it("renders an architecture diagram for every project", () => {
		render(<Work />)
		for (const project of projectsData) {
			expect(
				screen.getByRole("img", { name: `${project.title} architecture` })
			).toBeInTheDocument()
		}
	})

	it("keeps the stack layers as real text in a legend, not baked into the SVG", () => {
		const { container } = render(<Work />)
		// The diagram is a glyph — at 188px any label would render at 6-8px.
		expect(container.querySelectorAll(".iso-scene text")).toHaveLength(0)
		// getAllByText: layer labels are shared across projects by design — a
		// "Go API" in Jarnkit is the same colour and the same words as in Helmdall.
		for (const layer of projectsData[0].stack) {
			expect(screen.getAllByText(layer.label).length).toBeGreaterThan(0)
		}
	})

	it("gives each project a distinct figure topology", () => {
		const kinds = new Set(projectsData.map((p) => p.figure))
		// Six projects sharing one glyph told you nothing about any of them.
		expect(kinds.size).toBe(projectsData.length)
	})

	it("lists each stack layer exactly once, with no duplicate tech list", () => {
		render(<Work />)
		for (const project of projectsData) {
			for (const layer of project.stack) {
				expect(screen.getAllByText(layer.label).length).toBeGreaterThan(0)
			}
		}
		// The `technologies` array duplicated the stack labels at the same visual
		// weight directly above them; it is no longer rendered.
		expect(screen.queryByText("GOLANG")).not.toBeInTheDocument()
	})
})

describe("Experience", () => {
	it("renders each role and company as separate fields", () => {
		render(<Experience />)
		for (const item of experienceData) {
			expect(screen.getByRole("heading", { name: item.role })).toBeInTheDocument()
			expect(screen.getByText(item.company)).toBeInTheDocument()
			expect(screen.getByText(item.period)).toBeInTheDocument()
		}
	})

	it("marks the current role", () => {
		render(<Experience />)
		expect(screen.getByText("Current")).toBeInTheDocument()
	})

	it("gives every entry a timeline node and a rail segment", () => {
		const { container } = render(<Experience />)
		expect(container.querySelectorAll(".tl-node")).toHaveLength(experienceData.length)
		// The rail is per-entry with negative insets rather than one absolute line,
		// so adjacent segments meet and the timeline reads as continuous.
		const rails = container.querySelectorAll(".tl-rail")
		expect(rails).toHaveLength(experienceData.length)
		expect(rails[0]).toHaveAttribute("data-first")
		expect(rails[rails.length - 1]).toHaveAttribute("data-last")
	})
})

describe("Credentials", () => {
	it("merges education, awards and certifications into one section", () => {
		render(<Credentials />)
		expect(screen.getByText(educationData[0].institution)).toBeInTheDocument()
		for (const award of awardsData) {
			expect(screen.getByText(award.title)).toBeInTheDocument()
		}
		expect(screen.getByRole("link", { name: /verify/i })).toBeInTheDocument()
	})
})

describe("Contact", () => {
	it("offers a real mailto rather than a stub form", () => {
		render(<Contact />)
		expect(screen.queryByRole("form")).not.toBeInTheDocument()
		expect(screen.getAllByRole("link", { name: heroData.email })[0]).toHaveAttribute(
			"href",
			`mailto:${heroData.email}`
		)
	})
})

describe("diagram wells", () => {
	// The four Focus diagrams sit in a grid. If their viewBoxes disagree on
	// aspect ratio they letterbox to different widths and the corner brackets
	// frame each card differently — which is what made the grid look ragged.
	it("renders every Focus scene at one viewBox aspect ratio", () => {
		const { container } = render(<Focus />)
		const scenes = Array.from(container.querySelectorAll("svg.iso-scene"))
		expect(scenes).toHaveLength(4)

		const ratios = scenes.map((s) => {
			const [, , w, h] = s.getAttribute("viewBox")!.split(" ").map(Number)
			return w / h
		})
		for (const r of ratios) expect(r).toBeCloseTo(3 / 2, 5)
	})

	it("renders every project figure square", () => {
		const { container } = render(<Work />)
		const scenes = Array.from(container.querySelectorAll("svg.iso-scene"))
		expect(scenes.length).toBeGreaterThan(0)
		for (const s of scenes) {
			const [, , w, h] = s.getAttribute("viewBox")!.split(" ").map(Number)
			expect(w / h).toBeCloseTo(1, 5)
		}
	})
})
