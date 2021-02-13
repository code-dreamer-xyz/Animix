import { useState } from 'react'
import Slider from 'react-slick'
import fate from '../images/fate.jpg'
import gintama from '../images/gintama.jpg'
import conan from '../images/conan.jpg'
import katashi from '../images/katashi.jpg'

import Image from 'next/image'

const ImgSlider: React.FC = () => {
    const [imageIndex, setImageIndex] = useState(0)

    const img = [fate, gintama, conan, katashi]

    const settings = {
        infinite: true,
        lazyLoad: true,
        speed: 300,
        slidesToShow: 3,
        centerMode: true,
        centerPadding: 0,
        dots: true,
        arrows: false,
        beforeChange: (current: number, next: number) => setImageIndex(next),
    }

    return (
        <Slider {...settings}>
            {img.map((img, i) => (
                <img
                    key={`img-${i}`}
                    src={img}
                    alt="anime"
                    className={`transition-transform duration-300 ${
                        i === imageIndex
                            ? ' transform scale-95'
                            : 'transform scale-75'
                    }`}
                    width={340}
                    height={430}
                />
            ))}
        </Slider>
    )
}

export default ImgSlider
