import Link from 'next/link'
import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import Slider from 'react-slick'

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
            {!movies &&
                new Array(3).fill({}).map((item, index) => (
                    <div key={`key-${index}`}>
                        <Skeleton height={430} width={320} />
                    </div>
                ))}
            {movies.map((movie, index) => (
                <Link href={`/${movie.id}`} key={movie.id}>
                    <a>
                        <img
                            src={movie.img}
                            alt="anime"
                            className={`transition-transform  duration-300 ${
                                index === imageIndex
                                    ? ' transform scale-95'
                                    : 'transform scale-75'
                            }`}
                            style={{ width: 340, height: 430 }}
                        />
                    </a>
                </Link>
            ))}
        </Slider>
    )
}

export default ImgSlider
