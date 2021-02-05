import Button from '../components/ui/Button'
import MovieCard from '../components/ui/MovieCard'
import gintama from '../images/gintama.jpg'

const Movies = () => {
    return (
        <section className="min-h-screen bg-theme py-32">
            <div className="max-w-screen-2xl mx-auto">
                <div className="mb-10 pl-2">
                    <Button>Filter</Button>
                </div>
                <div className="grid gap-6 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                    <MovieCard
                        img={gintama}
                        title="Gintama: The Final"
                        genre="Comedy / Action"
                    />
                </div>
            </div>
        </section>
    )
}

export default Movies
