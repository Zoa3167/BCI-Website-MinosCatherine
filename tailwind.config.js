export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        space: {
          950: "#02040a",
          900: "#07111f",
          850: "#0b1728",
          800: "#102033",
        },
        signal: {
          cyan: "#22d3ee",
          blue: "#38bdf8",
          violet: "#a78bfa",
          green: "#4ade80",
          amber: "#f59e0b",
          red: "#fb7185",
        },
      },
      boxShadow: {
        glow: "0 0 30px rgba(34, 211, 238, 0.18)",
      },
    },
  },
  plugins: [],
};
