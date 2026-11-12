import type { Config } from "tailwindcss";

/**
 * THEME COLORS — change the palette here.
 * acid = primary accent (acid yellow), cyan = secondary, red = sparing alerts.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#09090b", // page base (near-black)
        char: "#111114", // charcoal panels
        "char-2": "#18181d", // raised surfaces
        steel: "#24242b",
        line: "#2e2e36", // fine technical lines
        "line-bright": "#4a4a55",
        ink: "#f1f0ea", // primary text
        mute: "#a9a9b4", // secondary text (≈8:1 on void)
        dim: "#7a7a86", // labels
        acid: { DEFAULT: "#f3e600", soft: "#fff36b", deep: "#b8ae00" },
        cyan: { DEFAULT: "#18e4ff", soft: "#8ff3ff", deep: "#0aa9bf" },
        red: { DEFAULT: "#ff3b4e", soft: "#ff7b88" },
      },
      fontFamily: {
        display: ['"Chakra Petch"', "system-ui", "sans-serif"],
        sans: ['"IBM Plex Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        acid: "0 0 0 1px rgba(243,230,0,.5), 0 0 28px -8px rgba(243,230,0,.55)",
        cyan: "0 0 0 1px rgba(24,228,255,.45), 0 0 24px -8px rgba(24,228,255,.5)",
      },
      maxWidth: { page: "80rem" },
    },
  },
  plugins: [],
} satisfies Config;
