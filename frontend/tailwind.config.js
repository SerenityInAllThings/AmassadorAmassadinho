/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brandRed: "#8c0000",
        brandDarkBlue: "#222e50",
        brandDarkBlue2: "#324376",
        brandLightBlue: "#007991",
        brandGreen: "#439a86",
        brandYellow: "#e7f9a9",
      },
    },
  },
  safelist: ["bg-brandDarkBlue2", "bg-brandGreen"],
  plugins: [],
}
