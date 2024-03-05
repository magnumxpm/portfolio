"use client"

import { useEffect, useState } from "react"
import { TypeAnimation } from "react-type-animation"
import ReactTyped from "react-typed"
import Image from "next/image"
import Link from "next/link"
import ExternalLink from "./ExternalLink"
import { twMerge } from "tailwind-merge"

import { Icon } from "@iconify/react"

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
		<div className="flex flex-col w-full">
			<div className="flex flex-col py-4">
				<h1 className="text-2xl sm:text-tab_hero md:text-hero font-bold leading-tight min-h-11 sm:min-h-20">
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
					Software{" "}
					<span className="text-theme_light">{engineerText}</span>
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
					<span className="group-hover:text-theme_light group-hover:border-theme_light  group-focus:text-theme_light  group-focus:border-theme_light">
						My Résumé
					</span>
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

				<div className="flex flex-wrap gap-2 mt-6 sm:w-1/2">
					{tags &&
						tags.map((item, idx) => (
							<HeroTag
								tag={item}
								className={
									nameIsDone
										? "translate-y-0 opacity-100"
										: "opacity-0 -translate-y-5"
								}
							/>
						))}
				</div>

				<div className="flex gap-3 mt-6 sm:1/2">
					<SocialLink
						href="https://github.com/pritammukherjee02"
						icon="radix-icons:github-logo"
						className="animate-slidein [--slidein-delay:1600ms]"
					/>
					<SocialLink
						href="https://linkedin.com/in/pritam-mukherjee-52a348225"
						icon="akar-icons:linkedin-v1-fill"
						className="animate-slidein [--slidein-delay:1700ms]"
					/>
					<SocialLink
						href="https://twitter.com/pmukherjee02"
						icon="bi:twitter-x"
						className="animate-slidein [--slidein-delay:1800ms]"
					/>
					<SocialLink
						href="https://instagram.com/mukherjee.anon"
						icon="mdi:instagram"
						className="animate-slidein [--slidein-delay:1900ms]"
					/>
					<SocialLink
						href="https://bento.me/mukherjee"
						icon="material-symbols:bento-outline"
						className="animate-slidein [--slidein-delay:2000ms]"
					/>
				</div>
			</div>
		</div>
	)
}

function HeroTag({ tag, className }: { tag: string; className?: string }) {
	return (
		<div
			className={twMerge(
				"bg-gray-100 px-2 py-1 rounded-md font-code text-sm sm:text-base_mobile transition-all duration-700 delay-75",
				className
			)}
		>
			{tag}
		</div>
	)
}

function SocialLink({
	icon,
	href,
	className,
}: {
	icon: string
	href: string
	className?: string
}) {
	return (
		<Link
			href={href}
			className={twMerge(
				"p-2 border group rounded-lg focus:outline-none focus:border-theme_light opacity-0",
				className
			)}
		>
			<Icon
				icon={icon}
				className="h-5 w-5 opacity-50 group-hover:opacity-100 group-focus:opacity-100"
			/>
		</Link>
	)
}
