/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        violet: "#9747FF",
        violetLight: "#B983FF",
        violetSuperLight: "#E2CCFF",
        black: "#1A0114"
      }
    }
  },
  plugins: []
};
