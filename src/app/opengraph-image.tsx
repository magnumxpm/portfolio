import { ImageResponse } from "next/og"

import { heroData } from "@/data/heroData"

export const alt = "Pritam Mukherjee — Software Engineer, Agent Systems"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					background: "#0a0a0b",
					// Matches the static Bayer texture on the site itself.
					backgroundImage:
						"radial-gradient(circle at 1px 1px, #23252a 1px, transparent 0)",
					backgroundSize: "8px 8px",
					padding: "72px",
					fontFamily: "monospace",
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: 16 }}>
					<div style={{ width: 10, height: 10, borderRadius: 999, background: "#f2a65a" }} />
					<div style={{ fontSize: 24, color: "#8a8f98", letterSpacing: 2 }}>
						{heroData.status.toUpperCase()}
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column" }}>
					<div style={{ fontSize: 96, color: "#e8e6e3", letterSpacing: -3 }}>
						{heroData.name}
					</div>
					<div style={{ display: "flex", gap: 16, fontSize: 40, marginTop: 12 }}>
						<span style={{ color: "#8a8f98" }}>{heroData.role}</span>
						<span style={{ color: "#5a5f66" }}>/</span>
						<span style={{ color: "#f2a65a" }}>{heroData.roleAccent}</span>
					</div>
				</div>

				<div style={{ display: "flex", gap: 28, fontSize: 22, color: "#5a5f66" }}>
					{["LangGraph", "RAG", "AgentOps", "Evals"].map((t) => (
						<span key={t}>{t}</span>
					))}
				</div>
			</div>
		),
		size
	)
}
