import { motion } from 'framer-motion'
import Link from 'next/link'
import toast from 'react-hot-toast'
import ImgSlider from '../components/ImgSlider'

import Button from '../components/ui/Button'
import { slideUpVariants, staggerChildren, scaleUp } from '../helpers/animation'
import { firestore } from '../lib/firebase'
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
    const movies = []

    try {
        const moviesData = await firestore
            .collection('movies')
            .where('price', '>', 25)
            .limit(4)
            .get()

        moviesData.forEach((movie) => movies.push(movie.data()))
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
            style={{ backgroundImage: `url("/bg.jpg")` }}
            className="relative overflow-x-hidden bg-cover lg:bg-center min-h-screen"
        >
            <div className="absolute h-full min-h-screen w-full top-0 z-20 left-0 bg-overlay " />

            <div className="z-40 2xl:px-0 px-2 relative h-full max-w-screen-2xl min-h-screen mx-auto 2xl:block flex flex-col justify-center xl:space-y-6 space-y-12 py-20 2xl:py-0">
                <div className="flex items-center 2xl:min-h-screen">
                    <motion.div
                        initial="exit"
                        animate="enter"
                        exit="exit"
                        variants={staggerChildren}
                        custom={0.2}
                    >
                        <motion.h1
                            variants={slideUpVariants}
                            className="sm:mb-6 mb-4 text-white font-bold text-white md:text-8xl font-poppins sm:text-5xl text-4xl"
                        >
                            Anime Movies <br /> Night
                        </motion.h1>
                        <motion.p
                            variants={slideUpVariants}
                            className="md:mb-12 mb-4 font-sans text-gray-100 md:text-2xl text-xl"
                        >
                            Collection of Top anime Movies.
                        </motion.p>
                        <motion.div variants={slideUpVariants}>
                            <Link href="/movies">
                                <a>
                                    <Button>Explore</Button>
                                </a>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
                <div
                    className="slider-container 
                     md:max-w-screen-lg  
                    self-center 2xl:absolute 
                    2xl:top-2/4 
                    2xl:transform 2xl:-translate-y-1/2 2xl:-right-12"
                >
                    <motion.div variants={scaleUp}>
                        <ImgSlider movies={movies ? movies : null} />
                    </motion.div>
                </div>
            </div>
        </motion.section>
    )
}

export default Home
