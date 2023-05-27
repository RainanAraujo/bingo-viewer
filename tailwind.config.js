/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    animation: {
      pulseIn: "pulseIn 3.5s ease-in-out",
    },
    keyframes: (theme) => ({
      pulseIn: {
        "0%": {
          transform: "scale(0)",
          opacity: "0",
        },
        "60%": {
          transform: "scale(1.1)",
          opacity: "1",
        },
        "100%": {
          transform: "scale(1)",
          opacity: "1",
        },
      },
    }),
  },
  plugins: [],
};
