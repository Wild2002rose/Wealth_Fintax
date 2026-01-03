/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ===== Brand Primary =====
        primary: {
          dark: "#0A1448",   
          default: "#102A6B", 
          light: "#1D3F8C",   
        },

        // ===== Body Background =====
        body: "#F1F5FF", 

        // ===== Accent Colors =====
        accent: {
          gold: "#FACC15",      
          goldLight: "#FFEAA7", 
        },

        // ===== Neutrals =====
        neutral: {
          light: "#F7F9FC", 
          white: "#FFFFFF", 
          border: "#E6E9EF", 
          textPrimary: "#0A0F1F",
          textSecondary: "#64748B",
        },

        // ===== Status Colors =====
        success: "#16A34A",
        warning: "#F59E0B",
        error: "#DC2626",
      },
    },

  },
  plugins: [],
};
