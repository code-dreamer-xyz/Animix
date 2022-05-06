import Link from 'next/link'
import Slider from 'react-slick'
import Image from 'next/image'

const ImgSlider = ({ movies }) => {
  const settings = {
    infinite: true,
    lazyLoad: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    centerMode: true,
    centerPadding: 0,
    dots: false,
    arrows: false,
  }

  return (
    <Slider {...settings}>
      {movies?.map((movie) => (
        <Link href={`/${movie.id}`} key={movie.id}>
          <a className="relative inline-block">
            <Image src={movie.img} alt="anime" width={120} height={150} />
            <span className="absolute top-0 left-0  h-full w-full text-white text-xs font-poppins font-bold flex items-end text-center p-1 pb-3 justify-center bg-overlay">
              {movie.title}
            </span>
          </a>
        </Link>
      ))}
    </Slider>
  )
}

export default ImgSlider
