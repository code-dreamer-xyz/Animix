import Link from 'next/link'

interface MovieProps {
    img: string
    title: string
    genre: string
    // id: string
}

const MovieCard: React.FC<MovieProps> = ({ img, title, genre }) => {
    return (
        <Link href="/:id">
            <div className="text-center">
                <div className="  mb-2">
                    <img
                        className="rounded-md w-80 h-96 block mx-auto"
                        src={img}
                        alt="movie"
                    />
                </div>
                <p className=" text-2xl font-sans font-bold text-primary mb-2 px-6">
                    {title}
                </p>
                <span className="text-lg text-gray-500 font-sans">{genre}</span>
            </div>
        </Link>
    )
}

export default MovieCard
