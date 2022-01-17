module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["system-ui", "Helvetica", "sans-serif"],
      serif: ["ui-monospace", "SFMono-Regular", "Menlo"],
    },
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
