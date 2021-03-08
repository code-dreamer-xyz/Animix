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

import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'

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
