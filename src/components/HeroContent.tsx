"use client"

import { useEffect, useState } from "react"
import { TypeAnimation } from "react-type-animation"
import ReactTyped from "react-typed"

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

	return (
		<div className="flex items-center gap-1 sm:pt-0">
			<div className="flex flex-col gap-1 p-3 w-full sm:w-3/5 px-5">
				<span className="font-code text-base sm:text-xl min-h-5 sm:min-h-6 cursor-default select-none">
					// ~{" "}
					<TypeAnimation
						sequence={["whoami"]}
						wrapper="span"
						speed={50}
						cursor={false}
					/>
				</span>
				<h1 className=" text-3xl sm:text-hero font-bold leading-tight min-h-11 sm:min-h-24">
					<ReactTyped
						strings={["Pritam Mukherjee"]}
						typeSpeed={30}
						startDelay={400}
						cursorChar="_"
						showCursor
						className="cursor-default select-none"
					/>
				</h1>
				<span className="text-base_mobile sm:text-base min-h-6 sm:min-h-7 font-bold">
					<ReactTyped
						strings={[tagsStringified]}
						typeSpeed={20}
						cursorChar=""
						startDelay={1300}
						showCursor
						className="cursor-default select-none"
					/>
				</span>
				<p className="mt-6 sm:mt-10 text-base_mobile sm:text-base min-h-[500px] sm:min-h-[450px] font-code">
					{showDesc && (
						<TypeAnimation
							splitter={(str) => str.split(/(?= )/)}
							speed={{ type: "keyStrokeDelayInMs", value: 30 }}
							sequence={[desc]}
							wrapper="p"
							className="type"
							cursor={false}
						/>
					)}
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
	)
}
