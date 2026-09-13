import type { Metadata, Viewport } from "next"
import dynamic from "next/dynamic"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

import { RevealRoot } from "@/components/motion/RevealRoot"

import "./globals.css"

// Nothing to server-render, and keeping the module out of the initial HTML
// payload means the field can never delay first paint.
const AsciiField = dynamic(() => import("@/components/background/AsciiField"))

export const metadata: Metadata = {
	metadataBase: new URL("https://www.pmukherjee.com"),
	title: "Pritam Mukherjee — Software Engineer, Agent Systems",
	description:
		"Software engineer building agentic systems: LangGraph orchestration, RAG and knowledge engineering, AgentOps, and evaluation harnesses.",
	icons: "/favicon.ico",
	openGraph: {
		type: "website",
		title: "Pritam Mukherjee — Software Engineer, Agent Systems",
		description:
			"Software engineer building agentic systems: LangGraph orchestration, RAG and knowledge engineering, AgentOps, and evaluation harnesses.",
		url: "https://www.pmukherjee.com",
	},
	twitter: {
		card: "summary_large_image",
		creator: "@pmukherjee02",
	},
}

export const viewport: Viewport = {
	themeColor: "#0a0a0b",
	colorScheme: "dark",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		// suppressHydrationWarning: the inline script below deliberately stamps
		// data-js onto <html> before React hydrates, so the client tree will
		// always differ from the server tree by that one attribute.
		<html
			lang="en"
			className={`${GeistSans.variable} ${GeistMono.variable}`}
			suppressHydrationWarning
		>
			<head>
				{/* Runs before first paint so reveal states never flash, and so the
				    no-JS path keeps every element visible. */}
				<script
					dangerouslySetInnerHTML={{
						__html: `document.documentElement.setAttribute('data-js','')`,
					}}
				/>
			</head>
			<body className="min-h-dvh bg-bg font-sans text-fg antialiased">
				<AsciiField />
				{children}
				<RevealRoot />
			</body>
		</html>
	)
}
