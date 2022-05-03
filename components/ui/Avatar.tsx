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
          className="rounded-full w-8 h-8 bg-primary"
          src={img}
          alt="avatar"
        />
      )}
      {!img && (
        <div className="rounded-full w-8 h-8 bg-primary text-white text-xl flex items-center justify-center">
          <FontAwesomeIcon icon={faUser} />
        </div>
      )}
    </>
  )
}

export default Avatar
