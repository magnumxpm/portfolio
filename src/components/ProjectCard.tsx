import { Icon } from "@iconify/react/dist/iconify.js"
import Image from "next/image"
import Link from "next/link"
import { twMerge } from "tailwind-merge"

export default function ProjectCard({
	title,
	description,
	imageSrc,
	role,
	technologies,
	url,
}: {
	title: string
	description: string
	imageSrc: string
	role: string
	technologies: string[]
	url: string
}) {
	return (
		<div className="flex flex-col gap-4 p-4 sm:p-5 border border-theme rounded-lg group hover:scale-105 transition-all duration-500">
			<p className="text-md sm:text-xl font-bold">{title}</p>
			<p className="text-sm sm:text-[16px] font-medium font-code">
				{description}
			</p>
			<div className="border-b border-theme"></div>
			<Link href={url}>
				<Image
					src={imageSrc}
					alt={`${title} image`}
					width={278}
					height={180}
					className="aspect-[1.54] w-full border rounded-lg group-hover:scale-105 transition-all duration-500"
				/>
			</Link>
			<div className="flex w-full justify-between">
				<p className="text-base_mobile sm:text-base font-code font-semibold flex-1">
					{role}
				</p>
				<Link href={url}>
					<Icon
						icon="ph:arrow-right"
						height={30}
						className="-rotate-45 group-hover:rotate-0 transition-all duration-500"
					/>
				</Link>
			</div>
			<div className="border-b border-theme"></div>
			<div className="flex flex-wrap gap-2">
				{technologies.map((val, idx) => (
					<Tag tag={val} />
				))}
			</div>
		</div>
	)
}

function Tag({ tag, className }: { tag: string; className?: string }) {
	return (
		<div
			className={twMerge(
				"border px-2 py-1 rounded-full font-code text-xs sm:text-sm transition-all duration-700 delay-75",
				className
			)}
		>
			{tag}
		</div>
	)
}
