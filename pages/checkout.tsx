import React from 'react'

const checkout = () => {
    return (
        <section className="min-h-screen bg-theme flex items-center">
            <div className="max-w-screen-2xl mx-auto">
                <form className="border border-primary rounded">
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
                            type="phone"
                            name="cardNumber"
                            className="rounded text-primary border border-gray-500 w-full p-2 bg-transparent"
                        />
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
                                type="phone"
                                name="cvvCode"
                                className="rounded text-primary border border-gray-500 w-full p-2 bg-transparent"
                            />
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
                                name="name"
                                className="rounded text-primary border border-gray-500 w-full p-2 bg-transparent"
                            />
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
                                className="rounded text-primary border border-gray-500 w-full py-2 bg-transparent"
                            />
                        </div>
                    </div>
                    <div className="flex space-x-4 justify-center my-8">
                        <button className=" w-44 py-2 px-6 bg-transparent text-sans sm:text-xl text-lg text-primary font-bold rounded border border-primary">
                            Back
                        </button>
                        <button
                            type="submit"
                            className="w-44 py-2 px-6 bg-primary text-sans sm:text-xl text-lg text-white font-bold rounded"
                        >
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default checkout
