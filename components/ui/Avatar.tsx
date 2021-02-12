import avatarHolder from '../../images/avatarHolder.jpg'

interface Props {
    img: string
}

const Avatar: React.FC<Props> = ({ img }) => {
    return (
        <div>
            <img
                className="rounded-full w-16 h-16 bg-primary"
                src={img ? img : avatarHolder}
                alt="avatar"
                width={64}
                height={64}
            />
        </div>
    )
}

export default Avatar
