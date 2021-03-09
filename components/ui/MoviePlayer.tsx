import { motion } from 'framer-motion'
import React from 'react'
import ReactPlayer from 'react-player'

const MoviePlayer = ({ url, closeModal }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <div
                className={` w-screen bg-gray-800 flex flex-col px-6 py-4 h-screen `}
            >
                <button
                    className="focus:outline-none bg-primary text-white font-bold font-sans py-1 px-2 self-end rounded my-2 "
                    onClick={() => closeModal()}
                >
                    X
                </button>
                <div className="border border-white rounded w-full h-full">
                    <ReactPlayer width={'100%'} height={'100%'} url={url} />
                </div>
            </div>
        </motion.div>
    )
}

export default MoviePlayer
