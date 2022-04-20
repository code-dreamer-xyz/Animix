import { motion } from 'framer-motion'
import Link from 'next/link'
import toast from 'react-hot-toast'
import ImgSlider from '../components/ImgSlider'
import Button from '../components/ui/Button'
import { slideUpVariants, staggerChildren, scaleUp } from '../helpers/animation'
import { firestore } from '../lib/firebase'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

export const getStaticProps: GetStaticProps = async () => {
  const movies = []
  try {
    const q = query(collection(firestore, 'movies'), where('price', '>', 25))
    const moviesSnapshot = await getDocs(q)

    moviesSnapshot.forEach((movie) => movies.push(movie.data()))
  } catch (error) {
    toast.error(error.message)
  }
  return {
    props: { movies },
  }
}

const Home = ({ movies }) => {
  return (
    <motion.section
      initial="exit"
      animate="enter"
      exit="exit"
      className=" overflow-x-hidden bg-cover lg:bg-center pt-20"
    >
      <div className="absolute h-full w-full top-0 z-0 left-0 bg-gradient-to-r from-black " />
      <div
        className="absolute h-full w-full top-0 left-0"
        style={{ zIndex: -1 }}
      >
        <Image
          alt="Home bg image"
          src="/anime-bg.jpg"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>

      <div className="relative max-w-screen-xl h-full mx-auto py-6 px-2">
        <div className="flex flex-col justify-center h-full">
          <motion.div
            initial="exit"
            animate="enter"
            exit="exit"
            variants={staggerChildren}
            custom={0.2}
          >
            <motion.h1
              variants={slideUpVariants}
              className="sm:mb-6 mb-4 font-bolder text-white md:text-7xl font-syne sm:text-5xl text-4xl"
            >
              Unlimited <br />
              <span className="text-primary">Anime</span> Movies
            </motion.h1>
            <motion.p
              variants={slideUpVariants}
              className="mb-12 font-sans text-gray-100   md:w-1/2 "
            >
              un testo segnaposto utilizzato nel settore della tipografia e
              della stampa. Lorem Ipsum è considerato il testo segnaposto.
            </motion.p>

            <div className="flex md:items-center md:flex-row flex-col md:space-x-6 md:space-y-0 space-y-6 mt-auto">
              <div className="slider-container md:max-w-xl ">
                <motion.div variants={scaleUp}>
                  <ImgSlider movies={movies ? movies : null} />
                </motion.div>
              </div>
              <Link href="/movies">
                <a>
                  <Button circle>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Button>
                </a>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default Home
