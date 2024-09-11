module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./App.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      text: "#252C32",
      white: "#fff",
      black: "#000",
      dark: "#252C32",
    },
    extend: {
      aspectRatio: {
        "5/4": "5 / 4",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },

      keyframes: {
        pulse: {
          "0%": {
            opacity: "0",
            transform: "scale(0)",
          },
          "75%": {
            opacity: "0.8",
            transform: "scale(1)",
          },
          "100%": {
            opacity: "0",
            transform: "scale(1.4)",
          },
        },
      },
      animation: {
        pulse: "pulse 2s infinite",
      },
    },
  },

  plugins: [],
};
