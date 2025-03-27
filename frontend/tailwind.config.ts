import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/globals.css",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#132246",
          dark: "#fff",
        },
      },
      // Ensure spacing utilities are explicitly included
      spacing: {
        "1": "0.25rem",
        "2": "0.5rem",
        "4": "1rem",
        // Add more if needed
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
