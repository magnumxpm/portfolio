"use client"
import HeroContent from "portfoliov1/components/HeroContent"
import { useEffect, useState } from "react"

import { Badge } from "../../@/components/ui/badge"
import NavBar from "portfoliov1/components/NavBar"
import { TracingBeam } from "../../@/components/ui/tracing_beam"
import ProjectsSection from "portfoliov1/components/ProjectsSection"
import ExperienceSection from "portfoliov1/components/ExperienceSection"
import AchievementsSection from "portfoliov1/components/AchievementsSection"

export default function Home() {
	const [data, setData] = useState<{
		tags: string[]
		desc: string
		specialties: string[]
	}>()

	useEffect(() => {
		setData({
			tags: [
				"Next.js",
				"React",
				"Golang",
				"APIs",
				"Websockets",
				"UI/UX",
				"Full-stack Dev",
				"Testing",
				"DevOps",
				"ML",
			],
			desc: "Hi 👋. I am a software engineering undergrad. I've been into computer science since elementary school, and over the years, I've involved myself with software projects that come in various forms -- social media, auto task delegation, video conferencing, network-enabled system auditing, and more. I have dabbled with Web and mobile dev and won two nationally revered hackathons during my undergrad.",
			specialties: [
				"API servers",
				"Websockets",
				"Backend dev",
				"React | Next.js",
				"Flutter",
				"Authentication",
				"Data modelling",
				"UI/UX Design",
				"Testing",
				"DevOps",
				"LLM",
				"Deeplearning",
			],
		})
	}, [])

	return (
		<main className="flex flex-col text-base items-center">
			<div className="max-w-phone sm:max-w-tablet lg:max-w-desk w-full">
				<NavBar />
			</div>

			{/* VV The div will limit all content to fill within a max-width */}
			<div className="flex flex-col min-h-[555px] sm:min-h-[520px] px-5 py-3 w-full max-w-phone sm:max-w-tablet lg:max-w-desk">
				{data && <HeroContent tags={data.tags} desc={data.desc} />}
			</div>

			<img
				src="wv_haikei.svg"
				alt=""
				className="w-full aspect-[900/100]"
			/>

			<div className="py-5 text-white bg-dark w-full flex justify-center">
				<div className="max-w-phone sm:max-w-tablet lg:max-w-desk h-full w-full flex flex-col sm:flex-row p-3 gap-2">
					{/* Content */}
					<div className="w-full px-2 flex flex-col gap-14">
						<ProjectsSection />

						<ExperienceSection />

						<AchievementsSection />
					</div>
				</div>
			</div>
		</main>
	)
}
