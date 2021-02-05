import Image from 'next/image'
import avatarHolder from '../../images/avatarHolder.jpg'

const Avatar = () => {
    return (
        <div>
            <Image
                className="rounded-full w-16 h-16 bg-primary"
                src={avatarHolder}
                alt="avatar"
                width={64}
                height={64}
            />
        </div>
    )
}

export default Avatar
