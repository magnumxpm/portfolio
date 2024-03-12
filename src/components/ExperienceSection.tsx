import ExperienceTimeline from "./ExperienceTimeline"

export interface ExpData {
	company: string
	tenure: string
	description: string
}

export default function ExperienceSection() {
	const data: ExpData[] = [
		{
			company: "Mukherjee's Associates",
			tenure: "2023",
			description:
				"Freelance developed a full-stack application for managing accounts and tax files on prem, allowing multiple CAs to work collaboratively. Created an RBAC system to protect privacy integrity.",
		},
	]

	return (
		<section id="experience">
			<p className="text-xl text-blue-100 sm:text-2xl font-medium font-code">
				Work Experience
			</p>
			<div className="mt-6 md:mt-9 grid sm:grid-cols-1 w-full gap-3">
				<ExperienceTimeline data={data} />

				{/* <div className="flex-1 flex items-center justify-center bg-green-100">
					Experience Details
				</div> */}
			</div>
		</section>
	)
}
