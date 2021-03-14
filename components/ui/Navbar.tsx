import Image from 'next/image'

import Link from 'next/link'
import Button from './Button'
import Avatar from './Avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

import { useContext } from 'react'
import { UserContext } from '../../lib/context'
import { useState } from 'react'
import { auth, signOut } from '../../lib/firebase'

import { motion } from 'framer-motion'
import { Divide as Hamburger } from 'hamburger-react'
import MobileNav from './MobileNav'

const Navbar: React.FC = () => {
    const [open, setOpen] = useState(false)
    const { user, userProfile } = useContext(UserContext)
    const [navIsOpen, setNavOpen] = useState(false)

    const routes = [
        {
            path: '/',
            page: 'Home',
        },
        {
            path: '/movies',
            page: 'Movies',
        },
        {
            path: '/contact',
            page: 'Contact',
        },
    ]

    return (
        <header className=" absolute z-10  top-0 w-full 2xl:px-0 px-4 py-4">
            <nav className="max-w-screen-2xl mx-auto flex justify-between items-center">
                <Link href="/">
                    <div>
                        <Image
                            src="/logo.png"
                            alt="logo"
                            width={150}
                            height={50}
                        />
                    </div>
                </Link>
                <ul className=" justify-between md:flex hidden">
                    {routes.map(({ path, page }) => (
                        <motion.li
                            whileTap={{ scale: 0.9 }}
                            className="text-xl mx-4"
                            key={path}
                        >
                            <Link href={path}>
                                <a className="hover:text-primary cursor-pointer font-poppins font-bold text-white">
                                    {page}
                                </a>
                            </Link>
                        </motion.li>
                    ))}
                </ul>
                <div className=" md:flex hidden">
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
                                className={`absolute -bottom-30 bg-white w-full left-0  flex-col space-y-4 p-2 ${
                                    open ? 'flex' : 'hidden'
                                }`}
                            >
                                <button>
                                    <Link href="/dashboard">
                                        <a>My Movies</a>
                                    </Link>
                                </button>

                                <button onClick={signOut}>Log Out</button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="md:hidden relative z-30">
                    <Hamburger
                        toggled={navIsOpen}
                        toggle={() => setNavOpen(!navIsOpen)}
                        color="#e63946"
                    />
                </div>
                {navIsOpen && (
                    <MobileNav
                        routes={routes}
                        user={user}
                        userImg={userProfile?.photoURL}
                        username={userProfile?.userName}
                    />
                )}
            </nav>
        </header>
    )
}

export default Navbar
