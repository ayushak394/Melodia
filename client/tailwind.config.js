/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin-slow 20s linear infinite",
        "spin-reverse": "spin-reverse 25s linear infinite reverse",
        "pulse-slow": "pulse-slow 2s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.6s ease-out",
        "bounce": "bounce 1s infinite",
        "floatNote": "floatNote 4s linear forwards",
        "floatSide": "floatSide 4s ease-in-out infinite alternate",         // 👈 Added
        "floatSideReverse": "floatSideReverse 4s ease-in-out infinite alternate", // 👈 Added
      },
      keyframes: {
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "spin-reverse": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: 0.9 },
          "50%": { opacity: 1 },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "slide-in": {
          "0%": { transform: "translateX(-20px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        "bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "floatNote": {
          "0%": {
            transform: "translateY(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(-200px)",
            opacity: "0",
          },
        },
        // 👇 Add floating side icon effects
        "floatSide": {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(20px)" },
        },
        "floatSideReverse": {
          "0%": { transform: "translateY(20px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
    },
  },
  plugins: [],
};
