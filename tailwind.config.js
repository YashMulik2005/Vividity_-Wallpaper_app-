/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        middle: "#1B525B",
        light: "#3b7a8b",
        dark: "#1A2433",
        offwhite: "#EDEADE",
        buttonPrimary: "#00F798",
        buttonSecondary: "#00AD9F",
        primaryDark: "#1A1A1A",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};