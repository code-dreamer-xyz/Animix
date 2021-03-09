import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
    img: string
}

const Avatar: React.FC<Props> = ({ img }) => {
    return (
        <>
            {img && (
                <img
                    className="rounded-full w-12 h-12 bg-primary"
                    src={img}
                    alt="avatar"
                    width={64}
                    height={64}
                />
            )}
            {!img && (
                <div className="rounded-full w-14 h-14 bg-primary text-white text-xl flex items-center justify-center">
                    <FontAwesomeIcon icon={faUser} />
                </div>
            )}
        </>
    )
}

export default Avatar
