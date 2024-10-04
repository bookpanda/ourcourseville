import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          default: "var(--primary-default)",
          bg: "var(--primary-bg)",
        },
        medium: "var(--medium)",
      },
    },
  },
  plugins: [],
};
export default config;
