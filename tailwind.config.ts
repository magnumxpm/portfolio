import type { Config } from "tailwindcss"

const config: Config = {
	content: [
		"./src/app/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundColor: {
				primary: "#f8f7f3",
			},
			fontWeight: {
				bold: "700",
			},
			fontFamily: {
				code: "Space Mono, monospace",
			},
		},
		fontSize: {
			base: "18px",
			lg: "22px",
			xl: "24px",
			hero: "72px",
		},
		maxWidth: {
			large: "1500px",
		},
	},
	plugins: [],
}
export default config
