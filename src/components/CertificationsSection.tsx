import { Icon } from "@iconify/react/dist/iconify.js"
import Image from "next/image"
import Link from "next/link"

export default function CertificationsSection() {
	const data = [
		{
			title: "Programming with Python",
			issuer: "Internshala Trainings",
			year: "2023",
			url: "https://trainings.internshala.com/s/v/2789935/ea81ad2e",
			issuerLogo: "/ist_logo.png",
		},
	]
	return (
		<section id="certifications">
			<p className="text-xl text-blue-100 sm:text-2xl font-medium font-code">
				Certifications
			</p>
			<div className="mt-6 md:mt-9 grid lg:grid-cols-2 w-full gap-5">
				{data.map((val, idx) => (
					<CertificationCard
						title={val.title}
						issuer={val.issuer}
						year={val.year}
						url={val.url}
						issuerLogo={val.issuerLogo}
					/>
				))}
			</div>
		</section>
	)
}

function CertificationCard({
	title,
	issuer,
	year,
	url,
	issuerLogo,
}: {
	title: string
	issuer: string
	year: string
	url: string
	issuerLogo: string
}) {
	return (
		<div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 border border-theme rounded-lg group hover:scale-105 transition-all duration-500">
			<Link href={url}>
				<Image
					src={issuerLogo}
					alt={`${issuer} logo`}
					width={45}
					height={45}
					className="mt-1 rounded-full ring-1 ring-theme group-hover:scale-105 transition-all duration-500 object-contain"
				/>
			</Link>

			<div className="flex flex-col gap-1 flex-1">
				<Link href={url}>
					<p className="text-md sm:text-lg font-semibold">{title}</p>
				</Link>
				<p className="text-sm sm:text-[14px] font-medium font-code text-gray-300">
					{issuer}
				</p>
				<p className="mt-1 text-xs sm:text-sm font-medium font-code text-gray-300">
					Issued {year}
				</p>
			</div>

			<Link href={url}>
				<Icon
					icon="ph:arrow-right"
					height={30}
					className="-rotate-45 group-hover:rotate-0 transition-all duration-500"
				/>
			</Link>
		</div>
	)
}
