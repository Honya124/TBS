/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#22353C",
        main: "#114F66",
        secondary: "#46798B",
        "grey-green": "#91AFBA",
        "grey-green-80": "#e2eaee",
        "grey-green-40": "#7FCCC61A",
        red: "#E77373",
        white: "#FFFFFF",
        black: "#000000",
        grey: "#B4B0BE",
        "bottom-bar": "#383838",
        "color-cf": "#FCFCFF",
        "comment-color": "#697586",
        "bg-dashboard": "#f3f3f3",
        "grey-label": "#6B7280",
        "dashboard-link": "#5e5e5e",
        "dark-red": "#990000",
        "dark-grey": "#262626",
      },
      accentColor: {
        "grey-green": "#91AFBA",
      },
      gridTemplateColumns: {
        "auto-fit-100": "repeat(auto-fit, minmax(320px, 1fr))",
      },
    },
  },
  plugins: [],
};
