import type { Metadata } from "next"
import { Inter, Space_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const spaceMono = Space_Mono({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-spacemono",
})

export const metadata: Metadata = {
	title: "Pritam Mukherjee | Developer Portfolio",
	description:
		"Personal portfolio showcasing my skillset, all the projects I worked on, and all of my experiences.",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	)
}
