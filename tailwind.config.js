const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', ...defaultTheme.fontFamily.sans],
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
      },

      colors: {
        primary: '#FF5733',
        secondary: '#33539e',
        theme: '#1f1f1f',
        primaryDark: '#292929',
        secondaryDark: '#1c1c1c',
        overlay: 'rgba(0,0,0,.4)',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
}
