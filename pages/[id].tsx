import Button from '../components/ui/Button'

import CommentList from '../components/Comments/CommentList'
import { GetStaticPaths } from 'next'
import { commentToJSON, firestore } from '../lib/firebase'

export const getStaticPaths: GetStaticPaths = async () => {
    const snapshot = await firestore.collection('movies').get()

    const paths = snapshot.docs.map((doc) => {
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

export const getStaticProps = async ({ params }) => {
    const id = params.id

    const movieRef = await firestore.collection('movies').doc(id).get()
    const commentsQuery = firestore
        .collectionGroup('comments')
        .where('movie_id', '==', id)
        .orderBy('createdAt', 'desc')
        .limit(1)

    const comments = (await commentsQuery.get()).docs.map(commentToJSON)

    const movie = movieRef.data()

    return {
        props: { movie, comments },
    }
}

const MovieDetail = ({ movie, comments }) => {
    return (
        <section className="min-h-screen bg-theme py-32 ">
            <div className="max-w-screen-2xl mx-auto flex flex-col min-h-screen justify-center 2xl:px-0 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-12 mb-6">
                    <div className="2xl:col-span-2 self-center">
                        <h2 className="text-3xl font-poppins font-bold text-primary mb-2">
                            {movie.title}
                        </h2>
                        <span className="text-lg text-gray-500 font-sans">
                            {movie.genre}
                        </span>
                        <p className="text-white md:pr-12 text-xl font-sans mt-4 mb-6">
                            {movie.desc}
                        </p>
                        <p className="text-lg text-gray-500 font-sans mb-6">
                            Price:{' '}
                            <span className="text-primary font-bold">
                                {movie.price}£
                            </span>
                        </p>
                        <Button>Buy</Button>
                        <p className="text-lg text-gray-300 font-sans mt-2 underline">
                            Add To WhishList
                        </p>
                    </div>
                    <div className="justify-self-end">
                        <img
                            src={movie.img}
                            width={400}
                            height={500}
                            className="rounded-md"
                        />
                    </div>
                </div>
                <CommentList comments={comments} />
            </div>
        </section>
    )
}

export default MovieDetail
