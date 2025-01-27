import type { Config } from "tailwindcss";

export default {
  darkMode: "media", // Match system dark mode
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["Inter", "Arial", "Helvetica", "sans-serif"],
      },
      spacing: {
        5: "20px", // Add spacing utility
      },
      boxShadow: {
        md: "0 4px 6px rgba(0, 0, 0, 0.2)", // Card shadow
      },
      borderRadius: {
        lg: "15px", // Card border radius
      },
    },
  },
  plugins: [],
} satisfies Config;
