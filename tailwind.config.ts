import type { Config } from "tailwindcss";

// Helper config to satisfy tooling that expects a Tailwind config file (e.g., shadcn/ui CLI).
// Tailwind v4 is installed and primarily configured via CSS (@import "tailwindcss" and @theme),
// but this file remains useful for plugin registration and tool discovery.

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;


