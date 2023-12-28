"use client"

import HeroContent from "portfoliov1/components/HeroContent"
import { useEffect, useState } from "react"

export default function Home() {
	const [data, setData] = useState<{
		tags: string[]
		desc: string
	}>()

	useEffect(() => {
		setData({
			tags: ["CSE Undergrad", "Specializing in AI"],
			desc: "I am a computer science student, delving deep into AI and Deep learning throughout my coursework. While pursuing my bachelors in engineering, I work on my algorithmic and problem solving skills forging myself for a world that demands the most optimum solutions to critical problems. Additionally, I engage in trying my hand out in various fun and utilitarian projects relating to Web development, Microservices, Databases, Data Science, and AI including NLPs. Throughout my academic life, I seeked roles of leadership, be it in group projects or demonstrations. In my college I have achieved victory in two nationally revered hackathons that focus on innovation, utility, and the cutting-edge tech.",
		})
	}, [])

	return (
		<main className="flex min-h-screen text-base justify-center">
			{/* VV The div will limit all content to fill within a max-width */}
			<div className="flex flex-col w-full max-w-large justify-center">
				{data && <HeroContent tags={data!.tags} desc={data!.desc} />}
			</div>
		</main>
	)
}
