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
                poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
                sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
            },

            colors: {
                primary: '#04BB73',
                theme: '#031326',
                overlay: 'rgba(0,0,0,.3)',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
