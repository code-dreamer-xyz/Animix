import ImgSlider from '../components/ImgSlider'

const Home: React.FC = () => {
    return (
        <div className="text-green-600">
            hello from next
            <div className="flex items-center justify-center max-w-screen mx-auto">
                <ImgSlider />
            </div>
        </div>
    )
}

export default Home
