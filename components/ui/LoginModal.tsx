import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SignInButton from '../auth/SigninButton'

const LoginModal = ({ setOpenModal }) => {
  return (
    <div
      onClick={() => setOpenModal(false)}
      className="fixed top-0 left-0 right-0 z-50 bg-secondaryDark/80 overflow-x-hidden overflow-y-auto flex items-center justify-center md:inset-0 h-modal md:h-full"
    >
      <div className="relative w-full h-full max-w-md p-4 md:h-auto">
        <div className="relative  rounded-lg shadow bg-primaryDark">
          <div className="border-b border-gray-700 p-2 flex justify-between items-center">
            <h3 className="text-lg font-normal  text-gray-300">
              Login to continue
            </h3>
            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className=" text-white hover:bg-red-600 rounded text-sm p-1.5 ml-auto inline-flex items-center bg-transparent"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="p-6 text-center">
            <h3 className="mb-5 text-lg font-normal  text-gray-100">
              You need to login to heart this post
            </h3>

            <SignInButton setOpenModal={setOpenModal} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
