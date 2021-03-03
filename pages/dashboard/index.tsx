import React from 'react'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'
import MovieCard from '../../components/ui/MovieCard'

import WithAuth from '../../components/WithAuth'

import { auth, firestore } from '../../lib/firebase'

const UserDashboard = () => {
    const userMoviesRef = firestore
        .collection('users')
        .doc(auth.currentUser.uid)
        .collection('user_movies')

    const [moviesCollection, loading] = useCollectionOnce(userMoviesRef)

    const userMovies = moviesCollection?.docs.map((doc) => doc.data())

    return (
        <WithAuth>
            <section className="min-h-screen bg-theme flex items-center justify-items-start py-20">
                <div className="max-w-screen-2xl mx-auto w-full">
                    <div>
                        <h2 className="text-white font-poppins font-bold text-5xl mb-12">
                            My Movies:
                        </h2>
                        <div className="flex space-x-12">
                            {loading && (
                                <p className="text-white">Loading...</p>
                            )}
                            {!loading &&
                                userMovies?.map((movie) => (
                                    <MovieCard
                                        key={movie.id}
                                        img={movie.img}
                                        title={movie.title}
                                        genre={movie.genre}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </section>
        </WithAuth>
    )
}

export default UserDashboard
