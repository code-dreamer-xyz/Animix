import '../styles/globals.css'
import '../styles/slider.css'
import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'
import '@fontsource/open-sans'
import '@fontsource/poppins'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Layout from '../components/Layout'
import { Toaster } from 'react-hot-toast'
import { UserContext } from '../lib/context'
import { useUserData } from '../lib/hooks'

import { AnimatePresence } from 'framer-motion'
import { Router, useRouter } from 'next/router'
import NProgress from 'nprogress'

Router.events.on('routeChangeStart', (url) => {
    NProgress.start()
})

Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
    const userData = useUserData()
    const router = useRouter()

    return (
        <UserContext.Provider value={userData}>
            <Layout>
                <AnimatePresence exitBeforeEnter>
                    <Component {...pageProps} key={router.pathname} />
                </AnimatePresence>
                <Toaster />
            </Layout>
        </UserContext.Provider>
    )
}

export default MyApp
