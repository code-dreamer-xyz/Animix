import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import { slideUpVariants, staggerChildren } from '../../helpers/animation'

import { signOut } from '../../lib/firebase'
import Avatar from './Avatar'
import Button from './Button'

const MobileNav = ({ routes, user, userImg = '', username = '' }) => {
    return (
        <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.5,
                ease: 'easeInOut',
            }}
            className="flex flex-col items-center w-screen h-screen justify-center absolute top-0 left-0 z-20 bg-white"
        >
            {user && (
                <>
                    <div className="flex flex-col items-center space-y-4 mb-8">
                        <Avatar img={userImg} />
                        <p className="text-gray-800 font-poppins font-bold">
                            {username}
                        </p>
                    </div>
                    <motion.li
                        whileTap={{ scale: 0.9 }}
                        className="text-xl mb-4"
                    >
                        <Link href="/dashboard">
                            <a className="text-primary text-2xl cursor-pointer font-poppins font-bold ">
                                Dashboard
                            </a>
                        </Link>
                    </motion.li>
                </>
            )}
            {routes.map(({ path, page }) => (
                <motion.li
                    whileTap={{ scale: 0.9 }}
                    className="text-2xl my-4"
                    key={path}
                >
                    <Link href={path}>
                        <a className="text-primary cursor-pointer font-poppins font-bold ">
                            {page}
                        </a>
                    </Link>
                </motion.li>
            ))}
            {!user && (
                <Button>
                    <Link href="/login">
                        <a className="text-white">Log In</a>
                    </Link>
                </Button>
            )}

            {user && (
                <>
                    <Button>
                        <a
                            className="text-white cursor-pointer font-poppins font-bold"
                            onClick={signOut}
                        >
                            SignOut
                        </a>
                    </Button>
                </>
            )}
        </motion.ul>
    )
}

export default MobileNav
