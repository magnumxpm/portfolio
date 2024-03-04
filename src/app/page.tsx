"use client"
import HeroContent from "portfoliov1/components/HeroContent"
import { useEffect, useState } from "react"

import { Badge } from "../../@/components/ui/badge"
import NavBar from "portfoliov1/components/NavBar"

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
		<main className="flex flex-col text-base items-center !scroll-smooth snap-mandatory snap-y">
			<div className="max-w-desktop w-full">
				<NavBar />
			</div>

			{/* VV The div will limit all content to fill within a max-width */}
			<div className="flex flex-col min-h-[500px] px-5 py-3 w-full max-w-desktop snap-y snap-start">
				{data && <HeroContent tags={data.tags} desc={data.desc} />}
			</div>

			<img
				src="wv_haikei.svg"
				alt=""
				className="w-full aspect-[900/100]"
			/>

			<div className="min-h-screen py-5 text-white bg-dark w-full snap-y snap-start flex justify-center">
				<div className="max-w-desktop h-full w-full flex flex-col sm:flex-row p-3 gap-2">
					<p className="text-center">
						🚧 🧱 🔨 Under construction! 🚧 🧱 🔨
					</p>
				</div>
			</div>
		</main>
	)
}
