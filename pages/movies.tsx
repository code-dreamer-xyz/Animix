import Button from '../components/ui/Button'
import MovieCard from '../components/ui/MovieCard'
import { GetStaticProps } from 'next'
import { firestore } from '../lib/firebase'
import Link from 'next/link'
import Loader from '../components/ui/Loader'
import { pageAnimation, staggerChildren } from '../helpers/animation'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { collection, getDocs, query, where } from 'firebase/firestore'

export const getStaticProps: GetStaticProps = async (context) => {
    const movies = []

    try {
        const q = query(
            collection(firestore, 'movies'),
            where('price', '>', 25)
        )
        const moviesSnapshot = await getDocs(q)
        moviesSnapshot.forEach((movie) => movies.push(movie.data()))
    } catch (error) {
        toast.error(error.message)
    }

    return {
        props: { movies },
    }
}

const Movies = ({ movies }) => {
    const moviesCollection = movies

    return (
        <>
            {!moviesCollection && <Loader />}
            {moviesCollection && moviesCollection.length > 0 && (
                <motion.section
                    {...pageAnimation}
                    className="min-h-screen bg-theme py-32"
                >
                    <h2 className="font-syne text-5xl text-white text-center">
                        Movies
                    </h2>
                    <div className="max-w-screen-xl mx-auto">
                        <div className="mb-10 pl-2">
                            <Button>Filter</Button>
                        </div>
                        <motion.div
                            initial="exit"
                            animate="enter"
                            exit="exit"
                            variants={staggerChildren}
                            className="grid gap-8 md:grid-cols-5 sm:grid-cols-3 grid-cols-1 justify-items-center"
                        >
                            {moviesCollection.map((movie) => (
                                <div key={movie.id}>
                                    <Link href={`/${movie.id}`}>
                                        <a>
                                            <MovieCard
                                                img={movie.img}
                                                title={movie.title}
                                                genre={movie.genre}
                                            />
                                        </a>
                                    </Link>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.section>
            )}
        </>
    )
}

export default Movies
