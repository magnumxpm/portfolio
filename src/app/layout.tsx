import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

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
		<html lang="en" className="scroll-smooth">
			<body className={inter.className}>{children}</body>
		</html>
	)
}
