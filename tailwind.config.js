/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#F8F8F8',
      black: '#0A0A0A',
      'light-green': "#5ECD81",
      'dark-green': "#238878",
      'gray': '#8B8B93',
      'light-gray': '#E8EDF2',
    },
    extend: {
      aspectRatio: {
        '5/4': '5 / 4',
      },

      keyframes: {
        pulse: {
          '0%': {
            opacity: '0',
            transform: 'scale(0)'
          },
          '75%': {
            opacity: '0.8',
            transform: 'scale(1)'
          },
          '100%': {
            opacity: '0',
            transform: 'scale(1.4)'
          }
        }
      },
      animation: {
        pulse: 'pulse 2s infinite'
      },
    },
  },

  plugins: [],
};