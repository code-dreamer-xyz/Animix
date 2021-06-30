import Link from 'next/link'
import { useState } from 'react'
import Slider from 'react-slick'
import Image from 'next/image'

const ImgSlider = ({ movies }) => {
    const [imageIndex, setImageIndex] = useState(0)

    const settings = {
        infinite: true,
        lazyLoad: true,
        autoplay: true,
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
            {movies?.map((movie, index) => (
                <Link href={`/${movie.id}`} key={movie.id}>
                    <a>
                        <Image
                            src={movie.img}
                            alt="anime"
                            className={`transition-transform  duration-300 ${
                                index === imageIndex
                                    ? ' transform scale-95'
                                    : 'transform scale-75'
                            }`}
                            width={270}
                            height={380}
                        />
                    </a>
                </Link>
            ))}
        </Slider>
    )
}

export default ImgSlider
