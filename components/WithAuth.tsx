import Link from 'next/link'

import { useAuthState } from 'react-firebase-hooks/auth'

import Login from '../pages/login'
import { auth } from '../lib/firebase'

const WithAuth = (props) => {
  const [user] = useAuthState(auth)

  return user ? props.children : <Login />
}

export default WithAuth
