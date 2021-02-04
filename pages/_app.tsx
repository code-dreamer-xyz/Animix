import '../styles/globals.css'
import '../styles/slider.css'
import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'
import '@fontsource/open-sans'
import '@fontsource/poppins'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}

export default MyApp
