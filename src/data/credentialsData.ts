import type { AwardItem, CertificationItem, EducationItem } from "@/types"

export const educationData: EducationItem[] = [
	{
		institution: "Techno India University, WB",
		qualification: "B.Tech, Computer Science & Engineering",
		period: "2021 — 2025",
		logo: "/techno_logo.jpeg",
	},
]

export const awardsData: AwardItem[] = [
	{
		title: "Smart India Hackathon — Winner",
		year: "2023",
		description:
			"Co-led the team to a national win. Led four engineers on the React and Electron frontend, and built the video conferencing layer on WebRTC and SFUs.",
	},
	{
		title: "KAVACH Cybersecurity Hackathon — Winner",
		year: "2023",
		description:
			"Built the entire backend — API and WebSocket servers — single-handedly, plus a CVSS vulnerability scanner pulling periodically from the NVD database. Shipped a live MVP.",
	},
]

export const certificationsData: CertificationItem[] = [
	{
		title: "Programming with Python",
		issuer: "Internshala Trainings",
		year: "2023",
		logo: "/ist_logo.png",
		url: "https://trainings.internshala.com/s/v/2789935/ea81ad2e",
	},
]
