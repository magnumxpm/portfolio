import { Footer } from "@/components/Footer"
import { Nav } from "@/components/Nav"
import { Contact } from "@/components/sections/Contact"
import { Credentials } from "@/components/sections/Credentials"
import { Experience } from "@/components/sections/Experience"
import { Focus } from "@/components/sections/Focus"
import { Hero } from "@/components/sections/Hero"
import { Work } from "@/components/sections/Work"

export default function Home() {
	return (
		<div className="relative z-10">
			<Nav />
			<main>
				<Hero />
				<Focus />
				<Work />
				<Experience />
				<Credentials />
				<Contact />
			</main>
			<Footer />
		</div>
	)
}
