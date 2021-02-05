import Navbar from './ui/Navbar'

const Layout: React.FC = ({ children }) => {
    return (
        <main className="overflow-x-hidden">
            <Navbar />
            {children}
        </main>
    )
}

export default Layout
