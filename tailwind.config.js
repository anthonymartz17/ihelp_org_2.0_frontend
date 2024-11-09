/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				// primary: "#1985A1",
				// primaryLighter: "#289dbc",
				// secondary: "#4C5C68",
				// secondaryLighter: "#657581",
				// dark: "#46494C",
				// grayDark: "#C5C3C6",
				// grayLight: "#DCDCDD",
				// white: "#FFFFFF",

				primary: "#1EA896",
				primaryLighter: "#4ab9ab",
				primarydark: "#157569",
				secondary: "#FF715B",
				secondaryLighter: "#ff9d8e",
				secondarydark: "#B24F3F",
				tertiary: "#523F38",
				dark: "#4c5454",
				light: "#edeeee",
				lightest: "#FFFFFF",
			},
			boxShadow: {
				custom: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
			},
		},
	},
	plugins: [],
};
