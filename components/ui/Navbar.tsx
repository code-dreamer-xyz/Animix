import Image from 'next/image'

import Link from 'next/link'
import Button from './Button'
import Avatar from './Avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

import { useContext } from 'react'
import { UserContext } from '../../lib/context'
import { useState } from 'react'
import { auth, sign_Out } from '../../lib/firebase'

import { motion } from 'framer-motion'
import { Divide as Hamburger } from 'hamburger-react'
import MobileNav from './MobileNav'

const Navbar: React.FC = () => {
    const [open, setOpen] = useState(false)
    const { user, userProfile } = useContext(UserContext)
    const [navIsOpen, setNavOpen] = useState(false)

    const closeNav = () => setNavOpen(false)

    const routes = [
        {
            path: '/',
            page: 'Home',
        },
        {
            path: '/movies',
            page: 'Movies',
        },
        // {
        //     path: '/blog',
        //     page: 'Blog',
        // },
    ]

    return (
        <header className="relative z-50  w-full 2xl:px-0 px-2 py-1">
            <nav className="max-w-screen-xl mx-auto flex justify-between items-center">
                <Link href="/">
                    <a className="font-syne text-white text-xl">
                        Ani<span className="text-primary">Mix</span>
                    </a>
                </Link>
                <div className="flex items-center space-x-4">
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
                    <div className="md:flex hidden">
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

                                    <button onClick={sign_Out}>Log Out</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="md:hidden relative z-30">
                    <Hamburger
                        toggled={navIsOpen}
                        toggle={() => setNavOpen(!navIsOpen)}
                        color="#fff"
                    />
                </div>
                {navIsOpen && (
                    <MobileNav
                        routes={routes}
                        user={user}
                        userImg={userProfile?.photoURL}
                        username={userProfile?.userName}
                        closeNav={closeNav}
                    />
                )}
            </nav>
        </header>
    )
}

export default Navbar
