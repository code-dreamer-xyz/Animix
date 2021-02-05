import Image from 'next/image'
import Button from '../components/ui/Button'
import gintama from '../images/gintama.jpg'
import CommentList from '../components/Comments/CommentList'

const MovieDetail: React.FC = () => {
    return (
        <section className="min-h-screen bg-theme py-32 ">
            <div className="max-w-screen-2xl mx-auto flex flex-col min-h-screen justify-center 2xl:px-0 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-12 mb-6">
                    <div className="2xl:col-span-2 self-center">
                        <h2 className="text-3xl font-poppins font-bold text-primary mb-2">
                            Gintama : The Final
                        </h2>
                        <span className="text-lg text-gray-500 font-sans">
                            Comedy /Action
                        </span>
                        <p className="text-white md:pr-12 text-xl font-sans mt-4 mb-6">
                            Japanese anime film produced by Bandai Namco
                            Pictures. Based on the Gintama manga and anime
                            series, the film acts as a conclusion to the anime
                            series storyline.
                        </p>
                        <p className="text-lg text-gray-500 font-sans mb-6">
                            Price:{' '}
                            <span className="text-primary font-bold">25£</span>
                        </p>
                        <Button>Buy</Button>
                        <p className="text-lg text-gray-300 font-sans mt-2 underline">
                            Add To WhishList
                        </p>
                    </div>
                    <div className="justify-self-end">
                        <Image
                            src={gintama}
                            width={400}
                            height={500}
                            className="rounded-md"
                        />
                    </div>
                </div>
                <CommentList />
            </div>
        </section>
    )
}

export default MovieDetail
