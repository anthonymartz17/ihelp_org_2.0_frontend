/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#1985A1",
                primaryLighter: "#289dbc",
                secondary: "#4C5C68",
                secondaryLighter: "#657581",
                dark: "#46494C",
                grayDark: "#C5C3C6",
                grayLight: "#DCDCDD",
                white: "#FFFFFF",
			},
			boxShadow: {
				'custom': 'rgba(0, 0, 0, 0.16) 0px 1px 4px',

      },
		},
	},
	plugins: [],
};
