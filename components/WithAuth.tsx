import Link from 'next/link'
import { useContext } from 'react'
import { UserContext } from '../lib/context'

const WithAuth = (props) => {
    const { user } = useContext(UserContext)

    return user
        ? props.children
        : props.fallback || <Link href="/login">You Must Login First</Link>
}

export default WithAuth
