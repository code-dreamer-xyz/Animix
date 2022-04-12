import { auth, googleAuthProvider } from '../lib/firebase'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { UserContext } from '../lib/context'
import Link from 'next/link'
import {
    pageAnimation,
    slideUpVariants,
    staggerChildren,
} from '../helpers/animation'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { signInWithPopup } from 'firebase/auth'

const Login = () => {
    const { user } = useContext(UserContext)

    const router = useRouter()

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleAuthProvider)
            toast.success('login success 🤩')
            router.back()
        } catch (error) {
            toast.error('login failed 🙁')
        }
    }

    return (
        <motion.section
            {...pageAnimation}
            className="min-h-screen bg-theme flex items-center justify-center"
        >
            <motion.div
                initial="exit"
                animate="enter"
                exit="exit"
                variants={staggerChildren}
                className="max-w-screen-2xl mx-auto"
            >
                {!user && (
                    <motion.button
                        variants={slideUpVariants}
                        className="bg-primary text-white px-6 py-2 font-sans font-bold rounded"
                        onClick={signInWithGoogle}
                    >
                        Sign In With Google
                    </motion.button>
                )}
                {user && (
                    <motion.div variants={slideUpVariants}>
                        <Link href="/dashboard">
                            <a className="rounded bg-primary px-4 py-2 text-white font-sans text-xl">
                                Go To Dashboard
                            </a>
                        </Link>
                    </motion.div>
                )}
            </motion.div>
        </motion.section>
    )
}

export default Login
