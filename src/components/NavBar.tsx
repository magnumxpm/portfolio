import Link from "next/link"
import { TypeAnimation } from "react-type-animation"
import MobileSideNav from "./MobileSideNav"

import { MailIcon } from "lucide-react"

export default function NavBar() {
	return (
		<div className="mt-4 flex relative w-full items-center justify-center gap-12 py-7 text-base sm:text-md">
			<Link
				href="/"
				className="absolute left-0 px-5 font-code text-base font-medium sm:text-md min-h-5 sm:min-h-5 focus:outline-theme_light"
			>
				// ~{" "}
				<TypeAnimation
					sequence={["whoami"]}
					wrapper="span"
					cursor={false}
				/>
			</Link>

			<NavLink href="#projects">Projects</NavLink>
			<NavLink href="#achievements">Achievements</NavLink>
			<NavLink href="#certifications">Certifications</NavLink>
			<NavLink href="#academics">Academics</NavLink>

			<div className="flex gap-2 absolute right-4">
				<Link
					href="mailto:me@pmukherjee.dev"
					className="px-5 py-2 sm:px-6 sm:py-3 flex gap-2 items-center xs:px-10 bg-dark text-gray-200 rounded-md text-base_mobile sm:text-base font-semibold leading-tight focus:bg-theme_light focus:outline-none focus:text-black hover:bg-theme_light hover:text-black transition duration-100"
				>
					<MailIcon size={22} />
					Let's Talk
				</Link>

				<MobileSideNav className="block lg:hidden" />
			</div>
		</div>
	)
}

function NavLink({
	href,
	children,
}: {
	href: string
	children: any
}): React.ReactNode {
	return (
		<Link
			href={href}
			className="items-center hidden lg:flex text-base font-semibold leading-tight opacity-50 border-b-4 border-transparent hover:opacity-80 focus:opacity-80 focus:outline-none hover:border-theme_light focus:border-theme_light hover:box-border"
		>
			{children}
		</Link>
	)
}
