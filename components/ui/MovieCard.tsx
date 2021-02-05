import Image from 'next/image'
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
                <div className="  mb-4">
                    <Image
                        className="rounded-md "
                        src={img}
                        alt="movie"
                        width={300}
                        height={400}
                    />
                </div>
                <p className=" text-2xl font-sans font-bold text-primary mb-2 px-4">
                    {title}
                </p>
                <span className="text-lg text-gray-500 font-sans">{genre}</span>
            </div>
        </Link>
    )
}

export default MovieCard
