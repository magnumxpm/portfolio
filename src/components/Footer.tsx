import { SocialLink } from "./HeroContent"

export default function Footer() {
	return (
		<div className="w-full py-5 sm:py-10 flex flex-col sm:flex-row sm:items-center justify-between gap-10 text-gray-500">
			<div className="flex flex-col gap-1">
				<h3 className="text-lg sm:text-2xl font-medium leading-8">
					Pritam Mukherjee
				</h3>
				<p className="text-base_mobile sm:text-md font-code font-medium">
					Software {`{Engineer}`}
				</p>
				<p className="mt-3 text-sm sm:text-base_mobile">
					© 2024 - Pritam Mukherjee
				</p>
			</div>

			<div className="flex mx-auto sm:mx-0 gap-3 sm:1/2">
				<SocialLink
					href="https://github.com/magnumxpm"
					icon="radix-icons:github-logo"
					className="opacity-1 text-gray-100 border-gray-600"
				/>
				<SocialLink
					href="https://linkedin.com/in/pritam-mukherjee-52a348225"
					icon="akar-icons:linkedin-v1-fill"
					className="opacity-1 text-gray-100 border-gray-600"
				/>
				<SocialLink
					href="https://twitter.com/pmukherjee02"
					icon="bi:twitter-x"
					className="opacity-1 text-gray-100 border-gray-600"
				/>
				<SocialLink
					href="https://instagram.com/mukherjee.anon"
					icon="mdi:instagram"
					className="opacity-1 text-gray-100 border-gray-600"
				/>
				<SocialLink
					href="https://bento.me/mukherjee"
					icon="material-symbols:bento-outline"
					className="opacity-1 text-gray-100 border-gray-600"
				/>
			</div>
		</div>
	)
}
