"use client"

import { useEffect, useState } from "react"
import { TypeAnimation } from "react-type-animation"
import ReactTyped from "react-typed"
import Image from "next/image"
import Link from "next/link"
import ExternalLink from "./ExternalLink"

export default function HeroContent({
	tags,
	desc,
}: {
	tags: string[]
	desc: string
}) {
	let tagsStringified = ""
	tags.forEach((tag, idx) => {
		tagsStringified =
			tagsStringified + (idx === tags.length - 1 ? tag : tag + " · ")
	})

	const [showDesc, setShowDesc] = useState(false)
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setShowDesc(true)
		}, 1300)

		return () => {
			clearTimeout(timeoutId)
		}
	}, [])

	const engineerText = "{Engineer}"
	const [nameIsDone, setNameIsDone] = useState(false)
	const nameComplete = () => {
		setNameIsDone((_) => true)
	}

	return (
		// <div className="flex items-center gap-1 sm:pt-0 relative">
		// 	<div className="flex flex-col gap-1 p-3 w-full sm:w-3/5 px-5">
		// 		<h1 className=" text-3xl sm:text-hero font-bold leading-tight min-h-11 sm:min-h-24">
		// 			<ReactTyped
		// 				strings={["Pritam Mukherjee"]}
		// 				typeSpeed={30}
		// 				startDelay={400}
		// 				// cursorChar="_"
		// 				showCursor={false}
		// 				className="cursor-default select-none"
		// 			/>
		// 		</h1>
		// 		<span className="text-base_mobile sm:text-base min-h-6 sm:min-h-7 font-bold">
		// 			<ReactTyped
		// 				strings={[tagsStringified]}
		// 				typeSpeed={20}
		// 				cursorChar=""
		// 				startDelay={1300}
		// 				showCursor
		// 				className="cursor-default select-none"
		// 			/>
		// 		</span>
		// 		<p className="mt-6 sm:mt-10 text-base_mobile sm:text-base min-h-[500px] sm:min-h-[450px] font-code">
		// 			{showDesc && (
		// 				<TypeAnimation
		// 					splitter={(str) => str.split(/(?= )/)}
		// 					speed={{ type: "keyStrokeDelayInMs", value: 15 }}
		// 					sequence={[desc]}
		// 					wrapper="p"
		// 					className="type"
		// 					cursor={false}
		// 				/>
		// 			)}
		// 		</p>
		// 	</div>
		// </div>

		<div className="flex flex-col w-full">
			<div className="flex flex-col py-4">
				<h1 className="text-2xl sm:text-tab_hero md:text-hero font-bold leading-tight min-h-11 sm:min-h-24">
					<ReactTyped
						strings={["Pritam Mukherjee"]}
						typeSpeed={30}
						startDelay={400}
						onComplete={nameComplete}
						showCursor={false}
						className="cursor-default select-none"
					/>
				</h1>
				<p
					className={`text-xl sm:text-tab_sub_hero md:text-sub_hero font-semibold leading-tight transition-all duration-700 pb-4 ${
						nameIsDone
							? "translate-y-0 opacity-100"
							: "opacity-0 -translate-y-5"
					}`}
				>
					Software <span className="text-theme">{engineerText}</span>
				</p>

				<ExternalLink
					href="#"
					variant="big"
					className={`transition-all duration-700 pb-6 ${
						nameIsDone
							? "translate-y-0 opacity-100"
							: "opacity-0 -translate-y-5"
					}`}
				>
					My Résumé
				</ExternalLink>

				<p
					className={`text-base_mobile sm:text-base font-code transition-all duration-700 ${
						nameIsDone
							? "translate-y-0 opacity-100"
							: "opacity-0 -translate-y-5"
					}`}
				>
					{desc}
				</p>
			</div>
		</div>
	)
}
