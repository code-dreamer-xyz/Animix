import Image from 'next/image'
import logo from '../../images/logo.png'
import Link from 'next/link'
import Button from './Button'
import Avatar from './Avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

import { useContext } from 'react'
import { UserContext } from '../../lib/context'
import { useState } from 'react'
import { auth } from '../../lib/firebase'
import toast from 'react-hot-toast'

const Navbar: React.FC = () => {
    const [open, setOpen] = useState(false)
    const { user, userProfile } = useContext(UserContext)

    const signOut = () => {
        auth.signOut()
        toast.success('signed out')
    }

    return (
        <header className="absolute z-20 top-0 w-full  py-4">
            <nav className="max-w-screen-2xl mx-auto flex justify-between items-center">
                <div>
                    <Image src={logo} alt="logo" width={250} height={74} />
                </div>
                <ul className="flex justify-between">
                    <li className="text-xl mx-4">
                        <Link href="/">
                            <a className="font-poppins font-bold text-white">
                                Home
                            </a>
                        </Link>
                    </li>
                    <li className="text-xl mx-4">
                        <Link href="/movies">
                            <a className="font-poppins font-bold text-white">
                                Movies
                            </a>
                        </Link>
                    </li>
                    <li className="text-xl mx-4">
                        <Link href="/contact">
                            <a className="font-poppins font-bold text-white">
                                Contact
                            </a>
                        </Link>
                    </li>
                </ul>
                {!user && (
                    <Button>
                        <Link href="/login">
                            <a className="text-white">Log In</a>
                        </Link>
                    </Button>
                )}
                {user && (
                    <div
                        className="relative cursor-pointer"
                        onClick={() => setOpen(!open)}
                    >
                        <div className="flex space-x-6 items-center">
                            <Avatar img={userProfile?.photoURL} />
                            <p className="text-white font-poppins font-bold">
                                {userProfile?.userName}
                            </p>
                            <FontAwesomeIcon
                                icon={open ? faCaretUp : faCaretDown}
                                className="text-white"
                            />
                        </div>

                        <div
                            className={`absolute -bottom-20 bg-white w-full left-0  flex-col space-y-4 p-2 ${
                                open ? 'flex' : 'hidden'
                            }`}
                        >
                            <button>Dashbord</button>
                            <button onClick={signOut}>Log Out</button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Navbar
