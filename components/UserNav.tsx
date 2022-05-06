import Link from 'next/link'
import Avatar from './ui/Avatar'

interface Props {
  img: string
  userName: string
}

const UserNav: React.FC<Props> = ({ img, userName }) => {
  return (
    <div className="flex items-center justify-center border border-gray-500 fixed top-0 w-96 right-0 h-full">
      <div>
        <div className="mb-12 flex flex-col items-center">
          <Avatar img={img} />
          <p className="text-white font-poppins font-bold my-6">{userName}</p>
        </div>
        <div className="flex flex-col space-y-4">
          <button className=" rounded-full px-6 py-2 bg-transparent border border-primary text-white">
            <Link href="/dashboard">
              <a href="">My Movies</a>
            </Link>
          </button>
          <button className=" rounded-full px-6 py-2 bg-transparent border border-primary text-white">
            <Link href="/dashboard/whishlist">
              <a>My WhishList</a>
            </Link>
          </button>
          <button className="mt-auto px-6 py-2 rounded-full bg-transparent border border-primary text-white">
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserNav
