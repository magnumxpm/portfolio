"use client"
import HeroContent from "portfoliov1/components/HeroContent"
import { useEffect, useState } from "react"

import { Badge } from "../../@/components/ui/badge"

export default function Home() {
	const [data, setData] = useState<{
		tags: string[]
		desc: string
		specialties: string[]
	}>()

	useEffect(() => {
		setData({
			tags: ["CSE Undergrad", "Specializing in AI"],
			desc: "I am a computer science student, delving deep into AI and Deep learning throughout my coursework. While pursuing my bachelors in engineering, I work on my algorithmic and problem solving skills forging myself for a world that demands the most optimum solutions to critical problems. Additionally, I engage in trying my hand out in various fun and utilitarian projects relating to Web development, Microservices, Databases, Data Science, and AI including NLPs. Throughout my academic life, I seeked roles of leadership, be it in group projects or demonstrations. In my college I have achieved victory in two nationally revered hackathons that focus on innovation, utility, and the cutting-edge tech.",
			specialties: [
				"API servers",
				"Websockets",
				"Server-side development",
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
		<main className="flex flex-col text-base !scroll-smooth items-center snap-mandatory snap-y">
			{/* VV The div will limit all content to fill within a max-width */}
			<div className="flex flex-col min-h-screen w-full max-w-large justify-center snap-y snap-start">
				{data && <HeroContent tags={data.tags} desc={data.desc} />}
			</div>

			<div className="h-screen py-5 text-white bg-dark w-full snap-y snap-start flex justify-center">
				<div className="max-w-large h-full w-full flex p-3 gap-2">
					<div className="w-1/4 h-full flex flex-col items-center p-3">
						<h3 className="w-full font-bold text-2xl leading-tight">
							Specialities
						</h3>

						<div className="mt-6 flex flex-wrap gap-3">
							{data &&
								data.specialties.map((item, idx) => (
									<Badge
										variant="default"
										className=" text-base"
									>
										{item}
									</Badge>
								))}
						</div>
					</div>
					<div className="w-3/4 h-full">
						Well, this site is under construction as you can see
					</div>
				</div>
			</div>
		</main>
	)
}
