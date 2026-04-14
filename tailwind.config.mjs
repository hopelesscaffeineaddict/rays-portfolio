/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        monster: "#00dc32",
        "monster-dark": "#080808",
        surface: "#1a1a1a",
        "surface-2": "#2a2a2a",
      },
      fontFamily: {
        monster: ["MonsterFont", "VCRosdNEUE", "sans-serif"],
        vcr: ["VCRosdNEUE", "monospace"],
        barlow: ["Barlow Condensed", "sans-serif"],
        mono: ["Share Tech Mono", "VCRosdNEUE", "monospace"],
      },
      boxShadow: {
        monster: "0 0 20px rgba(0, 220, 50, 0.4)",
        "monster-sm": "0 0 8px rgba(0, 220, 50, 0.3)",
        "monster-lg": "0 0 50px rgba(0, 220, 50, 0.6)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
