import ImgSlider from '../components/ImgSlider'
import Button from '../components/ui/Button'
import bg from '../images/bg.jpg'

const Home: React.FC = () => {
    return (
        <section
            style={{ backgroundImage: `url(${bg})` }}
            className="relative overflow-x-hidden bg-cover  min-h-screen"
        >
            <div className="absolute  min-h-screen w-full top-0 left-0 bg-overlay">
                <div className="h-full max-w-screen-2xl mx-auto">
                    <div className="flex items-center min-h-screen">
                        <div>
                            <h1 className="mb-6 text-white font-bold text-white text-8xl font-poppins">
                                Anime Movies <br /> Night
                            </h1>
                            <p className="mb-12 font-sans text-gray-100 text-2xl">
                                Collection of Top anime Movies.
                            </p>
                            <Button>Explore</Button>
                        </div>
                    </div>
                    <div className="z-20 max-w-screen-lg absolute top-2/4 transform -translate-y-1/2 -right-12">
                        <ImgSlider />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home
