/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				purplePrimary: "#A594F9",
				purpleLight: "#CDC1FF",
				purpleLighter: "#F5EFFF",
				purplePastel: "#E5D9F2",
				grayLight: "#F6F5F5",
				white: "#FFFFFF",
			},
			boxShadow: {
				'custom': 'rgba(0, 0, 0, 0.16) 0px 1px 4px',

      },
		},
	},
	plugins: [],
};
