import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        default: "var(--default)",
        primary: {
          default: "var(--primary-default)",
          medium: "var(--primary-medium)",
          bg: "var(--primary-bg)",
        },
        secondary: {
          default: "var(--secondary-default)",
        },
        success: {
          default: "var(--success-default)",
        },
        medium: "var(--medium)",
        dark: "var(--dark)",
        high: "var(--high)",
        light: "var(--light)",
      },
    },
  },
  plugins: [],
};
export default config;
