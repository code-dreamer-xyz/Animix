import Button from '../components/ui/Button'
import MovieCard from '../components/ui/MovieCard'
import { GetStaticProps } from 'next'
import { firestore } from '../lib/firebase'
import Link from 'next/link'
import Loader from '../components/ui/Loader'
import { pageAnimation, staggerChildren } from '../helpers/animation'
import { motion } from 'framer-motion'

export const getStaticProps: GetStaticProps = async (context) => {
    const data = await firestore.collection('movies').get()

    const movies = []

    data.forEach((doc) => {
        movies.push(doc.data())
    })

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
                    <div className="max-w-screen-2xl mx-auto">
                        <div className="mb-10 pl-2">
                            <Button>Filter</Button>
                        </div>
                        <motion.div
                            initial="exit"
                            animate="enter"
                            exit="exit"
                            variants={staggerChildren}
                            className="grid gap-8 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-items-center"
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
