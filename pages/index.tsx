import Link from 'next/link'
import ImgSlider from '../components/ImgSlider'

import Button from '../components/ui/Button'
import { firestore } from '../lib/firebase'

export const getStaticProps = async (context) => {
    const moviesData = await firestore
        .collection('movies')
        .where('price', '>', 25)
        .limit(4)
        .get()

    const movies = []

    moviesData.forEach((movie) => movies.push(movie.data()))

    return {
        props: { movies },
    }
}

const Home = ({ movies }) => {
    return (
        <section
            style={{ backgroundImage: `url("/bg.jpg")` }}
            className="relative overflow-x-hidden bg-cover  min-h-screen"
        >
            <div className="absolute  min-h-screen w-full top-0 left-0 bg-overlay 2xl:px-0 px-4">
                <div className="h-full max-w-screen-2xl min-h-screen mx-auto 2xl:block flex flex-col justify-center xl:space-y-6 space-y-12 py-20 2xl:py-0">
                    <div className="flex items-center 2xl:min-h-screen">
                        <div>
                            <h1 className="sm:mb-6 mb-4 text-white font-bold text-white md:text-8xl font-poppins sm:text-5xl text-4xl">
                                Anime Movies <br /> Night
                            </h1>
                            <p className="md:mb-12 mb-4 font-sans text-gray-100 md:text-2xl text-xl">
                                Collection of Top anime Movies.
                            </p>
                            <Link href="/movies">
                                <a>
                                    <Button>Explore</Button>
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div
                        className="slider-container 
                    z-20 md:max-w-screen-lg  
                    self-center 2xl:absolute 
                    2xl:top-2/4 
                    2xl:transform 2xl:-translate-y-1/2 2xl:-right-12"
                    >
                        <ImgSlider movies={movies ? movies : null} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home
