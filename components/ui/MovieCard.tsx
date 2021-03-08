import { motion } from 'framer-motion'

import { slideUpVariants, textVariants } from '../../helpers/animation'

interface MovieProps {
    img: string
    title: string
    genre: string
    // id: string
}

const MovieCard: React.FC<MovieProps> = ({ img, title, genre }) => {
    return (
        <motion.div
            whileHover={{
                position: 'relative',
                zIndex: 1,
                scale: 1.1,
                transition: {
                    duration: 0.2,
                },
            }}
            whileTap={{ scale: 0.9 }}
            className="text-center"
        >
            <motion.div variants={slideUpVariants} className="mb-2">
                <img
                    className="rounded-md w-80 h-96 block mx-auto"
                    src={img}
                    alt="movie"
                />
            </motion.div>
            <motion.p
                variants={textVariants}
                className=" text-2xl font-sans font-bold text-primary mb-2 px-6"
            >
                {title}
            </motion.p>
            <motion.span
                variants={textVariants}
                className="text-lg text-gray-500 font-sans"
            >
                {genre}
            </motion.span>
        </motion.div>
    )
}

export default MovieCard
