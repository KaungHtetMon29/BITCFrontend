import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**"],
  theme: {
    extend: {
      colors: {
        primary: "#fbf404",
        secondary: "#000000",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
