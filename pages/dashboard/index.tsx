import React, { useContext, useState, useEffect } from 'react'
import MovieCard from '../../components/ui/MovieCard'
import ReactPlayer from 'react-player'

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

    return (
        <WithAuth>
            <motion.section
                {...pageAnimation}
                className="min-h-screen bg-theme flex items-center justify-items-start py-20"
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
                            <div className="grid grid-cols-3 gap-6 ">
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
                                                <button
                                                    onClick={() =>
                                                        onPlayClick(
                                                            movie.trailer
                                                        )
                                                    }
                                                    className="py-2 px-6 rounded bg-primary text-white font-sans font-bold text-2xl"
                                                >
                                                    Watch
                                                </button>
                                            </motion.div>
                                        </motion.div>
                                    ))}
                            </div>
                        </motion.div>
                    )}
                </div>

                {currentPlayer && isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div
                            className={`fixed top-0 left-0 z-30 w-screen bg-gray-800 flex flex-col px-6 py-4 h-screen `}
                        >
                            <button
                                className="bg-white text-gray-800 font-bold font-sans py-1 px-2 self-end rounded my-2 "
                                onClick={() => setOpen(!isOpen)}
                            >
                                X
                            </button>
                            <div className="border border-white rounded w-full h-full">
                                <ReactPlayer
                                    width={'100%'}
                                    height={'100%'}
                                    url={currentPlayer}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.section>
        </WithAuth>
    )
}

export default UserDashboard
