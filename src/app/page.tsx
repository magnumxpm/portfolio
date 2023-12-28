"use client"

import Image from "next/image"
import ReactTyped from "react-typed"

export default function Home() {
	return (
		<main className="flex min-h-screen text-base justify-center">
			{/* VV The div will limit all content to fill within a max-width */}
			<div className="flex flex-col w-full max-w-large justify-center">
				<div className="flex gap-1">
					<div className="flex flex-col gap-1 p-3 w-3/5">
						<span className="font-code text-xl cursor-default select-none">
							// ~ whoami
						</span>
						<h1 className="text-hero font-bold leading-tight min-h-24">
							<ReactTyped
								strings={["Pritam Mukherjee"]}
								typeSpeed={50}
								cursorChar="_"
								startDelay={100}
								showCursor
								className="cursor-default select-none"
							/>
						</h1>
						<span className="text-base font-bold">
							CSE undergrad, specializing in AI
						</span>
						<p className="mt-12 text-base font-code">
							I am a computer science student, delving deep into
							AI and Deep learning throughout my coursework. While
							pursuing my bachelors in engineering, I work on my
							algorithmic and problem solving skills forging
							myself for a world that demands the most optimum
							solutions to critical problems. Additionally, I
							engage in trying my hand out in various fun and
							utilitarian projects relating to Web development,
							Microservices, Databases, Data Science, and AI
							including NLPs. Throughout my academic life, I
							seeked roles of leadership, be it in group projects
							or demonstrations. In my college I have achieved
							victory in two nationally revered hackathons that
							focus on innovation, utility, and the cutting-edge
							tech.
						</p>
					</div>
					{/* <div className="w-2/5 flex items-center justify-center border">
						<Image
							width={36}
							height={40}
							className=" w-1/3"
							src="/code.svg"
							alt="Code glyph"
						/>
					</div> */}
				</div>
			</div>
		</main>
	)
}
