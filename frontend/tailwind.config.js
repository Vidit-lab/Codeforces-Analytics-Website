/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        void: "#060608",
        surface: "#0d0d12",
        card: "#11111a",
        border: "#1e1e2e",
      },
      backgroundImage: {
        "aurora": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 80, 255, 0.15), transparent)",
        "glow-purple": "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
        "glow-blue": "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        shimmer: "shimmer 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
