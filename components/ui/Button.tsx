import { motion } from 'framer-motion'

type Props = {
    circle?: boolean
}

const Button: React.FC<Props> = ({ children, circle = false }) => {
    return (
        <motion.button
            whileHover={{
                position: 'relative',
                zIndex: 1,
                scale: 1.1,
                transition: {
                    duration: 0.2,
                },
            }}
            whileTap={{ scale: 0.9 }}
            className={`${
                circle ? 'rounded-full' : 'rounded'
            } focus:outline-none py-2 px-4 bg-primary text-sans text-md text-white font-bold`}
        >
            {children}
        </motion.button>
    )
}

export default Button
