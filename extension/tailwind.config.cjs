module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 20s linear infinite",
      },
      colors: {
        default: "var(--default)",
        primary: {
          default: "var(--primary-default)",
          medium: "var(--primary-medium)",
          bg: "var(--primary-bg)",
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          default: "var(--secondary-default)",
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        success: {
          default: "var(--success-default)",
        },
        medium: "var(--medium)",
        dark: "var(--dark)",
        high: "var(--high)",
        light: "var(--light)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
    },
  },
  prefix: "",
  plugins: [],
};
