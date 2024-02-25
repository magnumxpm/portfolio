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
			desc: "I am a computer science student, delving deep into AI and Deep learning throughout my coursework. While pursuing my bachelors in engineering, I work on my algorithmic and problem solving skills forging myself for a world that demands the most optimum solutions to critical problems. Additionally, I engage in trying my hand out in various fun and utilitarian projects relating to Web development, Microservices, Databases, Data Science, and AI including NLPs. Throughout my academic life, I seeked roles of leadership, be it in group projects or demonstrations. In my college I have achieved victory in two nationally revered hackathons that focus on innovation, utility, and the cutting-edge tech.",
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
			<div className="flex flex-col min-h-[600px] md:min-h-[570px] lg:min-h-[500px] px-5 py-3 w-full max-w-desktop snap-y snap-start">
				{data && <HeroContent tags={data.tags} desc={data.desc} />}
			</div>

			<img
				src="wave-haikei.svg"
				alt=""
				className="w-full aspect-[960/200]"
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
