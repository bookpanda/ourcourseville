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
        secondary: {
          default: "var(--secondary-default)",
        },
        medium: "var(--medium)",
        dark: "var(--dark)",
        high: "var(--high)",
      },
    },
  },
  plugins: [],
};
export default config;
