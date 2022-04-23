import { useContext } from 'react'
import { UserContext } from '../lib/context'
// import Link from 'next/link'
import {
  pageAnimation,
  slideUpVariants,
  staggerChildren,
} from '../helpers/animation'
import { motion } from 'framer-motion'
// import { useRouter } from 'next/router'
import SignInButton from '../components/auth/SigninButton'
import UsernameForm from '../components/auth/UsernameForm'

const Login = () => {
  const { user } = useContext(UserContext)
  const username = null

  // const router = useRouter()

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
        {user ? (
          !username ? (
            <UsernameForm />
          ) : (
            <motion.div variants={slideUpVariants}>dashboard</motion.div>
          )
        ) : (
          <SignInButton />
        )}
      </motion.div>
    </motion.section>
  )
}

export default Login
