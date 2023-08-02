import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main500: "#27298C",
        main400: "#3235B5",
        main300: "#7375D8",
        main200: "#C3C4EE",
        main100: "#EBEBF9",
        gray300: "#222222",
        gray100: "#BFBFBF",
        green: "#0F9D58",
        red: "#D23F31",
        black: "#1F1F1F",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
