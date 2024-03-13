import { Icon } from "@iconify/react/dist/iconify.js"
import { BackgroundGradient } from "../../@/components/ui/background_gradient"

export default function NewsLetterPitch() {
	return (
		<div className="flex flex-col gap-8 sm:gap-12 items-center">
			<p className="text-center w-full font-code text-gray-400 text-base_mobile sm:text-base">
				Code the world with me, join me as I share my experiences and
				what I learned through my developer newsletter. No Spam,
				Promise!
			</p>
			{/* 
			<BackgroundGradient className="rounded-[22px] py-4 px-6 font-code text-base_mobile sm:text-base flex bg-dark w-[350px] sm:w-[500px]">
				<input
					type="email"
					placeholder="Email"
					className="bg-transparent w-full focus:ring-0 focus:outline-none"
				/>

				<button type="submit">
					<Icon icon="mdi:send-variant" height={30} className="" />
				</button>
			</BackgroundGradient> */}

			<form
				action={() => {
					alert(
						"It hasn't been implemented yet :( But soon it will save your email address in an encrypted database which only I can use to send quality newsletters, straight to you!"
					)
				}}
				className="rounded-lg py-2 px-5 sm:py-4 sm:px-6 font-code text-base_mobile sm:text-base flex bg-dark w-full sm:w-1/2 border border-theme"
			>
				<input
					type="email"
					placeholder="Email"
					className="bg-transparent w-full focus:ring-0 focus:outline-none"
				/>

				<button type="submit">
					<Icon icon="mdi:send-variant" height={30} className="" />
				</button>
			</form>
		</div>
	)
}
