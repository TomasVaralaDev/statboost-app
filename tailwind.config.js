/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Nämä pysyvät samoina (tumman teeman pohjavärit)
        base: "#0f172a",
        surface: "#1e293b",
        content: "#f8fafc",
        "content-muted": "#94a3b8",
        danger: "#ef4444",
        // MUUTOS TÄSSÄ: Haetaan ensisijainen väri CSS-muuttujasta
        primary: "rgb(var(--primary) / <alpha-value>)",
        "primary-hover": "rgb(var(--primary-hover) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
