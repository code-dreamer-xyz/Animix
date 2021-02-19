import React, { useContext } from 'react'
import WithAuth from '../../components/WithAuth'

import { useRouter } from 'next/router'
import { UserContext } from '../../lib/context'
import { auth, firestore } from '../../lib/firebase'
import { useCollection } from 'react-firebase-hooks/firestore'

import { useForm } from 'react-hook-form'

interface FormInput {
    cardNumber: number
    cvvCode: number
    nameOnCard: string
    date: Date
}

const Checkout = () => {
    const router = useRouter()
    const { movieId } = router.query

    const { register, handleSubmit, errors, formState } = useForm<FormInput>({
        mode: 'onChange',
    })

    const { isValid, isDirty } = formState

    const onSubmit = (data: FormInput) => console.log(data)

    // const onSubmit = async (data: FormInput) => {
    //     const uid = auth.currentUser.uid

    //     const movieRef = firestore
    //         .collection('movies')
    //         .where('id', '==', movieId)

    //     const getMovie = await movieRef.get()

    //     const movie = getMovie?.docs.map((doc) => doc.data())

    //     const userRef = firestore
    //         .collection('users')
    //         .doc(uid)
    //         .collection('user_movies')
    //         .doc()

    //     const userMovie = {
    //         trailer: movie[0].trailer,
    //         img: movie[0].img,
    //         title: movie[0].title,
    //         genre: movie[0].genre,
    //     }

    //     movie && (await userRef.set(userMovie))

    // }

    return (
        <WithAuth>
            <section className="min-h-screen bg-theme flex items-center">
                <div className="max-w-screen-lg w-full mx-auto">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="border border-primary rounded"
                    >
                        <h2 className="text-2xl mb-6 text-center font-poppins font-bold text-white bg-primary py-6">
                            Payment Info
                        </h2>
                        <div className="mb-6 p-4">
                            <label
                                htmlFor="cardNumber"
                                className="text-white mb-2 font-sans font-bold capitalize block"
                            >
                                Card Number
                            </label>
                            <input
                                type="number"
                                name="cardNumber"
                                className="rounded text-white border border-gray-500 w-full p-2 bg-transparent"
                                ref={register({
                                    minLength: {
                                        value: 13,
                                        message:
                                            'Card Number should contain more than 13 digits',
                                    },
                                    maxLength: {
                                        value: 22,
                                        message:
                                            "Card number can't be more than 22 digits ",
                                    },
                                    required: {
                                        value: true,
                                        message: 'This Fied is required',
                                    },
                                })}
                            />
                            {errors.cardNumber && (
                                <span className="text-red-300 font-sans text-lg my-4">
                                    {errors.cardNumber.message}
                                </span>
                            )}
                        </div>
                        <div className="p-4 grid gap-6 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
                            <div>
                                <label
                                    htmlFor="cvvCode"
                                    className="text-white mb-2 font-sans font-bold capitalize block"
                                >
                                    CVV Code
                                </label>
                                <input
                                    type="number"
                                    name="cvvCode"
                                    className="rounded text-white border border-gray-500 w-full p-2 bg-transparent"
                                    ref={register({
                                        minLength: {
                                            value: 3,
                                            message:
                                                "Cvv code cant't  contain less than 3 digits",
                                        },
                                        maxLength: {
                                            value: 4,
                                            message:
                                                "Cvv code can't be more than 4 digits ",
                                        },
                                        required: {
                                            value: true,
                                            message: 'This Fied is required',
                                        },
                                    })}
                                />

                                {errors.cvvCode && (
                                    <span className="text-red-300 font-sans text-lg my-4">
                                        {errors.cvvCode.message}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="text-white mb-2 font-sans font-bold capitalize block"
                                >
                                    Name On Card
                                </label>
                                <input
                                    type="text"
                                    name="nameOnCard"
                                    className="rounded text-white border border-gray-500 w-full p-2 bg-transparent"
                                    ref={register({
                                        pattern: {
                                            value: /^([^0-9]*)$/,
                                            message:
                                                'Name should not contain numbers',
                                        },
                                        minLength: {
                                            value: 3,
                                            message:
                                                "Name can't be less than 3 characters",
                                        },
                                        required: {
                                            value: true,
                                            message: 'This Fied is required',
                                        },
                                    })}
                                />
                                {errors.nameOnCard && (
                                    <span className="text-red-300 font-sans text-lg my-4">
                                        {errors.nameOnCard.message}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="date"
                                    className="text-white mb-2 font-sans font-bold capitalize block"
                                >
                                    Expidity Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    className="rounded text-white border border-gray-500 w-full py-2 bg-transparent"
                                    ref={register({
                                        required: {
                                            value: true,
                                            message: 'this field is required',
                                        },
                                    })}
                                />
                                {errors.date && (
                                    <span className="text-red-300 font-sans text-lg my-4">
                                        {errors.date.message}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex space-x-4 justify-center my-8">
                            <button className=" w-44 py-2 px-6 bg-transparent text-sans sm:text-xl text-lg text-white font-bold rounded border border-primary">
                                Back
                            </button>
                            <button
                                type="submit"
                                className="disabled:cursor-not-allowed w-44 py-2 px-6 bg-primary text-sans sm:text-xl text-lg text-white font-bold rounded"
                                disabled={!isDirty || !isValid}
                            >
                                Confirm
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </WithAuth>
    )
}

export default Checkout
