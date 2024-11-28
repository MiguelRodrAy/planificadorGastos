/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#104c6c",
        secondary: "#ff0086",
        secondaryLight: "#ff7eac",
      },
    },
  },
  plugins: [],
};
