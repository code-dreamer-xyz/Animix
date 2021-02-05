import Image from 'next/image'
import logo from '../../images/logo.png'
import Link from 'next/link'
import Button from './Button'

const Navbar: React.FC = () => {
    return (
        <header className="absolute z-20 top-0 w-full overflow-x-hidden py-4">
            <nav className="max-w-screen-2xl mx-auto flex justify-between items-center">
                <div>
                    <Image src={logo} alt="logo" width={250} height={74} />
                </div>
                <ul className="flex justify-between">
                    <li className="text-xl mx-4">
                        <Link href="/">
                            <a className="font-poppins font-bold text-white">
                                Home
                            </a>
                        </Link>
                    </li>
                    <li className="text-xl mx-4">
                        <Link href="/movies">
                            <a className="font-poppins font-bold text-white">
                                Movies
                            </a>
                        </Link>
                    </li>
                    <li className="text-xl mx-4">
                        <Link href="/contact">
                            <a className="font-poppins font-bold text-white">
                                Contact
                            </a>
                        </Link>
                    </li>
                </ul>
                <Button>Log In</Button>
            </nav>
        </header>
    )
}

export default Navbar
