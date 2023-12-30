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
		<main className="flex flex-col text-base !scroll-smooth items-center snap-mandatory snap-y">
			{/* VV The div will limit all content to fill within a max-width */}
			<div className="flex flex-col min-h-screen w-full max-w-large justify-center snap-y snap-start">
				{data && <HeroContent tags={data.tags} desc={data.desc} />}
			</div>

			<div className="min-h-screen py-5 text-white bg-dark w-full snap-y snap-start flex justify-center">
				<div className="max-w-large h-full w-full flex flex-col sm:flex-row p-3 gap-2">
					<div className="w-full sm:w-1/4 sm:h-full flex flex-col items-center p-3">
						<h3 className="w-full font-bold text-xl sm:text-2xl leading-tight">
							Specialities
						</h3>

						<div className="mt-5 sm:mt-6 flex flex-wrap gap-3">
							{data &&
								data.specialties.map((item, idx) => (
									<Badge
										variant="default"
										className="text-base_mobile sm:text-base"
										key={idx}
									>
										{item}
									</Badge>
								))}
						</div>
					</div>
					<div className="w-full sm:w-3/4 min-h-screen sm:min-h-fit sm:h-full p-3 flex items-center justify-center">
						<p className="text-center">
							Well, this site is under construction as you can see
						</p>
					</div>
				</div>
			</div>
		</main>
	)
}
