import { auth, googleAuthProvider } from '../lib/firebase'

const Login = () => {
    const signInWithGoogle = async () => {
        try {
            await auth.signInWithPopup(googleAuthProvider)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <section className="min-h-screen bg-theme flex items-center justify-center">
            <div className="max-w-screen-2xl mx-auto">
                <button
                    className="bg-primary text-white px-6 py-2 font-sans font-bold rounded"
                    onClick={signInWithGoogle}
                >
                    Sign In With Google
                </button>
            </div>
        </section>
    )
}

export default Login
