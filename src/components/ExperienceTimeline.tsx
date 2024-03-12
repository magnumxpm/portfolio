import { ExpData } from "./ExperienceSection"

export default function ExperienceTimeline({ data }: { data: ExpData[] }) {
	return (
		<div className="flex-1">
			<ol className="relative flex flex-col gap-6 border-s border-gray-200 dark:border-gray-700 ml-3">
				{data.map((val, idx) => (
					<ExperienceEntry
						company={val.company}
						tenure={val.tenure}
						description={val.description}
					/>
				))}
			</ol>
		</div>
	)
}

function ExperienceEntry({
	company,
	tenure,
	description,
}: {
	company: string
	tenure: string
	description: string
}) {
	return (
		<li className="ms-6">
			<span className="absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8 ring-gray-900 bg-theme">
				<svg
					className="w-2.5 h-2.5 text-dark"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
				</svg>
			</span>
			<div className="flex flex-col sm:flex-row gap-1 sm:items-center sm:justify-between mt-1 sm:mt-0.5 mb-2 sm:mb-3">
				<h3 className="text-md sm:text-lg font-semibold leading-4">
					{company}
				</h3>
				<time className="block text-sm sm:text-base_mobile font-normal sm:mt-0.5 text-gray-300">
					{tenure}
				</time>
			</div>
			<p className="text-base_mobile sm:text-base font-code text-gray-300">
				{description}
			</p>
		</li>
	)
}
