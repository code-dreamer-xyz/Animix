import Button from '../components/ui/Button'
import CommentList from '../components/Comments/CommentList'
import { GetStaticPaths, GetStaticProps } from 'next'
import { firestore } from '../lib/firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import {
    slideUpVariants,
    staggerChildren,
    slideToLeftVariants,
} from '../helpers/animation'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import MoviePlayer from '../components/ui/MoviePlayer'
import Modal from '../components/ui/Modal'
import toast from 'react-hot-toast'
import Image from 'next/image'
import NotFound from './404'
import {
    collection,
    collectionGroup,
    doc,
    getDoc,
    getDocs,
    query,
    orderBy,
    where,
} from 'firebase/firestore'

export const getStaticPaths: GetStaticPaths = async () => {
    const q = query(collection(firestore, 'movies'))
    const moviesSnapshot = await getDocs(q)
    const paths = moviesSnapshot.docs.map((doc) => {
        const { id } = doc.data()

        return {
            params: { id },
        }
    })

    return {
        paths,
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = typeof params.id === 'string' ? params.id : params.id[0]
    let movie

    try {
        const movieRef = doc(firestore, 'movies', id)
        const movieSnapshot = await getDoc(movieRef)

        if (movieSnapshot.exists()) {
            movie = movieSnapshot.data()
        } else {
            movie = null
        }
    } catch (error) {
        toast.error(error.message)
    }

    return {
        props: { movie },
    }
}

const MovieDetail = ({ movie }) => {
    const commentsQuery = query(
        collectionGroup(firestore, 'comments'),
        where('movie_id', '==', movie.id),
        orderBy('createdAt', 'desc')
    )

    const [realtimeComments, loading, error] = useCollection(commentsQuery)

    const comments = realtimeComments?.docs.map((doc) => doc.data())

    const [isOpen, setIsOpen] = useState(false)

    const closeModal = () => setIsOpen(false)

    return (
        <>
            {!movie && <NotFound />}
            {movie && (
                <motion.section
                    initial="exit"
                    animate="enter"
                    exit="exit"
                    className="h-full bg-theme py-36 "
                >
                    <div className="max-w-screen-xl mx-auto  2xl:px-0 px-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-12 mb-6">
                            <motion.div
                                initial="exit"
                                animate="enter"
                                exit="exit"
                                variants={staggerChildren}
                                className="2xl:col-span-2 self-center"
                            >
                                <motion.h2
                                    variants={slideUpVariants}
                                    className="text-3xl font-poppins font-bold text-primary mb-2"
                                >
                                    {movie.title}
                                </motion.h2>
                                <motion.span
                                    variants={slideUpVariants}
                                    className="text-lg text-gray-500 font-sans"
                                >
                                    {movie.genre}
                                </motion.span>
                                <motion.p
                                    variants={slideUpVariants}
                                    className="text-white md:pr-12 text-xl font-sans mt-4 mb-6"
                                >
                                    {movie.desc}
                                </motion.p>

                                <motion.div variants={slideUpVariants}>
                                    <Button>
                                        <a>Watch</a>
                                    </Button>
                                </motion.div>
                            </motion.div>
                            <motion.div
                                variants={slideToLeftVariants}
                                className="justify-self-end relative"
                            >
                                <Image
                                    src={movie.img}
                                    width={400}
                                    height={500}
                                    className="rounded-md"
                                />
                                <button
                                    className="focus:outline-none text-2xl text-primary py-4 px-6 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 bg-white -translate-y-1/2"
                                    onClick={() => setIsOpen(true)}
                                >
                                    <FontAwesomeIcon icon={faPlay} />
                                </button>
                            </motion.div>
                        </div>
                        <CommentList comments={comments} movie_id={movie.id} />
                    </div>
                    <Modal modalIsOpen={isOpen} closeModal={closeModal}>
                        <MoviePlayer
                            url={movie.trailer}
                            closeModal={closeModal}
                        />
                    </Modal>
                </motion.section>
            )}
        </>
    )
}

export default MovieDetail
