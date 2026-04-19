/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        card: "#18181b",
        "card-hover": "#27272a",
        primary: {
          DEFAULT: "#6366f1",
          hover: "#4f46e5",
        },
        secondary: "#8b5cf6",
        accent: "#f59e0b",
        success: "#22c55e",
        danger: "#ef4444",
        text: "#fafafa",
        "text-muted": "#a1a1aa",
        border: "#27272a",
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
