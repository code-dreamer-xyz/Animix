import Button from '../components/ui/Button'
import MovieCard from '../components/ui/MovieCard'
import { GetStaticProps } from 'next'
import { firestore } from '../lib/firebase'
import Link from 'next/link'
import Loader from '../components/ui/Loader'
import { pageAnimation, staggerChildren } from '../helpers/animation'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { collection, getDocs, query } from 'firebase/firestore'

export const getStaticProps: GetStaticProps = async (context) => {
  const movies = []

  try {
    const q = query(collection(firestore, 'movies'))
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
        <motion.section {...pageAnimation} className="h-full bg-theme py-32">
          <div className="max-w-screen-xl px-2 mx-auto">
            <div className="mb-6 flex md:flex-col flex-row md:space-y-4 justify-between md:items-start items-center">
              <h2 className="font-syne md:text-5xl text-3xl md:self-center text-white ">
                Movies
              </h2>

              <Button>Filter</Button>
            </div>
            <motion.div
              initial="exit"
              animate="enter"
              exit="exit"
              variants={staggerChildren}
              className="grid xl:gap-8 gap-x-4 gap-y-8 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center"
            >
              {moviesCollection.map((movie) => (
                <div key={movie.id}>
                  <Link href={`/movie/${movie.id}`}>
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
