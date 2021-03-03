import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const PaymentToast = () => {
    return (
        <div className="p-8 text-center">
            <div className="rounded-full mx-auto bg-primary w-16 h-16 text-white flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faCheck} className="text-2xl" />
            </div>
            <p className="text-2xl font-sans font-bold mb-6">
                Payment Successfully Confiremed
            </p>
            <div className="flex space-x-6">
                <Link href="/movies">
                    <a className="bg-primary text-white px-4 py-2 font-sans font-lg">
                        back to Movies
                    </a>
                </Link>
                <Link href="/dashboard">
                    <a className="bg-theme text-white px-4 py-2 font-sans font-lg">
                        go to Dashboard
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default PaymentToast
