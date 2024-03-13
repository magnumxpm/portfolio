import Image from "next/image"
import Link from "next/link"

export default function AcademicsSection() {
	const data = [
		{
			schoolName: "Techno India University, WB",
			degree: "Computer Science and Engineering, Bachelors",
			tenure: "2021 - 2025",
			schoolLogo: "/techno_logo.jpeg",
		},
	]
	return (
		<section id="academics">
			<p className="text-xl text-blue-100 sm:text-2xl font-medium font-code">
				Academics
			</p>
			<div className="mt-6 md:mt-9 grid w-full gap-10">
				{data.map((val, idx) => (
					<AcademicsCard
						schoolLogo={val.schoolLogo}
						schoolName={val.schoolName}
						degree={val.degree}
						tenure={val.tenure}
					/>
				))}
			</div>
		</section>
	)
}

function AcademicsCard({
	schoolLogo,
	schoolName,
	degree,
	tenure,
}: {
	schoolName: string
	degree: string
	tenure: string
	schoolLogo: string
}) {
	return (
		<div className="flex items-start gap-3 sm:gap-4 px-4 sm:px-5 rounded-lg">
			<Image
				src={schoolLogo}
				alt={`${schoolName} logo`}
				width={45}
				height={45}
				className="mt-1 rounded-full group-hover:scale-105 transition-all duration-500 object-contain"
			/>

			<div className="flex flex-col gap-1 flex-1">
				<p className="text-md sm:text-lg font-semibold">{schoolName}</p>
				<p className="text-sm sm:text-[14px] font-medium font-code text-gray-300">
					{degree}
				</p>
				<p className="mt-1 text-xs sm:text-sm font-medium font-code text-gray-300">
					{tenure}
				</p>
			</div>
		</div>
	)
}
