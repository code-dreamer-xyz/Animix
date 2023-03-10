import Image from 'next/image'

import Link from 'next/link'
import Button from './Button'
import Avatar from './Avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

import { useContext } from 'react'
import { UserContext } from '../../lib/context'
import { useState } from 'react'
import { sign_Out } from '../../lib/firebase'

import { motion } from 'framer-motion'
import { Divide as Hamburger } from 'hamburger-react'
import MobileNav from './MobileNav'

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false)
  const { user, username } = useContext(UserContext)
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
    {
      path: '/blog',
      page: 'Blog',
    },
  ]

  return (
    <header className="relative z-50 w-full 2xl:px-0 px-2 py-2">
      <nav className="max-w-screen-xl mx-auto flex justify-between items-center">
        <Link href="/">
          <a className="font-syne text-white text-xl">
            Ani<span className="text-primary">Mix</span>
          </a>
        </Link>
        <div className="flex items-center space-x-4">
          <ul className="justify-between md:flex hidden">
            {routes.map(({ path, page }) => (
              <motion.li whileTap={{ scale: 0.9 }} className=" mx-4" key={path}>
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
                <div className="flex space-x-2 items-center">
                  <Avatar img={user?.photoURL} />
                  <p className="text-white hover:text-primary font-poppins font-bold">
                    {username}
                  </p>
                  <FontAwesomeIcon
                    icon={open ? faCaretUp : faCaretDown}
                    className={open ? 'text-primary' : 'text-white'}
                  />
                </div>

                <div
                  className={`absolute top-full z-50 rounded bg-primaryDark w-full text-white left-0  flex-col space-y-4 ${
                    open ? 'flex' : 'hidden'
                  }`}
                >
                  <button className="hover:bg-gray-600 p-2">
                    <Link href="/blog/admin">
                      <a>Manage Post</a>
                    </Link>
                  </button>
                  <button className="hover:bg-gray-600  p-2">
                    <Link href={`/blog/${username}`}>
                      <a>Profile</a>
                    </Link>
                  </button>
                  <button className="hover:bg-gray-600  p-2" onClick={sign_Out}>
                    Log Out
                  </button>
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
            userImg={user?.photoURL}
            username={user?.userName}
            closeNav={closeNav}
          />
        )}
      </nav>
    </header>
  )
}

export default Navbar
