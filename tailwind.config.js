/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./*.js", "./src/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        iransans: ["IRANSans", "sans-serif"],
        vazirDigits: ["Vazirmatn FD", "sans-serif"],
      },
    },
    screens: {
      mobile: "360px",
      desktop: "1000px",
    },
  },
  plugins: [],
};
