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
})

describe("Work", () => {
	it("renders every project", () => {
		render(<Work />)
		for (const project of projectsData) {
			expect(screen.getByRole("heading", { name: project.title })).toBeInTheDocument()
		}
	})

	it("links only the projects that have a public URL", () => {
		render(<Work />)
		const linked = projectsData.filter((p) => p.url)
		expect(screen.getAllByRole("link")).toHaveLength(linked.length)
		expect(screen.getAllByText("Private")).toHaveLength(projectsData.length - linked.length)
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
