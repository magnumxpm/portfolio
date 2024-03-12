import { Icon } from "@iconify/react/dist/iconify.js"
import Link from "next/link"

export default function AchievementsSection() {
	const data = [
		{
			title: "Smart India Hackathon, 2023 Winner",
			year: "2023",
			description:
				"Co-led the college hackathon team into victory. Created the frontend application using React and Electron, and led a team of 4 in the frontend team. Implemented a high quality video conferencing solution using WebRTC and SFUs.",
			url: "https://www.linkedin.com/posts/pritam-mukherjee-52a348225_sih2023-sih1464-aicte-activity-7146066472568512512-Sisu?utm_source=share&utm_medium=member_desktop",
		},
		{
			title: "KAVACH 2023, Cybersec. Hackathon Winner",
			year: "2023",
			description:
				"Co-led the college hackathon team into victory. Implemented the backend server systems (API, Websockets) single-handedly, and released an MVP that worked live. Implemented CVSS Vulnerability scanner on the server-side, that periodically pulls data from the NVD Database.",
			url: "https://www.linkedin.com/posts/pritam-mukherjee-52a348225_helmdall-activity-7101957694307143680-yyxm?utm_source=share&utm_medium=member_desktop",
		},
	]
	return (
		<section id="achievements">
			<p className="text-xl text-blue-100 sm:text-2xl font-medium font-code">
				Achievements
			</p>
			<div className="mt-6 md:mt-9 grid md:grid-cols-2 w-full gap-5">
				{/* Project tiles */}
				{data.map((val, idx) => (
					<AchievementCard
						title={val.title}
						year={val.year}
						description={val.description}
						url={val.url}
					/>
				))}
			</div>
		</section>
	)
}

function AchievementCard({
	title,
	year,
	description,
	url,
}: {
	title: string
	year: string
	description: string
	url: string
}) {
	return (
		<div className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-5 border border-theme rounded-lg group hover:scale-105 transition-all duration-500">
			<div className="flex flex-col gap-3">
				<div className="flex">
					<Link href={url} className="flex-1">
						<p className="text-md sm:text-lg font-semibold">
							{title}
						</p>
					</Link>
					<Link href={url}>
						<Icon
							icon="ph:arrow-right"
							height={30}
							className="-rotate-45 group-hover:rotate-0 transition-all duration-500"
						/>
					</Link>
				</div>
				<p className="text-xs sm:text-sm font-medium font-code text-gray-300">
					{year}
				</p>
				<div className="border-b border-theme"></div>
				<p className="text-sm sm:text-[14px] font-medium font-code text-gray-300">
					{description}
				</p>
			</div>
		</div>
	)
}
