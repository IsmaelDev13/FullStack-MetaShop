module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["system-ui", "Helvetica", "sans-serif"],
    },
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
