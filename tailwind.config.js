/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      main: "#FF5F49",
      dark: "#ff3216",
      grey: "#bfbfbf",
    },
    extend: {
      fontFamily: {
        mukta: "Mukta",
      },
    },
  },
  plugins: [],
};
