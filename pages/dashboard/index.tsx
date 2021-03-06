import React, { useContext, useState, useEffect } from 'react'
import MovieCard from '../../components/ui/MovieCard'
import ReactPlayer from 'react-player'

import WithAuth from '../../components/WithAuth'

import { getUserMovies } from '../../lib/hooks'

import { UserContext } from '../../lib/context'
import Loader from 'react-spinners/ClipLoader'

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
            <section className="min-h-screen bg-theme flex items-center justify-items-start py-20">
                <div className="max-w-screen-2xl mx-auto w-full">
                    {loading && <Loader />}
                    {!loading && (
                        <div>
                            <h2 className="text-white font-poppins font-bold text-5xl mb-12">
                                My Movies :
                            </h2>
                            <div className="flex space-x-12">
                                {!userMovies && (
                                    <p className="text-white">Loading...</p>
                                )}
                                {userMovies?.length > 0 &&
                                    userMovies?.map((movie) => (
                                        <div
                                            className="relative"
                                            key={movie.id}
                                        >
                                            <MovieCard
                                                img={movie.img}
                                                title={movie.title}
                                                genre={movie.genre}
                                            />
                                            <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
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
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>

                {currentPlayer && isOpen && (
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
                )}
            </section>
        </WithAuth>
    )
}

export default UserDashboard
