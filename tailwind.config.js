const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false,
    theme: {
        extend: {
            fontFamily: {
                primary: ['Poppins', ...defaultTheme.fontFamily.sans],
                main: ['Open Sans', ...defaultTheme.fontFamily.sans],
            },

            colors: {
                primary: '#04BB73',
                theme: '#031326',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
