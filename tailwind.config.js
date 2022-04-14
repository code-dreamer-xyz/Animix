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
                syne: ['Syne', ...defaultTheme.fontFamily.sans],
                poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
                sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
            },

            colors: {
                primary: '#e63946',
                theme: '#1f1f1f',
                overlay: 'rgba(0,0,0,.3)',
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
