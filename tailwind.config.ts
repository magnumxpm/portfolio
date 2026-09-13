import type { Config } from "tailwindcss"

const config: Config = {
	darkMode: "class",
	content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				bg: "var(--bg)",
				surface: "var(--surface)",
				"surface-hi": "var(--surface-hi)",
				line: "var(--line)",
				"line-hi": "var(--line-hi)",
				fg: "var(--text)",
				"fg-dim": "var(--text-dim)",
				"fg-faint": "var(--text-faint)",
				accent: "var(--accent)",
				"accent-dim": "var(--accent-dim)",
				"field-dim": "var(--field-dim)",
				"field-max": "var(--field-max)",
			},
			fontFamily: {
				sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
				mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
			},
			fontSize: {
				display: ["clamp(2.75rem, 9vw, 6rem)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
				h1: ["clamp(2rem, 5vw, 3.25rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
				h2: ["clamp(1.5rem, 3.2vw, 2.125rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
				h3: ["clamp(1.125rem, 2vw, 1.375rem)", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
				lede: ["clamp(1rem, 1.6vw, 1.25rem)", { lineHeight: "1.6" }],
				label: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.16em" }],
				meta: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.02em" }],
			},
			maxWidth: {
				content: "1120px",
				prose: "68ch",
			},
			spacing: {
				section: "clamp(5.5rem, 12vw, 11rem)",
			},
			transitionTimingFunction: {
				out: "cubic-bezier(0.16, 1, 0.3, 1)",
			},
			keyframes: {
				"caret-blink": { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
			},
			animation: {
				"caret-blink": "caret-blink 1.1s steps(1) infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
}

export default config
