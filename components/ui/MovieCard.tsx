import { motion } from 'framer-motion'

import { slideUpVariants, textVariants } from '../../helpers/animation'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

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
        zIndex: 1,
        scale: 1.02,
        transition: {
          duration: 0.2,
        },
      }}
      whileTap={{ scale: 0.9 }}
      variants={slideUpVariants}
      className="mb-2 relative w-full"
    >
      <Image
        className="rounded-md mx-auto"
        src={img}
        alt="movie"
        width={280}
        height={370}
      />

      <motion.p
        variants={textVariants}
        className="font-sans text-sm font-bold mb-1 text-white"
      >
        {title}
      </motion.p>
      <div className="flex justify-between items-center">
        <p className="font-sans text-xs text-gray-400">{genre}</p>
        <div className="flex space-x-1 " style={{ fontSize: 10 }}>
          {new Array(5).fill('').map((item, index) => (
            <FontAwesomeIcon
              icon={faStar}
              key={`star-${index}`}
              className="text-yellow-400"
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default MovieCard
