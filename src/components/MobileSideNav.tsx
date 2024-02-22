import Link from "next/link"
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../../@/components/ui/sheet"
import { MenuIcon } from "lucide-react"

export default function MobileSideNav({ className }: { className?: string }) {
	return (
		<div className={`${className} flex items-center`}>
			<Sheet>
				<SheetTrigger asChild>
					<button className="bg-dark text-gray-200 px-2 sm:px-3 h-full rounded-md text-base_mobile">
						<MenuIcon />
					</button>
				</SheetTrigger>

				<SheetContent>
					<SheetHeader>
						<SheetTitle>Site Navigation</SheetTitle>
					</SheetHeader>

					<div className="flex flex-col h-full py-40 justify-between gap-6 items-center text-gray-200">
						<MobileNavLink href="#">Projects</MobileNavLink>
						<MobileNavLink href="#">Achievements</MobileNavLink>
						<MobileNavLink href="#">Certifications</MobileNavLink>
						<MobileNavLink href="#">Academics</MobileNavLink>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	)
}

function MobileNavLink({
	href,
	children,
}: {
	href: string
	children: any
}): React.ReactNode {
	return (
		<Link
			href={href}
			className="text-base font-semibold leading-tight opacity-50 border-b-4 border-transparent hover:opacity-80 focus:opacity-80 focus:outline-none hover:border-theme focus:border-theme hover:box-border"
		>
			{children}
		</Link>
	)
}
