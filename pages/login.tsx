import { auth, googleAuthProvider } from '../lib/firebase'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { UserContext } from '../lib/context'
import Link from 'next/link'

const Login = () => {
    const { user } = useContext(UserContext)

    const signInWithGoogle = async () => {
        try {
            await auth.signInWithPopup(googleAuthProvider)
            toast.success('login success 🤩')
        } catch (error) {
            console.log(error.message)
            toast.error('login failed 🙁')
        }
    }

    return (
        <section className="min-h-screen bg-theme flex items-center justify-center">
            <div className="max-w-screen-2xl mx-auto">
                {!user && (
                    <button
                        className="bg-primary text-white px-6 py-2 font-sans font-bold rounded"
                        onClick={signInWithGoogle}
                    >
                        Sign In With Google
                    </button>
                )}
                {user && (
                    <Link href="/dashboard">
                        <a className="rounded bg-primary px-4 py-2 text-white font-sans text-xl">
                            Go To Dashboard
                        </a>
                    </Link>
                )}
            </div>
        </section>
    )
}

export default Login
