const Button: React.FC = ({ children }) => {
    return (
        <button className="py-2 px-6 bg-primary text-sans sm:text-xl text-lg text-white font-bold rounded">
            {children}
        </button>
    )
}

export default Button
