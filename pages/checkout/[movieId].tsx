import React, { useState, useEffect, useContext } from 'react'
import WithAuth from '../../components/WithAuth'
import { useRouter } from 'next/router'
import { auth, firestore } from '../../lib/firebase'
import { usePaymentInputs } from 'react-payment-inputs'
import toast from 'react-hot-toast'
import PaymentToast from '../../components/ui/PaymentToast'
import Link from 'next/link'
import { UserContext } from '../../lib/context'
import { moviePurshased } from '../../lib/hooks'
import Loader from 'react-spinners/ClipLoader'
import {
    pageAnimation,
    slideDownVariants,
    slideUpVariants,
    staggerChildren,
} from '../../helpers/animation'
import { motion } from 'framer-motion'

const Checkout = () => {
    const router = useRouter()
    const { movieId } = router.query

    const { user } = useContext(UserContext)
    const [movieExists, setMovieExists] = useState(false)
    const [loading, setLoading] = useState(true)

    const stringMovieId =
        typeof movieId === 'string' ? movieId : movieId && movieId[0]

    useEffect(() => {
        setLoading(true)
        const fetchMovie = async () => {
            if (user) {
                setMovieExists(await moviePurshased(stringMovieId, user.uid))
                setLoading(false)
            } else {
                setMovieExists(false)
                setLoading(false)
            }
        }

        fetchMovie()
    }, [user])

    const {
        meta,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps,
    } = usePaymentInputs()

    const [data, setData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvc: '',
    })

    const handleInputChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (meta.isTouched && !meta.error) {
            const uid = auth?.currentUser?.uid

            const movieRef = firestore
                .collection('movies')
                .where('id', '==', movieId)

            const getMovie = await movieRef.get()

            const movie = getMovie?.docs.map((doc) => doc.data())

            const userRef = firestore
                .collection('users')
                .doc(uid)
                .collection('user_movies')
                .doc(stringMovieId)

            const userMovie = {
                id: movie[0].id,
                trailer: movie[0].trailer,
                img: movie[0].img,
                title: movie[0].title,
                genre: movie[0].genre,
            }

            movie && (await userRef.set(userMovie))

            toast((t) => <PaymentToast t={t} />)
        } else {
            toast.error('Please enter valid info')
        }
    }

    return (
        <WithAuth>
            <motion.section
                {...pageAnimation}
                className="min-h-screen bg-theme flex items-center px-4 2xl:px-0"
            >
                {loading && <Loader />}
                {!loading && movieExists && (
                    <motion.div
                        initial="exit"
                        animate="enter"
                        exit="exit"
                        variants={staggerChildren}
                        className="text-center mx-auto p-4"
                    >
                        <motion.p
                            variants={slideDownVariants}
                            className="text-white font-poppins text-3xl mb-8"
                        >
                            You've already purchased this movie
                        </motion.p>
                        <motion.div variants={slideDownVariants}>
                            <Link href="/dashboard">
                                <a className="rounded bg-primary px-4 py-2 text-white font-sans text-xl">
                                    Watch in Dashboard
                                </a>
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
                {!loading && !movieExists && (
                    <div className="max-w-screen-md w-full mx-auto">
                        <motion.form
                            onSubmit={handleSubmit}
                            className="border border-primary "
                            initial="exit"
                            animate="enter"
                            exit="exit"
                            variants={staggerChildren}
                        >
                            <div className="bg-primary text-center">
                                <motion.h2
                                    variants={slideDownVariants}
                                    className="text-2xl font-poppins font-bold text-white py-4"
                                >
                                    Payment Details
                                </motion.h2>
                            </div>
                            <motion.div
                                variants={slideUpVariants}
                                className="p-6 flex flex-col space-y-4"
                            >
                                <label
                                    htmlFor="Card Number"
                                    className="font-sans text-white text-xl mb-2"
                                >
                                    Card Number
                                </label>
                                <input
                                    className="rounded text-white border border-gray-500 w-full p-2 bg-transparent mb-2"
                                    {...getCardNumberProps({
                                        onChange: handleInputChange,
                                    })}
                                    value={data.cardNumber}
                                />
                                {meta.touchedInputs.cardNumber &&
                                    meta.erroredInputs.cardNumber && (
                                        <span className="text-primary font-sans text-lg mb-2">
                                            {meta.erroredInputs.cardNumber}
                                        </span>
                                    )}
                                <label
                                    htmlFor="Card Number"
                                    className="font-sans text-white text-xl mb-2"
                                >
                                    Expirity Date
                                </label>
                                <input
                                    className="rounded text-white border border-gray-500 w-full p-2 bg-transparent mb-2"
                                    {...getExpiryDateProps({
                                        onChange: handleInputChange,
                                    })}
                                    value={data.expiryDate}
                                />
                                {meta.touchedInputs.expiryDate &&
                                    meta.erroredInputs.expiryDate && (
                                        <span className="text-primary font-sans text-lg mb-2">
                                            {meta.erroredInputs.expiryDate}
                                        </span>
                                    )}
                                <label
                                    htmlFor="Cvc"
                                    className="font-sans text-white text-xl mb-2"
                                >
                                    Cvc Number
                                </label>
                                <input
                                    className="rounded text-white border border-gray-500 w-full p-2 bg-transparent"
                                    {...getCVCProps({
                                        onChange: handleInputChange,
                                    })}
                                    value={data.cvc}
                                />
                                {meta.touchedInputs.cvc &&
                                    meta.erroredInputs.cvc && (
                                        <span className="text-primary font-sans text-lg">
                                            {meta.erroredInputs.cvc}
                                        </span>
                                    )}
                                <button
                                    type="submit"
                                    className="disabled:cursor-not-allowed bg-primary text-white font-sans px-6 py-2 mt-6 rounded self-center"
                                    disabled={meta.isTouched && meta.error}
                                >
                                    Submit
                                </button>
                            </motion.div>
                        </motion.form>
                    </div>
                )}
            </motion.section>
        </WithAuth>
    )
}

export default Checkout
