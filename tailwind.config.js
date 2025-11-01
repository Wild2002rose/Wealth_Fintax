/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        c1: { bg: "#f1d9efff", text: "#b708a0ff" },
        c2: { bg: "#f7eab5ff", text: "#cf570dff" },
        c3: { bg: "#ebd1e1ff", text: "#ae1172ff" },
        c4: { bg: "#DBEAFE", text: "#1E3A8A" },
        c5: { bg: "#F3E8FF", text: "#580d96ff" },
        c6: { bg: "#FFEDD5", text: "#9A3412" },
        c7: { bg: "#D1FAE5", text: "#065F46" },
        c8: { bg: "#EDE9FE", text: "#5B21B6" },
        c9: { bg: "#d6f1efff", text: "#16978fff" },
        c10: { bg: "#F0F9FF", text: "#075985" },
        c11: { bg: "#FEF9C3", text: "#713F12" },
        c12: { bg: "#E2E8F0", text: "#1E293B" },
        c13: { bg: "#FDF2F8", text: "#9D174D" },
        c14: { bg: "#E0E7FF", text: "#3429d0ff" },
        c15: { bg: "#ECFDF5", text: "#065F46" },
      },
    },
  },
  plugins: [],
};
