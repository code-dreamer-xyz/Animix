import { pageAnimation } from '../helpers/animation'
import Navbar from './ui/Navbar'
import { motion } from 'framer-motion'

const Layout: React.FC = ({ children }) => {
    return (
        <motion.main className="overflow-x-hidden">
            <Navbar />
            {children}
        </motion.main>
    )
}

export default Layout
