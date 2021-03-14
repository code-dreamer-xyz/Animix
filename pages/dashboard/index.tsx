import React, { useContext, useState, useEffect } from 'react'
import MovieCard from '../../components/ui/MovieCard'

import WithAuth from '../../components/WithAuth'

import { getUserMovies } from '../../lib/hooks'

import { UserContext } from '../../lib/context'
import Loader from 'react-spinners/ClipLoader'
import {
    pageAnimation,
    scaleUp,
    slideDownVariants,
    staggerChildren,
} from '../../helpers/animation'
import { motion } from 'framer-motion'
import Modal from '../../components/ui/Modal'
import MoviePlayer from '../../components/ui/MoviePlayer'

const UserDashboard = () => {
    const { user } = useContext(UserContext)
    const [userMovies, setUserMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMovies = async () => {
            if (user) {
                setUserMovies(await getUserMovies(user.uid))
                setLoading(false)
            } else {
                setUserMovies(null)
                setLoading(false)
            }
        }

        fetchMovies()
    }, [user])

    const [currentPlayer, setCurrentPlayer] = useState('')
    const [isOpen, setOpen] = useState(false)

    const onPlayClick = (url) => {
        setCurrentPlayer(url)
        setOpen(true)
    }

    const closeModal = () => setOpen(false)

    return (
        <WithAuth>
            <motion.section
                {...pageAnimation}
                className="min-h-screen bg-theme flex items-center justify-items-start 2xl:px-0 px-4 py-20"
            >
                <div className="max-w-screen-2xl mx-auto w-full mt-20">
                    {loading && <Loader />}
                    {!loading && (
                        <motion.div
                            initial="exit"
                            animate="enter"
                            exit="exit"
                            variants={staggerChildren}
                        >
                            <motion.h2
                                variants={slideDownVariants}
                                className="text-white font-poppins font-bold text-5xl mb-12"
                            >
                                My Movies :
                            </motion.h2>
                            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 ">
                                {!userMovies && (
                                    <p className="text-white">Loading...</p>
                                )}
                                {userMovies?.length > 0 &&
                                    userMovies?.map((movie) => (
                                        <motion.div
                                            className="relative"
                                            key={movie.id}
                                            initial="exit"
                                            animate="enter"
                                            exit="exit"
                                            variants={staggerChildren}
                                        >
                                            <MovieCard
                                                img={movie.img}
                                                title={movie.title}
                                                genre={movie.genre}
                                            />
                                            <motion.div
                                                variants={scaleUp}
                                                className="absolute top-0 left-0 h-full w-full flex items-center justify-center"
                                            >
                                                <motion.button
                                                    onClick={() =>
                                                        onPlayClick(
                                                            movie.trailer
                                                        )
                                                    }
                                                    whileHover={{
                                                        position: 'relative',
                                                        zIndex: 1,
                                                        scale: 1.1,
                                                        transition: {
                                                            duration: 0.2,
                                                        },
                                                    }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="py-2 px-6 rounded bg-primary text-white font-sans font-bold text-2xl"
                                                >
                                                    Watch
                                                </motion.button>
                                            </motion.div>
                                        </motion.div>
                                    ))}
                            </div>
                        </motion.div>
                    )}
                </div>

                <Modal modalIsOpen={isOpen} closeModal={closeModal}>
                    <MoviePlayer url={currentPlayer} closeModal={closeModal} />
                </Modal>
            </motion.section>
        </WithAuth>
    )
}

export default UserDashboard
