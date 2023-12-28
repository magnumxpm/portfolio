"use client"

import ReactTyped from "react-typed"

export default function HeroContent({
	tags,
	desc,
}: {
	tags: string[]
	desc: string
}) {
	return (
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
					{tags.map((tag, idx) =>
						idx === tags.length - 1 ? (
							<span key={idx}>{tag}</span>
						) : (
							<span key={idx}>{tag} · </span>
						)
					)}
				</span>
				<p className="mt-12 text-base font-code">{desc}</p>
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
