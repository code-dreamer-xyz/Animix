import { signInWithPopup } from 'firebase/auth'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { slideUpVariants } from '../../helpers/animation'
import { auth, googleAuthProvider } from '../../lib/firebase'

const SignInButton = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider)
      toast.success('login success 🤩')
    } catch (error) {
      toast.error('login failed 🙁')
    }
  }
  return (
    <motion.button
      variants={slideUpVariants}
      className="bg-primary text-white px-6 py-2 font-sans font-bold rounded"
      onClick={signInWithGoogle}
    >
      Sign In With Google
    </motion.button>
  )
}

export default SignInButton
