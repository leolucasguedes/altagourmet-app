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
      text: '#252C32',
      white: '#fff',
      primary: '#FFCE21',
      dark: '#252C32',
      backgroundPrimary: '#F7F7F8',
      backgroundSecondary: '#F2F3F4',
      iconGreyPrimary: '#6B7280',
      iconGreySecondary: '#84919A',
      iconGreyTertiary: '#B0BABF',
      iconYellowPrimary: '#FFB800',
      iconYellowSecondary: '#FFEEB3',
      iconYellowTertiary: '#FFF3C8',
      textGreyPrimary: '#252C32',
      textGreySecondary: '#FFEEB3',
      textGreyTertiary: '#FFF3C8',
      textGreyDisabled: '#B0BABF',
      textGreyAccent: '#FFB800',
      borderPrimary: '#D1D5DB',
      borderSecondary: '#E5E7EB',
      borderDisable: '#B0BABF',
      borderHighlightPrimary: '#FFB800',
      borderHighlightSecondary: '#FFFCEF',
      borderHighlightTertiary: '#FFEEB3',
      surfacePrimaryGrey: '#FBFBF9',
      surfacePrimaryYellow: '#FFFCEF',
      surfacePrimaryAccent: '#FFFDEC',
      surfacePrimaryDisable: '#E7E7E7',
      surfaceSuccessPrimary: '#22C55E',
      surfaceSuccessSecondary: '#EBFFF1',
      surfaceErrorPrimary: '#EF4444',
      surfaceErrorSecondary: '#FFEFEB',
      surfaceAttentionPrimary: '#FEB241',
      surfaceAttentionSecondary: '#FFE1B5',
      surfaceInformationPrimary: '#4094F7',
      surfaceInformationSecondary: '#E2F2FF',
      placeholder: '#F4F4F2',
      overlay: '#30303680',
      orange: '#FF6602',
      skeleton: '#E5E7EB',
      body: '#2C353E'
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